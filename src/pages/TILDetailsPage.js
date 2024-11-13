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
			const response = await axiosInstance.get(`/v1/api/post/til/view/${id}`);
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
			const response = await axiosInstance.delete(`/v1/api/post/til/delete/${id}`)
		} catch (err) {
			setError('Failed to load post details');
		} finally {
			setLoading(false);
		}
		navigate('/TIL');
	}

	if (loading) return <p>Loading post details...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found.</p>;

	return (
		<div className="container mt-5">
			{/* Title, Nickname, and Creation Date Combined */}
			<div className="mb-5">
				<h1 className="display-4">{post.title}</h1>
				<p className="text-muted d-flex justify-content-between align-items-center">
                    <span>
                        {post.member.nickname} | {new Date(post.createDate).toLocaleString('ko-KR', { 
                            year: 'numeric', month: '2-digit', day: '2-digit', 
                            hour: '2-digit', minute: '2-digit', hour12: false 
                        })}
                    </span>
                    {/* Dropdown Button */}
                    <div className="dropdown">
                        <button 
                            className="btn btn-secondary dropdown-toggle" 
                            type="button" 
                            id="dropdownMenuButton" 
                            data-bs-toggle="dropdown" 
                            aria-expanded="false"
                        >
                        </button>
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li>
                                <Link 
                                    to={`/TILUpdate/${post.id}`} 
                                    state={{ post }} 
                                    className="dropdown-item"
                                >
                                    수정
                                </Link>
                            </li>
                            <li>
                                <button 
                                    onClick={handleDelete} 
                                    className="dropdown-item"
                                >
                                    삭제
                                </button>
                            </li>
                        </ul>
                    </div>
                </p>
			</div>

			{/* Post Content */}
			<p className="lead mb-5">{post.content}</p>

		</div>
  	);
};

export default TILDetailsPage;