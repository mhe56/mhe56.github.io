import React from 'react';
import SceneViewer from './components/SceneViewer';

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "10px 0" }}>Digital Twin Viewer</h1>
      <SceneViewer />
    </div>
  );
};

export default App;
