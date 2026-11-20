import axios from "axios";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL
    ? `${import.meta.env.VITE_API_URL}/api`
    : "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
  // Render free tier có thể mất ~50s để "thức dậy"; tránh request treo vô hạn
  timeout: 60000,
});

function getToken() {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    return user?.token || localStorage.getItem("token");
  } catch {
    return localStorage.getItem("token");
  }
}

axiosClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
