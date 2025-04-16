import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import Avatar from './Avatar';
import { useThree, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';


const StaticModel = () => {
  const gltf = useGLTF(`${process.env.PUBLIC_URL}/3D_model.glb`);
  return <primitive object={gltf.scene} scale={[1, 1, 1]} position={[0, 0.5, -1]} />;
};

const SceneBackground = () => {
  const { scene } = useThree();
  const texture = useLoader(TextureLoader, `${process.env.PUBLIC_URL}/background.png`);
  scene.background = texture;
  return null;
};



const SceneViewer = () => {
  return (
    <Canvas
      camera={{ position: [-13, 1.2, -6.5], fov: 70 }}
      style={{ height: '100%', width: '100%', display: 'block', background: '#f4f4f4'}}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <Suspense fallback={null}>
        <SceneBackground />
        <StaticModel />
        <Avatar position={[-6.5, -1.3, -3]} scale={[0.9, 0.9, 0.9]} rotation={[0, 2.5 * Math.PI / 2, 0]} />
        <Avatar position={[-7.5, -1.3, -6.5]} scale={[0.9, 0.9, 0.9]} rotation={[0, 3.5 * Math.PI / 2, 0]} />
        <Avatar position={[-8, -1.3, -3]} scale={[0.9, 0.9, 0.9]} rotation={[0, 1.2 * Math.PI / 2, 0]} />
      </Suspense>
    </Canvas>
  );
};

export default SceneViewer;
