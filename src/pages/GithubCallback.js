// src/pages/GithubCallback.js
import React, {useEffect, useState} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../auth/axiosInstance';

const GithubCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const code = searchParams.get('code');

        if (code) {
            const sendCodeToBackend = async () => {
                try {
                    const response = await axiosInstance.post(`/v1/api/github/callback`, { code });
                    alert('✅ GitHub 연동이 완료되었습니다.');
                    navigate('/My');
                } catch (err) {
                    console.error('GitHub 연동 실패:', err);
                    alert('❌ GitHub 연동에 실패했습니다.');
                }
            };

            sendCodeToBackend();
        }
    }, [searchParams, navigate]);

    return <p>GitHub 연동 처리 중...</p>;
};

export default GithubCallback;
