import React from 'react';
import { useLocation } from 'react-router-dom';
import "./Header.css";
import { IoNotifications} from "react-icons/io5";

const Header = () => {
  const location = useLocation();
  const isDashboardPage = location.pathname === '/';

  const isUploadPage = location.pathname === '/Upload';
  const isRecentPage = location.pathname === '/Recents';
  return (
    <header className="header">
      <input className="search" placeholder="Search" type="text" />
      {isDashboardPage && <p className="add">Add Tag</p>}
      {isUploadPage && <p className="uplo">Uploading...</p>}
      {isRecentPage && <p className="rece"></p>}
      <div className="notify">
        <IoNotifications className="notify-icon" />
      </div>
    </header>
  );
};

export default Header;