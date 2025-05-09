import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "../Pagination";

describe("Pagination", () => {
  const mockOnPageChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders pagination with correct current page active", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    // Check if current page button has the active class
    const pageButtons = screen.getAllByRole("button");
    const currentPageButton = pageButtons.find(
      (button) => button.textContent === "3"
    );

    expect(currentPageButton).toHaveClass("bg-primary");
  });

  test("disables previous button on first page", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    expect(prevButton).toBeDisabled();
    expect(prevButton).toHaveClass("bg-gray-300");
  });

  test("disables next button on last page", () => {
    render(
      <Pagination
        currentPage={10}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    expect(nextButton).toBeDisabled();
    expect(nextButton).toHaveClass("bg-gray-300");
  });

  test("calls onPageChange with correct page number when page button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const pageButton = screen.getByText("5");
    fireEvent.click(pageButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(5);
  });

  test("calls onPageChange with correct page number when previous button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const prevButton = screen.getByLabelText("Previous page");
    fireEvent.click(prevButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange with correct page number when next button is clicked", () => {
    render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    const nextButton = screen.getByLabelText("Next page");
    fireEvent.click(nextButton);

    expect(mockOnPageChange).toHaveBeenCalledWith(4);
  });

  test("shows first page button and ellipsis when current page > 3", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    // First page button should be visible
    expect(screen.getByText("1")).toBeInTheDocument();

    // Ellipsis should be visible
    const ellipsisBefore = screen.getAllByText("...")[0];
    expect(ellipsisBefore).toBeInTheDocument();
  });

  test("shows last page button and ellipsis when current page < totalPages - 2", () => {
    render(
      <Pagination
        currentPage={5}
        totalPages={10}
        onPageChange={mockOnPageChange}
      />
    );

    // Last page button should be visible
    expect(screen.getByText("10")).toBeInTheDocument();

    // Ellipsis should be visible
    const ellipsisAfter = screen.getAllByText("...")[1];
    expect(ellipsisAfter).toBeInTheDocument();
  });

  test("does not show ellipsis when pages are close to first or last", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={5}
        onPageChange={mockOnPageChange}
      />
    );

    // No ellipsis should be present
    expect(screen.queryByText("...")).not.toBeInTheDocument();
  });
});
