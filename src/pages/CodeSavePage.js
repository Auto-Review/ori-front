import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const CodeSavePage = () => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState('');
    const [reviewDay, setReviewDay] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission
        setError(null);
        setSuccess(false);

        try {
            await axiosInstance.post('/v1/api/post/code/save', {
                title: title,
                level: level,
                reviewDay: reviewDay,
                description: description,
                code: code,
            });
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } 
        navigate('/CodeListPage');
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Create Post</h1>
            <form onSubmit={handleSubmit}>
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
                        value={reviewDay.substring(0, 10)} // datetime-local 형식에 맞게 변환
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
                <button type="submit" className="btn btn-primary">
                    sumbit
                </button>
                {error && <p className="text-danger mt-3">Error: {error}</p>}
            </form>
        </div>
    );
};

export default CodeSavePage;