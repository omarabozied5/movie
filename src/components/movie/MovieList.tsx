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

  // Function to determine the current grid columns based on responsive breakpoints
  const calculateGridColumns = () => {
    const width = window.innerWidth;
    if (width >= 1280) return 6; // xl
    if (width >= 1024) return 5; // lg
    if (width >= 768) return 4; // md
    if (width >= 640) return 3; // sm
    if (width >= 475) return 3; // xs
    return 2; // default for the smallest screens
  };

  // Calculate needed placeholders whenever movies or window size changes
  useEffect(() => {
    const updatePlaceholders = () => {
      if (movies.length === 0) return;

      const columns = calculateGridColumns();
      const remainder = movies.length % columns;

      // Only add placeholders if we need to complete the row
      setPlaceholderCount(remainder === 0 ? 0 : columns - remainder);
    };

    // Set initial placeholders
    updatePlaceholders();

    // Update placeholders when window is resized
    window.addEventListener("resize", updatePlaceholders);
    return () => window.removeEventListener("resize", updatePlaceholders);
  }, [movies]);

  // Animation for cards
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
      <div
        ref={listRef}
        className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 xs:gap-3 sm:gap-4 md:gap-5 lg:gap-6"
      >
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* Add placeholder items to ensure even rows */}
        {Array.from({ length: placeholderCount }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="card placeholder invisible"
            aria-hidden="true"
            style={{ minHeight: "1px" }} // Ensure it takes space but doesn't appear
          ></div>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
};

export default MovieList;
