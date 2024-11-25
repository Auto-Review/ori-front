import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <div style={{ width: '200px', borderRight: '1px solid #ccc', padding: '10px' }}>
            <h2>메뉴</h2>
            <ul>
                <li>
                    <Link to="/My">홈</Link>
                </li>
                <li>
                    <Link to="/mypage">내 정보 수정</Link>
                </li>
                <li>
                    <Link to="/BookmarkTIL">스크랩된 TIL</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;