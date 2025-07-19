import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../Contexts/Contexts'; // Adjust the import based on your file structure
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BACKEND_API_ENDPOINT from '../../config';

const AcceptedReports = () => {
  const [acceptedReports, setAcceptedReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedReportIds, setExpandedReportIds] = useState({});
  const { user } = useContext(AuthContext); // Access user from AuthContext


  useEffect(() => {
    const fetchAcceptedReports = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BACKEND_API_ENDPOINT}/report/fetchAcceptedReports`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        const acceptedByUser = response.data.acceptedReports?.acceptedByUser || [];
        const issuedByUser = response.data.acceptedReports?.issuedByUser || [];

        // Normalize the structure: for issuedByUser, the data is already flat, while for acceptedByUser, you need to access the nested report
        const formattedAcceptedByUser = acceptedByUser.map((report) => ({
          ...report.report, // Extract report data from acceptedByUser
          _id: report._id, // Ensure the report's ID is kept for both cases
        }));

        const combinedReports = [...formattedAcceptedByUser, ...issuedByUser];
        setAcceptedReports(combinedReports);
      } catch (error) {
        console.error('Error fetching accepted reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAcceptedReports();
  }, []);

  const toggleDescription = (reportId) => {
    setExpandedReportIds((prev) => ({
      ...prev,
      [reportId]: !prev[reportId],
    }));
  };

  // Function to handle canceling the accepted report
  const handleCancel = async (reportId) => {

    console.log(reportId);
    try {
      await axios.delete(`${BACKEND_API_ENDPOINT}/report/cancelAcceptReport/${reportId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAcceptedReports((prev) => prev.filter(report => report._id !== reportId));

      toast.error('Report canceled successfully.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        pauseOnHover: false,
      });


    } catch (error) {
      console.error('Error canceling the report:', error);
      toast.error('Error canceling the report:', error, {
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

  // Function to handle marking the report as completed
  const handleComplete = async (reportId) => {
    try {
      await axios.post(`${BACKEND_API_ENDPOINT}/report/completeIssue/${reportId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAcceptedReports((prev) => prev.filter(report => report._id !== reportId));

      toast.success('Report marked as completed successfully.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,

      });

    } catch (error) {
      console.error('Error completing the report:', error);
      toast.error('Failed to mark the report as completed.', {
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
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Accepted Reports</h1>

      {loading ? (
        <p className="text-gray-500 text-center">Loading accepted reports...</p>
      ) : acceptedReports.length === 0 ? (
        <p className="text-gray-500 text-center">No accepted reports found.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {acceptedReports.map((report) => (
            <div key={report._id} className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105 w-full md:w-[400px] lg:w-[450px]"> {/* Adjusted width */}
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
                {report.address ? (
                  <p className="text-gray-600">{`${report.address.city || 'Unknown'}, ${report.address.state || 'Unknown'}, ${report.address.pincode || 'Unknown'}`}</p>
                ) : (
                  <p className="text-gray-600">Address information not available</p>
                )}
              </div>

              <div className="mb-4">
                <h3 className="font-semibold text-gray-800">Harmful Level:</h3>
                <p className={`text-gray-600 font-semibold ${report.harmfulLevel === 'High' ? 'text-red-600' : report.harmfulLevel === 'Moderate' ? 'text-yellow-600' : 'text-green-600'}`}>
                  {report.harmfulLevel || 'N/A'}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {report.images && report.images.map((image) => (
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

              <p className="text-gray-500 text-sm mt-2">Accepted on: {report.issuedDate ? new Date(report.issuedDate).toLocaleDateString() : 'N/A'}</p>

              {/* Buttons for canceling and completing the report */}
              {user && user.typeOfUser === 'People' ? (null) : (
                <div className="flex justify-between gap-3 mt-4 ">
                  <button
                    onClick={() => handleCancel(report._id)}
                    className="bg-red-500 text-white rounded-md w-full px-4 py-2 hover:bg-red-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleComplete(report._id)}
                    className="bg-green-500 text-white rounded-md px-4 w-full py-2 hover:bg-green-600"
                  >
                    Mark as Completed
                  </button>
                </div>)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AcceptedReports;
