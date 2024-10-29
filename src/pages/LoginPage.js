import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {

  	const navigate = useNavigate();

  	const handleLoginSuccess = (credentialResponse) => {
    const accessToken = credentialResponse.credential; // The Google access token
    
    // Send access token to the backend
    axios.post(`${process.env.REACT_APP_API_URL}/v1/api/auth/token`, {
      	accessToken: accessToken
    })
    .then(response => {
		let accessToken = response.headers.get("accessToken");
		let refreshToken = response.headers.get("refreshToken");
		console.log("accessToken", accessToken);
		console.log("refreshToken", refreshToken);

		localStorage.setItem("accessToken", accessToken);
		localStorage.setItem("refreshToken", refreshToken);
    })
    .catch(error => {
      	console.error('Error:', error);
    });

    navigate('/HomePage');
  	};

  	// Handle login failure
	const handleLoginFailure = (error) => {
		console.error("Login failed", error);
	};

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_Google_Client_ID}>
		<div>
			<h2>Login with Google</h2>
			<GoogleLogin
				onSuccess={handleLoginSuccess}
				onError={handleLoginFailure}
			/>
		</div>
		</GoogleOAuthProvider>
	);
};

export default LoginPage;