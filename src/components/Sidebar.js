import React from "react";
import "./Sidebar.css";

const Sidebar = ({ links }) => {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Navigation</h2>
      <ul className="sidebar-links">
        {links.map((link, index) => (
          <li key={index} className="sidebar-item">
            <a href={link.href}>{link.label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
