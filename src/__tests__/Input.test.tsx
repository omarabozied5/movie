import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/common/Input";

describe("Input Component", () => {
  const mockOnValueChange = jest.fn();
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders input with provided value", () => {
    render(
      <Input
        value="Test Value"
        onValueChange={mockOnValueChange}
        placeholder="Enter text"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toHaveValue("Test Value");
  });

  test("renders with placeholder and aria-label", () => {
    render(
      <Input
        value=""
        onValueChange={mockOnValueChange}
        placeholder="Search here"
        ariaLabel="Search input"
      />
    );

    const inputElement = screen.getByLabelText("Search input");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("placeholder", "Search here");
  });

  test("calls onValueChange when input value changes", () => {
    render(
      <Input
        value=""
        onValueChange={mockOnValueChange}
        placeholder="Enter text"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "New Value" } });
    fireEvent.blur(inputElement);

    expect(mockOnValueChange).toHaveBeenCalledWith("New Value");
  });

  test("calls onSubmit when Enter key is pressed", () => {
    render(
      <Input
        value=""
        onValueChange={mockOnValueChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter text"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "Submit This" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockOnValueChange).toHaveBeenCalledWith("Submit This");
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  test("doesn't call onSubmit for other key presses", () => {
    render(
      <Input
        value=""
        onValueChange={mockOnValueChange}
        onSubmit={mockOnSubmit}
        placeholder="Enter text"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.keyDown(inputElement, { key: "A", code: "KeyA" });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  test("updates local value when prop value changes", () => {
    const { rerender } = render(
      <Input
        value="Initial Value"
        onValueChange={mockOnValueChange}
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByDisplayValue("Initial Value");

    // Simulate prop change
    rerender(
      <Input
        value="Updated Value"
        onValueChange={mockOnValueChange}
        ariaLabel={""}
      />
    );

    expect(inputElement).toHaveValue("Updated Value");
  });

  test("applies additional className", () => {
    render(
      <Input
        value=""
        onValueChange={mockOnValueChange}
        className="custom-class"
        data-testid="test-input"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByTestId("test-input");
    expect(inputElement).toHaveClass("input");
    expect(inputElement).toHaveClass("custom-class");
  });
});
