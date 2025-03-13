import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "../src/component/LoginPage";
import SignupPage from "../src/component/SignupPage";
import Home from "./component/Home";
import BookDetails from "./component/BookDetails"; // ✅ Import BookDetails
import ForgotPassword from "../src/component/ForgotPassword";

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} /> {/* ✅ Add this route */}
          <Route path="/forgotPassword" element={<ForgotPassword/>} />

        </Routes>
      </div>
    </Router>
  );
};

export default App;
