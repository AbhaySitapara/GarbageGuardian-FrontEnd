import React from 'react';
import Footer from '../Components/Footer/Footer';
import Header from '../Components/Header/Header';
import BackgroundImage from '../Assets/About/bgimage3.jpg';

const PrivacyPolicy = () => {
  return (
    <>
      <Header />
      <div
        className="font-sans min-h-screen bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Page Content */}
        <div className="relative z-10 py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-[1000px] mx-auto">
            {/* Privacy Policy Title */}
            <div className="bg-white bg-opacity-80 rounded-lg p-8 shadow-lg mb-8 text-center border-b-4 border-green-600">
              <h1 className="text-4xl font-bold text-green-700 mb-4">Garbage Guardian Privacy Policy</h1>
              <p className="text-gray-600">Updated: November 2024</p>
            </div>

            {/* Privacy Policy Sections */}
            <div className="space-y-8">
              {/* Section: Introduction */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  Garbage Guardian respects your privacy and is committed to protecting your personal information.
                  This Privacy Policy outlines the data we collect, how we use it, and your rights regarding your personal information.
                </p>
              </div>

              {/* Section: Data Collection */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">2. Data Collection</h2>
                <p className="text-gray-700 leading-relaxed">
                  We collect certain data to provide a seamless experience for all users. Types of data collected include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 pl-4">
                  <li><strong>Personal Information:</strong> Such as your name, email address, and phone number when you create an account or contact us.</li>
                  <li><strong>Location Information:</strong> To support waste reporting and service requests, we may collect your location data (if you grant permission).</li>
                  <li><strong>Usage Data:</strong> Information about your interactions on the platform, such as features accessed, reports submitted, and device information.</li>
                </ul>
              </div>

              {/* Section: How We Use Your Data */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">3. How We Use Your Data</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your data helps us improve the platform and provide better service. Specifically, we use your information for:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 pl-4">
                  <li><strong>Service Requests and Waste Reports:</strong> To process and respond to your requests effectively.</li>
                  <li><strong>Platform Improvement:</strong> To analyze usage trends, improve platform performance, and add relevant features.</li>
                  <li><strong>Notifications:</strong> To send updates regarding your reports, service requests, and new platform features.</li>
                </ul>
              </div>

              {/* Section: Data Sharing and Disclosure */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">4. Data Sharing and Disclosure</h2>
                <p className="text-gray-700 leading-relaxed">
                  We value your privacy and do not share your personal data with third parties except in these cases:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 pl-4">
                  <li><strong>With Municipal Authorities:</strong> Necessary information may be shared to resolve waste management issues effectively.</li>
                  <li><strong>For Legal Compliance:</strong> If required by law or to protect the rights, property, or safety of Garbage Guardian, our users, or the public.</li>
                  <li><strong>With Service Providers:</strong> Third-party providers who assist us in operating the platform may have access to your data but are bound by confidentiality agreements.</li>
                </ul>
              </div>

              {/* Section: Data Storage and Security */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">5. Data Storage and Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We take data security seriously. Your data is stored on secure servers, and we implement measures to protect it against unauthorized access, alteration, or destruction.
                </p>
              </div>

              {/* Section: Your Rights */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">6. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed">
                  As a user of Garbage Guardian, you have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mt-4 space-y-2 pl-4">
                  <li><strong>Access:</strong> Request access to the data we have collected about you.</li>
                  <li><strong>Rectify:</strong> Request corrections to any inaccurate or incomplete information.</li>
                  <li><strong>Delete:</strong> Request deletion of your account and personal information from our records.</li>
                  <li><strong>Restrict Processing:</strong> Opt out of certain data processing activities where possible.</li>
                </ul>
              </div>

              {/* Section: Cookies and Tracking */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">7. Cookies and Tracking Technologies</h2>
                <p className="text-gray-700 leading-relaxed">
                  Garbage Guardian may use cookies or similar technologies to enhance user experience, remember preferences, and improve the platform.
                  You may choose to disable cookies, but this could affect the functionality of certain features.
                </p>
              </div>

              {/* Section: Updates to This Policy */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">8. Updates to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may periodically update this Privacy Policy. Users will be notified of major changes, and continued use of the platform constitutes acceptance of the updated terms.
                </p>
              </div>

              {/* Section: Contact Us */}
              <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 leading-relaxed">
                  For questions or concerns about this Privacy Policy or your personal data, please contact us at:
                </p>
                <p className="text-gray-700 mt-4">
                  <strong>Email:</strong> support@garbageguardian.com <br />
                  <strong>Phone:</strong> +91 98765 43210 <br />
                  <strong>Address:</strong> Garbage Guardian Support Center, Rajkot
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;