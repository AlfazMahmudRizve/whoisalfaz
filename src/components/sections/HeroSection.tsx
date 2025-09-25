import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, color }: { position: [number, number, number], color: string }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const speed = useMemo(() => Math.random() * 0.4 + 0.1, []);
  const rotationSpeed = useMemo(() => (Math.random() - 0.5) * 0.02, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    ref.current.rotation.x += rotationSpeed;
    ref.current.rotation.y += rotationSpeed;
    ref.current.position.y = position[1] + Math.sin(t) * 2;
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position}>
      {/* FIX: Converted to a self-closing tag to resolve JSX type errors. */}
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} roughness={0.2} metalness={0.8} wireframe={true} />
    </Icosahedron>
  );
};

const Scene = () => {
    const shapes = useMemo<{ position: [number, number, number]; color: string }[]>(() => [
        { position: [-6, 2, -10], color: '#00f5d4' },
        { position: [8, -4, -15], color: '#9b5de5' },
        { position: [5, 5, -8], color: '#00f5d4' },
        { position: [-8, -5, -12], color: '#9b5de5' },
        { position: [0, -8, -10], color: '#00f5d4' },
    ], []);

    return(
        <>
            {/* FIX: Converted to self-closing tags to resolve JSX type errors. */}
            <ambientLight intensity={0.2} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} color="#9b5de5" intensity={2} />
            <pointLight position={[10, 10, 10]} color="#00f5d4" intensity={2} />
            {shapes.map((shape, i) => <FloatingShape key={i} {...shape} />)}
        </>
    )
}

const HeroSection: React.FC = () => {
  return (
    <section className="h-screen w-full relative flex items-center justify-center">
      <div className="absolute inset-0 bg-dark-bg z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Scene />
        </Canvas>
      </div>
      <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-4 tracking-tight leading-tight">
          Helping businesses scale with <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">AI-powered solutions</span>
        </h1>
        <p className="text-lg md:text-2xl font-light text-gray-300 mb-8">
          AI-Powered Problem Solver | Web Creator | Social Growth
        </p>
        <div className="flex justify-center space-x-4">
          <button onClick={() => document.querySelector('#showcase')?.scrollIntoView({ behavior: 'smooth' })} className="bg-primary text-dark-bg font-bold py-3 px-8 rounded-full text-lg hover:scale-105 transform transition-transform duration-300">
            Explore My Work
          </button>
          <button onClick={() => document.querySelector('#blog')?.scrollIntoView({ behavior: 'smooth' })} className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-white hover:text-dark-bg transform transition-all duration-300">
            Read My Blog
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
