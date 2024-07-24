import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar/Sidebar';
import Header from './Components/Header/Header';
import Dashboard from './Components/Dashboard/Dashboard';
import Upload from './Components/Upload/Upload';
import Recents from './Components/Recents/Recents';
import Newpage from './Components/Newpage/newpage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/recents" element={<Recents />} />
            <Route path="/newpage" element={<Newpage />} />
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
