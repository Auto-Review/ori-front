import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';
import Sidebar from './Sidebar';

const BookmarkTILPage = () => {
    const [posts, setPosts] = useState([]);
    // TODO page, size 변경 로직 작성 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [totalPage, setTotalPage] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (page, size) => {
            const params = {page, size};

            try{
                const response = await axiosInstance.get('/v1/api/profile/bookmark/til', {params} )
                console.log(response);
                setPosts(response.data.dtoList);
                setTotalPage(response.data.totalPage);
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }

        fetchPosts(page, size);
    }, [page, size]); 

    const handleNextPage = () => {
        if (page + 1 < totalPage) {
            setPage(page + 1); // Go to the next page
        }
    };
    
    const handlePreviousPage = () => {
        if (page > 0) {
            setPage(page - 1); // Go to the previous page
        }
    };

    return (
        <div className="container mt-4" style={{ display: 'flex' }}>
            <Sidebar />

            <div className="flex-grow-1 p-4" style={{ marginLeft: '20px' }}>
                {/* Header with Title */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>BookmarkedTIL</h1>
                </div>

                {/* Posts Grid */}
                <div className="row">
                    {posts && posts.map((post) => (
                        <div key={post.id} className="col-12 col-md-6 col-lg-4 mb-4">
                            <Link to={`/TILDetails/${post.id}`} className="text-decoration-none">
                                <div className="card h-100 shadow-sm">
                                    <div className="card-body">
                                        <h5 className="card-title">{post.title}</h5>
                                        <p className="card-text text-muted">{post.content}</p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Pagination Controls */}
                <div className="d-flex justify-content-between mt-4">
                    <button onClick={handlePreviousPage} className="btn btn-secondary" disabled={page === 0}>
                        Previous
                    </button>
                    <button onClick={handleNextPage} className="btn btn-secondary" disabled={page + 1 >= totalPage}>
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookmarkTILPage;