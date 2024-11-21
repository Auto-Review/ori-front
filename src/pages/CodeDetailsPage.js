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
                const response = await axiosInstance.get(`/v1/api/post/code/detail/${id}`);
                setPost(response.data.data);
            } catch (err) {
                setError('Failed to load post details');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/v1/api/post/code/delete/${id}`);
            navigate('/Code');
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    if (loading) return <p>Loading post details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="container mt-5 position-relative">
            {/* Star Rating in the Top-Right Corner */}
            <div className="position-absolute top-0 end-0 p-2">
                {[...Array(5)].map((_, index) => (
                    <span key={index} style={{ color: index < post.level ? '#ffc107' : '#e4e5e9', fontSize: '3rem' }}>
                        {index < post.level ? '★' : '☆'}
                    </span>
                ))}
            </div>

            <div className="mb-5">
                {/* Post Title */}
                <h1 className="display-4 mb-3">{post.title}</h1>
                <p className="text-muted d-flex justify-content-between align-items-center">
                    <span>
                        {post.memberDto.nickname} | {new Date(post.createDate).toLocaleString('ko-KR', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit', hour12: false
                    })}
                    </span>
                </p>
                <p className="lead mb-5">{post.reviewDay}</p>
                {/* Dropdown Button */}
                <div className="dropdown">
                    <button
                        className="btn btn-secondary dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        Options
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li>
                            <Link
                                to={`/CodeUpdate/${post.id}`}
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

            {/* Row for Description and Code */}
            <div className="row mb-5">
                {/* Description Column */}
                <div className="col-md-6">
                    <h5>Description</h5>
                    <p className="lead">{post.description}</p>
                </div>

                {/* Code Column */}
                <div className="col-md-6">
                    <h5>Code</h5>
                    <pre className="lead bg-light p-3 rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
                        {post.code}
                    </pre>
                </div>
            </div>
        </div>
    );
};

export default CodeDetailsPage;
