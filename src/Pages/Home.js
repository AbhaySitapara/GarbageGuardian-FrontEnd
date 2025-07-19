import React from 'react';
import Header from '../Components/Header/Header';
import HeroSection from '../Components/HeroSection/HeroSection';
import IssuedReport from '../Components/Reports/IssuedReport';
import Footer from '../Components/Footer/Footer';
import ChatBot from '../Components/ChatBot/ChatBot'; 
import App from '../Components/3DDustbin/3ddustbin';

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="mt-8"> 
        <IssuedReport />
      </div>
      <App/>
      <Footer />
      <ChatBot /> 
    </div>
  );
};

export default HomePage;
