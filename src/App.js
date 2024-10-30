import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TILListPage from './pages/TILListPage';
import TILSavePage from './pages/TILSavePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TILListPage" element={<TILListPage />} />
        <Route path="/TILSavePage" element={<TILSavePage />} />
      </Routes>
    </Router>
  );
}

export default App;