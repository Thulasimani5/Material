import React from 'react';
import { Link } from 'react-router-dom';
import "./Sidebar.css";
import { MdOutlineFileUpload } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="heading"></div>
      <hr />
      <nav> 
        <ul>
          <li>
            <Link to="/Upload" className="link">
              <MdOutlineFileUpload className="icon" />
              <span className="text">Upload</span>
            </Link>
          </li>
          <li>
            <Link to="/Recents" className="link">
              <IoMdBook className="icon" />
              <span className="text">Recents</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="link">
              <RxDashboard className="icon" />
              <span className="text">Dashboard</span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;