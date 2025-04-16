import React from 'react';
import { FaUserFriends, FaExclamationTriangle, FaSmile } from 'react-icons/fa';

const boxStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '16px 20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const WarningCard = ({ message }) => (
  <div
    style={{
      backgroundColor: '#ffe5e5',
      border: '1px solid #ff4d4f',
      color: '#a60000',
      padding: '12px 16px',
      borderRadius: '8px',
      fontWeight: 'bold',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}
  >
    <span style={{ fontSize: '1.5rem' }}>⚠️</span>
    <span>{message}</span>
  </div>
);

const Dashboard = () => {
  return (
    <div
      style={{
        padding: '24px',
        height: '100%',
        backgroundColor: '#f8f8f8', // off-white background
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Static warning for demo */}
      <WarningCard message="WARNING: social distancing is being violated (1 meter rule)" />

      {/* Arduino Button */}
      <a href="https://app.arduino.cc/dashboards" target="_blank" rel="noopener noreferrer">
        <div style={{ ...boxStyle, justifyContent: 'center' }}>
          <button
            style={{
              width: '100%',
              padding: '10px 20px',
              fontSize: '1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Go to Arduino Dashboard
          </button>
        </div>
      </a>

      {/* Occupancy */}
      <div style={boxStyle}>
        <FaUserFriends size={36} color="#007bff" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>3</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Sparsely Occupied</p>
        </div>
      </div>

      {/* Major Distractions */}
      <div style={boxStyle}>
        <FaExclamationTriangle size={30} color="red" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>1</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Major Distractions</p>
        </div>
      </div>

      {/* Satisfaction Score */}
      <div style={boxStyle}>
        <FaSmile size={30} color="green" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>80 / 100</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>Satisfaction Score</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
