import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieList from "../components/movie/MovieList";
import useMovieStore from "../store/useMovieStore";

// Mock the zustand store
jest.mock("../store/useMovieStore");

// Mock the MovieCard component
jest.mock("../components/movie/MovieCard", () => {
  return function MockMovieCard({ movie }: { movie: any }) {
    return <div data-testid={`movie-card-${movie.id}`}>{movie.title}</div>;
  };
});

const mockUseMovieStore = useMovieStore as jest.MockedFunction<
  typeof useMovieStore
>;

describe("MovieList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading state", () => {
    mockUseMovieStore.mockReturnValue({
      movies: [],
      isLoading: true,
      error: null,
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: jest.fn(),
      // Add other required properties to satisfy the type
      fetchMovies: jest.fn(),
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchForMovies: jest.fn(),
      genres: [],
      selectedGenre: null,
      setSelectedGenre: jest.fn(),
      loadGenres: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });

    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    // Loader should be rendered
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  test("renders error state", () => {
    mockUseMovieStore.mockReturnValue({
      movies: [],
      isLoading: false,
      error: "Failed to fetch movies",
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: jest.fn(),
      // Add other required properties
      fetchMovies: jest.fn(),
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchForMovies: jest.fn(),
      genres: [],
      selectedGenre: null,
      setSelectedGenre: jest.fn(),
      loadGenres: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });

    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    expect(
      screen.getByText("Error: Failed to fetch movies")
    ).toBeInTheDocument();
  });

  test("renders empty state when no movies are found", () => {
    mockUseMovieStore.mockReturnValue({
      movies: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 0,
      setCurrentPage: jest.fn(),
      // Add other required properties
      fetchMovies: jest.fn(),
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchForMovies: jest.fn(),
      genres: [],
      selectedGenre: null,
      setSelectedGenre: jest.fn(),
      loadGenres: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });

    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    expect(
      screen.getByText("No movies found. Try a different search.")
    ).toBeInTheDocument();
  });

  test("renders movie cards when movies exist", () => {
    const mockMovies = [
      {
        id: 1,
        title: "Test Movie 1",
        poster_path: "/test-poster-1.jpg",
        release_date: "2023-01-01",
        vote_average: 8.5,
        vote_count: 1000,
        genre_ids: [28, 12],
        overview: "Test overview 1",
      },
      {
        id: 2,
        title: "Test Movie 2",
        poster_path: "/test-poster-2.jpg",
        release_date: "2023-02-01",
        vote_average: 7.5,
        vote_count: 500,
        genre_ids: [35, 18],
        overview: "Test overview 2",
      },
    ];

    mockUseMovieStore.mockReturnValue({
      movies: mockMovies,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 1,
      setCurrentPage: jest.fn(),
      // Add other required properties
      fetchMovies: jest.fn(),
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchForMovies: jest.fn(),
      genres: [],
      selectedGenre: null,
      setSelectedGenre: jest.fn(),
      loadGenres: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });

    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("movie-card-1")).toBeInTheDocument();
    expect(screen.getByTestId("movie-card-2")).toBeInTheDocument();
  });

  test("renders pagination when totalPages > 1", () => {
    const mockMovies = [
      {
        id: 1,
        title: "Test Movie 1",
        poster_path: "/test-poster-1.jpg",
        release_date: "2023-01-01",
        vote_average: 8.5,
        vote_count: 1000,
        genre_ids: [28, 12],
        overview: "Test overview 1",
      },
    ];

    const mockSetCurrentPage = jest.fn();

    mockUseMovieStore.mockReturnValue({
      movies: mockMovies,
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 5,
      setCurrentPage: mockSetCurrentPage,
      // Add other required properties
      fetchMovies: jest.fn(),
      searchQuery: "",
      setSearchQuery: jest.fn(),
      searchForMovies: jest.fn(),
      genres: [],
      selectedGenre: null,
      setSelectedGenre: jest.fn(),
      loadGenres: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });

    render(
      <BrowserRouter>
        <MovieList />
      </BrowserRouter>
    );

    // Check if pagination buttons are rendered
    expect(screen.getByLabelText("Previous page")).toBeInTheDocument();
    expect(screen.getByLabelText("Next page")).toBeInTheDocument();
  });
});
