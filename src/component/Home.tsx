// src/component/Home.tsx
import React, { useState } from "react";
import { Box, Typography, Select, MenuItem, Pagination } from "@mui/material";
import Navbar from "./Navbar";
import BookCard from "../component/BookCard";
import BookData from "../component/BookData";
import "./Home.css";

interface Book {
  id: number | string;
  title: string;
  author: string;
  price: number;
  image: string;
  discountPrice: number;
  rating: number;
}

const Home: React.FC = () => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [sortBy, setSortBy] = useState("relevance");

  return (
    <BookData>
      {({ books, loading, error }) => {
        if (loading) {
          return <div>Loading books...</div>;
        }

        if (error) {
          return (
            <Box className="home-container">
              <Navbar showSearchAndIcons={true} />
              <Typography color="error" textAlign="center">
                {error}
              </Typography>
            </Box>
          );
        }

        const sortedBooks = [...books].sort((a, b) => {
          if (sortBy === "price-low") {
            return a.price - b.price;
          } else if (sortBy === "price-high") {
            return b.price - a.price;
          }
          return 0;
        });

        const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);
        const paginatedBooks = sortedBooks.slice(
          (page - 1) * itemsPerPage,
          page * itemsPerPage
        );

        return (
          <Box className="home-container">
            <Navbar showSearchAndIcons={true} />
            <Box className="books-header">
              <Typography className="books-title">
                <div className="bookfont">Books</div>
                <div className="bookCount">({sortedBooks.length} items)</div>
              </Typography>
              <Box className="sort-container">
                <Typography variant="body1"></Typography>
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as string)}
                  size="small"
                  className="sort-select"
                >
                  <MenuItem value="relevance">Sort by relevance</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                </Select>
              </Box>
            </Box>
            <div className="books-container">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} {...book} />
              ))}
            </div>
            <Box className="pagination-container">
              <Pagination
                count={totalPages}
                page={page}
                onChange={(event, value) => setPage(value)}
                color="primary"
              />
            </Box>
          </Box>
        );
      }}
    </BookData>
  );
};

export default Home;