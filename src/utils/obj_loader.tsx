"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import * as THREE from "three";

interface ModelProps {
  objUrl: string;
  mtlUrl: string;
}

function Model({ objUrl, mtlUrl }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materials = useLoader(MTLLoader, mtlUrl);
  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    (loader as any).setMaterials(materials);
  });

  return <primitive ref={groupRef} object={obj} />;
}

interface ObjLoaderProps {
  objUrl: string;
  mtlUrl: string;
}

function ObjLoader({ objUrl, mtlUrl }: ObjLoaderProps) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <ambientLight intensity={5} />
      <directionalLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={1} />
      <Suspense fallback={null}>
        <Model objUrl={objUrl} mtlUrl={mtlUrl} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ObjLoader;