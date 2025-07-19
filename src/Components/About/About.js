import React from 'react';
import { FaTwitter, FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import BgImage1 from '../../Assets/About/bgimage1.jpeg';  // Full-page background
import BackgroundImage from '../../Assets/About/bgimage2.jpg'; // Join our Movement and Social Media section

function About() {
  return (
    <div
      className="font-sans min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${BgImage1})`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      }}
    >
      {/* Hero Section */}
      <div
        className="relative h-[300px] flex items-center justify-center text-center text-white bg-cover bg-center"
      >
        {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}
        <div className="relative z-10 px-8 bg-white bg-opacity-80 rounded-lg p-8 w-[1000px]">
          <h1 className="text-5xl text-green-700 font-semibold mb-4">Our Story</h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto">
            We’re on a mission to make cities cleaner and more sustainable, empowering communities to actively address waste issues.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20 px-6 flex justify-center">
        <div className="relative z-10 bg-white bg-opacity-80 rounded-lg p-8 text-center w-[1000px]">
          <h2 className="text-4xl text-green-700 font-semibold mb-6">Our Mission</h2>
          <p className="text-lg leading-relaxed text-gray-600">
            <span className="inline-block bg-green-200 px-4 py-2 rounded-full font-bold mb-2 text-green-800">
              Transform Urban Waste Management
            </span><br />
            Garbage Guardian strives to transform urban waste management by bridging the gap between citizens and municipalities.
            Our goal is to facilitate community engagement and promote sustainable waste solutions.
          </p>
        </div>
      </div>

      {/* Garbage Guardian By the Numbers Section */}
      <div className="py-20 px-6 flex justify-center">
        <div className="relative z-10 bg-white bg-opacity-80 rounded-lg p-8 text-center w-[1000px]">
          <h2 className="text-4xl text-green-700 font-semibold mb-8">Garbage Guardian By the Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-700 mb-4">Our Reach</p>
              <h3 className="text-3xl font-bold text-green-600 mb-2">14</h3>
              <p className="text-lg text-gray-700 mb-4">Partnered Cities</p>
            </div>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-700 mb-4">Empowered Volunteers</p>
              <h3 className="text-3xl font-bold text-green-600 mb-2">8,000+</h3>
              <p className="text-lg text-gray-700 mb-4">Active Volunteers</p>
            </div>
            <div className="bg-white bg-opacity-90 p-8 rounded-lg border-l-4 border-green-600 shadow-lg hover:shadow-xl transition-transform transform hover:scale-105 duration-300">
              <p className="text-lg text-gray-700 mb-4">Impactful Reports</p>
              <h3 className="text-3xl font-bold text-green-600 mb-2">22,000+</h3>
              <p className="text-lg text-gray-700 mb-4">Waste Issues Resolves</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Values Section */}
      <div className="py-20 px-6 flex justify-center">
        <div className="relative z-10 bg-white bg-opacity-80 rounded-lg p-8 w-[1000px] text-center">
          <h2 className="text-4xl text-green-700 font-semibold mb-6">Our Values</h2>
          <div className="space-y-6 text-left">
            <div className="flex items-start bg-white bg-opacity-90 p-8 rounded-lg shadow-lg hover:bg-green-50 transition duration-300">
              <div className="text-green-600 mr-6 text-3xl">&#x1F4A1;</div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">Innovation</h3>
                <p className="text-lg text-gray-700">
                  Leveraging technology to create innovative solutions for waste management and sustainability.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-white bg-opacity-90 p-8 rounded-lg shadow-lg hover:bg-green-50 transition duration-300">
              <div className="text-green-600 mr-6 text-3xl">&#x1F4AA;</div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">Community</h3>
                <p className="text-lg text-gray-700">
                  Building a strong community of eco-conscious individuals and organizations to achieve a cleaner environment.
                </p>
              </div>
            </div>
            <div className="flex items-start bg-white bg-opacity-90 p-8 rounded-lg shadow-lg hover:bg-green-50 transition duration-300">
              <div className="text-green-600 mr-6 text-3xl">&#x1F4AC;</div>
              <div>
                <h3 className="text-2xl font-bold text-green-600">Transparency</h3>
                <p className="text-lg text-gray-700">
                  Maintaining open communication with our users about our processes and goals for sustainable impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Our Movement & Social Media Links with Shared Background */}
      <section
        className="relative py-20 text-center text-white bg-cover bg-center"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 px-8 rounded-lg p-8 max-w-2xl mx-auto">
          {/* Join Our Movement Section */}
          <h2 className="text-4xl font-semibold mb-4">Join Our Movement</h2>
          <p className="text-lg mb-4">
            Be part of the change! Join our community and participate in upcoming cleanup drives.
          </p>

          {/* Social Media Links Section */}
          <div className="py-8">
            <h3 className="text-3xl font-semibold mb-6">Connect with us on Social Media</h3>
            <div className="flex justify-center space-x-8">
              <a href="https://twitter.com/GarbageGuardian" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition duration-300 text-3xl">
                <FaTwitter />
              </a>
              <a href="https://www.facebook.com/GarbageGuardian" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition duration-300 text-3xl">
                <FaFacebookF />
              </a>
              <a href="https://www.instagram.com/garbageguardian/" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition duration-300 text-3xl">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/company/garbageguardian" target="_blank" rel="noopener noreferrer" className="text-green-500 hover:text-green-600 transition duration-300 text-3xl">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;