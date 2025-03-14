// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WishlistProvider } from "./component/WishlistContext";
import { CartProvider } from "./component/CartContext"; // Import CartProvider
import LoginPage from "./component/LoginPage";
import SignupPage from "./component/SignupPage";
import Home from "./component/Home";
import BookDetails from "./component/BookDetails";
import ForgotPassword from "./component/ForgotPassword";
import Wishlist from "./component/Wishlist";
import Cart from "./component/Cart"; // Import Cart component

const App: React.FC = () => {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className="app min-h-screen bg-gray-100">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/" element={<LoginPage />} />
              <Route path="/home" element={<Home />} />
              <Route path="/book/:id" element={<BookDetails />} />
              <Route path="/forgotPassword" element={<ForgotPassword />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} /> {/* Add Cart route */}
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  );
};

export default App;