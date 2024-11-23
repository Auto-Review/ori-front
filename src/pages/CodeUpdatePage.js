import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const CodeUpdatePage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const initialPost = location.state?.post || null;

    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [level, setLevel] = useState(initialPost ? initialPost.level : 0);
    const [isReviewDayEnabled, setIsReviewDayEnabled] = useState(initialPost ? !!initialPost.reviewDay : false);
    const [reviewDay, setReviewDay] = useState(initialPost ? initialPost.reviewDay : '');
    const [description, setDescription] = useState(initialPost ? initialPost.description : '');
    const [code, setCode] = useState(initialPost ? initialPost.code : '');
    const [error, setError] = useState(null);

    useEffect(() => {
        const codeTextarea = document.getElementById('code');
        if (codeTextarea) {
            codeTextarea.style.height = 'auto'; // Reset height
            codeTextarea.style.height = `${codeTextarea.scrollHeight}px`; // Set height based on scroll height
        }

        const descriptionTextarea = document.getElementById('description');
        if (descriptionTextarea) {
            descriptionTextarea.style.height = 'auto'; // Reset height
            descriptionTextarea.style.height = `${descriptionTextarea.scrollHeight}px`; // Set height based on scroll height
        }
    }, [code, description]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            await axiosInstance.put(`/v1/api/post/code/${id}`, {
                title,
                level,
                reviewDay: isReviewDayEnabled ? reviewDay : '',
                description,
                code,
            });
            navigate('/Code');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="container mt-5 position-relative">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label" style={{ fontSize: '1.5rem' }}></label>
                    <input
                        id="title"
                        type="text"
                        className="form-control form-control-lg border-0"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해주세요"
                        style={{
                            fontSize: '3rem',
                            width: '800px',
                            background: 'transparent',
                            borderBottom: '1px solid #ccc',
                            color: '#333', // 텍스트 색상
                            fontFamily: 'Arial, sans-serif', // 폰트 패밀리
                        }}
                        required
                    />
                    {/* Star Rating positioned at the end of the title input */}
                    <div className="position-absolute top-0 end-0 p-2">
                        {[...Array(5)].map((_, index) => (
                            <span
                                key={index}
                                onClick={() => setLevel(index + 1)}
                                style={{
                                    cursor: 'pointer',
                                    color: index < level ? '#ffc107' : '#e4e5e9',
                                    fontSize: '3rem'
                                }} // 별 크기
                            >
                                {index < level ? '★' : '☆'}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Review Day Toggle Switch and Date Input */}
                <div className="mb-3 d-flex align-items-center">
                    <label className="form-label me-3">Review Day:</label>
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

                    {isReviewDayEnabled && (
                        <input
                            id="reviewDay"
                            type="date"
                            className="form-control"
                            value={reviewDay}
                            onChange={(e) => setReviewDay(e.target.value)}
                            style={{ width: '200px' }}
                        />
                    )}
                </div>

                {/* Row for Code and Description */}
                <div className="row mb-5">
                    <div className="col-md-6">
                        <h5>Code</h5>
                        <textarea
                            id="code"
                            className="form-control"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            style={{
                                height: 'auto',
                                minHeight: '300px',
                                backgroundColor: '#f0f0f0',
                                overflow: 'hidden',
                                color: '#333', // 텍스트 색상
                                fontFamily: 'Arial, sans-serif', // 폰트 패밀리
                            }} // 배경색 회색으로 설정
                        />
                    </div>

                    <div className="col-md-6">
                        <h5>Description</h5>
                        <textarea
                            id="description" // ID 추가
                            className="form-control border-0" // 테두리 없애기
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            style={{
                                height: 'auto', // 자동 높이 조절
                                minHeight: '300px', // 최소 높이 설정
                                backgroundColor: 'white',
                                color: '#333', // 텍스트 색상
                                fontFamily: 'Arial, sans-serif', // 폰트 패밀리
                            }} // 배경색 흰색으로 설정
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary">Update</button>
                {error && <p className="text-danger mt-3">Error: {error}</p>}
            </form>
        </div>
    );
};

export default CodeUpdatePage;
