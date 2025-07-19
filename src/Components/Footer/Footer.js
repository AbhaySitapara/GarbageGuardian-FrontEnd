import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-green-700 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold">Garbage Guardian</h2>
            <p className="mt-4 text-gray-300">
              We’re committed to a cleaner planet. Join us in our mission to improve waste management and promote sustainability.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/report" className="text-gray-300 hover:text-white">Report Issue</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">Recycling Products</Link>
              </li>
              <li>
                <Link to="/contactus" className="text-gray-300 hover:text-white">Contact Us</Link>
              </li>
              <li>
                <Link to="/privacyandpolicy" className="text-gray-300 hover:text-white">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          
          {/* Contact Info & Social Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Get in Touch</h3>
            <p className="text-gray-300">Email: support@garbageguardian.com</p>
            <p className="text-gray-300">Phone: +91 98765 43210</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="hover:text-green-300" aria-label="Facebook">
                <i className="fab fa-facebook-square text-2xl"></i>
              </a>
              <a href="https://twitter.com" className="hover:text-green-300" aria-label="Twitter">
                <i className="fab fa-twitter-square text-2xl"></i>
              </a>
              <a href="https://instagram.com" className="hover:text-green-300" aria-label="Instagram">
                <i className="fab fa-instagram-square text-2xl"></i>
              </a>
              <a href="https://linkedin.com" className="hover:text-green-300" aria-label="LinkedIn">
                <i className="fab fa-linkedin text-2xl"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Garbage Guardian. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
