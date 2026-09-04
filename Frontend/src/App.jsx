import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import RepairQueue from './pages/RepairQueue';
import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="log" element={
            <div className="container" style={{paddingTop: '40px'}}>
              <h2>Log Breakdown</h2>
              <p>Member B will implement this form.</p>
            </div>
          } />
          <Route path="queue" element={<RepairQueue />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
