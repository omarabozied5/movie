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
      className="card animate-fade-in hover:no-underline"
      aria-label={`View details for ${movie.title}`}
    >
      <div className="relative pb-[150%]">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`${movie.title} poster`}
          className="absolute top-0 left-0 w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-primary truncate hover:text-secondary transition-colors duration-200">
          {movie.title}
        </h3>
        <p className="text-gray-600 text-sm">{formattedDate}</p>
        <div className="mt-2 flex items-center">
          <span className="inline-flex items-center bg-primary text-white rounded-md px-2 py-1 text-xs font-medium">
            ★ {movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
