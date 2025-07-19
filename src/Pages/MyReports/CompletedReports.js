import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/Contexts'; // Adjust the import based on your file structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BACKEND_API_ENDPOINT from '../../config';

const CompletedReports = () => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const [completedReports, setCompletedReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedReportIds, setExpandedReportIds] = useState({});
  const [ratings, setRatings] = useState({});

  // Debugging user type
  useEffect(() => {
    console.log("Current user type:", user.typeOfUser);
  }, [user]);

  useEffect(() => {
    const fetchCompletedReports = async () => {
      try {
        const response = await axios.get(`${BACKEND_API_ENDPOINT}/report/fetchCompletedIssues`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCompletedReports(response.data.completedReports);
      } catch (error) {
        console.error('Error fetching completed reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedReports();
  }, []);

  const toggleDescription = (reportId) => {
    setExpandedReportIds((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  const handleRating = (reportId, rating) => {
    setRatings((prev) => ({
      ...prev,
      [reportId]: rating,
    }));
  };

  const handleSubmitRating = async (reportId, organizationId) => {
    const rating = ratings[reportId];

    if (rating) {
      try {
        await axios.post(`${BACKEND_API_ENDPOINT}/report/rate`, {
          reportId,
          organizationId,
          rating,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        toast.success('Rating submitted successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,

        });

      } catch (error) {
        toast.error('Error submitting rating:', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
          pauseOnHover: false,
        });
        console.error('Error submitting rating:', error);
      }
    } else {
      toast.error('Please select a rating before submitting.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });

    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Completed Reports</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading completed reports...</p>
      ) : completedReports.length === 0 ? (
        <p className="text-gray-500 text-center">No completed reports found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {completedReports.map((report) => (
            <div key={report._id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-full md:w-[400px] lg:w-[450px]">
              <h2 className="text-xl font-bold text-green-600 mb-3">{report.wasteType || 'N/A'}</h2>

              <p className={`text-gray-700 overflow-hidden ${expandedReportIds[report._id] ? '' : 'line-clamp-3'}`}>
                {report.description || 'No description available.'}
              </p>

              <button
                className="text-blue-500 hover:underline mb-4"
                onClick={() => toggleDescription(report._id)}
              >
                {expandedReportIds[report._id] ? 'Show Less' : 'Show More'}
              </button>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Address:</h3>
                <p className="text-gray-600">{`${report.address?.city || 'Unknown'}, ${report.address?.state || 'Unknown'}, ${report.address?.pincode || 'Unknown'}`}</p>
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Harmful Level:</h3>
                <p className={`text-gray-600 font-semibold ${report.harmfulLevel === 'High' ? 'text-red-600' : report.harmfulLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {report.harmfulLevel || 'N/A'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {report.images?.map((image) => (
                  <img key={image._id} src={image.url} alt="Report Image" className="w-24 h-24 object-cover rounded-lg shadow-sm" />
                ))}
              </div>

              <a
                href={report.locationLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Location
              </a>

              <p className="text-gray-500 text-sm mt-2">Completed on: {report.completedDate ? new Date(report.completedDate).toLocaleDateString() : 'Invalid Date'}</p>

              {/* Render rating section only if user type is not "People" */}
              {user && user.typeOfUser === 'People' && (
                <div className="mt-4">
                  <h3 className="font-semibold text-gray-800">Rate the Organization:</h3>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer text-xl ${ratings[report._id] >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRating(report._id, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <button
                    className="mt-2 bg-green-600 text-white rounded px-4 py-2"
                    onClick={() => handleSubmitRating(report._id, report.organizationId)} // Pass organizationId here
                  >
                    Submit Rating
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompletedReports;
