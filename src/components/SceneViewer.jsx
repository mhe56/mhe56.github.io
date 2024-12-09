import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

// Component to load and render the 3D model
const Model = () => {
  const gltf = useGLTF('/3D_model.glb'); // Ensure your model is in the public directory
  return <primitive object={gltf.scene} scale={[1, 1, 1]} />;
};

// Component to display and update camera coordinates
const CameraCoordinates = () => {
  const { camera } = useThree();
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const updateCoordinates = () => {
      setCoordinates({
        x: camera.position.x.toFixed(2),
        y: camera.position.y.toFixed(2),
        z: camera.position.z.toFixed(2),
      });
    };

    // Update the coordinates whenever the camera moves
    const interval = setInterval(updateCoordinates, 100);
    return () => clearInterval(interval); // Cleanup
  }, [camera]);

  return (
    <Html position={[-5, 5, 0]} center>
      <div
        style={{
          background: '#333',
          color: '#fff',
          padding: '5px 10px',
          borderRadius: '5px',
          zIndex: 10,
        }}
      >
        Camera: (x: {coordinates.x}, y: {coordinates.y}, z: {coordinates.z})
      </div>
    </Html>
  );
};

// Button to reset the camera to a specific POV
const ResetCameraButton = () => {
  const { camera } = useThree(); // Access the camera from the Canvas context

  const resetCamera = () => {
    camera.position.set(-13, 1.62, -8.83); // Adjust these values for your desired POV
    camera.lookAt(0, 0, 0); // Ensure the camera looks at the model's center
  };

  return (
    <Html position={[5, 5, 0]} center>
      <button
        onClick={resetCamera}
        style={{
          background: '#007BFF',
          color: '#fff',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Reset Camera
      </button>
    </Html>
  );
};

const SceneViewer = () => {
  return (
    <>
      {/* 3D Canvas */}
      <Canvas
        style={{
          height: '100vh',
          width: '100vw',
          background: 'lightgray', // Optional background to ensure canvas visibility
        }}
      >
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Suspense fallback={<Html>Loading 3D Model...</Html>}>
          <Model />
          <ResetCameraButton />
          <CameraCoordinates />
        </Suspense>
      </Canvas>
    </>
  );
};

export default SceneViewer;
