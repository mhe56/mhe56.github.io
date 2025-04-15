import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const StaticModel = () => {
  const gltf = useGLTF(`${process.env.PUBLIC_URL}/3D_model.glb`);
  return <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 0.5, -1]} />
  ;
};

const SceneViewer = () => {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* 3D Scene - 70% */}
      <div style={{ width: '70%', height: '100%' }}>
        <Canvas
          camera={{ position: [-13, 1.62, -9.83], fov: 60 }}
          style={{ height: '100%', width: '100%', display: 'block' }}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          <Suspense fallback={null}>
            <StaticModel />
          </Suspense>
        </Canvas>
      </div>

      {/* Placeholder for Dashboard - 30% */}
      <div style={{ width: '30%', height: '100%', backgroundColor: '#f4f4f4' }}>
        {/* Optional: future dashboard UI */}
      </div>
    </div>
  );
};

export default SceneViewer;
