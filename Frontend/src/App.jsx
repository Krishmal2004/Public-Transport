import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import RepairQueue from './pages/RepairQueue';
import Register from './pages/Register';
import Login from './pages/Login';
import IncidentReport from './components/users/IncidentReport';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="report" element={<IncidentReport />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="queue" element={<RepairQueue />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
