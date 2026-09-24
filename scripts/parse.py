"""Parse the .docx spec sheets under documents/product-new-docu into JSON."""
import json
import os
import re
import zipfile
from xml.etree import ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'
RELNS = '{http://schemas.openxmlformats.org/package/2006/relationships}'

ROOT = 'documents/product-new-docu'

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
    'tài liệu tham khảo': 'documents',
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


def group_runs(runs):
    """Gom các run liên tiếp cùng kiểu đậm/thường thành từng khối."""
    groups = []
    for bold, text in runs:
        if groups and groups[-1][0] == bold:
            groups[-1][1] += text
        else:
            groups.append([bold, text])
    return groups


def split_highlight_runs(runs, fallback_text):
    """Trả về [(tiêu đề, mô tả)…] cho một đoạn văn.

    Một số hồ sơ gộp cả 6 điểm nổi bật vào chung một đoạn, mỗi điểm là một
    run in đậm kết thúc bằng dấu ":" rồi tới phần mô tả không in đậm. Khi
    nhận ra đúng khuôn đó thì tách thành nhiều điểm; còn lại giữ nguyên
    cách cũ (khối in đậm đầu tiên là tiêu đề, phần sau là mô tả).
    """
    groups = group_runs(runs)
    bolds = [g for g in groups if g[0]]
    if (len(bolds) > 1 and groups and groups[0][0]
            and all(g[1].strip().endswith(':') for g in bolds)):
        out, i = [], 0
        while i < len(groups):
            if not groups[i][0]:
                i += 1
                continue
            t = re.sub(r'\s+', ' ', groups[i][1]).strip(' :–—-')
            d = ''
            if i + 1 < len(groups) and not groups[i + 1][0]:
                d = re.sub(r'\s+', ' ', groups[i + 1][1]).strip(' :–—-')
                i += 1
            if t:
                out.append((t, d))
            i += 1
        if out:
            return out

    if groups and groups[0][0]:
        t = re.sub(r'\s+', ' ', groups[0][1]).strip(' :–—-')
        d = re.sub(r'\s+', ' ', ''.join(g[1] for g in groups[1:])).strip(' :–—-')
        # Cả đoạn đều in đậm -> chưa tách được mô tả, thử tách bằng dấu gạch.
        if t and not d:
            return [split_highlight(t)]
        if t:
            return [(t, d)]
    return [split_highlight(fallback_text)]


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
                for title, desc in split_highlight_runs(runs, payload):
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
    if len(head_lines) > 1:
        doc['brandRaw'], doc['title'] = head_lines[0], head_lines[1]
    elif head_lines:
        # Thiếu dòng thương hiệu ở đầu trang -> lấy thương hiệu từ bảng thông số.
        doc['title'] = head_lines[0]
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
