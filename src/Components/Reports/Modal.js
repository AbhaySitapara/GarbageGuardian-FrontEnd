// Modal.js
import React from 'react';
import GIF from "../../Assets/IssueSuccessful/success.gif";

const Modal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/3 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4 text-center">Success</h2>
        <img 
          src={GIF} 
          alt="Success" 
          className="w-40 h-40 object-cover mb-4" 
        />
        <p className="text-center mb-4">{message}</p>
        <button
          onClick={onClose}
          className="bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
