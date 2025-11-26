export default function ChapterList({ chapters, onCreateChapter, onViewChapter }) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Danh sách chương
        </h3>
        <button
          onClick={onCreateChapter}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium text-white transition shadow-md"
        >
          Thêm chapter
        </button>
      </div>

      <div className="border border-gray-700 rounded-lg p-4 bg-gray-900/80 max-h-96 overflow-y-auto">
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => onViewChapter(ch.id)}
            className="w-full flex justify-between items-center bg-gray-800/70 hover:bg-gray-700 p-4 mb-2 rounded-lg border border-gray-700 transition-all hover:shadow-md text-left"
          >
            <span className="font-semibold text-gray-100">{ch.title}</span>
            <span className="text-xs text-gray-400">{ch.date}</span>
          </button>
        ))}
      </div>
    </div>
  );
}