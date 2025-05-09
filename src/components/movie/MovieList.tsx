import React, { useEffect, useRef } from "react";
import MovieCard from "./MovieCard";
import Loader from "../common/Loader";
import Pagination from "../common/Pagination";
import useMovieStore from "../../store/useMovieStore";

const MovieList: React.FC = () => {
  const { movies, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useMovieStore();
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const children = listRef.current.querySelectorAll(".card");
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
