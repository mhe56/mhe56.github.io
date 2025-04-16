import React from 'react';
import SceneViewer from './components/SceneViewer';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', margin: 0, padding: 0 }}>
  {/* Left Side - Scene with Header */}
  <div style={{ flex: '72 1 0', height: '100%', display: 'flex', flexDirection: 'column' }}>
    {/* Header */}
    <div
      style={{
        backgroundColor: '#e6f0f8', // professional light blue
        padding: '16px 24px',
        fontSize: '1.8rem',
        fontWeight: '600',
        color: '#2c3e50',
        borderBottom: '1px solid #d0d0d0',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
      }}
    >
      Real-time Digital Twin
    </div>

    {/* 3D Scene */}
    <div style={{ flex: 1 }}>
      <SceneViewer />
    </div>
  </div>

  {/* Right Side - Dashboard with Card Styling */}
  <div
    style={{
      flex: '28 1 0',
      height: '100%',
      backgroundColor: '#f8f8f8',
      display: 'flex',
      flexDirection: 'column',
      padding: '16px',
    }}
  >
    {/* Dashboard Header */}
    <div
      style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#2c3e50',
        marginBottom: '16px',
        padding: '12px 16px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}
    >
      Digital Twin Insights
    </div>

    {/* Dashboard content */}
    <div
      style={{
        flex: 1,
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.06)',
        backgroundColor: '#ffffff',
        overflowY: 'auto',
        padding: '16px',
      }}
    >
      <Dashboard />
    </div>
  </div>
</div>

  );
}

export default App;
