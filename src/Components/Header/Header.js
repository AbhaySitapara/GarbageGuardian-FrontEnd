import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaExclamationTriangle, FaUser, FaBars, FaTimes, FaShoppingCart, FaClipboardList } from 'react-icons/fa';
import { AuthContext } from '../../Contexts/Contexts';
import Logo from '../../Assets/GG/logo.png';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, setUser } = useContext(AuthContext); // Fetch user and setUser from context
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State for mobile menu toggle
  const [isAboutDropdownOpen, setAboutDropdownOpen] = useState(false); // State for About dropdown
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token from local storage
    setUser(null); // Reset the user state in context
    navigate('/login');
  };

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Toggle About dropdown
  const toggleAboutDropdown = () => {
    setAboutDropdownOpen(!isAboutDropdownOpen);
  };

  return (
    <header className="bg-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to="/"> <img src={Logo} alt="Logo" className="h-12 md:h-10 mr-2" /> {/* Adjust height for mobile */}</Link>
          <h1 className="text-2xl md:text-3xl font-bold text-center"> {/* Adjust font size for mobile */}
            <span className="bg-emerald-950 text-white px-2 py-1 rounded-md">Garbage</span>
            <span className="bg-green-400 text-emerald-950 ml-1 px-2 py-1 rounded-md">Guardian</span>
          </h1>
        </div>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="flex items-center text-gray-700 hover:text-green-600 transition duration-200">
            <FaHome className="mr-1" /> Home
          </Link>
          <div className="relative flex items-center">
            <button
              onClick={toggleAboutDropdown}
              className="flex items-center text-gray-700 hover:text-green-600 transition duration-200"
            >
              <FaInfoCircle className="mr-1" /> About
            </button>
            {isAboutDropdownOpen && (
              <div className="absolute left-0 mt-40 w-40 bg-white shadow-lg rounded-md z-50">
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:text-green-600 transition duration-200">About</Link>
                <Link to="/contactus" className="block px-4 py-2 text-gray-700 hover:text-green-600 transition duration-200">Contact Us</Link>
                <Link to="/organizations" className="block px-4 py-2 text-gray-700 hover:text-green-600 transition duration-200">Organizations</Link>
              </div>
            )}
          </div>

          <Link to="/products" className="flex items-center text-gray-700 hover:text-green-600 transition duration-200">
            <FaShoppingCart className="mr-1" /> Products
          </Link>
          <Link to="/purchasedProducts" className="flex items-center text-gray-700 hover:text-green-600 transition duration-200">
            <FaClipboardList className="mr-1" /> Orders
          </Link>
          <Link to="/report" className="flex items-center text-gray-700 hover:text-green-600 transition duration-200">
            <FaExclamationTriangle className="mr-1" /> Report Issue
          </Link>
          <Link to="/myreports" className="flex items-center text-gray-700 hover:text-green-600 transition duration-200">
            <FaUser className="mr-1" /> My Reports
          </Link>

          {/* Conditionally render Login/Signup or User Info */}
          {user ? (
            <div className="flex items-center space-x-1">
              <FaUser className="text-gray-700" />
              <span className="text-gray-700 font-semibold truncate max-w-[100px] overflow-hidden">
                {user.userName}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition duration-200 flex items-center">
              <FaUser className="mr-1" /> Login/Signup
            </Link>
          )}

        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-green-600 focus:outline-none">
            {isMobileMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <nav className="md:hidden bg-white py-4 px-6 space-y-4 shadow-md">
          <Link
            to="/"
            className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            onClick={toggleMobileMenu}
          >
            <FaHome className="mr-2" /> Home
          </Link>
          <div className="relative">
            <button
              onClick={toggleAboutDropdown}
              className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            >
              <FaInfoCircle className="mr-2" /> About
            </button>
            {isAboutDropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white shadow-lg rounded-md z-50">
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200" onClick={toggleMobileMenu}>About</Link>
                <Link to="/contactus" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200" onClick={toggleMobileMenu}>Contact Us</Link>
                <Link to="/organizations" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200" onClick={toggleMobileMenu}>Organizations</Link>
              </div>
            )}
          </div>
          <Link
            to="/products"
            className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            onClick={toggleMobileMenu}
          >
            <FaShoppingCart className="mr-2" /> Products
          </Link>
          <Link
            to="/purchasedProducts"
            className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            onClick={toggleMobileMenu}
          >
            <FaClipboardList className="mr-2" /> Orders
          </Link>
          <Link
            to="/report"
            className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            onClick={toggleMobileMenu}
          >
            <FaExclamationTriangle className="mr-2" /> Report Issue
          </Link>
          <Link
            to="/myreports"
            className="block text-gray-700 hover:text-green-600 transition duration-200 flex items-center"
            onClick={toggleMobileMenu}
          >
            <FaUser className="mr-2" /> My Reports
          </Link>

          {user ? (
            <div className="flex flex-col items-start">
              <div className="flex items-center space-x-2">
                <FaUser className="text-gray-700" />
                <span className="text-gray-700 font-semibold">{user.userName}</span>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileMenu();
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-red-700 transition duration-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded-full mt-4 hover:bg-green-700 transition duration-200 flex items-center"
              onClick={toggleMobileMenu}
            >
              <FaUser className="mr-2" /> Login/Signup
            </Link>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
