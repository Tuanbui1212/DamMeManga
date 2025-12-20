import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App.jsx";
import { UserProvider } from "./presentation/context/UserContext";
import "./styles/index.css";

// --- THÊM ĐOẠN NÀY ---
console.log("=== KIỂM TRA MÔI TRƯỜNG ===");
console.log("1. Chế độ (Mode):", import.meta.env.MODE); // Sẽ in ra 'development' hoặc 'production'
console.log("2. API URL đang dùng:", import.meta.env.VITE_API_URL);
console.log("3. ImgBB Key:", import.meta.env.VITE_IMGBB_API_KEY);
console.log("===========================");
// ---------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider>
    <UserProvider>
      <App />
    </UserProvider>
  </HelmetProvider>
);
