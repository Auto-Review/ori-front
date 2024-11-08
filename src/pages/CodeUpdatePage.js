import React, { useState, useEffect } from 'react';
import axiosInstance from '../auth/axiosInstance';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

const CodeUpdatePage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const { id } = useParams(); // Get post ID from URL parameters
    const location = useLocation();
    const navigate = useNavigate();

    // Use post data from route state if available, otherwise set to null
    const initialPost = location.state?.post || null;
    
    const [title, setTitle] = useState(initialPost ? initialPost.title : '');
    const [level, setLevel] = useState(initialPost ? initialPost.level : '');
    const [reviewDay, setReviewDay] = useState(initialPost ? initialPost.reviewDay : '');
    const [description, setDescription] = useState(initialPost ? initialPost.description : '');
    const [code, setCode] = useState(initialPost ? initialPost.code : '');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axiosInstance.put('/v1/api/post/code/update', {
                id: id,
                title: title,
                level: level,
                reviewDay: reviewDay,
                description: description,
                code: code,
            });
        
        } catch (err) {
            setError('Failed to update post');
        } finally {
            setLoading(false);
        }

        navigate('/Code'); // Redirect to posts page after updating
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Update Post</h1>
            <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                <div className="mb-4">
                <input
                    type="text"
                    className="form-control border-0"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>

                <hr className="my-4" />

                
                <div className="d-flex align-items-center mb-3">
                    <input
                        //TODO: level 변경점을 생각해야함
                        id="level"  
                        type="number"
                        className="form-control border-0 me-2" // 오른쪽 여백 추가
                        value={level}
                        onChange={(e) => setLevel(Number(e.target.value))}
                        required
                    />
                    <div className="flex-grow-1">
                        <input
                            id="reviewDay"
                            type="date"
                            className="form-control"
                            value={reviewDay.substring(0, 10)}
                            onChange={(e) => setReviewDay(e.target.value)}
                            required
                        />
                    </div>
                </div>

                {/* Row for Description and Code */}
                <div className="row mb-5">
                    {/* Description Column */}
                    <div className="col-md-6">
                        <h5>Description</h5>
                        <textarea
                            id="description"
                            className="form-control lead bg-light p-3 rounded border-0"
                            style={{ minHeight: '100px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    {/* Code Column */}
                    <div className="col-md-6">
                        <h5>Code</h5>
                        {/* <div
                            contentEditable
                            className="lead bg-light p-3 rounded"
                            style={{ minHeight: '100px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            onChange={(e) => setCode(e.target.value)}
                            suppressContentEditableWarning={true}
                        >
                            {code}
                        </div> */}
                        <textarea
                            id="code"
                            className="form-control lead bg-light p-3 rounded border-0"
                            style={{ minHeight: '100px', whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Updating Post...' : 'Update Post'}
                </button>
            </form>

            {error && <p className="text-danger mt-3">Error: {error}</p>}
        </div>
    );
};

export default CodeUpdatePage;