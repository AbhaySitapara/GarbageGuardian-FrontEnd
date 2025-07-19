import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import Logo from "../Assets/GG/logo.png";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Contexts/Contexts'; // Import AuthContext
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import toastify styles
import BACKEND_API_ENDPOINT from '../config';

const LoginPage = () => {
  const { setUser, setToken } = useContext(AuthContext); // Access setUserType from AuthContext
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  // Redirect if token exists (user is already logged in)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/'); // Redirect to homepage if already logged in
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BACKEND_API_ENDPOINT}/auth/login`, formData);

      // Store token in localStorage
      localStorage.setItem('token', response.data.token);

      // Decode token and set user in context
      const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
      setUser(decodedToken); // Set the user globally
      console.log(decodedToken);
      setToken(response.data.token);

      localStorage.setItem('userId', decodedToken.userId);


      // Show success toast
      toast.success('Login successful!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

      });

      // Redirect to home after a short delay
      setTimeout(() => {
        window.location.reload();
        navigate('/');
      }, 1500);

    } catch (error) {
      // Show error toast
      toast.error('Error: Invalid credentials', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-800 to-green-600">
      <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
        {/* Toast Notification Container */}
        <ToastContainer />

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="w-24 h-24 object-contain" />
        </div>

        <h2 className="text-3xl font-bold text-center text-emerald-950 mb-6">Login to Your Account</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-950 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 mt-4">
          Don't have an account? <Link to="/signup" className="text-emerald-700 font-semibold">Sign Up</Link>
        </p>
        <p className="text-center text-gray-500 mt-2">
          <Link to="/" className="text-emerald-700 font-semibold">Continue without login</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
