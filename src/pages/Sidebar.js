import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div
            style={{
                width: '200px',
                height: '100vh',
                borderRight: '1px solid #ccc',
                padding: '20px',
                backgroundColor: '#f8f9fa',
            }}
        >
            <h2 className="text-center" style={{ marginBottom: '20px' }}>메뉴</h2>
            <ul className="list-unstyled">
                <li className="mb-3">
                    <Link to="/My" className="text-decoration-none text-dark">
                        홈
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/ProfileUpdate" className="text-decoration-none text-dark">
                        내 정보 수정
                    </Link>
                </li>
                <li className="mb-3">
                    <Link to="/BookmarkTIL" className="text-decoration-none text-dark">
                        스크랩된 TIL
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;