// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Index from './componentes/paginas/index.tsx';
import Login from './componentes/paginas/login.tsx';
import Registro from './componentes/paginas/Register.tsx';
import Mision from './componentes/paginas/mision.tsx';
import Navbar from './componentes/paginas/Navbar.tsx';
import './css/style.css';



function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 Que el root "/" vaya al index */}
        <Route path="/" element={<Navigate to="/index" replace />} />
        <Route path="/index" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registro />} />
        <Route path="/mision" element={<Mision />} /> 
        <Route path="*" element={<Navigate to="/index" replace />} />
      </Routes>
    </Router>
  );
}

export default App;