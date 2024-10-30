import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TILListPage from './pages/TILListPage';
import TILSavePage from './pages/TILSavePage';
import TILUpdatePage from './pages/TILUpdatePage';
import TILDetailsPage from './pages/TILDetailsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/HomePage" element={<HomePage />} />
        <Route path="/TILListPage" element={<TILListPage />} />
        <Route path="/TILSavePage" element={<TILSavePage />} />
        <Route path="/TILUpdatePage/:id" element={<TILUpdatePage />} />
        <Route path="/TILDetailsPage/:id" element={<TILDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;