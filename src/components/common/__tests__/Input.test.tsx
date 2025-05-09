import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input from "../Input";

describe("Input Component", () => {
  const mockValueChange = jest.fn();
  const mockSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with placeholder", () => {
    render(
      <Input
        value=""
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        ariaLabel={""}
      />
    );

    expect(screen.getByPlaceholderText("Test placeholder")).toBeInTheDocument();
  });

  test("displays the provided value", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Test placeholder"
    ) as HTMLInputElement;
    expect(inputElement.value).toBe("Test value");
  });

  test("calls onValueChange when input value changes and loses focus", () => {
    render(
      <Input
        value="Initial value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test placeholder");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    fireEvent.blur(inputElement);

    expect(mockValueChange).toHaveBeenCalledWith("New value");
  });

  test("calls onValueChange and onSubmit when Enter key is pressed", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        onSubmit={mockSubmit}
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test placeholder");
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(mockValueChange).toHaveBeenCalledWith("Test value");
    expect(mockSubmit).toHaveBeenCalled();
  });

  test("does not call onSubmit for other key presses", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        onSubmit={mockSubmit}
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test placeholder");
    fireEvent.keyDown(inputElement, { key: "Space", code: "Space" });

    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("applies provided className", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        className="custom-class"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText("Test placeholder");
    expect(inputElement).toHaveClass("input");
    expect(inputElement).toHaveClass("custom-class");
  });

  test("sets aria-label from prop when provided", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        ariaLabel="Custom aria label"
      />
    );

    expect(screen.getByLabelText("Custom aria label")).toBeInTheDocument();
  });

  test("falls back to placeholder for aria-label when not provided", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        ariaLabel={""}
      />
    );

    expect(screen.getByLabelText("Test placeholder")).toBeInTheDocument();
  });

  test("sets name attribute when provided", () => {
    render(
      <Input
        value="Test value"
        onValueChange={mockValueChange}
        placeholder="Test placeholder"
        name="test-name"
        ariaLabel={""}
      />
    );

    const inputElement = screen.getByPlaceholderText(
      "Test placeholder"
    ) as HTMLInputElement;
    expect(inputElement.name).toBe("test-name");
  });
});
