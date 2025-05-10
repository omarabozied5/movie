import axios from "axios";
import { MovieDetails, MoviesResponse, Genre, Movie } from "../types";

const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  params: {
    api_key: process.env.REACT_APP_API_KEY,
  },
});

export const fetchPopularMovies = async (page = 1): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>("/movie/popular", {
    params: { page },
  });
  return response.data;
};

export const fetchTrendingMovies = async (
  timeWindow: "day" | "week" = "day",
  limit = 10
): Promise<Movie[]> => {
  const response = await api.get<MoviesResponse>(
    `/trending/movie/${timeWindow}`
  );
  return response.data.results.slice(0, limit);
};

export const searchMovies = async (
  query: string,
  page = 1
): Promise<MoviesResponse> => {
  if (!query.trim()) {
    return fetchPopularMovies(page);
  }

  const response = await api.get<MoviesResponse>("/search/movie", {
    params: { query, page },
  });
  return response.data;
};

export const fetchMovieDetails = async (
  movieId: number
): Promise<MovieDetails> => {
  const response = await api.get<MovieDetails>(`/movie/${movieId}`);
  return response.data;
};

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await api.get<{ genres: Genre[] }>("/genre/movie/list");
  return response.data.genres;
};

export const fetchMoviesByGenre = async (
  genreId: number,
  page = 1
): Promise<MoviesResponse> => {
  const response = await api.get<MoviesResponse>("/discover/movie", {
    params: {
      with_genres: genreId,
      page,
    },
  });
  return response.data;
};

export const getImageUrl = (
  path: string | null,
  size: string = "w500"
): string => {
  if (!path) return "/placeholder-image.jpg";
  return `${process.env.REACT_APP_IMAGE_BASE_URL}/${size}${path}`;
};

export interface MovieDetailsContentProps {
  movieDetails: MovieDetails;
}

export const fetchSimilarMovies = async (
  movieId: number,
  page = 1,
  limit = 6
): Promise<Movie[]> => {
  const response = await api.get<MoviesResponse>(`/movie/${movieId}/similar`, {
    params: { page },
  });
  return response.data.results.slice(0, limit);
};
