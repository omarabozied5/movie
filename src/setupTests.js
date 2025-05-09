// jest-dom adds custom jest matchers for asserting on DOM nodes.
// expect(element).toHaveTextContent(/react/i)
import "@testing-library/jest-dom";

// Mock the IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    args[0]?.includes("Warning:") ||
    args[0]?.includes("Error:") ||
    /test was not wrapped in act/.test(args[0] || "")
  ) {
    return;
  }
  originalConsoleError(...args);
};
