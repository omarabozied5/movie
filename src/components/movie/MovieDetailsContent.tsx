import React from "react";
import { MovieDetailsContentProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../services/api";
import useMovieStore from "../../store/useMovieStore";
import {
  formatRuntime,
  formatMoney,
  formatDate,
} from "../../utils/formatUtils";

const MovieDetailsContent: React.FC<MovieDetailsContentProps> = ({
  movieDetails,
}) => {
  const navigate = useNavigate();
  const { setSelectedGenre } = useMovieStore();

  const formattedDate = formatDate(movieDetails.release_date);

  const handleGenreClick = (genreId: number) => {
    setSelectedGenre(genreId);
    navigate("/");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <div className="relative pb-[150%] md:pb-0 md:h-full">
            <img
              src={getImageUrl(movieDetails.poster_path, "w500")}
              alt={`${movieDetails.title} poster`}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="w-full md:w-2/3 lg:w-3/4 p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary">
            {movieDetails.title}
          </h1>

          {movieDetails.tagline && (
            <p className="text-sm sm:text-base text-gray-600 italic mt-2">
              {movieDetails.tagline}
            </p>
          )}

          <div className="flex flex-wrap gap-1 sm:gap-2 mt-3 sm:mt-4">
            {movieDetails.genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => handleGenreClick(genre.id)}
                className="bg-gray-100 text-gray-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm hover:bg-tertiary hover:text-white transition-colors duration-200 cursor-pointer"
              >
                {genre.name}
              </button>
            ))}
          </div>

          <div className="mt-4 sm:mt-6">
            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-x-4 gap-y-3 sm:gap-x-8 sm:gap-y-4">
                <div>
                  <p className="text-xs sm:text-sm text-gray-500">
                    Release Date
                  </p>
                  <p className="text-sm sm:text-base font-medium">
                    {formattedDate}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Runtime</p>
                  <p className="text-sm sm:text-base font-medium">
                    {formatRuntime(movieDetails.runtime)}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Status</p>
                  <p className="text-sm sm:text-base font-medium">
                    {movieDetails.status}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm sm:text-base font-medium">
                      {movieDetails.vote_average.toFixed(1)} / 10
                    </span>
                    <span className="text-xs sm:text-sm text-gray-400 ml-1">
                      ({movieDetails.vote_count.toLocaleString()} votes)
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Budget</p>
                  <p className="text-sm sm:text-base font-medium">
                    {formatMoney(movieDetails.budget)}
                  </p>
                </div>

                <div>
                  <p className="text-xs sm:text-sm text-gray-500">Revenue</p>
                  <p className="text-sm sm:text-base font-medium">
                    {formatMoney(movieDetails.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 sm:mt-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
              Overview
            </h2>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
              {movieDetails.overview || "No overview available."}
            </p>
          </div>

          {movieDetails.production_companies.length > 0 && (
            <div className="mt-4 sm:mt-6">
              <h2 className="text-lg sm:text-xl font-semibold mb-1 sm:mb-2">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-2 sm:gap-4 mt-1 sm:mt-2">
                {movieDetails.production_companies.map((company) => (
                  <div
                    key={company.id}
                    className="flex items-center gap-1 sm:gap-2"
                  >
                    {company.logo_path ? (
                      <img
                        src={getImageUrl(company.logo_path, "w92")}
                        alt={`${company.name} logo`}
                        className="h-4 sm:h-6 object-contain"
                      />
                    ) : null}
                    <span className="text-xs sm:text-sm">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsContent;
