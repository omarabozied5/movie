import React from "react";
import { MovieDetailsContentProps } from "../../types";
import { getImageUrl } from "../../services/api";
import {
  formatRuntime,
  formatMoney,
  formatDate,
} from "../../utils/formatUtils";

const MovieDetailsContent: React.FC<MovieDetailsContentProps> = ({
  movieDetails,
}) => {
  const formattedDate = formatDate(movieDetails.release_date);

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-fade-in">
      <div className="md:flex">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="relative pb-[150%]">
            <img
              src={getImageUrl(movieDetails.poster_path, "w500")}
              alt={`${movieDetails.title} poster`}
              className="absolute top-0 left-0 w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="md:w-2/3 lg:w-3/4 p-6">
          <h1 className="text-3xl font-bold text-primary">
            {movieDetails.title}
          </h1>

          {movieDetails.tagline && (
            <p className="text-gray-600 italic mt-2">{movieDetails.tagline}</p>
          )}

          <div className="flex flex-wrap gap-2 mt-4">
            {movieDetails.genres.map((genre) => (
              <span
                key={genre.id}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
              >
                {genre.name}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex flex-wrap gap-x-8 gap-y-4">
                <div>
                  <p className="text-gray-500">Release Date</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>

                <div>
                  <p className="text-gray-500">Runtime</p>
                  <p className="font-medium">
                    {formatRuntime(movieDetails.runtime)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Status</p>
                  <p className="font-medium">{movieDetails.status}</p>
                </div>

                <div>
                  <p className="text-gray-500">Rating</p>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500">★</span>
                    <span className="font-medium">
                      {movieDetails.vote_average.toFixed(1)} / 10
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      ({movieDetails.vote_count.toLocaleString()} votes)
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-gray-500">Budget</p>
                  <p className="font-medium">
                    {formatMoney(movieDetails.budget)}
                  </p>
                </div>

                <div>
                  <p className="text-gray-500">Revenue</p>
                  <p className="font-medium">
                    {formatMoney(movieDetails.revenue)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700 leading-relaxed">
              {movieDetails.overview || "No overview available."}
            </p>
          </div>

          {movieDetails.production_companies.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-2">
                Production Companies
              </h2>
              <div className="flex flex-wrap gap-4 mt-2">
                {movieDetails.production_companies.map((company) => (
                  <div key={company.id} className="flex items-center gap-2">
                    {company.logo_path ? (
                      <img
                        src={getImageUrl(company.logo_path, "w92")}
                        alt={`${company.name} logo`}
                        className="h-6 object-contain"
                      />
                    ) : null}
                    <span>{company.name}</span>
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
