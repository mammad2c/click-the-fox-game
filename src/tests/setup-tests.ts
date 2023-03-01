import matchers from "@testing-library/jest-dom/matchers";
import { expect } from "vitest";
import { mockServer } from "./mocks/mock-server";

expect.extend(matchers);

// Establish API mocking before all tests.
beforeAll(() => {
  mockServer.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  mockServer.resetHandlers();
});

// Clean up after the tests are finished.
afterAll(() => {
  mockServer.close();
});
