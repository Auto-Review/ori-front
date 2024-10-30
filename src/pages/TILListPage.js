import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const TILListPage = () => {
    const [posts, setPosts] = useState([]); 
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const accessToken = localStorage.getItem('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async (page, size) => {
            const params = {page, size};
            try{
                const response = await axiosInstance.get(`${process.env.REACT_APP_API_URL}/v1/api/til`,{params})
                setPosts(response.data);
                console.log(posts);
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
            {posts.data && posts.data.map((post) => (
            <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            ))}
        </div>
        <button onClick={handleWrite}>write</button>
        </div>
    );
};

export default TILListPage;