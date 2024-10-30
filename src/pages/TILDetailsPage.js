import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TILDetailsPage = () => {
	const { id } = useParams(); // Get post ID from URL
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
	// Fetch post details from the backend API
	const fetchPost = async () => {
		try {
			const response = await axiosInstance.get(`/v1/api/til/${id}`);
			setPost(response.data.data);
			console.log(response);
		} catch (err) {
			setError('Failed to load post details');
		} finally {
			setLoading(false);
		}
	};

	fetchPost();
	}, [id]);


	const handleDelete = async () => {
		try{
			const response = await axiosInstance.delete(`/v1/api/til/delete/${id}`)
		} catch (err) {
			setError('Failed to load post details');
		} finally {
			setLoading(false);
		}
		navigate('/TILListPage');
	}

	if (loading) return <p>Loading post details...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found.</p>;

	return (
    <div style={{ padding: '20px' }}>
		<h1>{post.title}</h1>
		<p>{post.content}</p>
		<button onClick={() => navigate('/TILListPage')} style={{ marginTop: '20px' }}>
			Back to Posts
		</button>
		<button onClick={handleDelete}>delete</button>
		<Link to={`/TILUpdatePage/${post.id}`} style={{ display: 'block', marginTop: '10px', color: 'blue', textDecoration: 'underline' }}>
			Update Post
		</Link>
		
    </div>
  	);
};

export default TILDetailsPage;