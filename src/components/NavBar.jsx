import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownMenu from './DropdownMenu';
import { useSelector } from "react-redux";

function NavBar() {
  const { user } = useSelector((state) => state.user);
  const token = localStorage.getItem('token');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Perform search logic here, e.g., redirect to search results page
    console.log('Search Query:', searchQuery);
    // Clear the search input
    setSearchQuery('');
  };

  function logout() {
    localStorage.removeItem('token')
    window.location.href = "/login"
  }

  return (
    <nav className="bg-green-400 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          Cleanconnect 🧹🧼
        </div>
        <div className="hidden md:flex space-x-4">
        {user && (
            <Link to={`/worker/profile/${user._id}`} className="text-white" onClick={closeMenu}></Link>
          )}
          <Link to="/" className="text-white" onClick={closeMenu}>Home</Link>
          <Link to="/appointments" className="text-white" onClick={closeMenu}>Appointments</Link>
          <Link to="/notification" className="text-white" onClick={closeMenu}>Messages</Link>
          <Link to="/apply-worker" className="text-white" onClick={closeMenu}>Become a Worker</Link>
          {token ? (
            <>
              <DropdownMenu />
            </>
          ) : (
            <>
              <Link to="/login" className="text-white" onClick={closeMenu}>Login</Link>
              <Link to="/register" className="text-white" onClick={closeMenu}>Signup</Link>
            </>
          )}
        </div>
        <div className="hidden md:flex">
          {/* Larger Screen Search Bar */}
          <form onSubmit={handleSearchSubmit} className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearchChange}
              className="px-2 py-1 mr-2 border border-gray-500 rounded focus:outline-none"
            />
            <button type="submit" className="text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </form>
        </div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-green-400">
          <Link to="/" className="block py-2 px-4 text-white" onClick={closeMenu}>Home</Link>
          {user && <Link to={`/worker/profile/${user.id}`} className="block py-2 px-4 text-white" onClick={closeMenu}>Profile</Link>}
          <Link to="/worker" className="block py-2 px-4 text-white" onClick={closeMenu}>Workers</Link>
          {user ? (
            <>
              <DropdownMenu />
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 px-4 text-white" onClick={closeMenu}>Login</Link>
              <Link to="/signup" className="block py-2 px-4 text-white" onClick={closeMenu}>Signup</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

export default NavBar;
