import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axiosInstance from '../auth/axiosInstance';
import { requestPermission } from '../firebase-config';

const CLIENT_ID = 'Ov23liWsVtSfmF9kMXd6';
const REDIRECT_URI = 'https://autoreview.kr/github/callback';

const MyPage = () => {
    const [profile, setProfile] = useState(null);
    const [isGithubLinked, setIsGithubLinked] = useState(null);
    const [notificationStatus, setNotificationStatus] = useState(Notification.permission); // granted / default / denied
    const [isProcessing, setIsProcessing] = useState(false);

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
        if (isProcessing) return; // 중복 클릭 방지
        setIsProcessing(true);

        const storedToken = localStorage.getItem("fcmToken");
        const permission = Notification.permission;

        console.log("Notification 권한 상태:", permission);
        console.log("LocalStorage fcmToken:", storedToken);

        if (storedToken !== null) {
            try {
                await axiosInstance.delete('/v1/api/fcm', {
                    data: { fcmToken: storedToken },
                });
                localStorage.removeItem("fcmToken");
                alert("알림이 차단되었습니다.");
                setNotificationStatus("default");
            } catch (error) {
                console.error("FCM 삭제 실패:", error);
                alert("알림 차단 처리 중 오류가 발생했습니다.");
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        if (permission === "granted" || permission === "default") {
            try {
                const fcmToken = await requestPermission();

                if (!fcmToken) {
                    alert("알림 권한이 허용되지 않았습니다.");
                    return;
                }

                localStorage.setItem("fcmToken", fcmToken);

                await axiosInstance.post("/v1/api/fcm", {
                    fcmToken,
                });

                alert("알림이 성공적으로 설정되었습니다.");
                setNotificationStatus("granted");
            } catch (error) {
                console.error("FCM 등록 실패:", error);
                alert("알림 권한 요청에 실패했습니다.");
            } finally {
                setIsProcessing(false);
            }
            return;
        }

        if (permission === "denied") {
            alert("알림 권한이 브라우저에서 차단되어 있습니다.\n브라우저 설정 > 사이트 권한 > 알림에서 허용으로 변경해 주세요.");
            setIsProcessing(false);
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
                        <button onClick={handleWebNotification}>
                            {localStorage.getItem("fcmToken") != null ? '알림 차단하기' : '알림 허용하기'}
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
