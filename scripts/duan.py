"""Sinh dữ liệu trang Dự án từ hồ sơ trong documents/duAn-documents.

    python3 scripts/duan.py
    node   scripts/optimize-images.mjs public/du-an --no-trim --max=1600 --quality=0.82

Đọc mỗi thư mục dự án (1 file .docx + các ảnh), ghi ra:
  - src/data/projectData.ts        (mảng `projects`)
  - src/data/projectDetailData.ts  (toàn bộ file)
  - public/du-an/<slug>/           (ảnh dự án, đặt tên theo vai trò)

Quy ước thư mục hồ sơ:
  Dự án nói lên năng lực triển khai/      -> dự án trọng điểm (featured)
  Toàn bộ dự án đã triển khai/Đã hoàn thành|Đang triển khai/
  Tên thư mục kết thúc bằng "(Hộ gia đình)", "(Doanh nghiệp)", "(Nhà máy)"…
  Ảnh "ảnh tổng"/"ảnh lớn tổng" là ảnh chính, "ảnh phụ*" vào gallery.
"""
import os
import re
import shutil
import sys
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse import read_blocks  # noqa: E402

ROOT = 'documents/duAn-documents'
IMG_DIR = 'public/du-an'
FEATURED_DIR = 'Dự án nói lên năng lực triển khai'

CATEGORY_BY_LABEL = {
    'hộ gia đình': 'ho-gia-dinh',
    'doanh nghiệp': 'doanh-nghiep',
    'nhà máy': 'nha-may',
    'nhà xưởng': 'nha-may',
    'công nghiệp': 'cong-nghiep',
}

INFO_KEYS = [
    'Loại hình dự án', 'Công trình', 'Địa điểm', 'Công suất hệ thống',
    'Dung lượng lưu trữ', 'Ngày hoàn thành', 'Khách hàng',
]

# Dòng tiêu đề trong file Word, dùng để cắt hồ sơ thành từng mục.
SECTIONS = {
    'thanh thông tin nhanh phía trên': 'equipment',
    'tổng quan dự án': 'overview',
    'bảng thông tin dự án': 'info',
    'nội dung trên ảnh lớn': 'highlight',
    'nội dung hiển thị trên ảnh lớn': 'highlight',
}

# Dòng rác trong hồ sơ: đánh số thẻ, nhãn nhắc việc của người soạn.
NOISE = ('thẻ', 'tên dự án')
# Có hồ sơ để "Thiết bị sử dụng" thành một dòng tiêu đề riêng, có hồ sơ viết
# liền vào đầu đoạn liệt kê. Cắt bỏ nhãn này rồi giữ lại phần còn lại.
EQUIP_LABEL = re.compile(r'^(thiết|tiết)\s+bị\s+sử\s+dụng\s*:?\s*', re.I)


def slugify(text):
    text = text.replace('Đ', 'D').replace('đ', 'd')
    text = ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn')
    return re.sub(r'[^A-Za-z0-9]+', '-', text).strip('-').lower()


def q(s):
    return '"' + str(s).replace('\\', '\\\\').replace('"', '\\"') + '"'


def parse_doc(path):
    """Cắt hồ sơ .docx thành các mục theo tiêu đề in hoa."""
    doc = {'title': '', 'equipment': [], 'overview': [], 'info': {}, 'highlight': []}
    section = None
    for kind, text, _links, _runs in read_blocks(path):
        if kind != 'p':
            continue
        low = text.strip().lower().rstrip(':')
        if low in SECTIONS:
            section = SECTIONS[low]
            continue
        if low.startswith(NOISE) or re.fullmatch(r'\d+', low):
            continue
        stripped = EQUIP_LABEL.sub('', text).strip()
        if stripped != text.strip():
            if stripped:
                doc['equipment'].append(re.sub(r'\s+', ' ', stripped))
            continue
        # Tên dự án nằm ở đầu hồ sơ, trước mọi tiêu đề mục. Phải chặn theo
        # `section is None` vì đoạn Tổng quan cũng mở đầu bằng "Dự án điện
        # mặt trời…" và sẽ ghi đè mất tên nếu chỉ so khớp chuỗi đầu dòng.
        if section is None and not doc['title'] and text.upper().startswith('DỰ ÁN ĐIỆN MẶT TRỜI'):
            doc['title'] = re.sub(r'\s+', ' ', text).strip()
            continue
        if section == 'info':
            for k in INFO_KEYS:
                if text.startswith(k):
                    doc['info'][k] = text[len(k):].strip(' :–-')
                    break
        elif section:
            doc[section].append(re.sub(r'\s+', ' ', text).strip())
    return doc


def split_equipment(lines):
    """Hồ sơ có file tách sẵn từng dòng, có file gộp cả cụm vào một đoạn."""
    out = []
    for line in lines:
        # Tách trước mỗi cụm "NN inverter…", "NN tấm pin…", "Khoảng NN…"
        parts = re.split(
            r'(?<![\d.,])(?<!Khoảng )'
            r'(?=(?:Khoảng\s+)?\d[\d.,]*\s+(?:inverter|tấm pin|pin lưu trữ))',
            line)
        for p in parts:
            p = re.sub(r'\s+', ' ', p).strip(' ·')
            # "518 tấm pin tấm pin Qcells 425Wp" -> bỏ cụm lặp trong hồ sơ gốc
            p = re.sub(r'(tấm pin)\s+\1', r'\1', p, flags=re.I)
            if len(p) > 4:
                out.append(p)
    return out


def clean_capacity(text):
    """"Dự kiến khoảng 1,5 MWp" -> "1,5 MWp"; trạng thái dự án đã nói rõ là
    đang thi công nên không cần lặp lại chữ "dự kiến" trên thẻ."""
    return re.sub(r'^((dự kiến|khoảng)\s*:?\s*)+', '', text.strip(), flags=re.I).strip()


def num(text):
    """Lấy con số đầu tiên, giữ nguyên cách viết của hồ sơ: "1,5", "2.200"."""
    m = re.search(r'\d[\d.,]*', text)
    return m.group(0).rstrip('.,') if m else ''


def to_kwp(capacity):
    m = re.search(r'([\d.,]+)\s*(kWp|MWp)', capacity, re.I)
    if not m:
        return 0
    v = float(m.group(1).replace('.', '').replace(',', '.')) if ',' in m.group(1) \
        else float(m.group(1))
    return v * 1000 if m.group(2).lower() == 'mwp' else v


def find_images(dirpath, filenames, docx_name):
    """Ảnh thường nằm cùng thư mục hồ sơ; riêng nhóm dự án trọng điểm để
    chung một thư mục "Ảnh/<tên dự án>/" cho cả nhóm."""
    imgs = sorted(n for n in filenames if n.lower().endswith('.png'))
    if imgs:
        return dirpath, imgs
    stem = slugify(re.sub(r'\([^)]*\)', '', docx_name[:-5]))
    album = os.path.join(dirpath, 'Ảnh')
    if os.path.isdir(album):
        for sub in sorted(os.listdir(album)):
            if slugify(sub) == stem:
                d = os.path.join(album, sub)
                return d, sorted(n for n in os.listdir(d) if n.lower().endswith('.png'))
    return dirpath, []


def collect():
    projects = []
    for dirpath, _d, filenames in os.walk(ROOT):
        for docx_name in sorted(n for n in filenames
                                if n.endswith('.docx') and not n.startswith('~$')):
            projects.append(read_project(dirpath, filenames, docx_name))
    projects.sort(key=lambda p: (not p['featured'], p['status'] == 'Đang thi công',
                                 -to_kwp(p['capacity'])))
    return projects


def read_project(dirpath, filenames, docx_name):
        rel = os.path.relpath(dirpath, ROOT)
        doc = parse_doc(os.path.join(dirpath, docx_name))
        folder = os.path.basename(dirpath)
        featured = rel.split(os.sep)[0] == FEATURED_DIR
        docx = [docx_name]

        # Danh mục lấy từ "(…)" cuối tên thư mục; hồ sơ trọng điểm ghi ngay ở tên file.
        label = re.search(r'\(([^)]+)\)\s*$', folder if not featured else docx[0][:-5])
        category = CATEGORY_BY_LABEL.get((label.group(1).strip().lower() if label else ''), 'doanh-nghiep')

        info = doc['info']
        timeline = info.get('Ngày hoàn thành', '').strip()
        # "Dự kiến: ....." nghĩa là chưa chốt ngày -> dự án đang thi công.
        planned = timeline.lower().startswith('dự kiến') or not timeline.strip('. ')
        status = 'Đang thi công' if planned else 'Hoàn thành'
        if planned:
            timeline = 'Đang triển khai'
        elif not timeline.lower().startswith('tháng'):
            timeline = timeline

        client = info.get('Khách hàng', '').strip(' …').strip()
        equip = split_equipment(doc['equipment'])
        panels_line = next((e for e in equip if 'tấm pin' in e.lower()), '')
        m = re.search(r'([\d.,]+)\s*tấm pin', panels_line, re.I)
        panels = f'{m.group(1)} tấm pin' if m else ''
        inverters = next((e for e in equip if 'inverter' in e.lower()), '')

        # Ảnh: "ảnh tổng"/"ảnh lớn tổng" là ảnh chính, còn lại vào gallery.
        img_dir, imgs = find_images(dirpath, filenames, docx_name)
        main = next((n for n in imgs if 'tổng' in n.lower()), imgs[0] if imgs else None)
        gallery = [n for n in imgs if n != main]

        projects_entry = {
            'featured': featured,
            'category': category,
            'title': doc['title'],
            'building': info.get('Công trình', ''),
            'kind': info.get('Loại hình dự án', ''),
            'location': info.get('Địa điểm', 'Đang cập nhật'),
            'capacity': info.get('Công suất hệ thống', ''),
            'storage': info.get('Dung lượng lưu trữ', ''),
            'timeline': timeline,
            'status': status,
            'client': client or 'Đang cập nhật',
            'equipment': equip,
            'panels': panels, 'panelsLine': panels_line,
            'inverters': inverters,
            'overview': doc['overview'],
            'highlight': doc['highlight'],
            'srcDir': img_dir,
            'caseHints': doc['overview'] + [info.get('Khách hàng',''), info.get('Công trình','')],
            'mainImage': main,
            'galleryImages': gallery,
        }
        return projects_entry


KEEP_AS_IS = {'TP.HCM', 'TPHCM', 'HCM', 'TNHH', 'CP', 'TTNT', 'MWp', 'kWp', 'kWh'}


def short_title(title, hints=()):
    """"DỰ ÁN ĐIỆN MẶT TRỜI ÁP MÁI 220 kWp - NHÀ HÀNG SONG PHÁT 2"
    -> "Nhà hàng Song Phát 2".

    Phần tên nằm sau dấu gạch và được hồ sơ viết in hoa toàn bộ. `.title()`
    của Python sẽ phá hỏng "TP.HCM" thành "Tp.Hcm" và "TOIDM" thành "Toidm",
    nên ở đây tra lại cách viết đúng của từng từ trong phần văn xuôi của
    chính hồ sơ (đoạn tổng quan, tên khách hàng) — nơi tên riêng đã được
    viết hoa chuẩn.
    """
    parts = re.split(r'\s+[-–—]\s+', title)
    name = parts[-1].strip() if len(parts) > 1 else title
    if not name.isupper():
        return name

    casing = {}
    for h in hints:
        for w in re.findall(r'[^\s,.;()]+', h or ''):
            casing.setdefault(w.lower(), w)

    words = []
    for i, w in enumerate(name.split()):
        if w in KEEP_AS_IS or casing.get(w.lower(), '').isupper():
            words.append(casing.get(w.lower(), w))
        elif w.lower() in casing:
            words.append(casing[w.lower()])
        else:
            # Không có gợi ý -> viết như một câu tiếng Việt: chỉ hoa chữ đầu.
            words.append(w.capitalize() if i == 0 else w.lower())
    out = ' '.join(words)
    return out[0].upper() + out[1:] if out else out


def optimize_images():
    """Nén ảnh vừa chép sang .webp. Chạy ngay trong script để đường dẫn ghi ra
    file TS luôn khớp với đuôi ảnh thật trên đĩa."""
    import subprocess
    try:
        subprocess.run(
            ['node', 'scripts/optimize-images.mjs', IMG_DIR,
             '--no-trim', '--max=1600', '--quality=0.82'],
            check=True, capture_output=True, text=True)
        print('đã nén ảnh sang .webp')
    except Exception as err:  # noqa: BLE001 - thiếu node/playwright thì giữ .png
        print('bỏ qua bước nén ảnh:', err)


def url_of(path):
    """Trả về đường dẫn web của ảnh, ưu tiên bản .webp nếu đã nén được."""
    webp = os.path.splitext(path)[0] + '.webp'
    real = webp if os.path.exists(webp) else path
    return '/' + real.replace(os.sep, '/').replace('public/', '', 1)


def main():
    projects = collect()
    if os.path.isdir(IMG_DIR):
        shutil.rmtree(IMG_DIR)

    # Hai dự án có thể trùng tên (hai toà văn phòng ở TP.HCM) -> ghép thêm
    # công suất vào tên để khách phân biệt được trên danh sách.
    names = [short_title(p['title'], p['caseHints']) for p in projects]
    dup = {n for n in names if names.count(n) > 1}

    rows, details, pending, used_slugs = [], [], [], set()
    for i, p in enumerate(projects, start=1):
        name = short_title(p['title'], p['caseHints'])
        if name in dup:
            name = f"{name} {clean_capacity(p['capacity'])}"

        slug = slugify(name)
        if slug in used_slugs:          # chốt chặn cuối, không để ảnh đè nhau
            slug = f'{slug}-{i}'
        used_slugs.add(slug)

        dest = os.path.join(IMG_DIR, slug)
        os.makedirs(dest, exist_ok=True)

        def copy(src_name, out_name):
            out = os.path.join(dest, out_name + '.png')
            shutil.copyfile(os.path.join(p['srcDir'], src_name), out)
            return out

        image = copy(p['mainImage'], 'tong') if p['mainImage'] else ''
        gallery = [copy(n, f'phu-{k}') for k, n in enumerate(p['galleryImages'], start=1)]
        pending.append((image, gallery))

        title = f"{name} – {p['location']}" if p['location'] and p['location'] not in name else name
        summary = p['highlight'][1] if len(p['highlight']) > 1 else (
            p['overview'][0] if p['overview'] else '')

        rows.append({
            'id': i, 'category': p['category'], 'image': image, 'title': title,
            'summary': summary, 'capacity': clean_capacity(p['capacity']),
            'capacityKwp': to_kwp(p['capacity']), 'location': p['location'],
            'panelCount': p['panels'], 'timeline': p['timeline'],
            'status': p['status'], 'client': p['client'], 'featured': p['featured'],
        })

        # Chỉ dựng những con số hồ sơ có nêu — không suy đoán sản lượng hay chi phí.
        stats = [{'label': 'Công suất lắp đặt', 'value': num(p['capacity']),
                  'unit': 'MWp' if 'mwp' in p['capacity'].lower() else 'kWp'}]
        if p['panels']:
            stats.append({'label': 'Số tấm pin', 'value': num(p['panels']), 'unit': 'tấm'})
        if p['storage']:
            stats.append({'label': 'Dung lượng lưu trữ', 'value': num(p['storage']), 'unit': 'kWh'})
        if p['inverters']:
            stats.append({'label': 'Số inverter', 'value': num(p['inverters']), 'unit': 'bộ'})

        details.append({
            'id': i, 'title': title,
            'subtitle': p['highlight'][0] if p['highlight'] else p['kind'],
            'heroImage': image, 'overviewImage': gallery[0] if gallery else image,
            'location': p['location'], 'capacity': clean_capacity(p['capacity']), 'status': p['status'],
            'completedAt': p['timeline'], 'client': p['client'], 'stats': stats,
            'overview': ' '.join(p['overview']), 'equipment': p['equipment'],
            'projectKind': p['kind'], 'building': p['building'], 'storage': p['storage'],
            'highlightTitle': p['highlight'][0] if p['highlight'] else '',
            'highlightText': p['highlight'][1] if len(p['highlight']) > 1 else '',
            'gallery': gallery,
        })

    optimize_images()
    for row, det, (image, gallery) in zip(rows, details, pending):
        row['image'] = url_of(image) if image else ''
        det['heroImage'] = row['image']
        det['gallery'] = [url_of(g) for g in gallery]
        det['overviewImage'] = det['gallery'][0] if det['gallery'] else row['image']

    # Ảnh nền hero lấy từ dự án trọng điểm đầu tiên để luôn trỏ vào file có thật.
    if rows:
        set_hero_background(rows[0]['image'])

    write_project_data(rows)
    write_detail_data(details)

    print(f'{len(rows)} dự án:')
    for r in rows:
        flag = ' ★' if r['featured'] else '  '
        print(f"{flag} {r['id']}. {r['title'][:46]:<48}{r['capacity']:<26}"
              f"{r['status']:<14}{r['category']}")


def set_hero_background(url):
    path = 'src/data/projectData.ts'
    s = open(path, encoding='utf-8').read()
    s = re.sub(r'backgroundImage: "[^"]*"', f'backgroundImage: {q(url)}', s, count=1)
    open(path, 'w', encoding='utf-8').write(s)


def write_project_data(rows):
    path = 'src/data/projectData.ts'
    s = open(path, encoding='utf-8').read()
    out = ['', 'export const projects: Project[] = [']
    for r in rows:
        out.append('  {')
        out.append(f"    id: {r['id']},")
        out.append(f"    category: {q(r['category'])},")
        out.append(f"    image: {q(r['image'])},")
        out.append(f"    title: {q(r['title'])},")
        out.append(f"    summary:\n      {q(r['summary'])},")
        out.append(f"    capacity: {q(r['capacity'])},")
        cap = r['capacityKwp']
        out.append(f"    capacityKwp: {int(cap) if cap == int(cap) else cap},")
        out.append(f"    location: {q(r['location'])},")
        out.append(f"    panelCount: {q(r['panelCount'])},")
        out.append(f"    timeline: {q(r['timeline'])},")
        out.append(f"    status: {q(r['status'])},")
        out.append(f"    client: {q(r['client'])},")
        if r['featured']:
            out.append('    featured: true,')
        out.append('  },')
    out.append('];')
    s = re.sub(r'export const projects: Project\[\] = \[.*?\n\];',
               '\n'.join(out), s, count=1, flags=re.S)
    open(path, 'w', encoding='utf-8').write(s)
    print('đã ghi', path)


HEAD = '''// ============================================================
// projectDetailData.ts — Chi tiết từng dự án
// Sinh tự động từ documents/duAn-documents bằng scripts/duan.py.
// Sửa hồ sơ Word rồi chạy lại script, không sửa tay file này.
// ============================================================

export interface ProjectStat {
  label: string;
  value: string;
  unit?: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  subtitle: string;
  heroImage: string;
  /** Ảnh minh hoạ cạnh phần Tổng quan dự án. */
  overviewImage?: string;
  location: string;
  capacity: string;
  status: "Hoàn thành" | "Đang thi công";
  /** Mốc bàn giao, hoặc "Đang triển khai" khi hồ sơ chưa chốt ngày. */
  completedAt?: string;
  client: string;
  /** Các con số hồ sơ có nêu — không có thì bỏ trống, không suy đoán. */
  stats?: ProjectStat[];
  overview: string;
  /** Loại hình dự án theo hồ sơ, VD "Điện mặt trời áp mái thương mại". */
  projectKind?: string;
  /** Tên công trình khi khác tên khách hàng. */
  building?: string;
  storage?: string;
  /** Hai dòng chữ hồ sơ ghi để hiển thị đè lên ảnh lớn. */
  highlightTitle?: string;
  highlightText?: string;
  equipment?: string[];
  gallery?: string[];
}

export const projectDetails: Record<number, ProjectDetail> = {
'''


def write_detail_data(details):
    out = [HEAD]
    for d in details:
        out.append(f"  {d['id']}: {{")
        for k in ('id',):
            out.append(f"    id: {d['id']},")
        for k in ('title', 'subtitle', 'heroImage', 'overviewImage', 'location',
                  'capacity', 'status', 'completedAt', 'client'):
            if d.get(k):
                out.append(f"    {k}: {q(d[k])},")
        if d['stats']:
            out.append('    stats: [')
            for st in d['stats']:
                out.append(f"      {{ label: {q(st['label'])}, value: {q(st['value'])}, "
                           f"unit: {q(st['unit'])} }},")
            out.append('    ],')
        out.append(f"    overview:\n      {q(d['overview'])},")
        for k in ('projectKind', 'building', 'storage', 'highlightTitle', 'highlightText'):
            if d.get(k):
                out.append(f"    {k}: {q(d[k])},")
        if d['equipment']:
            out.append('    equipment: [')
            for e in d['equipment']:
                out.append(f'      {q(e)},')
            out.append('    ],')
        if d['gallery']:
            out.append('    gallery: [')
            for g in d['gallery']:
                out.append(f'      {q(g)},')
            out.append('    ],')
        out.append('  },\n')
    out.append('};\n')
    open('src/data/projectDetailData.ts', 'w', encoding='utf-8').write('\n'.join(out))
    print('đã ghi src/data/projectDetailData.ts')


if __name__ == '__main__':
    main()
