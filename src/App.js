import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

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
import Navbar from './pages/Navbar';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Routes>
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/*" element={<MemberLayout />} />
    </Routes>
  );
}

function MemberLayout(){
  return (
    <div>
      <Navbar />
        <Container>
          <Routes>
            <Route path="/" element={<CodeListPage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/TIL" element={<TILListPage />} />
            <Route path="/TILSave" element={<TILSavePage />} />
            <Route path="/TILUpdate/:id" element={<TILUpdatePage />} />
            <Route path="/TILDetails/:id" element={<TILDetailsPage />} />
            <Route path="/Code" element={<CodeListPage />} />
            <Route path="/CodeSave" element={<CodeSavePage />} />
            <Route path="/CodeUpdate/:id" element={<CodeUpdatePage />} />
            <Route path="/CodeDetails/:id" element={<CodeDetailsPage />} />
          </Routes>
        </Container>
    </div>
  );
}

export default App;