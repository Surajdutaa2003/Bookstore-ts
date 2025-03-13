import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import BookCard from "../component/BookCard";
import "@testing-library/jest-dom";

// Mock useNavigate from react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("BookCard Component", () => {
  const mockBook = {
    id: 1,
    title: "Test Book",
    author: "Test Author",
    image: "test-image.jpg",
    rating: 4.5,
    discountPrice: 500,
    price: 700,
  };

  test("renders BookCard component correctly", () => {
    render(
      <MemoryRouter>
        <BookCard {...mockBook} />
      </MemoryRouter>
    );

    // Checking if book title and author are present
    expect(screen.getByText(/Test Book/i)).toBeInTheDocument();
    expect(screen.getByText(/by Test Author/i)).toBeInTheDocument();
  });

  test("triggers navigation on click", () => {
    render(
      <MemoryRouter>
        <BookCard {...mockBook} />
      </MemoryRouter>
    );

    // Simulate click event on the book title
    fireEvent.click(screen.getByText(/Test Book/i));

    // Ensure navigation was triggered
    expect(mockNavigate).toHaveBeenCalled();
  });
});