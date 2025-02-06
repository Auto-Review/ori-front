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
    const [language, setLanguage] = useState('javascript'); // 초기 언어 설정
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
                language,
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

    const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
            e.preventDefault(); // 기본 동작 방지
            const start = e.target.selectionStart;
            const end = e.target.selectionEnd;

            // 현재의 코드 값을 가져와서 Tab 추가
            const newCode = code.substring(0, start) + '    ' + code.substring(end); // 4칸 공백 추가
            setCode(newCode);

            // 커서를 Tab 추가 후 위치로 이동
            setTimeout(() => {
                e.target.selectionStart = e.target.selectionEnd = start + 4;
                e.target.focus(); // 포커스 유지
            }, 0);
        }
    };

    // 오늘 날짜를 YYYY-MM-DD 형식으로 구하는 함수
    const getTodayDate = () => {
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // January is 0!
        const yyyy = today.getFullYear();
        return `${yyyy}-${mm}-${dd}`;
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
                        style={{ fontSize: '2rem', width: '800px', background: 'transparent', borderBottom: '1px solid #ccc' }}
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
                            min={getTodayDate()} // 오늘 이후 날짜만 선택 가능
                            style={{ width: '200px' }} // 날짜 입력 필드 길이 조정
                        />
                    )}
                </div>

                {/* Language Selection */}
                <div className="mb-4">
                    <label htmlFor="language" className="form-label">Select Language:</label>
                    <select
                        id="language"
                        className="form-select"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        style={{ width: '300px' }} // 드롭다운 길이 조정
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="csharp">C#</option>
                        <option value="cpp">C++</option>
                        <option value="c">C</option>
                        <option value="ruby">Ruby</option>
                        <option value="go">Go</option>
                        {/* 필요한 언어를 추가하세요 */}
                    </select>
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
                            onKeyDown={handleKeyDown} // Tab 키 이벤트 처리
                            required
                            style={{
                                height: 'auto',
                                minHeight: '300px',
                                backgroundColor: '#f0f0f0',
                                color: '#333',
                                fontFamily: 'Arial, sans-serif',
                            }} // 배경색 회색으로 설정
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
                <button type="submit" className="btn btn-primary">Submit</button>
                {error && <p className="text-danger mt-3">Error: {error}</p>}
            </form>
        </div>
    );
};

export default CodeSavePage;
