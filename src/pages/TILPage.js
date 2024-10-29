import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TILPage = () => {
    const [posts, setPosts] = useState([]); // Initialize with an empty array
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch posts from the backend API using axios
        axios.get('https://your-backend-api.com/posts')
        .then(response => {
            setPosts(response.data); // Update posts with data from API
            setLoading(false); // Set loading to false
        })
        .catch(error => {
            setError(error.message); // Handle any errors
            setLoading(false);
        });
    }, []); // Empty dependency array to run only once when component mounts

    if (loading) return <p>Loading posts...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div style={{ padding: '20px' }}>
        <h1>Posts</h1>
        <div>
            {posts.map(post => (
            <div key={post.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
            </div>
            ))}
        </div>
        </div>
    );
};

export default TILPage;