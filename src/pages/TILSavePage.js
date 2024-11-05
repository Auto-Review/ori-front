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
        <div className="container mt-5" style={{ maxWidth: '500px' }}>
            <h1 className="text-center mb-4">Create a New Post</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">제목:</label>
                    <input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="body" className="form-label">본문:</label>
                    <textarea
                        id="body"
                        value={body}
                        onChange={(e) => setBody(e.target.value)}
                        required
                        className="form-control"
                        rows="4"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>

            {/* Success and Error Messages */}
            {success && <p className="text-success mt-3 text-center">Post created successfully!</p>}
            {error && <p className="text-danger mt-3 text-center">Error: {error}</p>}
        </div>
    );
};

export default TILSavePage;