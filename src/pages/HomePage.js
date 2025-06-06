import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const HomePage = () => {
	const navigate = useNavigate();

	const handleTest = () => {
		axiosInstance.get('/v1/api/auth/test')
		.then((response) => {
			console.log('Success:', response);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const handleReissue = () => {
		const accessToken = localStorage.getItem('accessToken'); // Retrieve token from localStorage
		const refreshToken = localStorage.getItem('refreshToken');
		console.log(accessToken);
		axios.get(`${process.env.REACT_APP_API_URL}/v1/api/auth/reissued`, {
		headers: {
			Authorization: accessToken, // Set Authorization header
			refreshToken : refreshToken,
		},
		})
		.then((response) => {
			let newAccessToken = response.headers.get("accessToken");
			let newRefreshToken = response.headers.get("refreshToken");
			localStorage.setItem("accessToken", newAccessToken);
			localStorage.setItem("refreshToken", newRefreshToken);
		})
		.then((data) => {
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const handleTILList = () => {
		navigate('/TILListPage');
	}

	const handleCodeList = () => {
		navigate('/CodeListPage');
	}

	return (
		<div style={{ textAlign: 'center', marginTop: '50px' }}>
			<h2>Welcome to Home Page</h2>
			<button onClick={handleTest}>Test</button>
			<button onClick={handleReissue}>Reissue</button>
			<button onClick={handleTILList}>TIL</button>
			<button onClick={handleCodeList}>Code</button>
		</div>
	);
};

export default HomePage;