import React, { useEffect, useState } from "react";
import useMovieStore from "../store/useMovieStore";
import Input from "./common/Input";
import Select from "./common/Select";
import useDebounce from "../hooks/useDebounce";

const SearchBar: React.FC = () => {
  const {
    fetchMovies,
    searchQuery,
    setSearchQuery,
    searchForMovies,
    genres,
    selectedGenre,
    setSelectedGenre,
    loadGenres,
  } = useMovieStore();

  const [inputValue, setInputValue] = useState(searchQuery);
  const debouncedSearchQuery = useDebounce(inputValue, 200);

  useEffect(() => {
    loadGenres();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery !== searchQuery) {
      setSearchQuery(debouncedSearchQuery);

      if (debouncedSearchQuery.trim()) {
        searchForMovies(debouncedSearchQuery);
      } else {
        fetchMovies(1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchForMovies(searchQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, selectedGenre]);

  const handleSearch = () => {
    if (inputValue.trim()) {
      setSearchQuery(inputValue);
      searchForMovies(inputValue);
    } else {
      setSearchQuery("");
      fetchMovies(1);
    }
  };

  const handleGenreChange = (value: string) => {
    const genreId = value ? parseInt(value, 10) : null;
    setSelectedGenre(genreId);
  };

  const genreOptions = genres.map((genre) => ({
    value: genre.id.toString(),
    label: genre.name,
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
      className="mb-6 sm:mb-8"
    >
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <div className="flex-grow">
          <Input
            value={inputValue}
            onValueChange={setInputValue}
            placeholder="Search for movies..."
            ariaLabel="Search movies"
            onSubmit={handleSearch}
            className="text-sm sm:text-base"
          />
        </div>

        <div className="w-full sm:w-1/3">
          <Select
            value={selectedGenre?.toString() || ""}
            onValueChange={handleGenreChange}
            options={genreOptions}
            placeholder="All Genres"
            ariaLabel="Filter by genre"
            className="text-sm sm:text-base"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary text-sm sm:text-base py-2"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
