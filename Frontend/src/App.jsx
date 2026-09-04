import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';

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
          <Route path="queue" element={
            <div className="container" style={{paddingTop: '40px'}}>
              <h2>Depot Repair Queue</h2>
              <p>Member B/C will implement this table.</p>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
