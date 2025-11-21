import MangaCard from "./MangaCard";

export default function MangaGrid({ items, slideDirection, onCardClick }) {
  return (
    <div className="overflow-hidden">
      <div
        key={items[0]?.id}
        className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6 transition-all duration-300 ease-in-out ${
          slideDirection === "left"
            ? "animate-slide-left"
            : slideDirection === "right"
            ? "animate-slide-right"
            : ""
        }`}
      >
        {items.map((manga) => (
          <MangaCard key={manga.id} manga={manga} onClick={onCardClick} />
        ))}
      </div>
    </div>
  );
}
