import React, { useState } from 'react';

function FeatureControls({ onReportGenerated }) {
  const [socialDistancing, setSocialDistancing] = useState(false);
  const [phoneDetection, setPhoneDetection] = useState(false);
  const [attendance, setAttendance] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLectureActive, setIsLectureActive] = useState(false);
  const [error, setError] = useState('');

  const updateFeatures = async (changedFeature) => {
    if (!isInitialized) return;
    
    try {
        // Only include the feature that was changed
        const requestData = {
            [changedFeature]: {
                'phone': phoneDetection,
                'covid': socialDistancing,
                'attendance': attendance,
                'registered_students': registeredStudents ? parseInt(registeredStudents) : 0
            }[changedFeature]
        };
        
        console.log('Sending feature update request:', requestData);
        
        const response = await fetch('http://localhost:5000/api/update_features', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestData)
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Feature update failed:', errorData);
            throw new Error(errorData.error || 'Failed to update features');
        }
        
        const data = await response.json();
        console.log('Feature update response:', data);
        
        if (data.status !== 'success') {
            throw new Error('Unexpected response from server');
        }
    } catch (error) {
        console.error('Error updating features:', error);
        // Revert the state on error
        if (changedFeature === 'phone') {
            setPhoneDetection(prev => !prev);
        } else if (changedFeature === 'covid') {
            setSocialDistancing(prev => !prev);
        } else if (changedFeature === 'attendance') {
            setAttendance(prev => !prev);
        }
        alert(`Failed to update ${changedFeature}. Please try again.`);
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
          attendance: attendance,
          registered_students: registeredStudents ? parseInt(registeredStudents) : 0,
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

  const startLecture = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/start_lecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to start lecture');
      }

      setIsLectureActive(true);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Error starting lecture:', err);
    }
  };

  const stopLecture = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/stop_lecture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to stop lecture');
      }

      const data = await response.json();
      setIsLectureActive(false);
      setAttendance(false);
      setError('');
      
      // Show the report in the dashboard
      if (onReportGenerated) {
        onReportGenerated(data.report);
      }
    } catch (err) {
      setError(err.message);
      console.error('Error stopping lecture:', err);
    }
  };

  const handleSocialDistancingToggle = async () => {
    const newValue = !socialDistancing;
    setSocialDistancing(newValue);
    if (isInitialized) {
      await updateFeatures('covid');
    }
  };

  const handlePhoneDetectionToggle = async () => {
    const newValue = !phoneDetection;
    setPhoneDetection(newValue);
    if (isInitialized) {
      await updateFeatures('phone');
    }
  };

  const handleAttendanceToggle = async () => {
    const newValue = !attendance;
    setAttendance(newValue);
    if (isInitialized) {
      await updateFeatures('attendance');
    }
  };

  const handleRegisteredStudentsChange = async (e) => {
    setRegisteredStudents(e.target.value);
    if (isInitialized) {
      await updateFeatures('registered_students');
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
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Attendance</label>
          <button
            onClick={handleAttendanceToggle}
            style={{
              width: '40px',
              height: '20px',
              borderRadius: '10px',
              backgroundColor: attendance ? '#4CAF50' : '#ccc',
              border: 'none',
              position: 'relative',
              cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              top: '2px',
              left: attendance ? '22px' : '2px',
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s',
            }} />
          </button>
        </div>
      </div>

      {attendance && !isLectureActive && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          <label style={{ fontSize: '0.9rem', color: '#2c3e50' }}>Registered Students:</label>
          <input
            type="number"
            value={registeredStudents}
            onChange={handleRegisteredStudentsChange}
            style={{
              width: '80px',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid #d0d0d0',
              fontSize: '0.9rem',
            }}
            placeholder="0"
          />
          <button
            onClick={startLecture}
            style={{
              padding: '8px 16px',
              borderRadius: '6px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '0.9rem',
            }}
          >
            Start Lecture
          </button>
        </div>
      )}

      {isLectureActive && (
        <button
          onClick={stopLecture}
          style={{
            padding: '8px 16px',
            borderRadius: '6px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
            fontWeight: '500',
            fontSize: '0.9rem',
            marginLeft: 'auto',
          }}
        >
          Stop Lecture
        </button>
      )}
    </div>
  );
}

export default FeatureControls; 