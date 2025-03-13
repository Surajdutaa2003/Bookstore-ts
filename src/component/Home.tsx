import React from "react";
import { Box, Typography, Select, MenuItem, Pagination } from "@mui/material";
import Navbar from "./Navbar";
import BookCard from "../component/BookCard";
import books from "../component/BookData"; // Import book data
import "./Home.css"; // Import the combined CSS file

const Home: React.FC = () => {
  // Pagination state
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 12; // 12 items per page
  const totalPages = Math.ceil(books.length / itemsPerPage);

  // Sort state
  const [sortBy, setSortBy] = React.useState("relevance");

  // Paginated books
  const paginatedBooks = books.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Box className="home-container">
      <Navbar showSearchAndIcons={true} /> {/* Hide Search Bar & Icons */}
      
      {/* Header section */}
      <Box className="books-header">
        <Typography className="books-title">
          <div className="bookfont"> 
          Books 
          </div>
          
          <div className="bookCount">
          ({books.length} items)
          </div>
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

      {/* Books Container (replacing Grid with custom div) */}
      <div className="books-container">
        {paginatedBooks.map((book) => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>

      {/* Pagination */}
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
};

export default Home;