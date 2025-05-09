import React from "react";
import { Link } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import { formatDate } from "../../utils/formatUtils";
import { Movie } from "../../types";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const formattedDate = formatDate(movie.release_date);

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card group animate-fade-in hover:no-underline"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative pb-[150%] overflow-hidden">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <span className="text-white text-xs sm:text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">
            View details
          </span>
        </div>
      </div>
      <div className="p-2 sm:p-4 relative overflow-hidden">
        <h3 className="text-sm sm:text-lg font-semibold text-primary truncate group-hover:text-secondary transition-colors duration-200">
          {movie.title}
        </h3>
        <p className="text-gray-600 text-xs sm:text-sm">{formattedDate}</p>
        <div className="mt-1 sm:mt-2 flex items-center">
          <span className="inline-flex items-center bg-primary text-white rounded-md px-1 py-0.5 sm:px-2 sm:py-1 text-xs font-medium group-hover:bg-tertiary transition-colors duration-300">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 w-0 h-1 bg-tertiary group-hover:w-full transition-all duration-300 ease-out"></div>
      </div>
    </Link>
  );
};

export default MovieCard;
