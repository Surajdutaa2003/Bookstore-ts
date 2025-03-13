// src/components/SignupPage.tsx
import React, { useState } from 'react';
import './AuthPage.css';
import bookStoreImage from '../assests1/BookStore.png'; // Corrected path
import { useNavigate } from 'react-router-dom';

interface FormData {
  email?: string;
  password?: string;
  fullName?: string;
  mobileNumber?: string;
}

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({});
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Signup submitted:', formData);
    // Add your signup authentication logic here
  };

  return (
    <div className="auth-container">
      <div className="illustration">
        <img src={bookStoreImage} alt="Online Book Shopping" />
        <p>ONLINE BOOK SHOPPING</p>
      </div>
      <div className="auth-form SignUp">
        <div className="toggle-buttons">
          <button
            className="toggle-btn"
            onClick={() => navigate('/login')}
          >
            LOGIN
          </button>
          <button
            className="toggle-btn active"
            onClick={() => navigate('/signup')}
          >
            SIGNUP
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName || ''}
              onChange={handleInputChange}
              placeholder="Enter Full Name"
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber || ''}
              onChange={handleInputChange}
              placeholder="Enter Mobile Number"
              required
            />
          </div>
          <div className="form-group">
            <label>Email ID</label>
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
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password || ''}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Signup
          </button>
        </form>
        <div className="or-separator orSignup">OR</div>
        {/* <div className="social-buttons">
          <button className="social-btn facebook">Facebook</button>
          <button className="social-btn google">Google</button>
        </div> */}
      </div>
    </div>
  );
};

export default SignupPage;