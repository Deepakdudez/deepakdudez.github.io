import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroCore3DProps {
  onNodeClick?: (nodeId: string) => void;
}

export const HeroCore3D: React.FC<HeroCore3DProps> = ({ onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTelemetry, setActiveTelemetry] = useState<string>('all-systems-normal');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = 520;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 28;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      console.warn("WebGL not supported, falling back to static visual", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for entire 3D tech ecosystem
    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    // 1. Central Core: Geometric Icosahedron with Wireframe & Glowing Vertices
    const coreGeometry = new THREE.IcosahedronGeometry(5.2, 1);
    
    // Translucent core material
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x111319,
      wireframe: false,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    ecosystemGroup.add(coreMesh);

    // Neon Lime Wireframe Overlay
    const wireframeGeometry = new THREE.WireframeGeometry(coreGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xD7FF3E, // Primary lime
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5,
    });
    const wireframeLine = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    ecosystemGroup.add(wireframeLine);

    // 2. Outer Orbital Rings (matching Banani rotated rings)
    // Ring 1: Primary lime ring
    const ring1Geo = new THREE.TorusGeometry(8.5, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xD7FF3E, transparent: true, opacity: 0.4 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ecosystemGroup.add(ring1);

    // Ring 2: Accent blue ring
    const ring2Geo = new THREE.TorusGeometry(10.5, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8AB4FF, transparent: true, opacity: 0.35 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    ecosystemGroup.add(ring2);

    // Ring 3: Amber network ring
    const ring3Geo = new THREE.TorusGeometry(12.5, 0.03, 16, 100);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xFFC46B, transparent: true, opacity: 0.25 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 5;
    ecosystemGroup.add(ring3);

    // 3. Floating Network Nodes & Data Particles (200 particles)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xD7FF3E);
    const colorBlue = new THREE.Color(0x8AB4FF);
    const colorWhite = new THREE.Color(0xF2F1EA);

    for (let i = 0; i < particleCount; i++) {
      // spherical distribution around core
      const radius = 6 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? colorLime : (Math.random() > 0.5 ? colorBlue : colorWhite);
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
    });

    const particles = new THREE.Points(particleGeo, particleMaterial);
    ecosystemGroup.add(particles);

    // 4. Subtle Interconnection Lines between random nearby nodes
    const linePositions: number[] = [];
    for (let i = 0; i < 40; i++) {
      const idxA = Math.floor(Math.random() * particleCount);
      const idxB = Math.floor(Math.random() * particleCount);
      linePositions.push(
        particlePositions[idxA * 3], particlePositions[idxA * 3 + 1], particlePositions[idxA * 3 + 2],
        particlePositions[idxB * 3], particlePositions[idxB * 3 + 1], particlePositions[idxB * 3 + 2]
      );
    }
    const linesGeo = new THREE.BufferGeometry();
    linesGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    const linesMat = new THREE.LineBasicMaterial({
      color: 0x8AB4FF,
      transparent: true,
      opacity: 0.15,
    });
    const networkLines = new THREE.LineSegments(linesGeo, linesMat);
    ecosystemGroup.add(networkLines);

    // Mouse movement tracking for subtle parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
      targetRotationY = x * 0.45;
      targetRotationX = y * 0.35;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = Math.max(300, container.clientWidth || 800);
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Continuous slow ambient rotation
        coreMesh.rotation.y = elapsedTime * 0.12;
        wireframeLine.rotation.y = elapsedTime * 0.12;
        wireframeLine.rotation.x = elapsedTime * 0.08;

        ring1.rotation.z = elapsedTime * 0.15;
        ring2.rotation.z = -elapsedTime * 0.1;
        ring3.rotation.y = elapsedTime * 0.08;

        particles.rotation.y = elapsedTime * 0.05;
        networkLines.rotation.y = elapsedTime * 0.05;

        // Smooth spring dampening toward mouse target
        currentRotationX += (targetRotationX - currentRotationX) * 0.05;
        currentRotationY += (targetRotationY - currentRotationY) * 0.05;

        ecosystemGroup.rotation.x = currentRotationX;
        ecosystemGroup.rotation.y = currentRotationY;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      className="relative w-full h-[520px] flex items-center justify-center overflow-hidden bg-surface/40 rounded-b-xl select-none"
      ref={mountRef}
    >
      {/* Radial Background Glow matching Banani design */}
      <div 
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none opacity-40 transition-opacity duration-700" 
        style={{
          background: 'radial-gradient(circle, rgba(215,255,62,0.18) 0%, rgba(138,180,255,0.12) 35%, transparent 70%)',
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * -20}px)`
        }}
      />

      {/* Outer decorative ring borders from Banani */}
      <div className="absolute w-[420px] h-[420px] rounded-full border border-line opacity-80 pointer-events-none" />
      <div className="absolute w-[320px] h-[320px] rounded-full border border-line pointer-events-none" style={{ transform: 'rotateX(68deg)' }} />
      <div className="absolute w-[500px] h-[200px] rounded-full border border-line opacity-60 pointer-events-none" style={{ transform: 'rotate(-18deg)' }} />

      {/* Floating Telemetry Badges matching exact Banani design */}
      
      {/* 01. Top-left: RAG Pipeline */}
      <div 
        onClick={() => { setActiveTelemetry('rag'); onNodeClick?.('ai'); }}
        className="absolute flex items-center gap-2 bg-card/90 backdrop-blur border border-line rounded-md px-3 py-2 cursor-pointer hover:border-primary transition-all duration-200 hover:scale-105 shadow-md z-10"
        style={{ top: '64px', left: '60px' }}
      >
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="font-body text-xs text-foreground font-medium">RAG Pipeline · live</span>
      </div>

      {/* 02. Top-right: Cloud Region */}
      <div 
        onClick={() => { setActiveTelemetry('cloud'); onNodeClick?.('cloud'); }}
        className="absolute flex items-center gap-2 bg-card/90 backdrop-blur border border-line rounded-md px-3 py-2 cursor-pointer hover:border-accent transition-all duration-200 hover:scale-105 shadow-md z-10"
        style={{ top: '130px', right: '48px' }}
      >
        <span className="w-2 h-2 rounded-full bg-accent" />
        <span className="font-body text-xs text-foreground font-medium">Cloud · eu-west</span>
      </div>

      {/* 03. Bottom-left: Network Nodes */}
      <div 
        onClick={() => { setActiveTelemetry('network'); onNodeClick?.('networking'); }}
        className="absolute flex items-center gap-2 bg-card/90 backdrop-blur border border-line rounded-md px-3 py-2 cursor-pointer hover:border-warm transition-all duration-200 hover:scale-105 shadow-md z-10"
        style={{ bottom: '86px', left: '44px' }}
      >
        <span className="w-2 h-2 rounded-full bg-warm" />
        <span className="font-body text-xs text-foreground font-medium">Network · 12 nodes</span>
      </div>

      {/* Central Glass HUD Card from Banani design */}
      <div 
        className="relative z-10 w-[240px] h-[240px] rounded-xl bg-card/85 backdrop-blur-md border border-line flex flex-col items-center justify-center gap-2 p-6 transition-all duration-300 hover:border-primary/60"
        style={{
          boxShadow: '0 0 80px rgba(215,255,62,0.12), inset 0 1px 0 rgba(255,255,255,0.08)'
        }}
      >
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center transition-transform hover:scale-110 duration-300"
          style={{ background: 'conic-gradient(from 180deg, #D7FF3E, #8AB4FF, #FFC46B, #D7FF3E)' }}
        >
          <div className="w-12 h-12 rounded-full bg-surface border border-line flex items-center justify-center text-foreground font-headings font-bold text-xl">
            ◐
          </div>
        </div>

        <div className="font-headings text-foreground font-bold text-base mt-2 tracking-tight">
          tech.ecosystem
        </div>
        <div className="font-body text-xs text-muted-foreground text-center leading-relaxed">
          AI — Cloud — Software<br />Networking — Data
        </div>

        {/* Status indicator bar */}
        <div className="flex gap-1.5 mt-2">
          <span className="w-8 h-1 rounded-full bg-primary" />
          <span className="w-8 h-1 rounded-full bg-line" />
          <span className="w-8 h-1 rounded-full bg-line" />
        </div>
      </div>

      {/* Floating labels around central card */}
      <div 
        className="absolute bg-surface/90 border border-line rounded-lg px-3 py-1.5 font-body text-xs text-foreground shadow-sm pointer-events-none hidden sm:block"
        style={{ top: '180px', left: '130px' }}
      >
        vector.db
      </div>

      <div 
        className="absolute bg-primary text-primary-foreground font-bold rounded-lg px-3 py-1.5 font-body text-xs shadow-glow pointer-events-none hidden sm:block"
        style={{ bottom: '160px', right: '110px' }}
      >
        agent: ready
      </div>

      <div 
        className="absolute bg-surface/90 border border-line rounded-lg px-3 py-1.5 font-body text-xs text-muted-foreground shadow-sm pointer-events-none hidden sm:block"
        style={{ bottom: '90px', right: '200px' }}
      >
        api.latency 38ms
      </div>
    </div>
  );
};
