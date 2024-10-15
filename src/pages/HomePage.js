import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored tokens or user info
    // Redirect back to the login page
    navigate('/');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to Home Page</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;