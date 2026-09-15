import AutorenewRoundedIcon from "@mui/icons-material/AutorenewRounded";
import { StatusPage } from "./StatusPage";

// TODO: thay bằng số điện thoại & link Facebook thật của VIETHUNGSOLAR
const PHONE = "0931227668";
const PHONE_DISPLAY = "0931227668";
const FACEBOOK_URL = "https://www.facebook.com/viethungsolarhcm";

export default function UpdatingDataPage() {
  return (
    <StatusPage
      icon={<AutorenewRoundedIcon sx={{ fontSize: 36 }} />}
      eyebrow="Thông báo"
      headline="Đang cập nhật dữ liệu"
      description="Nội dung trang đang được cập nhật để chính xác và đầy đủ hơn. Nếu bạn cần thông tin gấp, vui lòng liên hệ qua số điện thoại hoặc Fanpage bên dưới."
      phone={PHONE}
      phoneDisplay={PHONE_DISPLAY}
      facebookUrl={FACEBOOK_URL}
    />
  );
}