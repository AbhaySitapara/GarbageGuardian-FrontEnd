// Loader.js
import React from 'react';

const Loader = () => {
  const dotStyle = {
    width: '12px',
    height: '12px',
    backgroundColor: '#38a169', // Green color
    borderRadius: '50%',
    animation: 'bounce 0.6s infinite ease-in-out',
    margin: '0 2px',
  };

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const keyframes = `
    @keyframes bounce {
      0%, 80%, 100% { transform: scale(0); }
      40% { transform: scale(1); }
    }
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div style={containerStyle}>
        <div style={{ ...dotStyle, animationDelay: '0s' }}></div>
        <div style={{ ...dotStyle, animationDelay: '0.2s' }}></div>
        <div style={{ ...dotStyle, animationDelay: '0.4s' }}></div>
      </div>
    </>
  );
};

export default Loader;
