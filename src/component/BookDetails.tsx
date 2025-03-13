import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import Navbar from "./Navbar";
import books from "../component/BookData";
import "./Home.css"; // Import CSS file

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const book = books.find((b) => b.id === Number(id));

  const [count, setCount] = useState(0); // State for tracking quantity
  const [rating, setRating] = useState(0); // State for selected rating

  if (!book) {
    return (
      <Box>
              <Navbar showSearchAndIcons={true} /> {/* Hide Search Bar & Icons */}

        <Typography variant="h5" sx={{ textAlign: "center", mt: 5 }}>
          Book Not Found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="book-details">
           <Navbar showSearchAndIcons={true} /> {/* Hide Search Bar & Icons */}


      <Box className="book-details-container" sx={{ display: "flex", justifyContent: "center", gap: 4, p: 4, flexWrap: "wrap" }}>
        {/* Left Column - Book Image, Small Containers, and Buttons */}
        <Box className="book-image-section" sx={{ minWidth: "250px", textAlign: "center", position: "relative" }}>
          {/* Book Image */}
          <CardMedia
            component="img"
            className="book-image"
            image={book.image}
            alt={book.title}
            sx={{ width: "200px", height: "auto", borderRadius: 2, mx: "auto" }}
          />

          {/* Small Containers with Book Image */}
          <Box sx={{ position: "absolute", top: 0, left: -60, display: "flex", flexDirection: "column", gap: 1 }}>
            <Box sx={{ width: "40px", height: "60px", borderRadius: 1, overflow: "hidden" }}>
              <CardMedia component="img" image={book.image} alt={book.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
            <Box sx={{ width: "40px", height: "60px", borderRadius: 1, overflow: "hidden" }}>
              <CardMedia component="img" image={book.image} alt={book.title} sx={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </Box>
          </Box>

          {/* ADD TO BAG / Counter Button */}
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              sx={{ backgroundColor: "#B22222", "&:hover": { backgroundColor: "#8B0000" }, minWidth: "120px" }}
              onClick={() => setCount(count + 1)}
            >
              {count === 0 ? "ADD TO BAG" : count} {/* Show count instead of text */}
            </Button>

            <Button variant="outlined" color="secondary" sx={{ ml: 2, color: "#000", borderColor: "#000" }}>
              WISHLIST
            </Button>
          </Box>
        </Box>

        {/* Right Column - Book Details */}
        <Box className="book-info-section" sx={{ flex: 1, maxWidth: "500px" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {book.title}
          </Typography>
          <Typography variant="h6">by {book.author}</Typography>

          {/* Rating beside image (Number + Small Star) */}
          <Typography variant="body2" sx={{ fontSize: "18px", color: "green", mt: 1 }}>
            {book.rating} ★ ({20})
          </Typography>

          <Typography variant="h5" sx={{ mt: 1 }}>
            Rs. {book.price} <s style={{ color: "gray", fontSize: "1rem" }}>Rs. {book.discountPrice}</s>
          </Typography>

          {/* Book Detail Section */}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
            • Book Detail
          </Typography>
          <Typography variant="body2" sx={{ mt: 1, color: "gray" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed diam nonummy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.
          </Typography>

          {/* Customer Feedback Section */}
          <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: "bold" }}>
            Customer Feedback
          </Typography>

          {/* Overall Rating and Star Selection */}
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", mt: 1 }}>
            <Typography variant="body2" sx={{ fontWeight: "bold", mb: 1 }}>
              Overall rating:
            </Typography>

            {/* Star Rating Component */}
            <Box sx={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  style={{
                    fontSize: "22px",
                    cursor: "pointer",
                    color: star <= rating ? "#FFA500" : "#C0C0C0", // Orange for selected, Grey for unselected
                    marginRight: "2px",
                  }}
                  
                >
                  ★
                </span>
              ))}
            </Box>
          </Box>

          {/* Review Input Box */}
          <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2, mb: 2, mt: 1 }}>
            <Typography variant="body2">Write your review</Typography>
            <textarea
              placeholder="Write your review here..."
              style={{
                width: "100%",
                minHeight: "80px",
                marginTop: "8px",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <Button variant="contained" color="primary" sx={{ mt: 1 }}>
              Submit
            </Button>
          </Box>

          {/* Existing Reviews */}
          <Box sx={{ border: "1px solid #ddd", borderRadius: 2, p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Aniket Chile
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold", color: "#FFA500" }}>
                4.0 ★
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Good product. Even though the translation could have been better, Chanakya's neeti are thought-provoking.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                Shweta Bodkar
              </Typography>
              <Typography variant="body2" sx={{ fontSize: "16px", fontWeight: "bold", color: "#FFA500" }}>
                4.0 ★
              </Typography>
              <Typography variant="body2" sx={{ color: "gray" }}>
                Good product. Even though the translation could have been better, Chanakya's neeti are thought-provoking.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BookDetails;
