import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';
import Sidebar from './Sidebar';

const ProfileUpdatePage = () => {
    const [profile, setProfile] = useState(null);
    const [nickname, setNickname] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch profile details from the backend API
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/v1/api/profile/info');
                setProfile(response.data.data);
                setNickname(response.data.data.nickname); // 초기 닉네임 설정
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError('프로필을 불러오는 데 실패했습니다.');
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.put('/v1/api/profile', { 
                id: profile.id,
                nickname: nickname
            });
            setProfile(response.data.data); // 업데이트된 프로필로 상태 변경
            alert('프로필 성공적으로 변경되었습니다.');
        } catch (err) {
            console.error(err);
            setError('프로필 변경에 실패했습니다.');
        }

        navigate("/My");
    };

    if (loading) {
        return <p>로딩 중...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ padding: '20px', flex: 1 }}>
                <h1>닉네임 수정</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nickname">닉네임:</label>
                        <input
                            type="text"
                            id="nickname"
                            value={nickname}
                            onChange={handleNicknameChange}
                            required
                        />
                    </div>
                    <button type="submit">수정하기</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileUpdatePage;