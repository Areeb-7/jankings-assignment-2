import React, { useState, useEffect, useRef } from 'react';
import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Using local JWT token in localStorage instead of Firebase auth

const UserMenu = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const updateLoginState = () => setIsLoggedIn(!!localStorage.getItem('token'));
    updateLoginState();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('storage', updateLoginState);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('storage', updateLoginState);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="user-menu" ref={dropdownRef}>
      {isLoggedIn ? (
        <div className="relative inline-block">
          <button 
            className="profile-btn flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <User size={20} />
            <span>Profile</span>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2">
              <button 
                className="w-full px-4 py-2 text-left hover:bg-gray-100 flex items-center gap-2"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        <button className="login-btn " onClick={handleLoginClick}>
          <User size={20} />
          <span>Login</span>
        </button>
      )}
    </div>
  );
};

export default UserMenu;
