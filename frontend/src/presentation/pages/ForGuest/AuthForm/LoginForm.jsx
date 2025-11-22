import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function LoginForm({ onLoginSuccess }) {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss();

        if (!account.trim() || !password) {
            toast.error("Vui lòng nhập đầy đủ tài khoản và mật khẩu!");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ account: account.trim(), password }),
            });

            if (!res.ok) {
                const msg = await res.text();
                throw new Error(msg || "Đăng nhập thất bại!");
            }

            const user = await res.json();
            localStorage.setItem("user", JSON.stringify(user));
            toast.success(`Chào mừng ${user.account}! Đăng nhập thành công 🎉`, { duration: 4000 });
            setAccount(""); setPassword("");
            if (onLoginSuccess) onLoginSuccess(user);
        } catch (err) {
            toast.error(err.message || "Lỗi kết nối server!");
        }
    };

    return (
        <form className="flex flex-col gap-5 text-left" onSubmit={handleLogin}>
            <div className="relative">
                <User className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type="text"
                    value={account}
                    onChange={(e) => setAccount(e.target.value)}
                    placeholder="Tên người dùng"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
            </div>

            <div className="relative">
                <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
                <input
                    type={showPass ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                    className="w-full border border-gray-300 rounded-lg p-3 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    required
                />
                {showPass ? (
                    <EyeOff
                        size={20}
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        onClick={() => setShowPass(false)}
                    />
                ) : (
                    <Eye
                        size={20}
                        className="absolute right-3 top-3 cursor-pointer text-gray-500"
                        onClick={() => setShowPass(true)}
                    />
                )}
            </div>

            <button
                type="submit"
                className="bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition duration-300 mt-2 w-full"
            >
                Đăng nhập
            </button>
        </form>
    );
}
