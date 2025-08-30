// src/components/ProgressBar.js
import React from 'react';

const ProgressBar = ({ attempted, correct }) => {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
    margin: '10px 0',
  };

  const attemptedBarStyles = {
    height: '100%',
    width: `${attempted}%`,
    backgroundColor: '#007bff', // Blue for attempted
    borderRadius: 'inherit',
    textAlign: 'right',
    transition: 'width 1s ease-in-out',
  };

  const correctBarStyles = {
    height: '100%',
    width: `${correct}%`,
    backgroundColor: '#28a745', // Green for correct
    borderRadius: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  };
  
  return (
    <div style={containerStyles}>
      <div style={attemptedBarStyles}>
        <div style={correctBarStyles}>
          <span style={{ padding: 5, color: 'white', fontWeight: 'bold' }}>
            {correct}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;