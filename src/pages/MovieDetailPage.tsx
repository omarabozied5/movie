import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useMovieStore from "../store/useMovieStore";
import ErrorBoundary from "../components/ErrorBoundaries";
import MovieDetailsContent from "../components/movie/MovieDetailsContent";
import {
  LoadingState,
  ErrorState,
  NotFoundState,
} from "../components/movie/MovieDetailsState";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovieDetails, movieDetails, isLoading, error } = useMovieStore();
  const [isPageVisible, setIsPageVisible] = useState(false);

  useEffect(() => {
    if (id) {
      getMovieDetails(parseInt(id, 10));
    }

    const timer = setTimeout(() => {
      setIsPageVisible(true);
    }, 100);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  if (!movieDetails) {
    return <NotFoundState />;
  }

  return (
    <ErrorBoundary>
      <div
        className={`container mx-auto px-4 py-8 transition-opacity duration-500 ${
          isPageVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-wrap items-center mb-4">
          <Link to="/" className="group flex items-center">
            <span className="inline-block mr-2 transform group-hover:-translate-x-1 transition-transform duration-200">
              &larr;
            </span>
            <span className="btn-primary text-sm py-1 px-3 rounded-md">
              Back to Movies
            </span>
          </Link>

          {/* Breadcrumb navigation */}
          <div className="ml-auto text-sm text-gray-500 hidden sm:flex items-center">
            <Link
              to="/"
              className="hover:text-tertiary transition-colors duration-200"
            >
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium truncate max-w-xs">
              {movieDetails.title}
            </span>
          </div>
        </div>

        <MovieDetailsContent movieDetails={movieDetails} />
      </div>
    </ErrorBoundary>
  );
};

export default MovieDetailPage;
