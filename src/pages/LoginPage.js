import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
	const navigate = useNavigate();

	const handleLoginSuccess = async (credentialResponse) => {
		const accessToken = credentialResponse.credential;

		// Send access token to the backend
		await axios.post(`${process.env.REACT_APP_API_URL}/v1/api/auth/token`, {
			accessToken: accessToken
		})
			.then(async (response) => {
				console.log(response);
				let accessToken = response.headers.get("accessToken");
				let refreshToken = response.headers.get("refreshToken");
				let email = response.data.data;

				localStorage.setItem("accessToken", accessToken);
				localStorage.setItem("refreshToken", refreshToken);
				localStorage.setItem("email", email);

			})
			.catch(error => {
				console.error('Error:', error);
			});

		// 로그인 후 이동
		navigate('/Code');
	};

	const handleLoginFailure = (error) => {
		console.error("Login failed", error);
	};

	return (
		<GoogleOAuthProvider clientId={process.env.REACT_APP_Google_Client_ID}>
			<div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
				<div className="card p-4" style={{ maxWidth: '400px', width: '100%', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
					<h2 className="text-center mb-4" style={{ color: '#333' }}>Login</h2>
					<GoogleLogin
						onSuccess={handleLoginSuccess}
						onError={handleLoginFailure}
						size="large"
						theme="outline"
						shape="pill"
					/>
				</div>
			</div>
		</GoogleOAuthProvider>
	);
};

export default LoginPage;
