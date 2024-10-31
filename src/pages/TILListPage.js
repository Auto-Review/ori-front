import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const TILListPage = () => {
    const [posts, setPosts] = useState([]);
    // TODO page, size 변경 로직 작성 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (page, size) => {
            const params = {page, size};
            try{
                const response = await axiosInstance.get('/v1/api/til',{params})
                setPosts(response.data.data);
            } catch (error) {
                console.error('Fetch posts failed:', error);
            }
        }

        fetchPosts(page, size);
    }, [page, size]); 

    const handleWrite = () => {
		navigate('/TILSavePage');
	}

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
        <button onClick={handleWrite}>write</button>
        </div>
    );
};

export default TILListPage;