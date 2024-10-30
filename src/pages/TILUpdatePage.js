import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';

const UpdatePostPage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get post ID from URL parameters
    const navigate = useNavigate();

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
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
        <h1>Update Post</h1>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="title">Title:</label>
            <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '8px' }}
            />

            <label htmlFor="body">Body:</label>
            <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            style={{ marginBottom: '10px', padding: '8px', height: '100px' }}
            />

            <button type="submit" disabled={loading} style={{ padding: '10px' }}>
            {loading ? 'Updating Post...' : 'Update Post'}
            </button>
        </form>

        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default UpdatePostPage;