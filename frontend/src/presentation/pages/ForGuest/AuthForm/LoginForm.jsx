import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUsecase } from "../../../../usecases/LoginService";
import { User, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
    const [account, setAccount] = useState("");
    const [password, setPassword] = useState("");
    const [showPass, setShowPass] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        toast.dismiss();

        try {
            const user = await loginUsecase(account.trim(), password);

            toast.success("Đăng nhập thành công!");

            // Navigate dựa vào role
            if (user.role === "admin") {
                navigate("/");
            } else {
                navigate("/");
            }
            window.location.reload();
            // Reset form
            setAccount("");
            setPassword("");
        } catch (err) {
            const message =
                err.response?.data ||
                err.message ||
                "Lỗi kết nối server!";
            toast.error(message);
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
