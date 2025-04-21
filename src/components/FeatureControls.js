import React, { useState } from 'react';

function FeatureControls() {
  const [socialDistancing, setSocialDistancing] = useState(false);
  const [phoneDetection, setPhoneDetection] = useState(false);
  const [distractionAnalysis, setDistractionAnalysis] = useState(false);
  const [attendance, setAttendance] = useState('');

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '16px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Social Distancing</label>
          <button
            onClick={() => setSocialDistancing(!socialDistancing)}
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              backgroundColor: socialDistancing ? '#4CAF50' : '#ccc',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: socialDistancing ? '22px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Phone Detection</label>
          <button
            onClick={() => setPhoneDetection(!phoneDetection)}
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              backgroundColor: phoneDetection ? '#4CAF50' : '#ccc',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: phoneDetection ? '22px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Distraction Analysis</label>
          <button
            onClick={() => setDistractionAnalysis(!distractionAnalysis)}
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              backgroundColor: distractionAnalysis ? '#4CAF50' : '#ccc',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: distractionAnalysis ? '22px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
        <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Attendance:</label>
        <input
          type="number"
          value={attendance}
          onChange={(e) => setAttendance(e.target.value)}
          style={{
            width: '80px',
            padding: '6px 8px',
            borderRadius: '6px',
            border: '1px solid #d0d0d0',
            fontSize: '0.9rem',
          }}
          placeholder="0"
        />
      </div>
    </div>
  );
}

export default FeatureControls; 