import type { RouteRecord } from "vite-react-ssg";
import MainLayout from "./pages/main";
import HomePage from "./pages/DashBoardPage/DashBoardPage";
import AboutPage from "./pages/AboutUsPage/AboutUsPage";
import ContactPage from "./pages/ContractPage/ContractPage";
import ProjectsPage from "./pages/ProjectPage/ProjectPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import ProjectDetailPage from "./pages/ProjectDetailPage/ProjectDetailPage";
import SolutionPage from "./pages/SolutionPage/SolutionPage";
import ProductDetailPage from "./pages/ProductDetailPage/ProductDetailPage";
import { projects } from "./data/projectData";
import { products } from "./data/productData";

/**
 * Danh sách route dạng mảng (thay cho <Routes> JSX) để vite-react-ssg biết
 * phải dựng sẵn những trang nào lúc build.
 *
 * `getStaticPaths` liệt kê các trang chi tiết: danh sách lấy thẳng từ file
 * dữ liệu, nên thêm dự án hay sản phẩm mới là lần build sau tự có trang tĩnh
 * tương ứng, không phải khai báo tay.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "gioi-thieu", element: <AboutPage /> },
      { path: "lien-he", element: <ContactPage /> },
      { path: "du-an", element: <ProjectsPage /> },
      { path: "san-pham", element: <ProductPage /> },
      { path: "giai-phap", element: <SolutionPage /> },
      {
        path: "du-an/:id",
        element: <ProjectDetailPage />,
        getStaticPaths: () => projects.map((p) => `/du-an/${p.id}`),
      },
      {
        path: "san-pham/:id",
        element: <ProductDetailPage />,
        getStaticPaths: () => products.map((p) => `/san-pham/${p.id}`),
      },
    ],
  },
];
