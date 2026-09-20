"""Parse the .docx spec sheets under documents/product-data-documents into JSON."""
import json
import os
import re
import zipfile
from xml.etree import ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
RELNS = '{http://schemas.openxmlformats.org/package/2006/relationships}'

ROOT = 'documents/product-data-documents'

SECTION_ALIASES = {
    'mô tả tổng quan': 'description',
    'mô tả ngắn để fill website:': 'description',
    'mô tả ngắn để fill website': 'description',
    '6 ô thông số nổi bật': 'quickSpecs',
    'thông số kỹ thuật': 'specs',
    'thông tin kỹ thuật': 'specs',
    'điểm nổi bật': 'highlights',
    'bảo hành chính hãng': 'warranty',
    'tài liệu tải về': 'documents',
    'ứng dụng phù hợp': 'applications',
    'thông tin đầu trang': 'header',
}


def norm_heading(text):
    t = re.sub(r'^\s*\d+[.)]\s*', '', text).strip()
    return SECTION_ALIASES.get(t.lower())


def read_rels(z):
    try:
        root = ET.fromstring(z.read('word/_rels/document.xml.rels'))
    except KeyError:
        return {}
    return {rel.get('Id'): rel.get('Target') for rel in root.findall(RELNS + 'Relationship')
            if rel.get('Type', '').endswith('/hyperlink')}


def run_text(run):
    return ''.join(t.text or '' for t in run.findall(W + 't'))


def is_bold(run):
    rpr = run.find(W + 'rPr')
    return rpr is not None and rpr.find(W + 'b') is not None


def para_parts(p, rels):
    """(plain text, [(text, url)…], [(bold, text)…]) for a paragraph."""
    text, links, runs = [], [], []
    for node in p.iter():
        if node.tag == W + 'hyperlink':
            url = rels.get(node.get(R + 'id'))
            ltext = ''.join(t.text or '' for t in node.iter(W + 't')).strip()
            if ltext:
                links.append((ltext, url))
        elif node.tag == W + 't':
            text.append(node.text or '')
    for run in p.findall(W + 'r'):
        t = run_text(run)
        if t:
            runs.append((is_bold(run), t))
    return ''.join(text).strip(), links, runs


def read_blocks(path):
    z = zipfile.ZipFile(path)
    rels = read_rels(z)
    body = ET.fromstring(z.read('word/document.xml')).find(W + 'body')
    for el in body:
        if el.tag == W + 'p':
            text, links, runs = para_parts(el, rels)
            if text:
                yield ('p', text, links, runs)
        elif el.tag == W + 'tbl':
            for tr in el.findall(W + 'tr'):
                cells = [' '.join(para_parts(p, rels)[0] for p in tc.findall(W + 'p')).strip()
                         for tc in tr.findall(W + 'tc')]
                if any(cells):
                    yield ('row', cells, [], [])


NOISE_PREFIXES = (
    'cta:', 'mình đề xuất', 'mình khuyên', 'phần này mình', 'đối với trang sản phẩm riêng',
    'nếu đưa lên website', 'lưu ý về tải cơ học', 'với website', 'theo revision',
)


def is_noise(text):
    low = text.lower()
    if any(low.startswith(n) for n in NOISE_PREFIXES):
        return True
    return 'viethungsolar' in low and ('nên ghi' in low or 'khuyên' in low or 'đề xuất' in low)


def split_highlight_runs(runs, fallback_text):
    """Title = leading bold run(s); description = the rest."""
    if runs and runs[0][0]:
        title, rest, in_title = [], [], True
        for bold, text in runs:
            if in_title and bold:
                title.append(text)
            else:
                in_title = False
                rest.append(text)
        t = re.sub(r'\s+', ' ', ''.join(title)).strip(' :–—-')
        d = re.sub(r'\s+', ' ', ''.join(rest)).strip(' :–—-')
        if t:
            return t, d
    return split_highlight(fallback_text)


def split_highlight(text):
    """Fallback for paragraphs with no bold prefix."""
    t = re.sub(r'^\s*\d+\s*[—–-]\s*', '', text).strip()
    for sep in (' — ', ' – ', ' - '):
        if sep in t:
            head, tail = t.split(sep, 1)
            if 3 <= len(head.strip()) <= 70 and tail.strip():
                return head.strip(), tail.strip()
    return t, ''


def parse(path):
    doc = {
        'file': path, 'brandRaw': '', 'title': '', 'description': '',
        'quickSpecs': [], 'specs': [], 'highlights': [], 'warranty': [],
        'documents': [], 'applications': [], 'notes': [],
    }
    section = 'header'
    head_lines = []
    for kind, payload, links, runs in read_blocks(path):
        if kind == 'p':
            new = norm_heading(payload)
            if new:
                section = new
                continue
            # Tiêu đề phụ viết hoa toàn bộ (KÍCH THƯỚC SẢN PHẨM, TÀI LIỆU THAM KHẢO…)
            if payload.isupper() and len(payload) < 60 and section != 'header':
                section = 'notes'
                continue
            if section == 'header':
                head_lines.append(payload)
            elif section == 'description':
                if not is_noise(payload):
                    doc['description'] = (doc['description'] + ' ' + payload).strip()
            elif section == 'highlights':
                if is_noise(payload):
                    doc['notes'].append(payload)
                    continue
                title, desc = split_highlight_runs(runs, payload)
                if title:
                    doc['highlights'].append({'title': title, 'description': desc})
            elif section == 'warranty':
                doc['warranty'].append(payload)
            elif section == 'documents':
                for ltext, url in links:
                    doc['documents'].append({'label': ltext, 'url': url})
                if not links:
                    doc['documents'].append({'label': payload, 'url': ''})
            elif section == 'applications':
                if is_noise(payload) or len(payload) > 200:
                    doc['notes'].append(payload)
                else:
                    doc['applications'].append(payload)
            else:
                doc['notes'].append(payload)
        else:
            cells = [c for c in payload if c != '']
            if len(cells) < 2:
                continue
            label, value = cells[0], cells[1]
            if label.lower() in ('nội dung', 'hạng mục', 'thông số hiển thị', 'thông tin'):
                continue
            if section == 'quickSpecs':
                doc['quickSpecs'].append({'label': label, 'value': value})
            elif section in ('specs', 'header'):
                doc['specs'].append({'label': label, 'value': value})

    head_lines = [h for h in head_lines if not re.match(r'^\s*\d+[.)]\s*$', h)]
    if head_lines:
        doc['brandRaw'] = head_lines[0]
    if len(head_lines) > 1:
        doc['title'] = head_lines[1]
    return doc


def main():
    out = []
    for dirpath, _dirnames, filenames in os.walk(ROOT):
        for name in sorted(filenames):
            if name.endswith('.docx') and not name.startswith('~$'):
                out.append(parse(os.path.join(dirpath, name)))
    print(json.dumps(out, ensure_ascii=False, indent=1))


if __name__ == '__main__':
    main()
