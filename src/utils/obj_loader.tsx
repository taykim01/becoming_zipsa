"use client";

import React, { useRef, Suspense } from "react";
import { Canvas, useLoader, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { OBJLoader } from "three-stdlib";
import { MTLLoader } from "three-stdlib";
import * as THREE from "three";

interface ModelProps {
  objUrl: string;
  mtlUrl: string;
  moveArm: boolean;
}

function Model({ objUrl, mtlUrl, moveArm }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materials = useLoader(MTLLoader, mtlUrl);
  const obj = useLoader(OBJLoader, objUrl, (loader) => {
    materials.preload();
    (loader as any).setMaterials(materials);
  });

  let arm: THREE.Object3D | undefined;

  obj.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      if (child.name === "Arm") {
        arm = child;
      }
    }
  });

  useFrame(() => {
    if (moveArm && arm) {
      arm.rotation.x += 0.1;
    }
  });

  return <primitive ref={groupRef} object={obj} />;
}

interface ObjLoaderProps {
  objUrl: string;
  mtlUrl: string;
  moveArm: boolean;
}

function ObjLoader({ objUrl, mtlUrl, moveArm }: ObjLoaderProps) {
  return (
    <Canvas style={{ width: "100%", height: "100%" }}>
      <ambientLight intensity={5} />
      <directionalLight position={[10, 10, 10]} intensity={0.6} />
      <pointLight position={[-5, -5, -5]} intensity={1} />
      <Suspense fallback={null}>
        <Model objUrl={objUrl} mtlUrl={mtlUrl} moveArm={moveArm} />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ObjLoader;