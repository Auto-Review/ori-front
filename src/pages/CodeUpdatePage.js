import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const CodeUpdatePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get post ID from URL parameters
    const location = useLocation();
    const navigate = useNavigate();

    // Use post data from route state if available, otherwise set to null
    const initialPost = location.state?.post || null;
    
    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [level, setLevel] = useState(initialPost ? initialPost.level : '');
    const [reviewDay, setReviewDay] = useState(initialPost ? initialPost.reviewDay : '');
    const [description, setDescription] = useState(initialPost ? initialPost.description : '');
    const [code, setCode] = useState(initialPost ? initialPost.code : '');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.put('/v1/api/post/code/update', {
                id: id,
                title: title,
                level: level,
                reviewDay: reviewDay,
                description: description,
                code: code,
            });
        
        } catch (err) {
            setError('Failed to update post');
        } finally {
            setLoading(false);
        }

        navigate('/Code'); // Redirect to posts page after updating
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Update Post</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title:</label>
                    <input
                        id="title"
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="level" className="form-label">Level:</label>
                    <input
                        id="level"
                        type="number"
                        className="form-control"
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="reviewDay" className="form-label">Review Time:</label>
                    <input
                        id="reviewDay"
                        type="date"
                        className="form-control"
                        value={reviewDay.substring(0, 10)}
                        onChange={(e) => setReviewDay(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea
                        id="description"
                        className="form-control"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="code" className="form-label">Code:</label>
                    <textarea
                        id="code"
                        className="form-control"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating Post...' : 'Update Post'}
                </button>
            </form>

            {error && <p className="text-danger mt-3">Error: {error}</p>}
        </div>
    );
};

export default CodeUpdatePage;