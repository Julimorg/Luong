import { ViteReactSSG } from "vite-react-ssg";
import "./index.css";
import { routes } from "./routes";

// ViteReactSSG thay cho createRoot: lúc `vite-react-ssg build` nó render sẵn
// từng route ra file HTML tĩnh, lúc chạy trong trình duyệt nó hydrate lại
// đúng cây React đó. Không cần server, vẫn deploy dạng static như trước.
export const createRoot = ViteReactSSG({ routes });
