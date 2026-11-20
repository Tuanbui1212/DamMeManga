import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { UserProvider } from "./presentation/context/UserContext";
import { reloadOnceForChunkError } from "./presentation/components/ErrorBoundary/ErrorBoundary";
import "./styles/index.css";

// Sau mỗi lần deploy mới, các chunk JS cũ bị xoá -> import động thất bại -> trắng trang.
// Vite phát sự kiện này khi preload chunk lỗi: reload 1 lần để lấy bản mới nhất.
window.addEventListener("vite:preloadError", (event) => {
  event.preventDefault();
  reloadOnceForChunkError();
});

// "Đánh thức" backend (Render free tier ngủ sau 15 phút) ngay khi mở web,
// song song với việc tải JS để giảm thời gian chờ ở request đầu tiên.
try {
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
  fetch(`${apiUrl}/health`, { method: "GET", mode: "cors", keepalive: true }).catch(() => {});
} catch {
  // bỏ qua
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>
);
