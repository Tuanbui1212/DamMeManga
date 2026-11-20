function MangaPoster({ posterUrl }) {
  return (
    <div className="h-200 flex flex-col justify-between bg-gray-200 relative">
      <div className="flex justify-center relative">
        <div className="relative w-full h-160 overflow-hidden rounded-t-xl bg-gray-300">
          <div className="absolute inset-0 bg-black/50 rounded-t-xl"></div>
          {posterUrl && (
            <img
              src={posterUrl}
              alt=""
              className="w-full h-full object-cover"
              decoding="async"
              fetchPriority="high"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MangaPoster;
