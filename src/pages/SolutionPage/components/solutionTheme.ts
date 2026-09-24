import Home from "@mui/icons-material/Home";
import Apartment from "@mui/icons-material/Apartment";
import Factory from "@mui/icons-material/Factory";
import VerifiedUser from "@mui/icons-material/VerifiedUser";
import WorkspacePremium from "@mui/icons-material/WorkspacePremium";
import Savings from "@mui/icons-material/Savings";
import SupportAgent from "@mui/icons-material/SupportAgent";
import BoltOutlined from "@mui/icons-material/BoltOutlined";
import PercentOutlined from "@mui/icons-material/PercentOutlined";
import VerifiedOutlined from "@mui/icons-material/VerifiedOutlined";
import GridOnOutlined from "@mui/icons-material/GridOnOutlined";
import BatteryChargingFullOutlined from "@mui/icons-material/BatteryChargingFullOutlined";
import PowerOffOutlined from "@mui/icons-material/PowerOffOutlined";
import Battery6BarOutlined from "@mui/icons-material/Battery6BarOutlined";
import InsightsOutlined from "@mui/icons-material/InsightsOutlined";
import HubOutlined from "@mui/icons-material/HubOutlined";
import AgricultureOutlined from "@mui/icons-material/AgricultureOutlined";
import WaterDropOutlined from "@mui/icons-material/WaterDropOutlined";
import GrassOutlined from "@mui/icons-material/GrassOutlined";
import SolarPowerOutlined from "@mui/icons-material/SolarPowerOutlined";
import type { SvgIconComponent } from "@mui/icons-material";
import { GOLD, NAVY } from "../../../themes/brand";

export { GOLD, NAVY };

export const iconMap: Record<string, SvgIconComponent> = {
  home: Home, building: Apartment, factory: Factory, agriculture: AgricultureOutlined,
  shield: VerifiedUser, award: WorkspacePremium, coins: Savings, headset: SupportAgent,
  bolt: BoltOutlined, percent: PercentOutlined, verify: VerifiedOutlined,
  grid: GridOnOutlined, battery: BatteryChargingFullOutlined, offgrid: PowerOffOutlined,
  bess: Battery6BarOutlined, ems: InsightsOutlined, utility: HubOutlined,
  pump: WaterDropOutlined, farm: AgricultureOutlined, agrivoltaics: GrassOutlined,
  solar: SolarPowerOutlined,
};

/** Màu nhận diện cho từng loại hệ — dùng chung cho thẻ, bảng so sánh và modal. */
export function getSubTypeColor(icon: string) {
  return icon === "battery" || icon === "bess" || icon === "ems"
    ? "#1d4ed8"
    : icon === "offgrid" || icon === "utility"
      ? NAVY
      : GOLD;
}
