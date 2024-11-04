import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const TILListPage = () => {
    const [posts, setPosts] = useState([]);
    // TODO page, size 변경 로직 작성 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [totalPage, setTotalPage] = useState();
    const [hasMore, setHasMore] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (page, size) => {
            const params = {page, size};
            try{
                const response = await axiosInstance.get('/v1/api/til',{params})
                console.log(response);
                setPosts(response.data.data.list);
                setTotalPage(response.data.data.totalPage);
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }

        fetchPosts(page, size);
    }, [page, size]); 

    const handleWrite = () => {
		navigate('/TILSavePage');
	}

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
        <div style={{ padding: '20px' }}>
        <h1>Posts</h1>
        <div>
            {posts && posts.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <Link to={`/TILDetailsPage/${post.id}`} style={{ color: 'blue', textDecoration: 'underline' }}>
                    detail Post
                </Link>
            </div>
            ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
            <button onClick={handlePreviousPage} disabled={page === 0}>
                Previous
            </button>
            <button onClick={handleNextPage} disabled={page + 1 >= totalPage}>
                Next
            </button>
        </div>
        
        <button onClick={handleWrite}>write</button>
        </div>
    );
};

export default TILListPage;