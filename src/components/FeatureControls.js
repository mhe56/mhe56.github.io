import React, { useState } from 'react';

function FeatureControls({ onReportGenerated }) {
  const [socialDistancing, setSocialDistancing] = useState(false);
  const [phoneDetection, setPhoneDetection] = useState(false);
  const [attendance, setAttendance] = useState(false);
  const [registeredStudents, setRegisteredStudents] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLectureActive, setIsLectureActive] = useState(false);
  const [error, setError] = useState('');
  const [lectureReport, setLectureReport] = useState('');

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
          attendance: attendance,
          registered_students: registeredStudents ? parseInt(registeredStudents) : 0
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
      setLectureReport(data.report);
      
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
      try {
        const response = await fetch('http://localhost:5000/api/update_features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            covid: newValue,
            phone: phoneDetection,
            attendance: attendance,
            registered_students: registeredStudents ? parseInt(registeredStudents) : 0
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update features');
        }
        console.log('Social distancing updated successfully');
      } catch (err) {
        setError(err.message);
        console.error('Error updating social distancing:', err);
        // Revert the state on error
        setSocialDistancing(!newValue);
      }
    }
  };

  const handlePhoneDetectionToggle = async () => {
    const newValue = !phoneDetection;
    setPhoneDetection(newValue);
    if (isInitialized) {
      try {
        const response = await fetch('http://localhost:5000/api/update_features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            covid: socialDistancing,
            phone: newValue,
            attendance: attendance,
            registered_students: registeredStudents ? parseInt(registeredStudents) : 0
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update features');
        }
        console.log('Phone detection updated successfully');
      } catch (err) {
        setError(err.message);
        console.error('Error updating phone detection:', err);
        // Revert the state on error
        setPhoneDetection(!newValue);
      }
    }
  };

  const handleAttendanceToggle = async () => {
    const newValue = !attendance;
    setAttendance(newValue);
    if (isInitialized) {
      try {
        const response = await fetch('http://localhost:5000/api/update_features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            covid: socialDistancing,
            phone: phoneDetection,
            attendance: newValue,
            registered_students: registeredStudents ? parseInt(registeredStudents) : 0
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update features');
        }
        console.log('Attendance updated successfully');
      } catch (err) {
        setError(err.message);
        console.error('Error updating attendance:', err);
        // Revert the state on error
        setAttendance(!newValue);
      }
    }
  };

  const handleRegisteredStudentsChange = async (e) => {
    const newValue = e.target.value;
    setRegisteredStudents(newValue);
    if (isInitialized) {
      try {
        const response = await fetch('http://localhost:5000/api/update_features', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            covid: socialDistancing,
            phone: phoneDetection,
            attendance: attendance,
            registered_students: newValue ? parseInt(newValue) : 0
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to update features');
        }
        console.log('Registered students updated successfully');
      } catch (err) {
        setError(err.message);
        console.error('Error updating registered students:', err);
        // Revert the state on error
        setRegisteredStudents(e.target.value);
      }
    }
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      padding: '16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      borderBottom: '1px solid #e0e0e0',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    }}>
      {/* Controls Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
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

      {/* Report Display */}
      {lectureReport && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '16px',
          borderRadius: '8px',
          border: '1px solid #e0e0e0',
          whiteSpace: 'pre-wrap',
          fontFamily: 'monospace',
          fontSize: '0.9rem',
          maxHeight: '300px',
          overflowY: 'auto'
        }}>
          {lectureReport}
        </div>
      )}
    </div>
  );
}

export default FeatureControls; 