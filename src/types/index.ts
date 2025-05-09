export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  genre_ids: number[];
}

export interface MovieDetails extends Omit<Movie, "genre_ids"> {
  genres: { id: number; name: string }[];
  runtime: number | null;
  budget: number;
  revenue: number;
  status: string;
  tagline: string | null;
  production_companies: {
    id: number;
    name: string;
    logo_path: string | null;
  }[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface MoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface InputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  ariaLabel: string;
  className?: string;
  name?: string;
  onSubmit?: () => void;
}

export interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  value: string;
  onValueChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
  name?: string;
}

export interface ErrorPageProps {
  title?: string;
  message?: string;
  code?: string | number;
  actionText?: string;
  actionLink?: string;
  onRetry?: () => void;
}

export interface MovieDetailsContentProps {
  movieDetails: MovieDetails;
}

export interface ImageWithFallbackError {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  loading?: "lazy" | "eager";
}

export interface TrendingMoviesSliderProps {
  movies: Movie[];
  autoplayDelay?: number;
}

export interface MovieListProps {
  movies: Movie[];
  onMovieClick: (movie: Movie) => void;
}

export interface MovieListItemProps {
  movie: Movie;
  onMovieClick: (movie: Movie) => void;
}
