// Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-green-600 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">GarbageGuardian</h1>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:text-green-200">Accepted Reports</Link>
          <Link to="/reports/completed" className="text-white hover:text-green-200">Completed Reports</Link>
          <Link to="/reports/issued" className="text-white hover:text-green-200">Issued Reports</Link>
          <Link to="/" className="text-white hover:text-green-200">Home</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
