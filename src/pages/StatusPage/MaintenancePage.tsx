import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import { StatusPage } from "./StatusPage";

// TODO: thay bằng số điện thoại & link Facebook thật của VIETHUNGSOLAR
const PHONE = "0931227668";
const PHONE_DISPLAY = "0931227668";
const FACEBOOK_URL = "https://www.facebook.com/viethungsolarhcm";

export default function MaintenancePage() {
  return (
    <StatusPage
      icon={<BuildRoundedIcon sx={{ fontSize: 36 }} />}
      eyebrow="Thông báo"
      headline="Website đang bảo trì"
      description="Chúng tôi đang nâng cấp hệ thống để mang lại trải nghiệm tốt hơn. Nếu bạn cần hỗ trợ ngay, vui lòng liên hệ qua số điện thoại hoặc Fanpage bên dưới."
      phone={PHONE}
      phoneDisplay={PHONE_DISPLAY}
      facebookUrl={FACEBOOK_URL}
    />
  );
}