import { X, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import CommentService from "../../../../usecases/CommetService";

export default function CommentSidebar({ isOpen, onClose }) {
  const { chapterId } = useParams();
  const user = JSON.parse(localStorage.getItem("user"));

  const [comment, setComment] = useState("");
  const [commentsData, setCommentsData] = useState([]);

  const commentService = new CommentService();

  function timeAgo(dateString) {
    const now = new Date();
    const date = new Date(dateString);
    const diff = (now - date) / 1000; // tính bằng giây

    if (diff < 60) return "vừa xong";
    if (diff < 3600) return Math.floor(diff / 60) + " phút trước";
    if (diff < 86400) return Math.floor(diff / 3600) + " giờ trước";
    if (diff < 2592000) return Math.floor(diff / 86400) + " ngày trước";
    if (diff < 31536000) return Math.floor(diff / 2592000) + " tháng trước";
    return Math.floor(diff / 31536000) + " năm trước";
  }

  const fetchComments = async () => {
    try {
      const dataComments = await commentService.getCommentsByChapter(chapterId);
      console.log("Fetched comments:", dataComments);
      const sortData = [...dataComments].sort(
        (a, b) => new Date(b.createAt) - new Date(a.createAt)
      );

      setCommentsData(sortData);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [chapterId]);

  const handleComment = async () => {
    try {
      const formData = {
        idUser: user.idUser,
        idChapter: chapterId,
        title: comment,
      };
      await commentService.createComment(formData);
      fetchComments();
      setComment("");
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

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
          {commentsData.map((cmt) => (
            <div key={cmt.idComment} className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-sm">
                {cmt.nameUser[0]}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm">{cmt.nameUser}</span>
                  {cmt.isKing && (
                    <span className="text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                      KING
                    </span>
                  )}
                </div>
                <p className="text-gray-800 text-sm mt-1">{cmt.title}</p>
                <span className="text-xs text-gray-500 mt-1 block">
                  {timeAgo(cmt.createAt)}
                </span>
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
              onKeyDown={(e) => e.key === "Enter" && handleComment()}
            />
            <button
              onClick={() => handleComment()}
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
