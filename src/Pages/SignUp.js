import React, { useState } from 'react';
import axios from 'axios';
import Logo from '../Assets/GG/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import toastify style
import BACKEND_API_ENDPOINT from '../config';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    typeOfUser: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post(`${BACKEND_API_ENDPOINT}/auth/signup`, formData);
      setMessage('Account created successfully!');

      // Show success toast
      toast.success('Account created successfully!', {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });

      // Redirect to home after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

      // Redirect to login page or dashboard
    } catch (error) {
      toast.error('Error: Unable to create account', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,

        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });
      setMessage('Error: Unable to create account');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-emerald-700 to-green-500">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg border border-gray-300">
        {/* Logo */}
        <ToastContainer />
        <div className="flex justify-center">
          <img src={Logo} alt="Logo" className="w-16 h-16 object-contain" />
        </div>
        <h2 className="text-2xl font-semibold text-center text-emerald-900">Create Your Account</h2>
        <p className="text-center text-gray-600 mb-4">
          Already have an account? <Link to="/login" className="text-emerald-700 font-semibold">Login</Link>
        </p>

        {message && (
          <div className={`text-center font-semibold ${message.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="name">
              User Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium mb-1" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition duration-200"
              placeholder="Create a password"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-lg font-medium mb-1">Type of User</label>
            <div className="grid grid-cols-2 gap-2">
              {['People', 'Foundation & Organisation', 'Municipal Corporation'].map((type) => (
                <label key={type} className="inline-flex items-center border border-gray-300 rounded-md p-2 cursor-pointer hover:bg-emerald-50 transition duration-200">
                  <input
                    type="radio"
                    name="typeOfUser"
                    value={type}
                    checked={formData.typeOfUser === type}
                    onChange={handleChange}
                    className="form-radio text-emerald-600"
                  />
                  <span className="ml-2">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-950 text-white py-3 px-6 rounded-md font-semibold hover:bg-green-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>

      </div>
    </div>
  );
};

export default SignupPage;
