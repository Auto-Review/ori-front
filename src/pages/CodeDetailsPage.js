import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useParams, Link, useNavigate } from 'react-router-dom';

const CodeDetailsPage = () => {
	const { id } = useParams(); // Get post ID from URL
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
	// Fetch post details from the backend API
	const fetchPost = async () => {
		try {
			const response = await axiosInstance.get(`/v1/api/post/code/view/${id}`);
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
			const response = await axiosInstance.delete(`/v1/api/post/code/delete/${id}`)
		} catch (err) {
			setError('Failed to load post details');
		} finally {
			setLoading(false);
		}
		navigate('/CodeListPage');
	}

	if (loading) return <p>Loading post details...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found.</p>;

	return (
		<div className="container mt-5">
		{/* Post Title */}
		<h1 className="display-4 mb-3">{post.title}</h1>
		
		{/* Post level */}
		<p className="lead mb-5">{post.level}</p>

		{/* Post reviewDay */}
		<p className="lead mb-5">{post.reviewDay}</p>

		{/* Post description */}
		<p className="lead mb-5">{post.description}</p>

		{/* Post code */}
		<p className="lead mb-5">{post.code}</p>

		{/* Button Group */}
		<div className="d-flex gap-3">
			{/* Back Button */}
			<button 
				onClick={() => navigate('/CodeListPage')}
				className="btn btn-secondary"
			>
				Back to Posts
			</button>
			
			{/* Delete Button */}
			<button 
				onClick={handleDelete} 
				className="btn btn-danger"
			>
				Delete
			</button>

			{/* Update Link */}
			<Link 
				to={`/CodeUpdatePage/${post.id}`}
				state={{ post }}
				className="btn btn-primary"
			>
				Update Post
			</Link>
		</div>
	</div>
  	);
};

export default CodeDetailsPage;