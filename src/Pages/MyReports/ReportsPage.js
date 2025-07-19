// src/Pages/MyReports/MyReports.js
import React, { useState ,useContext,useEffect} from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa'; // Home icon from react-icons
import { AiOutlineFileText, AiOutlineCheckCircle, AiOutlineCheckSquare } from 'react-icons/ai'; // Report icons
import { useNavigate } from 'react-router-dom';
import IssuedReportsById from './IssuedReports';
import AcceptedReport from './AcceptedReports';
import CompletedReport from './CompletedReports';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // import toastify styles



const MyReports = () => {
  const [activeTab, setActiveTab] = useState('issued');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated

    if (!token) {
    

      toast.error('You need to be logged in first.', {
        position: 'top-center',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      
        draggable: true,
        progress: undefined,
pauseOnHover: false,
      });

      setTimeout(() => {
        navigate('/login'); // Redirect to login after 2 seconds
      }, 2000);
    }
  }, [token, navigate]);


  const renderContent = () => {
    switch (activeTab) {
      case 'issued':
        return <IssuedReportsById />;
      case 'accepted':
        return <AcceptedReport />;
      case 'completed':
        return <CompletedReport />;
      default:
        return <IssuedReportsById />;
    }
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
       <ToastContainer />
      <div className="sidebar w-1/4 bg-white shadow-lg rounded-lg p-6 m-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Reports</h2>
        <ul className="space-y-2">
          <li
            onClick={() => setActiveTab('issued')}
            className={`cursor-pointer flex items-center p-3 rounded-lg transition-all duration-300 
              ${activeTab === 'issued' ? 'bg-green-200 text-green-800' : 'hover:bg-green-100'}`}
          >
            <AiOutlineFileText className="mr-2" /> Issued Reports
          </li>
          <li
            onClick={() => setActiveTab('accepted')}
            className={`cursor-pointer flex items-center p-3 rounded-lg transition-all duration-300 
              ${activeTab === 'accepted' ? 'bg-green-200 text-green-800' : 'hover:bg-green-100'}`}
          >
            <AiOutlineCheckCircle className="mr-2" /> Accepted Reports
          </li>
          <li
            onClick={() => setActiveTab('completed')}
            className={`cursor-pointer flex items-center p-3 rounded-lg transition-all duration-300 
              ${activeTab === 'completed' ? 'bg-green-200 text-green-800' : 'hover:bg-green-100'}`}
          >
            <AiOutlineCheckSquare className="mr-2" /> Completed Reports
          </li>
        </ul>
        <Link to="/" className="flex items-center mt-4 p-3 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300">
          <FaHome className="mr-2" /> Home
        </Link>
      </div>
      <div className="content w-3/4 p-6 m-4 bg-white shadow-lg rounded-lg">
        {renderContent()}
      </div>
    </div>
  );
};

export default MyReports;
