import React, { useState } from 'react';

function FeatureControls() {
  const [socialDistancing, setSocialDistancing] = useState(false);
  const [phoneDetection, setPhoneDetection] = useState(false);
  const [distractionAnalysis, setDistractionAnalysis] = useState(false);
  const [attendance, setAttendance] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState('');

  const updateFeatures = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/update_features', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          covid: socialDistancing,
          phone: phoneDetection,
          attendance: distractionAnalysis,
          registered_students: attendance ? parseInt(attendance) : 0
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update features');
      }

      console.log('Features updated successfully');
    } catch (err) {
      setError(err.message);
      console.error('Error updating features:', err);
    }
  };

  const initializeCamera = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          covid: socialDistancing,
          phone: phoneDetection,
          attendance: distractionAnalysis,
          registered_students: attendance ? parseInt(attendance) : 0,
          resolution: 'HD720'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to initialize camera');
      }

      const data = await response.json();
      setIsInitialized(true);
      setError('');
      console.log('Camera initialized successfully:', data);
    } catch (err) {
      setError(err.message);
      console.error('Error initializing camera:', err);
    }
  };

  const handleSocialDistancingToggle = () => {
    setSocialDistancing(!socialDistancing);
    if (isInitialized) {
      updateFeatures();
    }
  };

  const handlePhoneDetectionToggle = () => {
    setPhoneDetection(!phoneDetection);
    if (isInitialized) {
      updateFeatures();
    }
  };

  const handleDistractionAnalysisToggle = () => {
    setDistractionAnalysis(!distractionAnalysis);
    if (isInitialized) {
      updateFeatures();
    }
  };

  const handleAttendanceChange = (e) => {
    setAttendance(e.target.value);
    if (isInitialized) {
      updateFeatures();
    }
  };

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
      {/* Initialize Button */}
      <button
        onClick={initializeCamera}
        disabled={isInitialized}
        style={{
          padding: '8px 16px',
          borderRadius: '6px',
          backgroundColor: isInitialized ? '#4CAF50' : '#2196F3',
          color: 'white',
          border: 'none',
          cursor: isInitialized ? 'default' : 'pointer',
          fontWeight: '500',
          fontSize: '0.9rem',
        }}
      >
        {isInitialized ? 'Camera Initialized' : 'Initialize Camera'}
      </button>

      {error && (
        <div style={{ color: 'red', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Social Distancing</label>
          <button
            onClick={handleSocialDistancingToggle}
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
            onClick={handlePhoneDetectionToggle}
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
            onClick={handleDistractionAnalysisToggle}
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
          onChange={handleAttendanceChange}
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