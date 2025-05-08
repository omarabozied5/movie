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
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - 2);
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
    <div className="flex justify-center my-8 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`btn ${
          currentPage === 1 ? "bg-gray-300 cursor-not-allowed" : "btn-primary"
        }`}
        aria-label="Previous page"
      >
        &laquo;
      </button>

      {currentPage > 3 && (
        <>
          <button onClick={() => onPageChange(1)} className="btn btn-primary">
            1
          </button>
          {currentPage > 4 && (
            <span className="flex items-center px-2">...</span>
          )}
        </>
      )}

      {getPageNumbers().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`btn ${
            page === currentPage ? "bg-primary text-white" : "btn-primary"
          }`}
        >
          {page}
        </button>
      ))}

      {currentPage < totalPages - 2 && (
        <>
          {currentPage < totalPages - 3 && (
            <span className="flex items-center px-2">...</span>
          )}
          <button
            onClick={() => onPageChange(totalPages)}
            className="btn btn-primary"
          >
            {totalPages}
          </button>
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`btn ${
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
