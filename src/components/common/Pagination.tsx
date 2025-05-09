import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5; // Show fewer pages on mobile

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
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "btn-primary"
        }`}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {currentPage > 3 && window.innerWidth >= 640 && (
        <>
          <button
            onClick={() => onPageChange(1)}
            className="btn btn-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
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
          onClick={() => onPageChange(page)}
          className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
            page === currentPage ? "bg-primary text-white" : "btn-primary"
          }`}
        >
          {page}
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
            onClick={() => onPageChange(totalPages)}
            className="btn btn-primary px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`btn px-2 sm:px-4 py-1 sm:py-2 text-xs sm:text-sm ${
          currentPage === totalPages
            ? "bg-gray-300 cursor-not-allowed"
            : "btn-primary"
        }`}
        aria-label="Next page"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
