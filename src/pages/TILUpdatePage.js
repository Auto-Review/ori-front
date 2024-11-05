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
    const [body, setBody] = useState(initialPost ? initialPost.content : '');
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
        await axiosInstance.put('/v1/api/til/update', {
            id: id,
            title: title,
            content: body,
        });
        
        } catch (err) {
            setError('Failed to update post');
        } finally {
            setLoading(false);
        }

        navigate('/TILListPage'); // Redirect to posts page after updating
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
                    <label htmlFor="body" className="form-label">Body:</label>
                    <textarea
                        id="body"
                        className="form-control"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        rows="5"
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

export default UpdatePostPage;