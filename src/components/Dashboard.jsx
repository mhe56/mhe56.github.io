import React, { useState, useEffect } from 'react';
import { FaUserFriends, FaExclamationTriangle, FaSmile, FaDownload, FaSnowflake, FaMobileAlt, FaUsers, FaFileAlt } from 'react-icons/fa';

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
  const [report, setReport] = useState('');

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
    const [status] = attendance.split(' (');
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
      {/* Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {/* Occupancy Status */}
        <div style={boxStyle}>
          <FaUserFriends size={24} color="#2196F3" />
          <div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>Occupancy</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              {status.num_bodies} ({getOccupancyStatus(status.num_bodies)})
            </div>
          </div>
        </div>

        {/* Attendance Status - Only show when not N/A */}
        {status.attendance !== 'N/A' && (
          <div style={boxStyle}>
            <FaSmile size={24} color="#4CAF50" />
            <div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>Attendance</div>
              <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {getAttendanceStatus(status.attendance)}
              </div>
              <div style={{ fontSize: '0.9rem', color: '#666' }}>
                {getAttendanceCount(status.attendance)}
              </div>
            </div>
          </div>
        )}

        {/* HVAC Status */}
        <div style={boxStyle}>
          <FaSnowflake size={24} color="#00BCD4" />
          <div>
            <div style={{ fontSize: '0.9rem', color: '#666' }}>HVAC Status</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{status.hvac}</div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {status.alerts.length > 0 && (
        <div style={boxStyle}>
          <div style={{ width: '100%' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '12px' }}>Alerts</div>
            {categorizeAlerts(status.alerts).map((alert, index) => (
              <WarningCard key={index} message={alert.message} type={alert.type} />
            ))}
          </div>
        </div>
      )}

      {/* Report Section */}
      {report && (
        <div style={boxStyle}>
          <div style={{ width: '100%' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              marginBottom: '12px',
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}>
              <FaFileAlt size={20} color="#2196F3" />
              <span>Lecture Report</span>
            </div>
            <div style={{
              backgroundColor: '#f5f5f5',
              padding: '12px',
              borderRadius: '8px',
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {report}
            </div>
          </div>
        </div>
      )}

      {/* Report Download */}
      <div style={boxStyle}>
        <button
          onClick={handleDownloadReport}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <FaDownload />
          Download Attendance Report
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
