import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/movie/MovieList";
import TrendingMoviesSlider from "../components/movie/TrendingMovieSlider";
import ErrorBoundary from "../components/ErrorBoundaries";
import useMovieStore from "../store/useMovieStore";
import Loader from "../components/common/Loader";
import PageTransition from "../components/common/PageTransition";

const HomePage: React.FC = () => {
  const {
    fetchMovies,
    fetchTrending,
    trendingMovies,
    isTrendingLoading,
    currentPage,
    searchQuery,
    selectedGenre,
    genres,
    loadGenres,
    isLoading,
  } = useMovieStore();
  const location = useLocation();

  useEffect(() => {
    if (genres.length === 0) {
      loadGenres();
    }

    if (location.pathname === "/") {
      fetchMovies(currentPage);
      fetchTrending("day", 10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (selectedGenre) {
      const genreName =
        genres.find((g) => g.id === selectedGenre)?.name || "Genre";
      return `${genreName} Movies`;
    } else {
      return "Popular Movies";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageTransition isLoading={isLoading} />

      <ErrorBoundary>
        {!searchQuery && !selectedGenre && (
          <>
            {isTrendingLoading ? (
              <div className="mb-12">
                <Loader />
              </div>
            ) : trendingMovies.length > 0 ? (
              <TrendingMoviesSlider
                movies={trendingMovies}
                autoplayDelay={6000}
              />
            ) : null}
          </>
        )}

        <h1 className="text-3xl font-bold text-primary mb-6">
          {getPageTitle()}
        </h1>

        <SearchBar />
        <MovieList />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
