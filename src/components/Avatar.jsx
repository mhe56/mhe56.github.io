import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { clone } from 'three/examples/jsm/utils/SkeletonUtils';

const Avatar = ({ position = [0, 0, 0], scale = [1, 1, 1], rotation = [0, 0, 0] }) => {
  const { scene } = useGLTF(`${process.env.PUBLIC_URL}/avatar.glb`);

  // Clone the scene to allow multiple independent instances
  const clonedScene = useMemo(() => clone(scene), [scene]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
    />
  );
};

export default Avatar;
