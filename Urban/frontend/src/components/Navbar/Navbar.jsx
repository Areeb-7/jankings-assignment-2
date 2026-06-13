import React from 'react';
import NavbarBrand from './NavbarBrand';
import LocationPicker from './LocationPicker';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavbarBrand />
        <div className="nav-center">
          {/* <LocationPicker /> */}
          <SearchBar />
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};

export default Navbar;