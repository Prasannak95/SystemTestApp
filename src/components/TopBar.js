import React from "react";
import "./TopBar.css";

const TopBar = ({ onLogout }) => {
  return (
    <div className="top-bar">
      <h1 className="top-bar-title">Dashboard</h1>
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default TopBar;
