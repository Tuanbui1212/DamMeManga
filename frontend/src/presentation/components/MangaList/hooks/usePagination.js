import { useState, useEffect } from "react";

export default function usePagination(data, itemsPerPage = 14) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isSliding, setIsSliding] = useState(false);
  const [slideDirection, setSlideDirection] = useState(""); // 'left' or 'right'

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = data.slice(startIndex, startIndex + itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages && !isSliding) {
      setSlideDirection("left");
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setIsSliding(false);
      }, 300);
    }
  };

  const prevPage = () => {
    if (currentPage > 1 && !isSliding) {
      setSlideDirection("right");
      setIsSliding(true);
      setTimeout(() => {
        setCurrentPage(currentPage - 1);
        setIsSliding(false);
      }, 300);
    }
  };

  useEffect(() => {
    setSlideDirection("");
  }, [currentPage]);

  return { currentPage, totalPages, currentItems, nextPage, prevPage, slideDirection };
}
