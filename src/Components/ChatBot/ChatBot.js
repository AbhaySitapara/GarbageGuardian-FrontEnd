import React, { useState, useRef, useEffect } from 'react';
import Logo from '../../Assets/GG/logo.png';
import Loader from './Loader'; // Adjust the import path accordingly
import { Link } from 'react-router-dom';


const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      message:
        "Hi, I'm the GarbageGuardian Virtual Assistant ChatBot. If you need assistance with anything, I'm here to help! Your chat may be monitored and recorded for quality purposes. For information about our privacy practices, review the GarbageGuardian Privacy Policy.",
    },
  ]);
  const [isBotTyping, setIsBotTyping] = useState(false); // State to manage bot typing indicator

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Reference for the chat container to auto-scroll
  const chatContainerRef = useRef(null);

  // Scroll to bottom whenever chatMessages is updated
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  // Static responses for each button

const responses = {
  whoWeAre: (
    <span>
      Garbage Guardian is a platform dedicated to waste management and sustainability. We help citizens report waste issues, buy/sell recycled products, and access various eco-friendly services. 
      <span className="text-blue-500"><Link to="/about">Learn more on our About Page</Link></span>
    </span>
  ),
  issueReport: (
    <span>
      To issue a report, go to the Report Issue section on the homepage. Fill in the details, upload any relevant photos, and submit your report. We’ll take it from there! 
      <span className="text-blue-500"><Link to="/report">Report Issue</Link></span>
    </span>
  ),
  purchaseRecycle: (
    <span>
      To purchase recycled products, visit the Recycling Products section in the app. Browse through available items, add to cart, and complete your purchase. 
      <span className="text-blue-500"><Link to="/products">Recycling Products</Link></span>
    </span>
  ),
  contactUs: (
    <span>
      To contact us directly, please visit the Contact Us section for our email and phone information, or leave us a message through this chatbot! 
      <span className="text-blue-500"><Link to="/contactus">Contact Us</Link></span>
    </span>
  ),
  reportGuidelines: (
    <span>
      When submitting a report, please ensure the location is accurate, and provide a brief description of the waste type. Photos are optional but can help with faster processing!
    </span>
  ),
  communityInvolvement: (
    <span>
      Join our monthly community cleanup drives, we have a large number of active community support! Contact us for more details on upcoming activities to support a cleaner city.
    </span>
  ),
  recyclingGuidelines: (
    <span>
      Please ensure items are clean and dry before recycling. Paper, glass, metal, and certain plastics can often be recycled, but local guidelines vary—check with your municipality.
    </span>
  ),
  faq: (
    <span>
      For commonly asked questions, visit our FAQ section. We cover topics like reporting processes, service requests, recycling options, and more. 
      <span className="text-blue-500"><Link to="/faq">FAQ</Link></span>
    </span>
  ),
  privacyPolicy: (
    <span>
      Your privacy is important to us. Our Privacy Policy outlines how we use and protect your information. 
      <span className="text-blue-500"><Link to="/privacyandpolicy">Privacy Policy</Link></span>
    </span>
  ),
  feedback: (
    <span>
      We value your feedback! Let us know about your experience using Garbage Guardian and how we can improve. You can submit feedback via the Contact Us section. 
      <span className="text-blue-500"><Link to="/contactus">Contact Us</Link></span>
    </span>
  ),
};



  // Handle button click to display user's choice and bot response
  const handleButtonClick = (userMessage, botResponse) => {
    // Add user's message immediately
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', message: userMessage },
    ]);

    // Show loader and simulate bot response delay
    setIsBotTyping(true); // Start typing indicator
    setTimeout(() => {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', message: botResponse },
      ]);
      setIsBotTyping(false); // Stop typing indicator
    }, 1100); // Delay of 1 second for bot response
  };

  return (
    <div className="fixed bottom-6 right-4 z-50">
      {/* Chatbot Icon */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="bg-green-600 text-white p-6 rounded-full border-white shadow-lg hover:bg-green-700 transition-transform duration-300 text-2xl"
        >
          💬
        </button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <div className="bg-gray-100 w-[400px] h-[600px] rounded-xl shadow-2xl flex flex-col">
          {/* Chatbot Header */}
          <div className="bg-green-500 text-white p-4 flex justify-between items-center rounded-t-xl">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              <img src={Logo} alt="GG Logo" className="w-14 h-8 rounded-full border-2 border-white" />
              <h2 className="text-lg font-bold">GG Virtual Assistance</h2>
            </div>
            {/* Close Button */}
            <button onClick={toggleChat} className="text-white font-bold text-xl">X</button>
          </div>

          {/* Chatbot Body */}
          <div className="flex-grow p-6 overflow-y-auto space-y-4" ref={chatContainerRef}>
            {/* Display Messages */}
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-md max-w-xs transition-all duration-300 ${msg.sender === 'bot'
                    ? 'bg-green-100 text-green-800 self-start'
                    : 'bg-blue-100 text-blue-800 self-end'
                  }`}
                style={{
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                  marginLeft: msg.sender === 'bot' ? '0' : 'auto', // Align user messages to the right
                  marginRight: msg.sender === 'bot' ? 'auto' : '0', // Align bot messages to the left
                }}
              >
                {msg.message}
              </div>
            ))}

            {/* Show Loader if Bot is Typing */}
            {isBotTyping && (
              <div className="flex items-center space-x-2">
                <Loader />
              </div>
            )}
          </div>

          {/* User Options in Two Columns */}
          <div className="grid grid-cols-2 gap-2 p-4">
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Who We Are', responses.whoWeAre)
              }
            >
              Who We Are
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('How to Issue Report', responses.issueReport)
              }
            >
              How to Issue Report
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Purchase Recycle Products', responses.purchaseRecycle)
              }
            >
              Purchase Recycle Products
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Contact Us Now', responses.contactUs)
              }
            >
              Contact Us Now
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Report Guidelines', responses.reportGuidelines)
              }
            >
              Report Guidelines
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Community Involvement', responses.communityInvolvement)
              }
            >
              Community Involvement
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Recycling Guidelines', responses.recyclingGuidelines)
              }
            >
              Recycling Guidelines
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('FAQ', responses.faq)
              }
            >
              FAQ
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('Privacy Policy', responses.privacyPolicy)
              }
            >
              Privacy Policy
            </button>
            <button
              className="bg-green-500 text-white px-2 py-1 rounded-lg shadow hover:bg-green-600 text-sm"
              onClick={() =>
                handleButtonClick('App Feedback', responses.feedback)
              }
            >
              App Feedback
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
