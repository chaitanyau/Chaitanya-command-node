import React from 'react';
import { useFrame, Canvas } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';

import { Earth } from './scene/Earth';
import { Starfield } from './scene/Starfield';
import { Galaxies } from './scene/Galaxies';

// This is the main scene component that will be rendered inside the Canvas
export function CosmicScene() {
  const scroll = useScroll();

  useFrame((state) => {
    const scrollOffset = scroll.offset;
    
    // Smoothly interpolate camera position as we scroll
    // Start at z=6 (close to Earth) and move to z=60 (far away)
    const targetZ = 6 + scrollOffset * 54;
    state.camera.position.lerp(new THREE.Vector3(0, 0, targetZ), 0.02);
    
    // Always look at the center of the scene
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 5, 10]} intensity={1.5} />
      
      <Starfield />
      <Galaxies />
      <Earth scroll={scroll} />
    </>
  );
}