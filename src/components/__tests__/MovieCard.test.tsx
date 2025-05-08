import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import MovieCard from "../movie/MovieCard";
import { Movie } from "../../types/index";

// Mock the api service
jest.mock("../services/api", () => ({
  getImageUrl: (path: string | null) =>
    path
      ? `https://image.tmdb.org/t/p/w500${path}`
      : "/images/poster-placeholder.png",
}));

const mockMovie: Movie = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test-poster.jpg",
  release_date: "2023-01-01",
  overview: "This is a test movie overview",
  vote_average: 8.5,
  vote_count: 1000,
  genre_ids: [28, 12],
};

describe("MovieCard", () => {
  test("renders movie information correctly", () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    );

    // Check if the movie title is rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // Check if the release date is formatted and rendered
    expect(screen.getByText("January 1, 2023")).toBeInTheDocument();

    // Check if the rating is rendered
    expect(screen.getByText("★ 8.5")).toBeInTheDocument();

    // Check if the card links to the correct movie detail page
    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/movie/1");
  });

  test("handles movies without poster images", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };

    render(
      <BrowserRouter>
        <MovieCard movie={movieWithoutPoster} />
      </BrowserRouter>
    );

    // The component should still render
    expect(screen.getByText("Test Movie")).toBeInTheDocument();

    // The image should use ImageWithFallback component
    const imgElement = screen.getByAltText("Test Movie poster");
    expect(imgElement).toBeInTheDocument();
  });

  test("handles movies without release dates", () => {
    const movieWithoutReleaseDate = {
      ...mockMovie,
      release_date: null as unknown as string,
    };

    render(
      <BrowserRouter>
        <MovieCard movie={movieWithoutReleaseDate} />
      </BrowserRouter>
    );

    // Check if the fallback text for release date is shown
    expect(screen.getByText("Unknown Release Date")).toBeInTheDocument();
  });
});
