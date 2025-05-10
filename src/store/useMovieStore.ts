import { create } from "zustand";
import {
  fetchPopularMovies,
  searchMovies,
  fetchMovieDetails,
  fetchGenres,
  fetchMoviesByGenre,
  fetchTrendingMovies,
  fetchSimilarMovies,
} from "../services/api";
import { Movie, MovieDetails, Genre } from "../types";

interface MovieState {
  movies: Movie[];
  trendingMovies: Movie[];
  movieDetails: MovieDetails | null;
  genres: Genre[];
  selectedGenre: number | null;
  searchQuery: string;
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  isTrendingLoading: boolean;
  error: string | null;
  similarMovies: Movie[];
  isSimilarLoading: boolean;

  // Actions
  fetchMovies: (page?: number) => Promise<void>;
  fetchTrending: (timeWindow?: "day" | "week", limit?: number) => Promise<void>;
  searchForMovies: (query: string, page?: number) => Promise<void>;
  getMovieDetails: (movieId: number) => Promise<void>;
  loadGenres: () => Promise<void>;
  setSelectedGenre: (genreId: number | null) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  resetFilters: () => void;
  fetchSimilarMovies: (movieId: number, limit?: number) => Promise<void>;
}

const useMovieStore = create<MovieState>((set, get) => ({
  movies: [],
  trendingMovies: [],
  similarMovies: [],
  isSimilarLoading: false,
  movieDetails: null,
  genres: [],
  selectedGenre: null,
  searchQuery: "",
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  isTrendingLoading: false,
  error: null,

  fetchMovies: async (page = 1) => {
    try {
      set({ isLoading: true, error: null });
      const { selectedGenre, searchQuery } = get();

      let data;
      if (selectedGenre) {
        data = await fetchMoviesByGenre(selectedGenre, page);
      } else if (searchQuery) {
        data = await searchMovies(searchQuery, page);
      } else {
        data = await fetchPopularMovies(page);
      }

      set({
        movies: data.results,
        currentPage: data.page,
        totalPages: Math.min(data.total_pages, 100),
        isLoading: false,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch movies",
        isLoading: false,
      });
    }
  },

  fetchTrending: async (timeWindow = "day", limit = 10) => {
    try {
      set({ isTrendingLoading: true, error: null });
      const trendingMovies = await fetchTrendingMovies(timeWindow, limit);
      set({ trendingMovies, isTrendingLoading: false });
    } catch (error) {
      console.error("Failed to fetch trending movies:", error);
      set({ isTrendingLoading: false });
      // Don't set error state here to avoid disrupting the main movie list
    }
  },
  fetchSimilarMovies: async (movieId, limit = 6) => {
    try {
      set({ isSimilarLoading: true, error: null });
      const similarMovies = await fetchSimilarMovies(movieId, 1, limit);
      set({ similarMovies, isSimilarLoading: false });
    } catch (error) {
      console.error("Failed to fetch similar movies:", error);
      set({ isSimilarLoading: false });
    }
  },

  searchForMovies: async (query, page = 1) => {
    if (!query.trim()) {
      set({ searchQuery: "" });
      return get().fetchMovies(1);
    }

    set({ searchQuery: query.trim(), currentPage: 1 });
    await get().fetchMovies(page);
  },

  getMovieDetails: async (movieId) => {
    try {
      set({ isLoading: true, error: null, movieDetails: null });
      const details = await fetchMovieDetails(movieId);
      set({ movieDetails: details, isLoading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch movie details",
        isLoading: false,
      });
    }
  },

  loadGenres: async () => {
    try {
      const genres = await fetchGenres();
      set({ genres });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch genres",
      });
    }
  },

  setSelectedGenre: (genreId) => {
    set({ selectedGenre: genreId, searchQuery: "" });
    get().fetchMovies(1);
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
    get().fetchMovies(page);
  },

  resetFilters: () => {
    set({ searchQuery: "", selectedGenre: null, currentPage: 1 });
    get().fetchMovies(1);
  },
}));

export default useMovieStore;
