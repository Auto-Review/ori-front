import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [email, setEmail] = useState(localStorage.getItem('email'));
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

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
            <div className="container">
                {/* Left-aligned Links */}
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
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                My
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/" className="dropdown-item">Code</Link>
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
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                Others
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li>
                                    <Link to="/" className="dropdown-item">Code</Link>
                                </li>
                                <li>
                                    <Link to="/TIL" className="dropdown-item">TIL</Link>
                                </li>
                            </ul>
                        </li>
                    </ul>

                    {/* Right-aligned Links */}
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            {email ? (
                                <span className="navbar-text me-3">
                                    {email}
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