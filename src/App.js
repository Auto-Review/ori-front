import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import TILListPage from './pages/TILListPage';
import TILSavePage from './pages/TILSavePage';
import TILUpdatePage from './pages/TILUpdatePage';
import TILDetailsPage from './pages/TILDetailsPage';
import CodeListPage from './pages/CodeListPage';
import CodeSavePage from './pages/CodeSavePage';
import CodeUpdatePage from './pages/CodeUpdatePage';
import CodeDetailsPage from './pages/CodeDetailsPage';

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
        <Route path="/CodeListPage" element={<CodeListPage />} />
        <Route path="/CodeSavePage" element={<CodeSavePage />} />
        <Route path="/CodeUpdatePage/:id" element={<CodeUpdatePage />} />
        <Route path="/CodeDetailsPage/:id" element={<CodeDetailsPage />} />
      </Routes>
    </Router>
  );
}

export default App;