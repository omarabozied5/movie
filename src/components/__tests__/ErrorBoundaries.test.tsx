import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ErrorBoundary from "../ErrorBoundaries";

// Create a component that throws an error
const ErrorComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Mock ErrorPage component
jest.mock("../pages/ErrorPage", () => {
  return function MockErrorPage({
    title,
    message,
    onRetry,
  }: {
    title: string;
    message: string;
    onRetry: () => void;
  }) {
    return (
      <div data-testid="error-page">
        <h1>{title}</h1>
        <p>{message}</p>
        <button onClick={onRetry} data-testid="retry-button">
          Try Again
        </button>
      </div>
    );
  };
});

// Suppress console.error during tests
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("ErrorBoundary", () => {
  test("renders children when there is no error", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("renders ErrorPage when a child component throws", () => {
    render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("error-page")).toBeInTheDocument();
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
  });

  test("renders custom fallback when provided", () => {
    const CustomFallback = () => (
      <div data-testid="custom-fallback">Custom Error UI</div>
    );

    render(
      <ErrorBoundary fallback={<CustomFallback />}>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();
  });

  test("resets error state when retry button is clicked", () => {
    // We need to use a component state to control the error
    const TestComponent = () => {
      const [shouldThrow, setShouldThrow] = React.useState(true);

      React.useEffect(() => {
        // After first render with error, update to not throw anymore
        // This ensures when reset happens, the component renders correctly
        if (shouldThrow) {
          setShouldThrow(false);
        }
      }, [shouldThrow]);

      if (shouldThrow) {
        throw new Error("Test error");
      }

      return <div data-testid="no-error">No Error Now</div>;
    };

    render(
      <ErrorBoundary>
        <TestComponent />
      </ErrorBoundary>
    );

    // Initially shows error
    expect(screen.getByTestId("error-page")).toBeInTheDocument();

    // Click retry
    fireEvent.click(screen.getByTestId("retry-button"));

    // Should now render without error
    expect(screen.getByTestId("no-error")).toBeInTheDocument();
  });

  test("calls componentDidCatch when error occurs", () => {
    const spy = jest.spyOn(ErrorBoundary.prototype, "componentDidCatch");

    render(
      <ErrorBoundary>
        <ErrorComponent shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
