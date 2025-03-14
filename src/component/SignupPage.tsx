// src/component/SignupPage.tsx
import React, { useState } from "react";
import "./AuthPage.css";
import bookStoreImage from "../assests1/BookStore.png";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Added for linking to login
import { signup } from "./api"; // Import the signup API

interface FormData {
  email?: string;
  password?: string;
  fullName?: string;
  mobileNumber?: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const [error, setError] = useState<string | null>(null); // Added state for error messages
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      await signup({
        fullName: formData.fullName!,
        email: formData.email!,
        password: formData.password!,
        phone: formData.mobileNumber!, // Renamed to match API field 'phone'
      });
      console.log("Signup successful:", formData);
      navigate("/login"); // Navigate to login page after successful signup
    } catch (err) {
      setError((err as Error).message || "Signup failed. Please try again.");
      console.error("Signup error:", err);
    }
  };

  return (
    <div className="auth-container">
      <div className="illustration">
        <img src={bookStoreImage} alt="Online Book Shopping" />
        <p>ONLINE BOOK SHOPPING</p>
      </div>
      <div className="auth-form SignUp">
        <div className="toggle-buttons">
          <button className="toggle-btn" onClick={() => navigate("/login")}>
            LOGIN
          </button>
          <button className="toggle-btn active" onClick={() => navigate("/signup")}>
            SIGNUP
          </button>
        </div>
        <form onSubmit={handleSubmit} >
          <div className="form-group SignUpForm ">
            <label className=" text-sm ">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ""}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="form-group SignUpForm">
            <label className=" text-sm ">Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber || ""}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="form-group SignUpForm">
            <label className=" text-sm ">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleInputChange}
              placeholder="yadav.ponam@bridgeit.com"
              required
            />
          </div>
          <div className="form-group SignUpForm">
            <label className=" text-sm ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ""}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          {error && ( // Added error display
            <p style={{ color: "red", textAlign: "center", margin: "10px 0" }}>
              {error}
            </p>
          )}
          <button type="submit" className="submit-btn SignSub">
            Signup
          </button>
        </form>
      
      
      </div>
    </div>
  ); 
};

export default SignupPage;