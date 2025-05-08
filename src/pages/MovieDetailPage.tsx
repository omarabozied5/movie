import React, { useEffect } from "react";
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

  useEffect(() => {
    if (id) {
      getMovieDetails(parseInt(id, 10));
    }
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
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <button className="btn btn-primary text-sm mb-4">
            &larr; Back to Movies
          </button>
        </Link>

        <MovieDetailsContent movieDetails={movieDetails} />
      </div>
    </ErrorBoundary>
  );
};

export default MovieDetailPage;
