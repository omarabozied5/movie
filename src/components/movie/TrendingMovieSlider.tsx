import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingMoviesSliderProps } from "../../types";
import { getImageUrl } from "../../services/api";
import { formatDate } from "../../utils/formatUtils";

const TrendingMoviesSlider: React.FC<TrendingMoviesSliderProps> = ({
  movies,
  autoplayDelay = 5000,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (movies.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % movies.length);
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [movies.length, autoplayDelay]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + movies.length) % movies.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % movies.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  if (!movies.length) return null;

  return (
    <div className="relative mb-12 rounded-xl overflow-hidden shadow-lg bg-gray-900">
      <div className="relative h-96 md:h-[450px] overflow-hidden">
        {movies.map((movie, index) => (
          <div
            key={movie.id}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <div className="absolute inset-0 bg-black">
              <img
                src={getImageUrl(
                  movie.backdrop_path || movie.poster_path,
                  "original"
                )}
                alt={`${movie.title} backdrop`}
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            </div>

            <div className="relative z-10 flex h-full">
              <div className="container mx-auto px-6 flex flex-col md:flex-row items-center h-full">
                <div className="md:w-1/2 text-white p-6">
                  <div className="animate-fade-in">
                    <span className="inline-block bg-tertiary text-white text-xs px-2 py-1 rounded mb-4">
                      TRENDING
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold mb-2">
                      {movie.title}
                    </h2>
                    <p className="text-gray-300 mb-4">
                      {formatDate(movie.release_date)}
                    </p>
                    <div className="flex items-center mb-4">
                      <span className="inline-flex items-center bg-primary text-white rounded-md px-2 py-1 text-sm font-medium mr-2">
                        ★ {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="text-gray-300 text-sm">
                        {movie.vote_count.toLocaleString()} votes
                      </span>
                    </div>
                    <p className="text-gray-200 mb-6 line-clamp-3">
                      {movie.overview}
                    </p>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn bg-tertiary hover:bg-opacity-90 text-white transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
                <div className="hidden md:block md:w-1/2 p-6">
                  <div className="relative h-64 md:h-80 w-48 md:w-56 mx-auto animate-fade-in shadow-xl">
                    <img
                      src={getImageUrl(movie.poster_path, "w500")}
                      alt={`${movie.title} poster`}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full z-20 transition-all duration-300"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-tertiary scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TrendingMoviesSlider;
