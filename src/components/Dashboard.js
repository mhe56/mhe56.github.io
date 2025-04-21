import React, { useState } from 'react';

function Dashboard() {
  const [occupancy, setOccupancy] = useState(0);
  const [warnings, setWarnings] = useState([]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Occupancy Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#e6f0f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#2c3e50"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#2c3e50' }}>{occupancy}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Current Occupancy</div>
        </div>
      </div>

      {/* Arduino Dashboard Link */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
        <a
          href="https://app.arduino.cc/dashboards/f6f7ff24-2f0f-440d-b140-acef8df76cf2"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: '#2196F3',
            color: 'white',
            fontSize: '1rem',
            fontWeight: '500',
            cursor: 'pointer',
            textDecoration: 'none',
            display: 'block',
            textAlign: 'center',
            transition: 'background-color 0.3s',
          }}
        >
          Arduino Dashboard
        </a>
      </div>

      {/* Warnings Section */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      }}>
        <div style={{
          fontSize: '1.1rem',
          fontWeight: '600',
          color: '#2c3e50',
          marginBottom: '16px',
        }}>
          Warnings
        </div>
        <div style={{
          minHeight: '100px',
          border: '1px dashed #d0d0d0',
          borderRadius: '8px',
          padding: '12px',
        }}>
          {warnings.length === 0 ? (
            <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No warnings at the moment
            </div>
          ) : (
            warnings.map((warning, index) => (
              <div key={index} style={{
                padding: '8px',
                marginBottom: '8px',
                backgroundColor: '#fff3f3',
                borderRadius: '6px',
                color: '#d32f2f',
              }}>
                {warning}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 