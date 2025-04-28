import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TILDetailsPage = () => {
	const { id } = useParams(); // Get post ID from URL
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [email, setEmail] = useState(localStorage.getItem('email'));
	const [isBookmarked, setIsBookmarked] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		// Fetch post details from the backend API
		const fetchPost = async () => {
			try {
				const response = await axiosInstance.get(email ? `/v1/api/post/til/own/${id}` : `/v1/api/post/til/detail/${id}`);
				setPost(response.data);
				if(email){
					setIsBookmarked(response.data.isBookmarked);
				}
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
			const response = await axiosInstance.delete(`/v1/api/post/til/${id}`)
		} catch (err) {
			setError('Failed to load post details');
		} finally {
			setLoading(false);
		}
		navigate('/TIL');
	}

	const handleScrapToggle = async () => {
		if(email){
			if(isBookmarked !== null){
				setIsBookmarked(!isBookmarked);
			}
			else{
				setIsBookmarked(true);
			}
			await axiosInstance.post('/v1/api/post/til/bookmark', {
				postId: id
			})		
		}
		else{
			navigate("/Login");
		}
	}

	if (loading) return <p>Loading post details...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!post) return <p>Post not found.</p>;

	return (
		<div className="container mt-5">
			{/* Title, Nickname, and Creation Date Combined */}
			<div className="mb-5">
				<h1 className="display-4">{post.title}</h1>
				<div className="d-flex justify-content-between align-items-center">
					<div className="d-flex align-items-center">
                        <span className="text-muted me-2">
                            {post.writer_nickname} | {new Date(post.createDate).toLocaleString('ko-KR', {
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
					</div>

					<div className="d-flex justify-content-end">
						<button
							className={`btn ${isBookmarked ? "btn-success" : "btn-outline-primary"}`}
							onClick={handleScrapToggle}
						>
							{isBookmarked ? "스크랩 완료" : "스크랩"}
						</button>
					</div>
				</div>
			</div>

			{/* Post Content */}
			<p className="lead mb-5">{post.content}</p>

		</div>
  	);
};

export default TILDetailsPage;