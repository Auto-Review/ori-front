import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../auth/axiosInstance';

const CLIENT_ID = 'Ov23liWsVtSfmF9kMXd6';
const REDIRECT_URI = 'http://localhost:3000/github/callback';

const MyPage = () => {
    const [profile, setProfile] = useState(null);
    const [isGithubLinked, setIsGithubLinked] = useState(null); // null로 초기화

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await axiosInstance.get('/v1/api/profile/info');
                setProfile(profileRes.data);

                const tokenRes = await axiosInstance.get('/v1/api/github/token/check');
                setIsGithubLinked(tokenRes.data); // true or false
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleGithubAuth = () => {
        const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
        window.location.href = githubAuthUrl;
    };

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>내 정보</h1>
                {profile ? (
                    <div>
                        <p>이메일: {profile.email}</p>
                        <p>닉네임: {profile.nickname}</p>

                        {isGithubLinked === null ? (
                            <p>GitHub 연동 상태 확인 중...</p>
                        ) : isGithubLinked ? (
                            <p>✅ GitHub 연동 완료</p>
                        ) : (
                            <button onClick={handleGithubAuth}>
                                GitHub 계정 연동하기
                            </button>
                        )}
                    </div>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </div>
    );
};

export default MyPage;
