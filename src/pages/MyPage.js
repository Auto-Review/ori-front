import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../auth/axiosInstance';
import { requestPermission } from '../firebase-config';

const CLIENT_ID = 'Ov23liWsVtSfmF9kMXd6';
const REDIRECT_URI = 'http://localhost:3000/github/callback';

const MyPage = () => {
    const [profile, setProfile] = useState(null);
    const [isGithubLinked, setIsGithubLinked] = useState(null);
    const [notificationStatus, setNotificationStatus] = useState(Notification.permission); // granted / default / denied

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileRes = await axiosInstance.get('/v1/api/profile/info');
                setProfile(profileRes.data);

                const tokenRes = await axiosInstance.get('/v1/api/github/token/check');
                setIsGithubLinked(tokenRes.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    const handleWebNotification = async () => {
        const fcmToken = localStorage.getItem("fcmToken");
        console.log("fcmToken: {}",fcmToken)
        if (fcmToken != null) {
            // 알림 차단 처리
            try {
                if (fcmToken) {
                    await axiosInstance.delete('/v1/api/fcm',{
                        data:{fcmToken},
                    })
                    localStorage.removeItem("fcmToken");
                }
                setNotificationStatus("default"); // 상태 업데이트
            } catch (error) {
                console.error('FCM 토큰 삭제 실패:', error);
                alert('알림 차단 처리 중 오류가 발생했습니다.');
            }
            return;
        }

        // 알림 요청 처리
        try {
            const fcmToken = await requestPermission();

            if (!fcmToken) {
                alert('알림 권한이 허용되지 않았습니다.');
                return;
            }

            localStorage.setItem('fcmToken', fcmToken);

            await axiosInstance.post('/v1/api/fcm', {
                fcmToken,
            });

            alert('알림이 성공적으로 설정되었습니다.');
            setNotificationStatus('granted');
        } catch (error) {
            console.error('FCM 권한 요청 실패:', error);
            alert('알림 권한 요청에 실패했습니다.');
        }
    };


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

                        <hr />

                        <h3>🔔 웹 푸시 알림 설정</h3>
                        <p>현재 알림 상태: <strong>{notificationStatus}</strong></p>

                        <button onClick={handleWebNotification}>
                            {notificationStatus === 'granted' ? '알림 차단하기' : '알림 허용하기'}
                        </button>

                    </div>
                ) : (
                    <p>로딩 중...</p>
                )}
            </div>
        </div>
    );
};

export default MyPage;
