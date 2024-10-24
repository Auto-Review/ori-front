import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored tokens or user info
    // Redirect back to the login page
    navigate('/');
  };

  const handleTest = () => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    console.log(accessToken);
    fetch('/v1/api/auth/test', {
      method: 'GET', // or POST, PUT, DELETE depending on your request type
      headers: {
        'Authorization': accessToken, // Set Authorization header
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  const handleReissue = () => {
    const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
    const refreshToken = localStorage.getItem('refreshToken');
    console.log(accessToken);
    fetch('v1/api/auth/reissued', {
      method: 'GET', // or POST, PUT, DELETE depending on your request type
      headers: {
        'Authorization': accessToken, // Set Authorization header
        'refreshToken' : refreshToken,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      let newAccessToken = response.headers.get("accessToken");
      let newRefreshToken = response.headers.get("refreshToken");
      console.log("accessToken", newAccessToken);
      console.log("refreshToken", newRefreshToken);
      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", newRefreshToken);
    })
    .then((data) => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Welcome to Home Page</h2>
      <button onClick={handleTest}>Test</button>
      <button onClick={handleReissue}>Reissue</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;