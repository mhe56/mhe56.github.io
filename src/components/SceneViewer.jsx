import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';

const Model = () => {
  const gltf = useGLTF('/3D_model.glb'); // Ensure your model is in the public directory
  return <primitive object={gltf.scene} scale={[1, 1, 1]} />;
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
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Suspense fallback={<Html>Loading 3D Model...</Html>}>
          <Model />
        </Suspense>
      </Canvas>
    </>
  );
};

export default SceneViewer;
