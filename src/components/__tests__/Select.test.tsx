/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "../common/Select";

describe("Select Component", () => {
  const mockOnValueChange = jest.fn();
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders select with options", () => {
    render(
      <Select value="" onValueChange={mockOnValueChange} options={options} />
    );

    expect(screen.getByRole("combobox")).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  test("renders with placeholder option", () => {
    render(
      <Select
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        placeholder="Select an option"
      />
    );

    expect(screen.getByText("Select an option")).toBeInTheDocument();

    // First option should be the placeholder
    const selectElement = screen.getByRole("combobox");
    // eslint-disable-next-line testing-library/no-node-access
    expect(selectElement.firstChild).toHaveTextContent("Select an option");
  });

  test("selects correct option based on value prop", () => {
    render(
      <Select value="2" onValueChange={mockOnValueChange} options={options} />
    );

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("2");
  });

  test("calls onValueChange when selection changes", () => {
    render(
      <Select value="" onValueChange={mockOnValueChange} options={options} />
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "3" } });

    expect(mockOnValueChange).toHaveBeenCalledWith("3");
  });

  test("updates local value when prop value changes", () => {
    const { rerender } = render(
      <Select value="1" onValueChange={mockOnValueChange} options={options} />
    );

    const selectElement = screen.getByRole("combobox") as HTMLSelectElement;
    expect(selectElement.value).toBe("1");

    // Update prop value
    rerender(
      <Select value="2" onValueChange={mockOnValueChange} options={options} />
    );

    expect(selectElement.value).toBe("2");
  });

  test("applies aria-label correctly", () => {
    render(
      <Select
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        ariaLabel="Select movie genre"
      />
    );

    const selectElement = screen.getByLabelText("Select movie genre");
    expect(selectElement).toBeInTheDocument();
  });

  test("applies additional className", () => {
    render(
      <Select
        value=""
        onValueChange={mockOnValueChange}
        options={options}
        className="custom-select"
      />
    );

    const selectElement = screen.getByRole("combobox");
    expect(selectElement).toHaveClass("input");
    expect(selectElement).toHaveClass("custom-select");
  });

  test("works with empty options array", () => {
    render(
      <Select
        value=""
        onValueChange={mockOnValueChange}
        options={[]}
        placeholder="No options available"
      />
    );

    const selectElement = screen.getByRole("combobox");
    // Should only contain the placeholder option
    expect(selectElement.children.length).toBe(1);
    expect(selectElement.firstChild).toHaveTextContent("No options available");
  });
});
