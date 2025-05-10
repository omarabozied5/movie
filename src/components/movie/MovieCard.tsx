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

  // Use a default image if poster_path is null or undefined
  const posterPath = movie.poster_path || "";
  const imageUrl = posterPath
    ? getImageUrl(posterPath)
    : "/placeholder-movie.jpg";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="card group animate-fade-in hover:no-underline h-full flex flex-col bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative w-full pb-[150%] overflow-hidden">
        <img
          src={imageUrl}
          alt={`${movie.title} poster`}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.src = "/placeholder-movie.jpg";
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <div className="absolute bottom-0 right-0 p-2">
          <span className="inline-flex items-center bg-primary text-white rounded px-1.5 py-0.5 text-xs font-medium group-hover:bg-tertiary transition-colors duration-300">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-2 xs:p-3">
        <h3 className="text-xs xs:text-sm sm:text-base font-semibold text-primary truncate group-hover:text-secondary transition-colors duration-200">
          {movie.title}
        </h3>
        <p className="text-xs text-gray-600 mt-0.5">{formattedDate}</p>

        <div className="mt-1 h-[2px] w-0 bg-tertiary group-hover:w-full transition-all duration-300 ease-out"></div>
      </div>
    </Link>
  );
};

export default MovieCard;
