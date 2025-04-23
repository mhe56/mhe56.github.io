import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [status, setStatus] = useState({
    num_bodies: 0,
    alerts: [],
    hvac: 'N/A',
    attendance: 'N/A'
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchStatus = async () => {
      if (isLoading) return;
      
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:5000/api/status');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (isMounted) {
          setStatus(data);
          setError(null);
        }
      } catch (error) {
        if (isMounted) {
          setError(error.message);
          console.error('Error fetching status:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Fetch status every 5 seconds instead of 2
    const interval = setInterval(fetchStatus, 5000);
    fetchStatus(); // Initial fetch

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const getOccupancyStatus = (numBodies) => {
    if (numBodies === 0) return 'Empty';
    if (numBodies <= 3) return 'Sparsely Occupied';
    if (numBodies <= 6) return 'Moderately Occupied';
    return 'Highly Occupied';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {error && (
        <div style={{
          backgroundColor: '#ffebee',
          color: '#c62828',
          padding: '12px',
          borderRadius: '8px',
          marginBottom: '16px'
        }}>
          Error: {error}
        </div>
      )}

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
          <div style={{ fontSize: '2rem', fontWeight: '600', color: '#2c3e50' }}>{status.num_bodies}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>{getOccupancyStatus(status.num_bodies)}</div>
        </div>
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
          {status.alerts.length === 0 ? (
            <div style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
              No warnings at the moment
            </div>
          ) : (
            status.alerts.map((warning, index) => (
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

      {/* HVAC Status */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e6f0f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#2c3e50"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#2c3e50"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>{status.hvac}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>HVAC Status</div>
        </div>
      </div>

      {/* Attendance Status */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: '#e6f0f8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#2c3e50"/>
            <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" fill="#2c3e50"/>
          </svg>
        </div>
        <div>
          <div style={{ fontSize: '1.2rem', fontWeight: '600', color: '#2c3e50' }}>{status.attendance}</div>
          <div style={{ fontSize: '0.9rem', color: '#666' }}>Attendance</div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard; 