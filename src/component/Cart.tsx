// src/component/Cart.tsx
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import BookData from "./BookData";
import { useCart } from "../component/CartContext";
import {
  Box,
  Typography,
  Button,
  CardMedia,
  Breadcrumbs,
  IconButton,
} from "@mui/material";
import { Remove, Add } from "@mui/icons-material";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <BookData>
      {({ books, loading, error }) => {
        if (loading) {
          return (
            <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
              <Navbar showSearchAndIcons={true} />
              <Typography sx={{ textAlign: "center", color: "gray.500", my: 4 }}>
                Loading cart...
              </Typography>
            </Box>
          );
        }

        if (error) {
          return (
            <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
              <Navbar showSearchAndIcons={true} />
              <Typography sx={{ textAlign: "center", color: "red.500", my: 4 }}>
                {error}
              </Typography>
            </Box>
          );
        }

        const cartBooks = cart.map((cartItem) => {
          const book = books.find((book: { id: number | string }) => book.id === cartItem.id);
          if (!book) {
            return null;
          }
          return {
            ...book,
            quantity: cartItem.quantity,
          };
        }).filter((book): book is { id: number | string; title: string; author: string; price: number; image: string; discountPrice: number; rating: number; quantity: number } => book !== null);

        return (
          <Box sx={{ minHeight: "100vh", bgcolor: "white" }}>
            <Navbar showSearchAndIcons={true} />
            {/* Breadcrumb Navigation */}
            <Box sx={{ width: "68%", mx: "auto", mt: 2, maxWidth: "90%" }}>
              <Breadcrumbs separator="/">
                <Link to="/home" style={{ textDecoration: "none", color: "#1976d2" }}>
                  Home
                </Link>
                <Typography color="text.primary">My Cart</Typography>
              </Breadcrumbs>
            </Box>
            {/* Cart Container */}
            <Box sx={{ width: "68%", mx: "auto", mt: 2, maxWidth: "90%" }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", mb: 4 }}>
                My Cart ({cartBooks.length})
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Cart Items */}
                {cartBooks.length > 0 ? (
                  cartBooks.map((book) => (
                    <Box
                      key={book.id}
                      sx={{
                        bgcolor: "white",
                        boxShadow: 1,
                        borderRadius: 2,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <CardMedia
                          component="img"
                          image={book.image}
                          alt={book.title}
                          sx={{ width: "65px", height: "95px", borderRadius: 1 }}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "gray.900" }}>
                            {book.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "gray.600" }}>
                            by {book.author}
                          </Typography>
                          <Typography variant="body1" sx={{ color: "gray.900" }}>
                            Rs. {book.price}{" "}
                            <Typography component="span" sx={{ textDecoration: "line-through", color: "gray.500", fontSize: "0.9rem" }}>
                              Rs. {book.discountPrice}
                            </Typography>
                          </Typography>
                        </Box>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <IconButton
                            onClick={() => updateQuantity(book.id, book.quantity - 1)}
                            sx={{ color: "gray.600" }}
                          >
                            <Remove />
                          </IconButton>
                          <Typography variant="body1">{book.quantity}</Typography>
                          <IconButton
                            onClick={() => updateQuantity(book.id, book.quantity + 1)}
                            sx={{ color: "gray.600" }}
                          >
                            <Add />
                          </IconButton>
                        </Box>
                        <Button
                          onClick={() => removeFromCart(book.id)}
                          sx={{ color: "gray.500", textTransform: "none", "&:hover": { color: "red.500" } }}
                        >
                          Remove
                        </Button>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography sx={{ textAlign: "center", color: "gray.500", my: 4 }}>
                    Your cart is empty.
                  </Typography>
                )}
                {/* Current Location and Place Order */}
                {cartBooks.length > 0 && (
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 4 }}>
                    <Button
                      sx={{ color: "gray.500", textTransform: "none", display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <LocationOnIcon />
                      Use Current Location
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" }, px: 4 }}
                    >
                      PLACE ORDER
                    </Button>
                  </Box>
                )}
                {/* Address Details and Order Summary */}
                <Box sx={{ mt: 6 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Address Details
                  </Typography>
                  <Box sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 2, p: 4, height: "120px" }}>
                    {/* Placeholder for address input */}
                  </Box>
                </Box>
                <Box sx={{ mt: 4, mb: 6 }}>
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                    Order Summary
                  </Typography>
                  <Box sx={{ bgcolor: "white", boxShadow: 1, borderRadius: 2, p: 4, height: "120px" }}>
                    {/* Placeholder for order summary */}
                  </Box>
                </Box>
              </Box>
            </Box>
            {/* Footer */}
            <Box sx={{ bgcolor: "gray.800", color: "white", textAlign: "center", py: 2, mt: "auto" }}>
              <Typography variant="body2">
                Copyright © 2020, Bookstore Private Limited. All Rights Reserved
              </Typography>
            </Box>
          </Box>
        );
      }}
    </BookData>
  );
};

export default Cart;