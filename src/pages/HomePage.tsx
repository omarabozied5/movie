import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/movie/MovieList";
import ErrorBoundary from "../components/ErrorBoundaries";
import useMovieStore from "../store/useMovieStore";

const HomePage: React.FC = () => {
  const { fetchMovies, currentPage, searchQuery, selectedGenre } =
    useMovieStore();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/" && !searchQuery && selectedGenre === null) {
      fetchMovies(currentPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search Results for "${searchQuery}"`;
    } else if (selectedGenre) {
      return `Genre Movies`;
    } else {
      return "Popular Movies";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-tertiary mb-6">
        {getPageTitle()}
      </h1>
      <ErrorBoundary>
        <SearchBar />
        <MovieList />
      </ErrorBoundary>
    </div>
  );
};

export default HomePage;
