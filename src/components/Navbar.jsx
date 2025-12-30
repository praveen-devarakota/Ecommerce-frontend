import React, { useState, useRef, useEffect } from 'react';
import logoBanner from '../assets/logoBanner.png';
import shoppingBag from '../assets/shoppingBag.png';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUserCircle } from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-6">
        {/* Top Navbar */}
        <div className="flex justify-between items-center p-4 gap-6 pb-2">
          {/* Left - Logo */}
          <div className="shrink-0">
            <img
              onClick={() => navigate("/")}
              src={logoBanner}
              alt="Logo"
              className="w-44 h-auto hover:cursor-pointer"
            />
          </div>

          {/* Middle - Search Bar */}
          <div className="flex-grow">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              />
              <svg
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                />
              </svg>
            </div>
          </div>

          {/* Right - Cart Icon & Login/Logout */}
          <div className="flex items-center gap-4 shrink-0">
            <img
              onClick={() => navigate("/cart")}
              className="w-8 h-8 hover:cursor-pointer"
              src={shoppingBag}
              alt="Cart"
            />
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <FaUserCircle
                  size={28}
                  className="text-gray-700 cursor-pointer hover:text-blue-600"
                  onClick={() => setMenuOpen((prev) => !prev)}
                />
                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                    <div className="px-4 py-2 text-sm text-gray-700 border-b">
                      Hi, {user.username || user.name || 'User'}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMenuOpen(false);
                        navigate('/');
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        navigate('/profile');
                        setMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="px-4 py-2 bg-blue-600 text-white border rounded transition hover:bg-white hover:text-blue-600"
              >
                Login
              </button>
            )}
          </div>
        </div>

        {/* Bottom Category Menu */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center py-3 space-x-6">
            {['LAPTOPS', 'MOBILES', 'FURNITURE', 'ACCESSORIES', 'BOOKS', 'SNEAKERS'].map((category) => (
              <button
                key={category}
                onClick={() => navigate(`/${category.toLowerCase()}`)}
                className="
                  px-4 py-2
                  rounded-full
                  text-sm font-medium
                  text-gray-700 hover:text-blue-600
                  transition-all duration-200
                  hover:bg-blue-50
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                "
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
