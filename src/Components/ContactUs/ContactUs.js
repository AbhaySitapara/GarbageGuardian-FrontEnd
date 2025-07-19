import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from '../../Assets/HeroSection/3.jpg'; // Adjust the path as needed
import BACKEND_API_ENDPOINT from '../../config';

const ContactUs = () => {
  // State to hold form data

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for form submission status
  const [loading, setLoading] = useState(false);

  // Handle form input change
  const handleChange = (e) => {

    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if form data is valid
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      // Send POST request to backend
      const response = await axios.post(`${BACKEND_API_ENDPOINT}/email/send-email', formData`);

      if (response.status === 200) {
        toast.success('Your message has been sent successfully!');
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      }
    } catch (error) {
      toast.error('Failed to send your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-800 overflow-hidden">
      <ToastContainer />
      {/* Background Image with Blur Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})`, filter: 'blur(8px)' }}
      />
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <div className="bg-white bg-opacity-80 rounded-lg shadow-lg p-8 max-w-md w-full">

          <h2 className="text-2xl font-semibold text-center text-gray-800">Contact Us</h2>
          <p className="mt-2 text-center text-gray-600">
            We're here to help! Fill out the form below to reach us.
          </p>

          <form className="mt-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-green-500"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button with Tailwind Spinner */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition duration-200 flex justify-center items-center"
              disabled={loading}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          {/* Contact Info */}
          <div className="mt-4 text-center text-gray-600">
            <p>Email: support@garbageguardian.com</p>
            <p>Phone: +91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Toast Notification Container */}

    </div>
  );
};

export default ContactUs;
