import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchBar from "../SearchBar";
import useMovieStore from "../../store/useMovieStore";

// Mock the zustand store
jest.mock("../store/useMovieStore");

const mockUseMovieStore = useMovieStore as jest.MockedFunction<
  typeof useMovieStore
>;

describe("SearchBar", () => {
  const mockLoadGenres = jest.fn();
  const mockFetchMovies = jest.fn();
  const mockSearchForMovies = jest.fn();
  const mockSetSearchQuery = jest.fn();
  const mockSetSelectedGenre = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseMovieStore.mockReturnValue({
      fetchMovies: mockFetchMovies,
      searchQuery: "",
      setSearchQuery: mockSetSearchQuery,
      searchForMovies: mockSearchForMovies,
      genres: [
        { id: 28, name: "Action" },
        { id: 35, name: "Comedy" },
        { id: 18, name: "Drama" },
      ],
      selectedGenre: null,
      setSelectedGenre: mockSetSelectedGenre,
      loadGenres: mockLoadGenres,
      // Add other required properties
      movies: [],
      isLoading: false,
      error: null,
      currentPage: 1,
      totalPages: 10,
      setCurrentPage: jest.fn(),
      getMovieDetails: jest.fn(),
      movieDetails: null,
    });
  });

  test("loads genres on mount", () => {
    render(<SearchBar />);
    expect(mockLoadGenres).toHaveBeenCalledTimes(1);
  });

  test("handles input value change", async () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for movies...");
    fireEvent.change(input, { target: { value: "Star Wars" } });

    // Wait for debounce
    await waitFor(
      () => {
        expect(mockSetSearchQuery).toHaveBeenCalledWith("Star Wars");
        // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
        expect(mockSearchForMovies).toHaveBeenCalledWith("Star Wars");
      },
      { timeout: 300 }
    );
  });

  test("handles genre selection", () => {
    render(<SearchBar />);

    const select = screen.getByLabelText("Filter by genre");
    fireEvent.change(select, { target: { value: "28" } });

    expect(mockSetSelectedGenre).toHaveBeenCalledWith(28);
  });

  test("handles form submission", () => {
    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for movies...");
    fireEvent.change(input, { target: { value: "Avengers" } });

    const form = screen.getByRole("button", { name: "Search" });
    fireEvent.click(form);

    expect(mockSetSearchQuery).toHaveBeenCalledWith("Avengers");
    expect(mockSearchForMovies).toHaveBeenCalledWith("Avengers");
  });

  test("clears search when input is empty and submitted", () => {
    // Setup with existing search query
    mockUseMovieStore.mockReturnValue({
      ...mockUseMovieStore(),
      searchQuery: "Existing query",
    });

    render(<SearchBar />);

    const input = screen.getByPlaceholderText("Search for movies...");
    fireEvent.change(input, { target: { value: "" } });

    const form = screen.getByRole("button", { name: "Search" });
    fireEvent.click(form);

    expect(mockSetSearchQuery).toHaveBeenCalledWith("");
    expect(mockFetchMovies).toHaveBeenCalledWith(1);
  });
});
