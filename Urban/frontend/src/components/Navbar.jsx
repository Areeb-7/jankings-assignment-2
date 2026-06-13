import React from 'react';
import { Search, MapPin, User } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <h1 className="logo">Urban Company</h1>
      </div>
      <div className="nav-center">
        <div className="location">
          <MapPin size={20} />
          <span>New York</span>
        </div>
        <div className="search-bar">
          <Search size={20} />
          <input type="text" placeholder="Search for services" />
        </div>
      </div>
      <div className="nav-right">
        <button className="login-btn">
          <User size={20} />
          <span>Login</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;