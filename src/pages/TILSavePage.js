import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const TILSavePage = () => {
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(null);
        setSuccess(false);

        try {
            await axiosInstance.post('/v1/api/til/save', {
                title: title,
                content: body,
            });
            setSuccess(true);
            setTitle(''); // Reset form fields
            setBody('');
        } catch (err) {
            setError(err.message);
        } 
        navigate('/TILListPage');
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
            <h1>Create a New Post</h1>
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
            
                <button type="submit" style={{ padding: '10px' }}>
                    submit
                </button>
            </form>

            {success && <p style={{ color: 'green' }}>Post created successfully!</p>}
            {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        </div>
    );
};

export default TILSavePage;