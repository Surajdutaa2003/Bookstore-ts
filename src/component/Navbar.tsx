// src/component/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  IconButton,
  Tooltip,
  Container,
} from "@mui/material";
import { Search, ShoppingCart, AccountCircle } from "@mui/icons-material";
import books2 from "../assests1/education.png";
import "./Home.css";

interface NavbarProps {
  showSearchAndIcons: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ showSearchAndIcons }) => {
  return (
    <AppBar
      position="static"
      sx={{ bgcolor: "#a52a2a", height: "60px", width: "100%", boxShadow: 2 }}
    >
      <Container maxWidth={false} sx={{ paddingX: "20px" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "60px",
          }}
        >
          {/* Logo */}
          <Typography
            className="Books"
            variant="h6"
            component={Link}
            to="/home"
            sx={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
              fontSize: "1.2rem",
            }}
          >
            <img src={books2} alt="" className="bookImg" /> Bookstore
          </Typography>

          {/* Search Bar & Icons (Conditionally Rendered) */}
          {showSearchAndIcons && (
            <>
              <Box
                sx={{
                  background: "white",
                  borderRadius: 2,
                  paddingX: 1,
                  display: "flex",
                  alignItems: "center",
                  flexGrow: 0.4,
                  height: "35px",
                  maxWidth: "500px",
                  width: "100%",
                }}
              >
                <Search sx={{ color: "gray" }} />
                <InputBase
                  placeholder="Search..."
                  sx={{ marginLeft: 1, flex: 1, fontSize: "0.9rem" }}
                />
              </Box>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Tooltip title="Profile">
                  <IconButton
                    component={Link}
                    to="/profile"
                    sx={{ color: "white", padding: "6px" }}
                  >
                    <AccountCircle />
                    <Typography
                      variant="caption"
                      sx={{ color: "white", marginLeft: "4px" }}
                      className="nav-text"
                    >
                      Profile
                    </Typography>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cart">
                  <IconButton
                    component={Link}
                    to="/cart"
                    sx={{ color: "white", padding: "6px" }}
                  >
                    <ShoppingCart />
                    <Typography
                      variant="caption"
                      sx={{ color: "white", marginLeft: "4px" }}
                      className="nav-text"
                    >
                      Cart
                    </Typography>
                  </IconButton>
                </Tooltip>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;