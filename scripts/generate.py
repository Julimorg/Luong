"""Turn the parsed .docx data into src/data/productData.ts + productDetailData.ts."""
import json
import os
import re
import shutil
import sys
import unicodedata

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from parse import parse, ROOT  # noqa: E402

OUT_IMG_DIR = 'public/products'

# Chuẩn hoá tên thương hiệu: khoá viết thường (hồ sơ ghi hoa/thường lẫn lộn,
# và có file gõ thiếu chữ - ví dụ "NVT" thay vì "INVT").
BRAND_NAMES = {
    'goodwe': 'GoodWe',
    'solax power': 'SolaX',
    'solax': 'SolaX',
    'sungrow': 'Sungrow',
    'invt': 'INVT',
    'nvt': 'INVT',
    'lithium valley': 'Lithium Valley',
    'lithium': 'Lithium Valley',
    'tcl solar': 'TCL Solar',
    'tcl': 'TCL Solar',
    'ja solar': 'JA Solar',
    'longi': 'LONGi',
}


def brand_name(*candidates):
    for c in candidates:
        hit = BRAND_NAMES.get((c or '').strip().lower())
        if hit:
            return hit
    return ''
BRAND_COLORS = {
    'GoodWe': '#e8001c',
    'SolaX': '#ef6c1a',
    'Sungrow': '#f6b918',
    'INVT': '#005bac',
    'Lithium Valley': '#2a9d8f',
    'TCL Solar': '#cc0000',
    'JA Solar': '#003087',
    'LONGi': '#d93c1c',
}
BRAND_INFO = {
    'LONGi': 'LONGi là nhà sản xuất tấm pin năng lượng mặt trời hàng đầu thế giới, đi đầu công nghệ HPBC và Hi-MO cho hiệu suất, độ bền vượt trội.',
    'JA Solar': 'JA Solar là thương hiệu tấm pin uy tín toàn cầu, nổi bật với công nghệ N-Type TOPCon n-Bycium+ cho hiệu suất chuyển đổi cao.',
    'TCL Solar': 'TCL Solar mang công nghệ N-Type TOPCon 210R và cấu trúc hai mặt kính, tối ưu hiệu suất cho cả công trình dân dụng và dự án C&I.',
    'GoodWe': 'GoodWe cung cấp hệ sinh thái inverter Hybrid và pin lưu trữ đồng bộ, từ dân dụng ES Uniq đến các hệ C&I công suất lớn.',
    'Sungrow': 'Sungrow là thương hiệu inverter hàng đầu thế giới về sản lượng xuất xưởng, dải sản phẩm trải dài từ hòa lưới đến hybrid lưu trữ.',
    'INVT': 'INVT cung cấp inverter hòa lưới và hybrid 1 pha – 3 pha với dải công suất rộng, phù hợp từ hộ gia đình đến nhà máy quy mô lớn.',
    'SolaX': 'SolaX Power chuyên về inverter hybrid và hệ lưu trữ năng lượng, từ dòng X1 dân dụng đến X3-AELIO cho thương mại – công nghiệp.',
    'Lithium Valley': 'Lithium Valley cung cấp pin lưu trữ LFP dạng module, linh hoạt mở rộng dung lượng theo nhu cầu của từng hệ thống.',
}

# Nhóm thiết bị trong mỗi danh mục (hiển thị thành bộ lọc phụ trên trang Sản phẩm).
G_PANEL = 'Tấm pin'
G_HYBRID_LV = 'Hybrid áp thấp'
G_HYBRID_HV = 'Hybrid áp cao'
G_ONGRID = 'Hòa lưới'
G_SWITCH = 'Bộ chuyển mạch'
G_BAT_LV = 'Pin áp thấp (LV)'
G_BAT_HV = 'Pin áp cao (HV)'
G_BAT_ACC = 'Phụ kiện hệ pin'


def slugify(text):
    text = text.replace('Đ', 'D').replace('đ', 'd')
    text = unicodedata.normalize('NFD', text)
    text = ''.join(c for c in text if unicodedata.category(c) != 'Mn')
    text = re.sub(r'[^A-Za-z0-9]+', '-', text).strip('-').lower()
    return text


def spec_of(doc, *keys):
    for s in doc['specs']:
        label = s['label'].strip().lower()
        for k in keys:
            if label == k or label.startswith(k):
                return s['value'].strip()
    return ''


def strip_accents(text):
    text = text.replace('Đ', 'D').replace('đ', 'd')
    return ''.join(c for c in unicodedata.normalize('NFD', text)
                   if unicodedata.category(c) != 'Mn').lower()


def classify(doc):
    """Phân loại theo đúng cây thư mục hồ sơ, kèm vài ngoại lệ về phụ kiện.

    documents/product-new-docu/
      TẤM PIN NĂNG LƯỢNG/<hãng>/                      -> tấm pin
      HÒA LƯỚI, HYBRID ÁP THẤP/INVERTER/<hãng>/       -> inverter hybrid áp thấp
      HÒA LƯỚI, HYBRID ÁP THẤP/BATTERY ÁP THẤP/…      -> pin áp thấp
      HOÀ LƯỚI, HYBRID ÁP CAO/INVERTER/HYBRID …/      -> inverter hybrid áp cao
      HOÀ LƯỚI, HYBRID ÁP CAO/INVERTER/HÒA LƯỚI …/    -> inverter hòa lưới
      HOÀ LƯỚI, HYBRID ÁP CAO/BATTERY ÁP CAO/…        -> pin áp cao
    """
    parts = [strip_accents(p) for p in
             os.path.relpath(doc['file'], ROOT).split(os.sep)]
    seg = parts[0] if parts else ''
    sub = parts[1] if len(parts) > 1 else ''
    kind = parts[2] if len(parts) > 2 else ''
    high_voltage = 'ap cao' in seg

    text = strip_accents(' '.join([
        doc['title'],
        spec_of(doc, 'loại sản phẩm', 'loại thiết bị', 'loại inverter', 'loại pin'),
        os.path.basename(doc['file']),
    ]))

    # Bộ chuyển mạch tĩnh (STS) nằm chung thư mục inverter hybrid nhưng là
    # thiết bị riêng, tách ra để khách không nhầm với inverter.
    if 'bo chuyen mach' in text or 'transfer switch' in text or re.search(r'\bsts\b', text):
        return 'inverter', G_SWITCH

    if 'tam pin' in seg:
        return 'tam-pin', G_PANEL

    if sub.startswith('battery'):
        # BMS, hộp điều khiển, khung rack… là phụ kiện của hệ pin.
        if re.search(r'bms|pcu|hbox|rack|khung do|bo quan ly', text):
            return 'pin-luu-tru', G_BAT_ACC
        return 'pin-luu-tru', G_BAT_HV if high_voltage else G_BAT_LV

    if 'hoa luoi' in kind:
        return 'inverter', G_ONGRID
    if 'hybrid' in kind or 'hybrid' in text:
        return 'inverter', G_HYBRID_HV if high_voltage else G_HYBRID_LV
    return 'inverter', G_ONGRID


def clean_url(url):
    if not url:
        return '#'
    return re.sub(r'[?&]utm_source=chatgpt\.com', '', url)


ADVICE_MARKERS = ('khuyên ghi', 'đề xuất ghi', 'nên ghi', 'chính xác nhất', 'câu an toàn', 'website ghi')


def build_warranty(doc):
    lines = [l.strip() for l in doc['warranty']]
    cands = []
    marker_at = -1
    for i, l in enumerate(lines):
        bare = l.strip('“”" ')
        if bare.lower().startswith('bảo hành'):
            cands.append((i, bare.rstrip('.')))
        elif l.endswith(':') and any(m in l.lower() for m in ADVICE_MARKERS):
            marker_at = i
    after = [c for i, c in cands if i > marker_at] if marker_at >= 0 else []
    picked = after or [c for _i, c in cands]
    if picked:
        seen, uniq = set(), []
        for p in picked:
            if p.lower() not in seen:
                seen.add(p.lower())
                uniq.append(p)
        return '. '.join(uniq) + '.'

    product_w = spec_of(doc, 'bảo hành sản phẩm')
    power_w = spec_of(doc, 'bảo hành công suất', 'bảo hành hiệu suất')
    parts = []
    if product_w:
        parts.append(f'Bảo hành sản phẩm {product_w}')
    if power_w:
        parts.append(f'Bảo hành công suất {power_w}')
    if parts:
        return '. '.join(parts) + '.'
    std = spec_of(doc, 'bảo hành tiêu chuẩn', 'bảo hành')
    if std:
        return f'Bảo hành chính hãng {std}.'
    return 'Bảo hành chính hãng theo chính sách của hãng và nhà phân phối tại thời điểm bán.'


def build_applications(doc):
    for line in doc['applications']:
        if '·' in line:
            items = [a.strip(' ·') for a in line.split('·')]
            return [a for a in items if 2 < len(a) < 60][:8]
    short = [a.strip() for a in doc['applications'] if 2 < len(a.strip()) < 60]
    return short[:8]


def find_image(doc):
    """Exact sibling image, else a brand-level image in the same folder."""
    folder = os.path.dirname(doc['file'])
    base = os.path.splitext(os.path.basename(doc['file']))[0]
    exts = ('.png', '.jpg', '.jpeg', '.webp')
    files = sorted(os.listdir(folder))
    for f in files:
        stem, ext = os.path.splitext(f)
        if ext.lower() in exts and stem == base:
            return os.path.join(folder, f)
    model = spec_of(doc, 'model')
    for f in files:
        stem, ext = os.path.splitext(f)
        if ext.lower() in exts and model and slugify(stem) == slugify(model):
            return os.path.join(folder, f)
    for f in files:
        stem, ext = os.path.splitext(f)
        if ext.lower() in exts and (slugify(stem) in slugify(base) or slugify(base) in slugify(stem)):
            return os.path.join(folder, f)
    for f in files:                       # ảnh cấp thương hiệu dùng chung trong thư mục
        if os.path.splitext(f)[1].lower() in exts:
            return os.path.join(folder, f)
    return ''


CATEGORY_ORDER = ['tam-pin', 'inverter', 'pin-luu-tru']
GROUP_ORDER = {
    G_PANEL: 0,
    G_HYBRID_LV: 0, G_HYBRID_HV: 1, G_ONGRID: 2, G_SWITCH: 3,
    G_BAT_LV: 0, G_BAT_HV: 1, G_BAT_ACC: 2,
}


def main():
    docs = []
    for dirpath, _d, filenames in os.walk(ROOT):
        for name in sorted(filenames):
            if name.endswith('.docx') and not name.startswith('~$'):
                docs.append(parse(os.path.join(dirpath, name)))

    records = []
    for doc in docs:
        folder_brand = os.path.relpath(doc['file'], ROOT).split(os.sep)
        brand = (brand_name(doc['brandRaw'], spec_of(doc, 'thương hiệu'), *folder_brand)
                 or spec_of(doc, 'thương hiệu'))
        title = doc['title'] or doc['brandRaw']
        model = (spec_of(doc, 'model chính thức', 'model thương mại', 'model')
                 or os.path.splitext(os.path.basename(doc['file']))[0])
        model = re.split(r'\s+/\s+|\s*\(', model)[0].strip()

        name = re.sub(r'\s+', ' ', title).strip()
        for dash in (' – ', ' — ', ' - '):
            if dash in name:
                head, tail = name.split(dash, 1)
                if slugify(tail) == slugify(model) or len(tail) < 26 or len(name) > 52:
                    name = head.strip()
                break

        category, group = classify(doc)
        records.append({'doc': doc, 'brand': brand, 'model': model, 'name': name,
                        'category': category, 'group': group})

    # Hai biến thể cùng công suất (ví dụ X1-HYB-6.0-LV và X1-HYB-6.0-LV-EU) rút
    # gọn ra cùng một tên -> ghép thêm mã model để khách phân biệt được.
    by_name = {}
    for r in records:
        by_name.setdefault((r['brand'], r['name'].lower()), []).append(r)
    for group in by_name.values():
        if len(group) > 1:
            for r in group:
                if slugify(r['model']) not in slugify(r['name']):
                    r['name'] = f"{r['name']} – {r['model']}"

    records.sort(key=lambda r: (CATEGORY_ORDER.index(r['category']),
                                GROUP_ORDER.get(r['group'], 9),
                                r['brand'].lower(),
                                r['name'].lower()))

    if os.path.isdir(OUT_IMG_DIR):
        shutil.rmtree(OUT_IMG_DIR)

    products, details = [], []
    for i, rec in enumerate(records, start=1):
        doc = rec['doc']
        slug = slugify(f"{rec['brand']}-{rec['model']}")
        src = find_image(doc)
        image = ''
        if src:
            stem, ext = os.path.splitext(os.path.basename(src))
            ext = ext.lower()
            # Ảnh riêng của model -> đặt theo slug sản phẩm; ảnh dùng chung cho cả
            # thư mục thương hiệu -> đặt theo tên file gốc để nhiều sản phẩm dùng
            # chung một file, tránh nhân bản ảnh trong public/.
            exact = slugify(stem) in (slugify(os.path.splitext(os.path.basename(doc['file']))[0]),
                                      slugify(rec['model']))
            name = slug if exact else slugify(f"{rec['brand']}-{stem}")
            dest_dir = os.path.join(OUT_IMG_DIR, rec['category'])
            os.makedirs(dest_dir, exist_ok=True)
            dest = os.path.join(dest_dir, name + ext)
            if not os.path.exists(dest):
                shutil.copyfile(src, dest)
            image = '/' + dest.replace(os.sep, '/').replace('public/', '', 1)

        quick = [{'label': s['label'], 'value': s['value']} for s in doc['quickSpecs']]
        card_specs = quick[:2] or [{'label': s['label'], 'value': s['value']} for s in doc['specs'][3:5]]

        products.append({
            'id': i,
            'category': rec['category'],
            'group': rec['group'],
            'image': image,
            'brand': rec['brand'],
            'brandColor': BRAND_COLORS.get(rec['brand'], '#f6b918'),
            'name': rec['name'],
            'model': rec['model'],
            'specs': card_specs,
        })

        highlights = []
        for h in doc['highlights']:
            title_h = h['title'].strip()
            desc_h = h['description'].strip()
            if not title_h or (not desc_h and len(title_h) > 90):
                continue
            highlights.append({'title': title_h, 'description': desc_h} if desc_h else {'title': title_h})
        highlights = highlights[:8]

        documents = []
        seen = set()
        for item in doc['documents']:
            label = re.sub(r'\s+', ' ', item['label']).strip(' :')
            if not label or len(label) > 120:
                continue
            url = clean_url(item.get('url'))
            key = (label.lower(), url)
            if key in seen:
                continue
            seen.add(key)
            documents.append({'label': label, 'fileUrl': url})

        detail = {
            'productId': i,
            'images': [image] if image else [],
            'description': re.sub(r'\s+', ' ', doc['description']).strip(),
            'quickSpecs': quick,
            'highlights': highlights,
            'fullSpecs': [{'label': s['label'], 'value': s['value']} for s in doc['specs']],
            'documents': documents[:6],
            'warranty': build_warranty(doc),
            'origin': spec_of(doc, 'xuất xứ sản xuất', 'xuất xứ', 'nơi sản xuất') or 'Đang cập nhật',
            'applications': build_applications(doc),
        }
        series = spec_of(doc, 'dòng sản phẩm')
        tags = [t for t in [series, rec['group'] if rec['group'] != G_PANEL else '',
                            spec_of(doc, 'công nghệ cell')] if t]
        if tags:
            detail['tags'] = tags[:3]
        details.append(detail)

    out_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), '.build')
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, 'generated.json'), 'w', encoding='utf-8') as f:
        json.dump({'products': products, 'details': details}, f, ensure_ascii=False, indent=1)

    brands_used = []
    for p in products:
        if p['brand'] not in brands_used:
            brands_used.append(p['brand'])
    info = {b: {'description': BRAND_INFO.get(b, '')} for b in brands_used}
    with open(os.path.join(out_dir, 'brandinfo.json'), 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=1)

    print('products:', len(products))
    for cat in CATEGORY_ORDER:
        subset = [p for p in products if p['category'] == cat]
        groups = {}
        for p in subset:
            groups[p['group']] = groups.get(p['group'], 0) + 1
        print(' ', cat, len(subset), groups)
    print('no image:', [p['model'] for p in products if not p['image']])
    print('brands:', brands_used)


if __name__ == '__main__':
    main()
