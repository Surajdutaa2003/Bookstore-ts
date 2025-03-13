// src/components/LoginPage.tsx
import React, { useState } from 'react';
import './AuthPage.css';
import bookStoreImage from '../assests1/BookStore.png'; // Corrected path
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

interface FormData {
  email?: string;
  password?: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted:', formData);
    // Add your login authentication logic here
  };

  return (
    <div className="auth-container">
      <div className="illustration">
        <img src={bookStoreImage} alt="Online Book Shopping" />
        <p>ONLINE BOOK SHOPPING</p>
      </div>
      <div className="auth-form Login">
        <div className="toggle-buttons">
          <button
            className="toggle-btn active"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
          <button
            className="toggle-btn"
            onClick={() => navigate('/signup')}
          >
            SIGNUP
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor='Email'>Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleInputChange}
              placeholder="yadav.ponam@bridgeit.com"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
            id='password'
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Login
          </button>
          <p className="forgot-password " color='black'>
  <Link to="/forgotPassword" >Forgot Password?</Link>
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