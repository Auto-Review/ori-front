import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const TILListPage = () => {
    const [posts, setPosts] = useState([]);
    // TODO page, size 변경 로직 작성 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(9);
    const [totalPage, setTotalPage] = useState();
    const [keyword, setKeyword] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (page, size, keyword) => {
            const params = {page, size};

            try{
                if(keyword){
                    params.keyword = keyword;
                }
                
                const response = await axiosInstance.get(keyword ? 'v1/api/post/til/search' : '/v1/api/post/til/list', {params} )
                console.log(response);
                setPosts(response.data.data.dtoList);
                setTotalPage(response.data.data.totalPage);
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }

        fetchPosts(page, size, keyword);
    }, [page, size, keyword]); 

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

    const handleSearchSubmit = (e) => {
        if(e.key === "Enter"){
            if(e.target.value.length < 2){
                alert("두글자 이상을 입력해주세요");
                setKeyword(null);
            } else {
                setKeyword(e.target.value); // Update keyword as the user types
                setPage(0); // Reset to the first page on new search
            } 
        }
    };

    return (
        <div className="container mt-4">
            {/* Header with Title and Write Toggle */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>TIL</h1>
            </div>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search posts..."
                onKeyDown={(e) => handleSearchSubmit(e)}
                className="form-control mb-4"
            />

            {/* Posts Grid */}
            <div className="row">
                {posts &&
                    posts.map((post) => (
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
    );
};

export default TILListPage;