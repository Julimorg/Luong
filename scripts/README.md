# scripts — sinh dữ liệu sản phẩm từ hồ sơ kỹ thuật

Toàn bộ dữ liệu trong `src/data/productData.ts` và `src/data/productDetailData.ts`
được sinh tự động từ các file `.docx` trong `documents/product-data-documents/`.
Khi thêm/sửa hồ sơ kỹ thuật, chạy lại 2 lệnh dưới đây (từ thư mục gốc dự án):

```bash
python3 scripts/generate.py   # đọc .docx, copy ảnh vào public/products/, tạo scripts/.build/*.json
python3 scripts/emit.py       # ghi ra src/data/productData.ts và src/data/productDetailData.ts
```

Yêu cầu: chỉ cần `python3` (không dùng thư viện ngoài).

## Quy ước đọc tài liệu

Mỗi file `.docx` được đọc theo các mục:

| Mục trong file Word        | Dùng vào đâu                                  |
| -------------------------- | --------------------------------------------- |
| Dòng 1 / dòng 2 đầu trang  | Thương hiệu và tên sản phẩm                    |
| `Mô tả tổng quan`          | `description`                                  |
| `6 Ô THÔNG SỐ NỔI BẬT`     | `quickSpecs` + 2 dòng thông số trên thẻ sản phẩm |
| `THÔNG SỐ KỸ THUẬT`        | `fullSpecs`                                    |
| `ĐIỂM NỔI BẬT`             | `highlights` (phần in đậm = tiêu đề)           |
| `BẢO HÀNH CHÍNH HÃNG`      | `warranty` (chỉ lấy câu bắt đầu bằng "Bảo hành") |
| `TÀI LIỆU TẢI VỀ`          | `documents` (lấy cả link thật trong file Word) |
| `ỨNG DỤNG PHÙ HỢP`         | `applications`                                 |

Ảnh sản phẩm lấy theo file ảnh cùng tên với file `.docx` trong cùng thư mục;
nếu không có thì dùng ảnh chung của thư mục thương hiệu.

Phân loại danh mục (`tam-pin` / `inverter` / `pin-luu-tru`) và nhóm thiết bị
(`Hybrid áp thấp`, `Hòa lưới`, `Pin áp cao (HV)`…) được suy ra từ trường
"Loại sản phẩm / Loại inverter / Loại pin" trong bảng thông số — xem hàm
`classify()` trong `generate.py` nếu cần chỉnh.
