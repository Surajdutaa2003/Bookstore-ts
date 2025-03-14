// src/component/LoginPage.tsx
import React, { useState } from "react";
import "./AuthPage.css";
import bookStoreImage from "../assests1/BookStore.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { login } from "./api";

interface FormData {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(formData.email!, formData.password!);
      console.log("Login successful:", formData);
      navigate("/home");
    } catch (err) {
      const errorMessage = (err as Error).message;
      console.error("Login error details:", err);
      // Customize the message for verification errors
      if (errorMessage === "please verify your account") {
        setError("Please verify your account. Check your email for a verification link.");
      } else {
        setError(errorMessage || "Login failed. Please check your credentials.");
      }
    }
  };

  return (
    <div className="auth-container">
      <div className="illustration">
        <img src={bookStoreImage} alt="Online Book Shopping" />
        <p>ONLINE BOOK SHOPPING</p>
      </div>
      <div className="auth-form Login">
        <div className="toggle-buttons">
          <button className="toggle-btn active" onClick={() => navigate("/login")}>
            LOGIN
          </button>
          <button className="toggle-btn" onClick={() => navigate("/signup")}>
            SIGNUP
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="Email">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="yadav.ponam@bridgeit.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          {error && (
            <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
              {error}
            </p>
          )}
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="forgot-password" style={{ color: "black" }}>
            <Link to="/forgotPassword">Forgot Password?</Link>
          </p>
        </form>
        <div className="or-separator orLogin">OR</div>
        <div className="social-buttons">
          <button className="social-btn facebook">Facebook</button>
          <button className="social-btn google">Google</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;