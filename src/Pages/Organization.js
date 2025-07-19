import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../Components/Header/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../Contexts/Contexts'; // Import AuthContext
import BACKEND_API_ENDPOINT from '../config';



// Dynamically import avatars
const avatars = [];
for (let i = 1; i <= 25; i++) {
  avatars.push(require(`../Assets/avatar/avatar_${i}.jpg`));
}

const OrganizationsPage = () => {

  const [organizations, setOrganizations] = useState([]);
  const [filteredOrganizations, setFilteredOrganizations] = useState([]);
  const [analysis, setAnalysis] = useState({ serviceProviders: 0, municipalCorporations: 0, foundations: 0 });
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useContext(AuthContext); // Access user from AuthContext


  // Function to assign random avatars to organizations
  const getRandomAvatar = () => avatars[Math.floor(Math.random() * avatars.length)];

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_ENDPOINT}/organizations`);
        setOrganizations(response.data.organizations);
        setFilteredOrganizations(response.data.organizations); // Set initial filtered organizations
        setAnalysis(response.data.analysis);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizations();
  }, []);

  useEffect(() => {
    // Filter organizations based on search query
    const results = organizations.filter(org =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrganizations(results);
  }, [searchQuery, organizations]);

  // Function to verify organization
  const verifyOrganization = async (orgId) => {
    try {
      await axios.patch(`${BACKEND_API_ENDPOINT}/organizations/${orgId}/verify`, { status: 'Verified' });
      setOrganizations((prev) =>
        prev.map((org) => (org._id === orgId ? { ...org, status: 'Verified' } : org))
      );
    } catch (error) {
      console.error('Error verifying organization:', error);
    }
  };

  // Function to set organization status to Pending
  const setPendingOrganization = async (orgId) => {
    try {
      await axios.patch(`${BACKEND_API_ENDPOINT}/organizations/${orgId}/verify`, { status: 'Pending' });
      setOrganizations((prev) =>
        prev.map((org) => (org._id === orgId ? { ...org, status: 'Pending' } : org))
      );
    } catch (error) {
      console.error('Error setting organization to Pending:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-10">
        {/* Themed Title */}
        <h1 className="text-3xl font-bold text-center mb-10">
          <span className="bg-emerald-950 text-white px-2 py-1 rounded-md">Our </span>
          <span className="bg-green-400 text-emerald-950 ml-1 px-2 py-1 rounded-md">Organizations</span>
        </h1>

        {/* Search Input */}
        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search organizations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-green-500"
          />
        </div>

        {/* Analysis Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 px-4 sm:px-10">
          {/* Service Providers */}
          <div className="bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Service Providers</h2>
            <p className="text-6xl font-extrabold text-gray-900">{analysis.serviceProviders}+</p>
            <p className="text-gray-700 mt-3">Verified</p>
          </div>

          {/* Municipal Corporations */}
          <div className="bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Municipal Corporations</h2>
            <p className="text-6xl font-extrabold text-gray-900">{analysis.municipalCorporations}+</p>
            <p className="text-gray-700 mt-3">Verified</p>
          </div>

          {/* Foundations */}
          <div className="bg-gradient-to-b from-green-100 to-white shadow-lg rounded-lg p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-green-200">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Foundations</h2>
            <p className="text-6xl font-extrabold text-gray-900">{analysis.foundations}+</p>
            <p className="text-gray-700 mt-3">Verified</p>
          </div>
        </div>

        {/* Organization Cards - One per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 px-4 sm:px-10">
          {filteredOrganizations.map((org) => (
            <div key={org._id} className="bg-white shadow-md rounded-lg p-6 flex items-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              {/* Display a random avatar */}
              <img
                src={getRandomAvatar()}
                alt="Avatar"
                className="w-20 h-20 rounded-full mr-6 border-4 border-green-900"
              />
              <div>
                <h3 className="text-2xl font-bold text-green-500 mb-2">{org.name}</h3>
                <p className="text-gray-600 mb-2">{org.email}</p>
                <p className="text-gray-500 mb-2">Type: {org.typeOfUser}</p>
                {org.averageRating > 0 && (
                  <p className="text-yellow-500 font-semibold">Rating: {org.averageRating.toFixed(1)} ({org.ratingCount} ratings)</p>
                )}
                <p className={`font-semibold flex items-center ${org.status === 'Verified' ? 'text-blue-600' : 'text-red-600'}`}>
                  {org.status}
                  {org.status === 'Verified' && (
                    <FontAwesomeIcon icon={faCheckCircle} className="ml-2 text-blue-600" />
                  )}
                </p>
                {/* Verify Button for Admins */}
                {user && user.userName === 'admin' && org.status !== 'Verified' && (
                  <button
                    onClick={() => verifyOrganization(org._id)}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-green-700 transition"
                  >
                    Verify
                  </button>
                )}
                {/* Set to Pending Button for Admins */}
                {user && user.userName === 'admin' && org.status === 'Verified' && (
                  <button
                    onClick={() => setPendingOrganization(org._id)}
                    className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Set to Pending
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;
