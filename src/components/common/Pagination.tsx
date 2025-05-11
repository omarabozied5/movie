import React, { useState, useCallback } from "react";
import { PaginationProps } from "../../types";

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  const isPaginationDisabled = isTransitioning || isLoading;

  const handlePageChange = useCallback(
    (page: number) => {
      if (isPaginationDisabled || page === currentPage) return;

      setIsTransitioning(true);

      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }

      const timer = setTimeout(() => {
        onPageChange(page);

        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 250);

      setDebounceTimer(timer);
    },
    [currentPage, onPageChange, isPaginationDisabled, debounceTimer]
  );

  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="flex justify-center my-6 sm:my-8 gap-1 sm:gap-2">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1 || isPaginationDisabled}
        className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm relative ${
          currentPage === 1 || isPaginationDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "btn-primary hover:bg-opacity-90"
        }`}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {currentPage > 3 && window.innerWidth >= 640 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            disabled={isPaginationDisabled}
            className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
              isPaginationDisabled
                ? "opacity-70 cursor-not-allowed"
                : "btn-primary hover:bg-opacity-90"
            }`}
          >
            1
          </button>
          {currentPage > 4 && (
            <span className="flex items-center px-1 sm:px-2 text-xs sm:text-sm">
              ...
            </span>
          )}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          disabled={isPaginationDisabled}
          className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm relative ${
            page === currentPage
              ? "bg-primary text-white"
              : isPaginationDisabled
              ? "btn-primary opacity-70 cursor-not-allowed"
              : "btn-primary hover:bg-opacity-90"
          }`}
        >
          {page}
          {isPaginationDisabled && page === currentPage && (
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="w-1 h-1 bg-white rounded-full animate-pulse"></span>
            </span>
          )}
        </button>
      ))}

      {currentPage < totalPages - 2 && window.innerWidth >= 640 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="flex items-center px-1 sm:px-2 text-xs sm:text-sm">
              ...
            </span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            disabled={isPaginationDisabled}
            className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
              isPaginationDisabled
                ? "opacity-70 cursor-not-allowed"
                : "btn-primary hover:bg-opacity-90"
            }`}
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages || isPaginationDisabled}
        className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
          currentPage === totalPages || isPaginationDisabled
            ? "bg-gray-300 cursor-not-allowed"
            : "btn-primary hover:bg-opacity-90"
        }`}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
