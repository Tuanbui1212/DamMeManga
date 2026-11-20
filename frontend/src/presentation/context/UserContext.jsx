import { createContext, useContext, useState, useEffect, useMemo, useCallback } from "react";

const UserContext = createContext();

// Đọc user từ localStorage an toàn: dữ liệu hỏng không được làm sập cả ứng dụng
function readStoredUser() {
  try {
    const storedUser = localStorage.getItem("user");
    const parsed = storedUser ? JSON.parse(storedUser) : null;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => readStoredUser() || { role: "guest" });

  // Đồng bộ khi localStorage thay đổi ở tab khác
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === "user") {
        setCurrentUser(readStoredUser() || { role: "guest" });
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const login = useCallback((user) => {
    setCurrentUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const logout = useCallback(() => {
    setCurrentUser({ role: "guest" });
    localStorage.removeItem("user");
  }, []);

  const value = useMemo(
    () => ({ currentUser, setCurrentUser, login, logout }),
    [currentUser, login, logout]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
