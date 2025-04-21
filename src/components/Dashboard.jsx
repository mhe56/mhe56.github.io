import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaExclamationTriangle, FaSmile, FaDownload, FaSnowflake, FaMobileAlt, FaUsers } from 'react-icons/fa';

const boxStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  padding: '16px 20px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
};

const WarningCard = ({ message, type }) => {
  const getIcon = () => {
    switch(type) {
      case 'covid':
        return <FaUsers size={20} color="#ff4d4f" />;
      case 'phone':
        return <FaMobileAlt size={20} color="#ff4d4f" />;
      default:
        return <FaExclamationTriangle size={20} color="#ff4d4f" />;
    }
  };

  return (
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
      {getIcon()}
      <span>{message}</span>
    </div>
  );
};

const Dashboard = () => {
  const [status, setStatus] = useState({
    num_bodies: 0,
    alerts: [],
    hvac: 'N/A',
    attendance: 'N/A'
  });

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/status');
        const data = await response.json();
        setStatus(data);
      } catch (error) {
        console.error('Error fetching status:', error);
      }
    };

    // Fetch status every 2 seconds
    const interval = setInterval(fetchStatus, 2000);
    fetchStatus(); // Initial fetch

    return () => clearInterval(interval);
  }, []);

  const handleDownloadReport = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/report');
      const data = await response.json();
      
      // Create a blob and download the report
      const blob = new Blob([data.report], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'attendance_report.txt';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading report:', error);
    }
  };

  const getOccupancyStatus = (numBodies) => {
    if (numBodies === 0) return 'Empty';
    if (numBodies <= 3) return 'Sparsely Occupied';
    if (numBodies <= 6) return 'Moderately Occupied';
    return 'Highly Occupied';
  };

  const getAttendanceStatus = (attendance) => {
    if (attendance === 'N/A') return 'N/A';
    const [status, count] = attendance.split(' (');
    return status;
  };

  const getAttendanceCount = (attendance) => {
    if (attendance === 'N/A') return 'N/A';
    const match = attendance.match(/\((\d+) \/ (\d+)\)/);
    return match ? `${match[1]} / ${match[2]}` : 'N/A';
  };

  const categorizeAlerts = (alerts) => {
    return alerts.map(alert => {
      if (alert.includes('bodies detected') || alert.includes('1m apart')) {
        return { message: alert, type: 'covid' };
      } else if (alert.includes('Phone usage')) {
        return { message: alert, type: 'phone' };
      }
      return { message: alert, type: 'general' };
    });
  };

  return (
    <div
      style={{
        padding: '24px',
        height: '100%',
        backgroundColor: '#f8f8f8',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* HVAC Status */}
      <div style={boxStyle}>
        <FaSnowflake size={30} color="#007bff" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>{status.hvac}</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>HVAC Status</p>
        </div>
      </div>

      {/* Occupancy */}
      <div style={boxStyle}>
        <FaUserFriends size={36} color="#007bff" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>{status.num_bodies}</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{getOccupancyStatus(status.num_bodies)}</p>
        </div>
      </div>

      {/* Attendance */}
      <div style={boxStyle}>
        <FaUsers size={30} color="#007bff" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>{getAttendanceCount(status.attendance)}</p>
          <p style={{ fontSize: '0.85rem', color: '#666', margin: 0 }}>{getAttendanceStatus(status.attendance)}</p>
        </div>
      </div>

      {/* Warnings */}
      {categorizeAlerts(status.alerts).map((alert, index) => (
        <WarningCard key={index} message={alert.message} type={alert.type} />
      ))}

      {/* Download Report Button */}
      <div style={{ ...boxStyle, justifyContent: 'center' }}>
        <button
          onClick={handleDownloadReport}
          style={{
            width: '100%',
            padding: '10px 20px',
            fontSize: '1rem',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <FaDownload />
          Download Attendance Report
        </button>
      </div>

      {/* Arduino Button */}
      <a href="https://app.arduino.cc/dashboards/f6f7ff24-2f0f-440d-b140-acef8df76cf2" target="_blank" rel="noopener noreferrer">
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

      {/* Major Distractions */}
      <div style={boxStyle}>
        <FaExclamationTriangle size={30} color="red" />
        <div>
          <p style={{ fontSize: '1.3rem', fontWeight: 'bold', margin: 0 }}>
            {status.alerts.filter(alert => alert.includes('Phone usage')).length}
          </p>
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
