import React, { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import Loader from "../common/Loader";
import Pagination from "../common/Pagination";
import useMovieStore from "../../store/useMovieStore";

const MovieList: React.FC = () => {
  const { movies, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useMovieStore();
  const listRef = useRef<HTMLDivElement>(null);
  const [placeholderCount, setPlaceholderCount] = useState(0);

  const calculateGridColumns = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 6; // xl
    if (width >= 1024) return 5; // lg
    if (width >= 768) return 4; // md
    if (width >= 640) return 3; // sm
    if (width >= 475) return 3; // xs
    return 2; // default for the smallest screens
  };

  useEffect(() => {
    const updatePlaceholders = () => {
      if (movies.length === 0) return;

      const columns = calculateGridColumns();
      const remainder = movies.length % columns;

      setPlaceholderCount(remainder === 0 ? 0 : columns - remainder);
    };

    updatePlaceholders();

    window.addEventListener("resize", updatePlaceholders);
    return () => window.removeEventListener("resize", updatePlaceholders);
  }, [movies]);

  useEffect(() => {
    if (listRef.current) {
      const children = listRef.current.querySelectorAll(
        ".card:not(.placeholder)"
      );
      children.forEach((child, index) => {
        (child as HTMLElement).style.opacity = "0";
        (child as HTMLElement).style.transform = "translateY(20px)";

        setTimeout(() => {
          (child as HTMLElement).style.transition =
            "opacity 0.5s ease, transform 0.5s ease";
          (child as HTMLElement).style.opacity = "1";
          (child as HTMLElement).style.transform = "translateY(0)";
        }, 50 * index);
      });
    }
  }, [movies]);

  if (error) {
    return (
      <div className="text-center text-red-500 py-4 sm:py-8">
        <p className="text-sm sm:text-base">Error: {error}</p>
      </div>
    );
  }

  if (isLoading && movies.length === 0) {
    return <Loader />;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-4 sm:py-8">
        <p className="text-sm sm:text-base text-gray-500">
          No movies found. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-slide-in">
      {isLoading && movies.length > 0 && (
        <div className="fixed top-0 left-0 w-full z-50">
          <div className="h-1 bg-tertiary animate-pulse"></div>
        </div>
      )}

      <div
        ref={listRef}
        className={`grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6 ${
          isLoading && movies.length > 0
            ? "opacity-70 transition-opacity duration-300"
            : ""
        }`}
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="card placeholder invisible"
            aria-hidden="true"
            style={{ minHeight: "1px" }}
          ></div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default MovieList;
