import { X, Send } from "lucide-react";
import { useState } from "react";

export default function CommentSidebar({ isOpen, onClose }) {
  const [comment, setComment] = useState("");

  // Dữ liệu giả lập bình luận (sau này thay bằng API)
  const comments = [
    { id: 1, user: "SaitamaFan123", content: "Chap này đỉnh quá trời ơi!", time: "5 phút trước" },
    { id: 2, user: "GenosCyborg", content: "Sensei lại one punch nữa rồi", time: "10 phút trước" },
    { id: 3, user: "TatsumakiBestGirl", content: "Sao Garou chưa xuất hiện vậy trời", time: "15 phút trước" },
    { id: 4, user: "KingEngine", content: "KING ENGINE VROOM VROOM", time: "1 giờ trước", isKing: true },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-bold">Bình luận (4)</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Danh sách bình luận */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {comments.map((cmt) => (
            <div key={cmt.id} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                {cmt.user[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{cmt.user}</span>
                  {cmt.isKing && <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">KING</span>}
                </div>
                <p className="text-gray-800 text-sm mt-1">{cmt.content}</p>
                <span className="text-xs text-gray-500 mt-1 block">{cmt.time}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Ô nhập bình luận */}
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Viết bình luận..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyDown={(e) => e.key === "Enter" && setComment("")}
            />
            <button
              onClick={() => comment && setComment("")}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}