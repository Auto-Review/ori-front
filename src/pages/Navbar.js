import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from "../auth/axiosInstance";

const Navbar = () => {
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/Login');
    }

    const handleLogout = () => {
        localStorage.clear();
        setEmail(null);
        alert("로그아웃 되었습니다");
        window.location.href = '/Login';
    };

    // 알림 조회 API 호출
    const getNotifications = async () => {
        try {
            const response = await axiosInstance.get('/v1/api/notification/own/unchecked');
            setNotifications(response.data.data);
        } catch (error) {
            console.error("알림을 가져오는 중 오류 발생:", error);
        }
    };

    // 알림 상태 읽음으로 상태 변경 API 호출
    const putNotification = async (notificationId) => {
        try {
            await axiosInstance.put(`/v1/api/notification?id=${notificationId}`); // ID를 쿼리 파라미터로 전송
        } catch (error) {
            console.error("알림 상태 변경 중 오류 발생:", error);
        }
    };



    // 알림 버튼 클릭 시 호출
    const handleNotificationListClick = (event) => {
        if (event.currentTarget.classList.contains('show')) {
            getNotifications();
        }
    };

    // 알림 클릭 시 상태 변경
    const handleNotificationClick = async (notificationId) => {
        await putNotification(notificationId);
    };

    useEffect(() => {
        if (email) {
            getNotifications();
        }
    }, [email]);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                <Link to="/" className="navbar-brand">Ori</Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownMy"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                My
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMy">
                                <li>
                                    <Link to="/MyCode" className="dropdown-item">Code</Link>
                                </li>
                                <li>
                                    <Link to="/MyTIL" className="dropdown-item">TIL</Link>
                                </li>
                            </ul>
                        </li>

                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownOthers"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Others
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownOthers">
                                <li>
                                    <Link to="/" className="dropdown-item">Code</Link>
                                </li>
                                <li>
                                    <Link to="/TIL" className="dropdown-item">TIL</Link>
                                </li>
                            </ul>
                        </li>

                        {/* 알림 내역 드롭다운 수정 */}
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownNotifications"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                onClick={handleNotificationListClick} // 클릭 시 알림 조회
                            >
                                알림
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownNotifications"
                                style={{minWidth: '300px'}}>
                                {notifications.length > 0 ? (
                                    notifications.map((notification, index) => (
                                        <React.Fragment key={notification.id}>
                                            <li>
                                                <button
                                                    onClick={async () => {
                                                        await handleNotificationClick(notification.id); // 알림 클릭 시 API 호출
                                                        navigate(`/CodeDetails/${notification.id}`); // API 호출 후 페이지 이동
                                                    }}
                                                    className="dropdown-item"
                                                >
                                                    {notification.content}
                                                </button>
                                            </li>
                                            {index < notifications.length - 1 && <li>
                                                <hr className="dropdown-divider"/>
                                            </li>}
                                        </React.Fragment>
                                    ))
                                ) : (
                                    <li>
                                        <span className="dropdown-item">알림이 없습니다.</span>
                                    </li>
                                )}
                            </ul>
                        </li>
                    </ul>

                    {/* Right-aligned Links */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {email ? (
                                <span className="navbar-text me-3">
                                    <Link to="/My"> {email} </Link>
                                </span>
                            ) : (
                                <button
                                    onClick={handleLogin}
                                    className="btn btn-outline-primary me-2"
                                >
                                    Login
                                </button>
                            )}
                        </li>
                        {email && (
                            <li className="nav-item">
                                <button
                                    onClick={handleLogout}
                                    className="btn btn-outline-danger me-2"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                        {/* Dropdown for Create Post */}
                        <li className="nav-item dropdown">
                            <button
                                className="btn btn-primary dropdown-toggle"
                                id="createPostDropdown"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                            글쓰기
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="createPostDropdown">
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => navigate('/CodeSave')}
                                    >
                                        Code
                                    </button>
                                </li>
                                <li>
                                    <button
                                        className="dropdown-item"
                                        onClick={() => navigate('/TILSave')}
                                    >
                                        TIL
                                    </button>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
