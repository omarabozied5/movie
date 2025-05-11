import React from "react";
import { SimilarMoviesProps } from "../../types";
import MovieCard from "./MovieCard";

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ movies, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-6 sm:mt-8">
        <h2 className="text-2xl sm:text-xl font-semibold mb-3 sm:mb-4">
          Similar Movies
        </h2>
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-tertiary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!movies.length) {
    return null;
  }

  return (
    <div className="mt-6 sm:mt-8 bg-gray-50 p-4 sm:p-6 rounded-xl">
      <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold mb-3 sm:mb-4">
        Similar Movies You Might Enjoy
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;
