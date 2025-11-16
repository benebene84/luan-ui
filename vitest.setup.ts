import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";
import "@testing-library/jest-dom";

afterEach(() => {
	cleanup();
});

// Mock the ResizeObserver
class ResizeObserverMock {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
}

// Stub the global ResizeObserver
vi.stubGlobal("ResizeObserver", ResizeObserverMock);

// Mock the hasPointerCapture and scrollIntoView methods
Element.prototype.hasPointerCapture = vi.fn();
Element.prototype.scrollIntoView = vi.fn();
