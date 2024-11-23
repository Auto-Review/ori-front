import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const CodeSavePage = () => {
    const [title, setTitle] = useState('');
    const [level, setLevel] = useState(0); // 초기값 0
    const [isReviewDayEnabled, setIsReviewDayEnabled] = useState(false); // 토글 상태
    const [reviewDay, setReviewDay] = useState('');
    const [description, setDescription] = useState('');
    const [code, setCode] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        try {
            let response = await axiosInstance.post('/v1/api/post/code', {
                title,
                level,
                reviewDay: isReviewDayEnabled ? reviewDay : '', // 토글에 따라 리뷰 데이 설정
                description,
                code,
            });

            if (isReviewDayEnabled && reviewDay !== "") {
                await axiosInstance.post('/v1/api/notification', {
                    id: response.data.data,
                    content: title,
                    reviewDay,
                });
            }
            setSuccess(true);
            navigate('/Code');
        } catch (err) {
            setError(err.message);
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

            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="title" className="form-label" style={{ fontSize: '1.5rem' }}></label>
                    <input
                        id="title"
                        type="text"
                        className="form-control form-control-lg border-0" // 테두리 보이지 않게 설정
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력해주세요" // 플레이스홀더 텍스트 추가
                        style={{ fontSize: '1.5rem', width: '800px' }}
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
                <button type="submit" className="btn btn-primary">Submit</button>
                {error && <p className="text-danger mt-3">Error: {error}</p>}
            </form>
        </div>
    );
};

export default CodeSavePage;
