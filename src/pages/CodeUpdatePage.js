import React, { useState } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const CodeUpdatePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get post ID from URL parameters
    const location = useLocation();
    const navigate = useNavigate();

    // Use post data from route state if available, otherwise set to null
    const initialPost = location.state?.post || null;

    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [level, setLevel] = useState(initialPost ? initialPost.level : 0); // 초기값 0
    const [isReviewDayEnabled, setIsReviewDayEnabled] = useState(false); // 토글 상태
    const [reviewDay, setReviewDay] = useState(initialPost ? initialPost.reviewDay : '');
    const [description, setDescription] = useState(initialPost ? initialPost.description : '');
    const [code, setCode] = useState(initialPost ? initialPost.code : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.put('/v1/api/post/code', {
                id: id,
                title: title,
                level: level,
                reviewDay: isReviewDayEnabled ? reviewDay : '', // 토글에 따라 리뷰 데이 설정
                description: description,
                code: code,
            });
            navigate('/Code'); // Redirect to posts page after updating
        } catch (err) {
            setError('Failed to update post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5 position-relative">
            {/* Star Rating in the Top-Right Corner */}
            <div className="position-absolute top-0 end-0 p-2">
                {[...Array(5)].map((_, index) => (
                    <span
                        key={index}
                        onClick={() => setLevel(index + 1)}
                        style={{ cursor: 'pointer', color: index < level ? '#ffc107' : '#e4e5e9', fontSize: '3rem' }}
                    >
                        {index < level ? '★' : '☆'}
                    </span>
                ))}
            </div>

            <h1 className="display-4 mb-3">Update Post</h1>
            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm mb-5">
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

                {/* Review Day Toggle Switch and Date Input */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Set Review Day:</label>
                    <div className="form-check form-switch me-3">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            id="reviewDayToggle"
                            checked={isReviewDayEnabled}
                            onChange={() => setIsReviewDayEnabled(!isReviewDayEnabled)}
                        />
                        <label className="form-check-label" htmlFor="reviewDayToggle">{isReviewDayEnabled ? 'On' : 'Off'}</label>
                    </div>

                    {/* Conditional Date Input */}
                    {isReviewDayEnabled && (
                        <input
                            id="reviewDay"
                            type="date"
                            className="form-control"
                            value={reviewDay}
                            onChange={(e) => setReviewDay(e.target.value)}
                            style={{ width: '200px' }} // 날짜 입력 필드 길이 조정
                        />
                    )}
                </div>

                {/* Row for Code and Description */}
                <div className="row mb-5">
                    {/* Code Column */}
                    <div className="col-md-6">
                        <h5>Code</h5>
                        <textarea
                            className="form-control"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            style={{ height: '200px' }} // 동일한 높이 적용
                        />
                    </div>

                    {/* Description Column */}
                    <div className="col-md-6">
                        <h5>Description</h5>
                        <textarea
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{ height: '200px' }} // 동일한 높이 적용
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating Post...' : 'Update Post'}
                </button>
                {error && <p className="text-danger mt-3">Error: {error}</p>}
            </form>
        </div>
    );
};

export default CodeUpdatePage;
