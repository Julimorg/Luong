# scripts — sinh dữ liệu sản phẩm từ hồ sơ kỹ thuật

Toàn bộ dữ liệu trong `src/data/productData.ts`, `src/data/productDetailData.ts`
và ảnh trong `public/products/` được sinh tự động từ các file `.docx` + ảnh
trong `documents/product-new-docu/`. Khi thêm/sửa hồ sơ kỹ thuật, chạy lại
3 lệnh dưới đây (từ thư mục gốc dự án):

```bash
python3 scripts/generate.py       # đọc .docx, copy ảnh vào public/products/, tạo scripts/.build/*.json
node   scripts/optimize-images.mjs  # cắt viền, thu nhỏ và nén ảnh sang .webp
python3 scripts/emit.py           # ghi ra src/data/productData.ts và src/data/productDetailData.ts
```

Yêu cầu: `python3` (không cần thư viện ngoài) và `playwright` (đã cài sẵn ở
project hoặc global) cho bước nén ảnh.

## Quy ước đọc tài liệu

Mỗi file `.docx` được đọc theo các mục:

| Mục trong file Word                  | Dùng vào đâu                                     |
| ------------------------------------ | ------------------------------------------------ |
| Dòng 1 / dòng 2 đầu trang            | Thương hiệu và tên sản phẩm                       |
| `Mô tả tổng quan`                    | `description`                                     |
| `6 Ô THÔNG SỐ NỔI BẬT`               | `quickSpecs` + 2 dòng thông số trên thẻ sản phẩm   |
| `THÔNG SỐ KỸ THUẬT`                  | `fullSpecs`                                       |
| `ĐIỂM NỔI BẬT`                       | `highlights` (phần in đậm = tiêu đề)              |
| `BẢO HÀNH CHÍNH HÃNG`                | `warranty` (chỉ lấy câu bắt đầu bằng "Bảo hành")   |
| `TÀI LIỆU TẢI VỀ` / `TÀI LIỆU THAM KHẢO` | `documents` (lấy cả link thật trong file Word) |
| `ỨNG DỤNG PHÙ HỢP`                   | `applications`                                    |

Nếu hồ sơ thiếu dòng thương hiệu ở đầu trang thì thương hiệu được lấy từ
dòng "Thương hiệu" trong bảng thông số, rồi tới tên thư mục hãng.

Ảnh sản phẩm lấy theo file ảnh cùng tên với file `.docx` trong cùng thư mục;
nếu không có thì dùng ảnh chung của thư mục (nhiều model dùng chung một ảnh
thì chỉ copy một lần, không nhân bản trong `public/`).

## Phân loại danh mục

Danh mục và nhóm thiết bị được suy ra từ **đường dẫn thư mục** của hồ sơ:

| Thư mục                                            | Danh mục      | Nhóm              |
| -------------------------------------------------- | ------------- | ----------------- |
| `TẤM PIN NĂNG LƯỢNG/…`                              | `tam-pin`     | Tấm pin           |
| `HÒA LƯỚI, HYBRID ÁP THẤP/INVERTER/…`               | `inverter`    | Hybrid áp thấp    |
| `HOÀ LƯỚI, HYBRID ÁP CAO/INVERTER/HYBRID …/`        | `inverter`    | Hybrid áp cao     |
| `HOÀ LƯỚI, HYBRID ÁP CAO/INVERTER/HÒA LƯỚI …/`      | `inverter`    | Hòa lưới          |
| `…/BATTERY ÁP THẤP/…`                               | `pin-luu-tru` | Pin áp thấp (LV)  |
| `…/BATTERY ÁP CAO/…`                                | `pin-luu-tru` | Pin áp cao (HV)   |

Hai ngoại lệ được tách riêng cho đúng bản chất thiết bị: bộ chuyển mạch tĩnh
(STS) → nhóm "Bộ chuyển mạch"; BMS / PCU / HBOX / RACK → nhóm "Phụ kiện hệ pin".
Xem hàm `classify()` trong `generate.py` nếu cần chỉnh.

## Lưu ý về `comboData.ts`

`id` sản phẩm được đánh lại mỗi lần chạy `generate.py`, nên `productId` trong
`src/data/comboData.ts` có thể trỏ nhầm sau khi thêm/bớt hồ sơ. `emit.py` sẽ
in cảnh báo ở cuối nếu phát hiện lệch — sửa lại `productId` theo cảnh báo đó.

## Combo trên trang Sản phẩm

Nội dung combo nằm trong `src/data/comboData.ts`, chép tay từ hồ sơ
`documents/product-new-docu/combo-section/COMBO ĐẦU TRANG/`:

- `nội dung cho từng combo/*.docx` → chữ (thông số, lợi ích, danh sách thiết bị)
- `ảnh combo/1..4.webp` → 4 ảnh poster, đã nén và đặt trong `public/combo/`

Khi có poster mới, chép vào `public/combo/` rồi nén lại bằng:

```bash
node scripts/optimize-images.mjs public/combo --no-trim --max=1400 --quality=0.84
```

`--no-trim` để giữ nguyên bố cục poster (không cắt viền như ảnh sản phẩm).

## Dự án (trang /du-an)

`src/data/projectData.ts` (mảng `projects`) và `src/data/projectDetailData.ts`
được sinh từ hồ sơ trong `documents/duAn-documents/`:

```bash
python3 scripts/duan.py   # đọc .docx, chép + nén ảnh, ghi 2 file data
```

Script tự gọi `optimize-images.mjs` nên chỉ cần chạy một lệnh.

### Cấu trúc thư mục hồ sơ

```
documents/duAn-documents/
  Dự án nói lên năng lực triển khai/        -> dự án trọng điểm (featured)
    <Tên dự án> (<Danh mục>).docx
    Ảnh/<Tên dự án>/{ảnh tổng, ảnh phụ…}.png
  Toàn bộ dự án đã triển khai/
    Đã hoàn thành/<Tên dự án> (<Danh mục>)/  -> 1 file .docx + ảnh cùng thư mục
    Đang triển khai/<Tên dự án> (<Danh mục>)/
```

- Danh mục lấy từ cụm trong ngoặc cuối tên thư mục: `Hộ gia đình`,
  `Doanh nghiệp`, `Nhà máy`, `Nhà xưởng`.
- Ảnh tên chứa chữ "tổng" là ảnh chính, các ảnh còn lại vào gallery.
- Trạng thái suy từ dòng "Ngày hoàn thành": ghi "Dự kiến…" hoặc để trống thì
  dự án được xếp là **Đang thi công**.

### Các mục trong file Word

| Mục                            | Dùng vào đâu                                  |
| ------------------------------ | --------------------------------------------- |
| Dòng `DỰ ÁN ĐIỆN MẶT TRỜI …`   | Tên dự án                                      |
| `THANH THÔNG TIN NHANH PHÍA TRÊN` | Danh sách thiết bị, số tấm pin, số inverter |
| `TỔNG QUAN DỰ ÁN`              | `overview`                                     |
| `BẢNG THÔNG TIN DỰ ÁN`         | Địa điểm, công suất, lưu trữ, ngày, khách hàng |
| `NỘI DUNG (HIỂN THỊ) TRÊN ẢNH LỚN` | 2 dòng chữ đè lên ảnh lớn + tóm tắt trên thẻ |

Script **chỉ lấy những gì hồ sơ ghi** — không suy đoán sản lượng năm, chi phí
tiết kiệm hay lượng CO₂. Mục nào hồ sơ không có thì trang chi tiết tự ẩn.
