import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

const CodeDetailsPage = () => {
    const { id } = useParams(); // Get post ID from URL
    const [post, setPost] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newCode, setNewCode] = useState(''); // 코드 입력 상태
    const [newDescription, setNewDescription] = useState(''); // 설명 입력 상태
    const [showModal, setShowModal] = useState(false); // 리뷰 작성 모달 상태
    const [showReviewModal, setShowReviewModal] = useState(false); // 리뷰 보기 모달 상태
    const [showReviewListModal, setShowReviewListModal] = useState(false); // 리뷰 보기 모달 상태
    const [selectedReview, setSelectedReview] = useState(null); // 선택된 리뷰
    const navigate = useNavigate();

    // 포맷팅 함수
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const postResponse = await axiosInstance.get(`/v1/api/post/code/detail/${id}`);
                setPost(postResponse.data.data);
            } catch (err) {
                setError('Failed to load post details');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`/v1/api/post/code/${id}`);
            navigate('/Code');
        } catch (err) {
            setError('Failed to delete post');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!newCode || !newDescription) return;

        try {
            await axiosInstance.post('/v1/api/review', {
                codePostId: post.id,
                code: newCode,
                description: newDescription
            });
            setNewCode('');
            setNewDescription('');
            setShowModal(false); // 모달 닫기
        } catch (err) {
            setError('Failed to submit review');
        }
    };

    const handleShowReviews = async () => {
        try {
            const reviewResponse = await axiosInstance.get(`/v1/api/review/${post.id}/list`);
            if (reviewResponse.data.data) {
                setReviews(reviewResponse.data.data);
            } else {
                setReviews([]); // 빈 배열로 설정
            }
            setShowReviewListModal(true); // 리뷰 목록 보기 모달 열기
        } catch (err) {
            setError('Failed to load reviews');
        }
    };

    const handleReviewClick = async (reviewId) => {
        try {
            const reviewResponse = await axiosInstance.get(`/v1/api/review/detail/${reviewId}`); // 리뷰 ID를 사용하여 상세 정보 요청
            if (reviewResponse.data.data) {
                setSelectedReview(reviewResponse.data.data); // 선택된 리뷰 데이터 설정
                setShowReviewModal(true); // 상세 모달 열기
            }
        } catch (err) {
            setError('Failed to load review details');
        }
    };

    const handleUpdateReview = async (review) => {
        try {
            const reviewResponse = await axiosInstance.put(`/v1/api/review`, {
                id: review.id,
                email: localStorage.getItem('email'),
                code: review.code,
                description: review.description
            });

        } catch (err) {
            setError('Failed to update review');
        }
    };

    // 리뷰 삭제 함수
    const handleDeleteReview = async (reviewId) => {
        console.log("reviewId:", reviewId);
        try {
            const reviewResponse = await axiosInstance.delete(`/v1/api/review`, {
                data: {
                    id: reviewId,
                    email: localStorage.getItem('email')
                }
            });
            console.log("reviewResponse:",reviewResponse);
            setReviews(reviews.filter(review => review.id !== reviewId)); // 삭제된 리뷰를 목록에서 제거
            setShowReviewModal(false); // 모달 닫기
        } catch (err) {
            setError('Failed to delete review');
        }
    };

    const closeReviewDetail = () => {
        setSelectedReview(null); // 리뷰 상세 모달 닫기
    };


    if (loading) return <p>Loading post details...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!post) return <p>Post not found.</p>;

    return (
        <div className="container mt-5 position-relative">
            {/* Star Rating in the Top-Right Corner */}
            <div className="position-absolute top-0 end-0 p-2">
                {[...Array(5)].map((_, index) => (
                    <span key={index} style={{ color: index < post.level ? '#ffc107' : '#e4e5e9', fontSize: '3rem' }}>
                        {index < post.level ? '★' : '☆'}
                    </span>
                ))}
            </div>

            <div className="mb-5">
                {/* Post Title */}
                <h1 className="display-4 mb-3">{post.title}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <span className="text-muted me-2">
                            {post.memberDto.nickname} | {new Date(post.createDate).toLocaleString('ko-KR', {
                            year: 'numeric', month: '2-digit', day: '2-digit',
                            hour: '2-digit', minute: '2-digit', hour12: false
                        })}
                        </span>

                        {/* Dropdown Button for Edit/Delete */}
                        <div className="dropdown me-2">
                            <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <li>
                                    <Link
                                        to={`/CodeUpdate/${post.id}`}
                                        state={{ post }}
                                        className="dropdown-item"
                                    >
                                        수정
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleDelete}
                                        className="dropdown-item"
                                    >
                                        삭제
                                    </button>
                                </li>
                            </ul>
                        </div>

                        {/* 리뷰 작성 및 보기 버튼 */}
                        <button className="btn btn-primary me-2" onClick={() => setShowModal(true)}>리뷰 작성</button>
                        <button className="btn btn-info" onClick={handleShowReviews}>리뷰 목록</button>
                    </div>
                </div>
                <p className="lead mb-5">{post.reviewDay}</p>
            </div>

            {/* Row for Description and Code */}
            <div className="row mb-5">
                {/* Code Column */}
                <div className="col-md-6">
                    <h5>Code</h5>
                    <SyntaxHighlighter language={post.language}>
                        {post.code}
                    </SyntaxHighlighter>
                </div>

                {/* Description Column */}
                <div className="col-md-6">
                    <h5>Description</h5>
                    <p className="lead">{post.description}</p>
                </div>
            </div>

            {/* Review Modal */}
            {showModal && (
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '10%', left: '5%', width: '90%', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ maxWidth: '600px', width: '100%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">리뷰 작성</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="code" className="form-label">Code</label>
                                        <textarea
                                            id="code"
                                            className="form-control"
                                            value={newCode}
                                            onChange={(e) => setNewCode(e.target.value)}
                                            placeholder="코드를 입력해주세요"
                                            required
                                            style={{ minHeight: '150px', backgroundColor: '#f0f0f0', color: '#333', fontFamily: 'Arial, sans-serif' }}
                                        />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea
                                            id="description"
                                            className="form-control"
                                            value={newDescription}
                                            onChange={(e) => setNewDescription(e.target.value)}
                                            placeholder="설명을 입력해주세요"
                                            required
                                            style={{ minHeight: '150px', backgroundColor: 'white', color: '#333', fontFamily: 'Arial, sans-serif' }}
                                        />
                                    </div>

                                    <button type="submit" className="btn btn-success">제출</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Review Viewing Modal */}
            {showReviewListModal && (
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '10%', left: '5%', width: '90%', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ maxWidth: '600px', width: '100%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">리뷰 목록</h5>
                                <button type="button" className="btn-close" onClick={() => setShowReviewListModal(false)}></button> {/* 수정된 부분 */}
                            </div>
                            <div className="modal-body">
                                {reviews.length > 0 ? (
                                    <ul className="list-group">
                                        {reviews.map((review) => (
                                            <li
                                                key={review.id}
                                                className="list-group-item"
                                                onClick={() => handleReviewClick(review.id)} // 클릭 이벤트 추가
                                                style={{ cursor: 'pointer' }} // 커서 변경
                                            >
                                                {formatDateTime(review.createdAt)} {/* 포맷팅된 날짜 시간 표시 */}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>리뷰가 없습니다.</p> // 빈 리뷰 목록 메시지
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showReviewModal && selectedReview && (
                <div className="modal show" style={{ display: 'block', position: 'fixed', top: '10%', left: '5%', width: '90%', zIndex: 1050 }}>
                    <div className="modal-dialog" style={{ maxWidth: '1200px', width: '100%' }}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">리뷰 상세</h5>
                                <button type="button" className="btn-close" onClick={closeReviewDetail}></button>
                            </div>
                            <div className="modal-body">
                                <small className="text-muted" style={{ display: 'block', marginBottom: '1rem' }}>
                                    <strong>작성일:</strong> {formatDateTime(selectedReview.createdAt)}
                                </small>
                                <div className="d-flex">
                                    <div className="me-3" style={{ flex: 1 }}>
                                        <h6>코드</h6>
                                        <SyntaxHighlighter language={post.language}>
                                            {selectedReview.code}
                                        </SyntaxHighlighter>
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h6>설명</h6>
                                        <p className="lead">{selectedReview.description}</p>
                                    </div>
                                </div>

                                {/* 수정 및 삭제 버튼 추가 */}
                                <div className="mt-3 d-flex justify-content-end">
                                    <Link to={`/ReviewUpdate/${selectedReview.id}`} className="btn btn-warning me-2">
                                        수정
                                    </Link>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDeleteReview(selectedReview.id)}
                                    >
                                        삭제
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CodeDetailsPage
