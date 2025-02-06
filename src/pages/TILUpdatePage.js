import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const UpdatePostPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get post ID from URL parameters
    const location = useLocation();
    const navigate = useNavigate();

    // Use post data from route state if available, otherwise set to null
    const initialPost = location.state?.post || null;
    
    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [content, setContent] = useState(initialPost ? initialPost.content : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
        await axiosInstance.put('/v1/api/post/til', {
            id: id,
            title: title,
            content: content,
        });
        
        } catch (err) {
            setError('Failed to update post');
        } finally {
            setLoading(false);
        }

        navigate('/TIL'); // Redirect to posts page after updating
    };

    return (
        <div className="container mt-5">
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-4">
                    <input
                        type="text"
                        //TODO: 제목크기 설정이 안됨
                        className="form-control border-0 h1" 
                        style={{ minHeight: '2rem' }} 
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <hr className="my-4" /> {/* 구분선 추가 */}
                <div className="mb-4">
                    <textarea
                        className="form-control border-0" // 외곽선 제거
                        rows="10"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating Post...' : 'Update Post'}
                </button>
            </form>

            {error && <p className="text-danger mt-3">Error: {error}</p>}
        </div>
    );
};

export default UpdatePostPage;