import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the combined CSS file

interface BookProps {
  id: number;
  title: string;
  author: string;
  image: string;
  rating: number;
  discountPrice: number;
  price: number;
}

const BookCard: React.FC<BookProps> = ({ id, title, author, image, rating, discountPrice, price }) => {
  const navigate = useNavigate();

  return (
    <Card className="book-card" onClick={() => navigate(`/book/${id}`)}>
      <CardMedia component="img" className="book-image" image={image} alt={title} />
      <CardContent className="book-content">
        <Typography variant="body1" className="book-title">
          {title}
        </Typography>
        <Typography variant="body2" className="book-author">
          by {author}
        </Typography>
        <Box className="book-rating">
          <Typography variant="body2" className="rating-text">
            ⭐ {rating}
          </Typography>
        </Box>
        <Typography variant="body1">
          Rs. {price} <s className="discount-price">Rs. {discountPrice}</s>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
