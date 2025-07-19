import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from './Modal';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BACKEND_API_ENDPOINT from '../../config';

const ReportIssue = () => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    wasteType: '',
    description: '',
    city: '',
    state: '',
    pincode: '',
    harmfulLevel: '',
    images: [],
    locationLink: '', // Field for Google Maps link
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const [locationLoading, setLocationLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error('You need to be logged in first.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    }
  }, [token, navigate]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload change
  const handleFileChange = (e) => {
    const selectedFiles = e.target.files;

    if (selectedFiles.length > 5) {
      // Show error toast notification if more than 5 images are selected
      toast.error('You can upload a maximum of 5 images.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });
    } else {
      setFormData({
        ...formData,
        images: selectedFiles,
      });
    }
  };

  // Fetch the user's current location
  const getLocation = () => {
    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Generate Google Maps link with coordinates
          const googleMapsLink = `https://www.google.com/maps?q=${lat},${lng}`;
          setFormData((prev) => ({
            ...prev,
            locationLink: googleMapsLink,
          }));

          setLocationLoading(false);
          setLocationError(null);
        },
        (error) => {
          setLocationLoading(false);
          setLocationError(error.message);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
        }
      );
    } else {
      setLocationError('Geolocation is not supported by this browser.');
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);


    if (formData.images.length === 0) {
      toast.error('Please upload at least one image.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });
      setLoading(false);
      return;
    }

    try {
      const data = new FormData();
      data.append('wasteType', formData.wasteType);
      data.append('description', formData.description);
      data.append('city', formData.city);
      data.append('state', formData.state);
      data.append('pincode', formData.pincode);
      data.append('harmfulLevel', formData.harmfulLevel);
      data.append('locationLink', formData.locationLink);

      // Add multiple image files
      for (let i = 0; i < formData.images.length; i++) {
        data.append('images', formData.images[i]);
      }

      const response = await axios.post(`${BACKEND_API_ENDPOINT}/report/issue`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(true);
      setLoading(false);
      setModalOpen(true);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 mt-8 mb-10">
      <ToastContainer />
      <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
        <span className="bg-emerald-950 text-white px-2 py-1 rounded-md">Issue</span>
        <span className='text-3xl md:text-5xl px-2 py-1 font-bold text-center my-12 bg-gradient-to-r from-emerald-800 to-green-600 text-transparent bg-clip-text'>A</span>
        <span className="bg-green-400 text-emerald-950 ml-1 px-2 py-1 rounded-md">Report</span>
      </h1>
      <form onSubmit={handleSubmit} className="bg-gray-200 shadow-lg rounded-lg p-6 space-y-4">
        {/* Waste Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Waste Type</label>
          <select
            name="wasteType"
            value={formData.wasteType}
            onChange={handleChange}
            className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          >
            <option value="">Select waste type</option>
            <option value="Dry Waste">Dry Waste</option>
            <option value="Organic Waste">Organic Waste</option>
            <option value="Packaging Waste">Packaging Waste</option>
            <option value="Post-Consumer Waste">Post-Consumer Waste</option>
            <option value="Radioactive Waste">Radioactive Waste</option>
            <option value="Recyclable Waste">Recyclable Waste</option>
            <option value="Residual Waste">Residual Waste</option>
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Describe the waste issue..."
            required
          ></textarea>
        </div>

        {/* Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Harmful Level */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Harmful Level</label>
          <select
            name="harmfulLevel"
            value={formData.harmfulLevel}
            onChange={handleChange}
            className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            required
          >
            <option value="">Select harmful level</option>
            <option value="High">High</option>
            <option value="Moderate">Moderate</option>
            <option value="Less">Less</option>
          </select>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Upload Images (Max 5)</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
            className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            accept="image/*"
          />
        </div>

        {/* Get Current Location Button */}
        <div>
          <button
            type="button"
            onClick={getLocation}
            className={`bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition ${locationLoading ? 'cursor-not-allowed' : ''}`}
            disabled={locationLoading}
          >
            {locationLoading ? 'Getting Location...' : 'Get Current Location'}
          </button>
          {locationError && <p className="text-red-500 mt-2">{locationError}</p>}
        </div>

        {/* Alternate Location Link Input */}
        <div className="mt-4">
          <label className="block text-gray-700 font-semibold mb-2">Location Link (if location button doesn’t work)</label>
          <input
            type="url"
            name="locationLink"
            value={formData.locationLink}
            onChange={handleChange}
            className="block w-full border border-green-300 rounded-lg p-3 focus:ring-2 focus:ring-green-400 focus:outline-none"
            placeholder="Paste Google Maps link here"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className={`bg-green-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition ${loading ? 'cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {success && <p className="text-green-500 mt-2">Report submitted successfully!</p>}
      </form>
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        message="Your report was submitted successfully!" 
      />
    </div>
  );
};

export default ReportIssue;
