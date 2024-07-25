import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css";
import { IoNotifications } from "react-icons/io5";
import Slidebar from './Slidebar'; // Correct import for the Sidebar component

const Header = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/';
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Correct state variable naming
  const isUploadPage = location.pathname === '/Upload';
  const isRecentPage = location.pathname === '/Recents';

  return (
    <header className="header">
      <input className="search" placeholder="Search" type="text" />
      {isDashboardPage && <p className="add">Add Tag</p>}
      {isUploadPage && <p className="uplo">Uploading...</p>}
      {isRecentPage && <p className="rece"></p>}
      <div className="notify">
        <IoNotifications  onClick={()=>{setIsSidebarOpen(true)}}  className="notify-icon" />
      </div>
      {isSidebarOpen && (
        <Slidebar close={() => setIsSidebarOpen(false)} /> // Correct usage of Sidebar component
      )}
    </header>
  );
};

export default Header;
