import React from "react";
import MovieCard from "./MovieCard";
import Loader from "../common/Loader";
import Pagination from "../common/Pagination";
import useMovieStore from "../../store/useMovieStore";

const MovieList: React.FC = () => {
  const { movies, isLoading, error, currentPage, totalPages, setCurrentPage } =
    useMovieStore();

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (isLoading && movies.length === 0) {
    return <Loader />;
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">
          No movies found. Try a different search.
        </p>
      </div>
    );
  }

  return (
    <div className="animate-slide-in">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
