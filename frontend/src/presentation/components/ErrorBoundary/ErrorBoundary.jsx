import { Component } from "react";

const CHUNK_RELOAD_KEY = "dmm_chunk_reload_at";

/**
 * Nhận diện lỗi tải chunk (thường xảy ra sau khi deploy bản mới lên Vercel:
 * trình duyệt vẫn giữ index cũ và gọi tới file JS đã bị xoá).
 */
export function isChunkLoadError(error) {
  const msg = String(error?.message || error || "");
  return (
    error?.name === "ChunkLoadError" ||
    /Failed to fetch dynamically imported module/i.test(msg) ||
    /Importing a module script failed/i.test(msg) ||
    /error loading dynamically imported module/i.test(msg) ||
    /Loading chunk [\d]+ failed/i.test(msg)
  );
}

/** Reload trang tối đa 1 lần / 30s để tránh vòng lặp reload vô hạn. */
export function reloadOnceForChunkError() {
  try {
    const last = Number(sessionStorage.getItem(CHUNK_RELOAD_KEY) || 0);
    if (Date.now() - last < 30000) return false;
    sessionStorage.setItem(CHUNK_RELOAD_KEY, String(Date.now()));
  } catch {
    // sessionStorage không khả dụng -> vẫn reload
  }
  window.location.reload();
  return true;
}

/**
 * Error Boundary: thay vì để cả ứng dụng bị "trắng màn hình" khi một component
 * ném lỗi lúc render, hiển thị giao diện báo lỗi thân thiện + nút thử lại.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error("[ErrorBoundary]", error, info?.componentStack);
    if (isChunkLoadError(error)) {
      reloadOnceForChunkError();
    }
  }

  componentDidUpdate(prevProps) {
    // Reset lỗi khi người dùng chuyển sang trang khác
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  handleRetry = () => {
    if (isChunkLoadError(this.state.error)) {
      window.location.reload();
      return;
    }
    this.setState({ error: null });
  };

  render() {
    const { error } = this.state;
    if (!error) return this.props.children;

    return (
      <div className="min-h-[60vh] w-full flex flex-col items-center justify-center gap-4 bg-gray-950 text-gray-200 px-6 py-20 text-center">
        <div className="text-5xl">⚠️</div>
        <h2 className="text-xl font-bold">Đã xảy ra lỗi khi hiển thị trang</h2>
        <p className="text-sm text-gray-400 max-w-md">
          Vui lòng thử lại. Nếu lỗi vẫn tiếp diễn, hãy quay về trang chủ.
        </p>
        <div className="flex gap-3">
          <button
            onClick={this.handleRetry}
            className="px-5 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold transition"
          >
            Thử lại
          </button>
          <a
            href="/"
            className="px-5 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold transition"
          >
            Về trang chủ
          </a>
        </div>
      </div>
    );
  }
}

