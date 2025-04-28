import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../auth/axiosInstance';

const MyPage = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
		// Fetch post details from the backend API
		const fetchProfile = async () => {
			try {
				const response = await axiosInstance.get('/v1/api/profile/info');
				setProfile(response.data);
                console.log(response);
			} catch (err) {
				console.error(err);
			}
		};

		fetchProfile();
	}, []);


    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>내 정보</h1>
                {profile ? (
                    <div>
                        <p>이메일: {profile.email}</p>
                        <p>닉네임: {profile.nickname}</p>
                    </div>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </div>
    );
};

export default MyPage;