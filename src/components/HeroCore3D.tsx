import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RotateCcw, ZoomIn, ZoomOut, Move, Sparkles, Activity, Layers } from 'lucide-react';

interface HeroCore3DProps {
  onNodeClick?: (nodeId: string) => void;
}

interface SatelliteData {
  id: string;
  name: string;
  category: string;
  tech: string;
  color: number;
  hexColor: string;
  radius: number;
  speed: number;
  initialAngle: number;
  elevation: number;
  mesh?: THREE.Mesh;
}

export const HeroCore3D: React.FC<HeroCore3DProps> = ({ onNodeClick }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeTelemetry, setActiveTelemetry] = useState<string>('Drag & explore 3D ecosystem');
  const [hoveredSatellite, setHoveredSatellite] = useState<SatelliteData | null>(null);
  const [satelliteScreenCoords, setSatelliteScreenCoords] = useState<{ [id: string]: { x: number; y: number; visible: boolean } }>({});
  const [zoomLevel, setZoomLevel] = useState<number>(24);

  // Satellite nodes representing Deepak's verified technology ecosystem
  const satellites: SatelliteData[] = [
    { id: 'agentic-ai', name: 'Agentic AI', category: 'LLMs & AWS', tech: 'Multi-Agent Chaining', color: 0xD7FF3E, hexColor: '#D7FF3E', radius: 9.5, speed: 0.35, initialAngle: 0, elevation: 1.5 },
    { id: 'spring-boot', name: 'Spring Boot', category: 'Backend REST', tech: 'Java Microservices', color: 0x8AB4FF, hexColor: '#8AB4FF', radius: 10.2, speed: -0.28, initialAngle: Math.PI / 3, elevation: -2.0 },
    { id: 'icp-blockchain', name: 'ICP Blockchain', category: 'Web3 & Microgrid', tech: 'Smart Canisters', color: 0x5EEAD4, hexColor: '#5EEAD4', radius: 11.0, speed: 0.22, initialAngle: (2 * Math.PI) / 3, elevation: 2.8 },
    { id: 'sql-powerbi', name: 'SQL & Power BI', category: 'Data Analytics', tech: 'Star Schema & ETL', color: 0xFFC46B, hexColor: '#FFC46B', radius: 9.8, speed: -0.32, initialAngle: Math.PI, elevation: -1.2 },
    { id: 'aws-cloud', name: 'AWS Cloud', category: 'Cloud Infrastructure', tech: 'EC2 · S3 · Lambda', color: 0xF59E0B, hexColor: '#F59E0B', radius: 11.5, speed: 0.18, initialAngle: (4 * Math.PI) / 3, elevation: 0.5 },
    { id: 'sysadmin', name: 'TCP/IP & SysAdmin', category: 'Enterprise Support', tech: 'VMware · DNS · DHCP', color: 0xA78BFA, hexColor: '#A78BFA', radius: 10.0, speed: -0.25, initialAngle: (5 * Math.PI) / 3, elevation: -2.5 },
  ];

  // Drag state refs to avoid re-renders during 60fps loop
  const isDraggingRef = useRef(false);
  const previousPointerPosRef = useRef({ x: 0, y: 0 });
  const velocityRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0.2, y: 0.4 });
  const resetTriggerRef = useRef(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const width = Math.max(300, container.clientWidth || 800);
    const height = Math.max(380, container.clientHeight || 500);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 24;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance'
      });
    } catch (e) {
      console.warn("WebGL not supported in environment:", e);
      return;
    }

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    // Group holding entire interactive ecosystem
    const ecosystemGroup = new THREE.Group();
    ecosystemGroup.rotation.x = rotationRef.current.x;
    ecosystemGroup.rotation.y = rotationRef.current.y;
    scene.add(ecosystemGroup);

    // 2. Central Core Geometry: Icosahedron with Translucent Core & Neon Lime Wireframe
    const coreGeometry = new THREE.IcosahedronGeometry(4.4, 1);
    
    // Core translucent body
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x0E1015,
      transparent: true,
      opacity: 0.88,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    ecosystemGroup.add(coreMesh);

    // Core Wireframe with lime primary glow
    const wireframeGeometry = new THREE.WireframeGeometry(coreGeometry);
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0xD7FF3E,
      transparent: true,
      opacity: 0.75,
      linewidth: 2,
    });
    const wireframeLine = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
    ecosystemGroup.add(wireframeLine);

    // Glowing Inner Nucleus Sphere
    const nucleusGeo = new THREE.SphereGeometry(2.0, 32, 32);
    const nucleusMat = new THREE.MeshBasicMaterial({
      color: 0xD7FF3E,
      transparent: true,
      opacity: 0.22,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    ecosystemGroup.add(nucleus);

    // 3. Orbital Rings with dynamic angles
    const ring1Geo = new THREE.TorusGeometry(8.2, 0.04, 16, 120);
    const ring1Mat = new THREE.MeshBasicMaterial({ color: 0xD7FF3E, transparent: true, opacity: 0.45 });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    ecosystemGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(10.2, 0.035, 16, 120);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x8AB4FF, transparent: true, opacity: 0.4 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 5;
    ecosystemGroup.add(ring2);

    const ring3Geo = new THREE.TorusGeometry(12.0, 0.03, 16, 120);
    const ring3Mat = new THREE.MeshBasicMaterial({ color: 0xFFC46B, transparent: true, opacity: 0.3 });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 4;
    ecosystemGroup.add(ring3);

    // 4. Satellite Nodes around the Core
    const satelliteMeshes: { data: SatelliteData; mesh: THREE.Mesh; glow: THREE.Mesh }[] = [];

    satellites.forEach((sat) => {
      // Node core
      const satGeo = new THREE.SphereGeometry(0.55, 24, 24);
      const satMat = new THREE.MeshBasicMaterial({ color: sat.color });
      const satMesh = new THREE.Mesh(satGeo, satMat);

      // Node aura glow
      const glowGeo = new THREE.SphereGeometry(0.85, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: sat.color,
        transparent: true,
        opacity: 0.25,
      });
      const glowMesh = new THREE.Mesh(glowGeo, glowMat);
      satMesh.add(glowMesh);

      ecosystemGroup.add(satMesh);
      satelliteMeshes.push({ data: sat, mesh: satMesh, glow: glowMesh });
    });

    // 5. Data Particles (180 particles in sphere cloud)
    const particleCount = 180;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xD7FF3E);
    const colorBlue = new THREE.Color(0x8AB4FF);
    const colorWarm = new THREE.Color(0xFFC46B);

    for (let i = 0; i < particleCount; i++) {
      const radius = 5.5 + Math.random() * 8.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const rColor = Math.random() > 0.5 ? colorLime : (Math.random() > 0.5 ? colorBlue : colorWarm);
      particleColors[i * 3] = rColor.r;
      particleColors[i * 3 + 1] = rColor.g;
      particleColors[i * 3 + 2] = rColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMaterial);
    ecosystemGroup.add(particles);

    // 6. Interactive Drag & Pointer Handlers
    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - previousPointerPosRef.current.x;
      const deltaY = e.clientY - previousPointerPosRef.current.y;

      previousPointerPosRef.current = { x: e.clientX, y: e.clientY };

      velocityRef.current = {
        x: deltaX * 0.005,
        y: deltaY * 0.005,
      };

      rotationRef.current.y += velocityRef.current.x;
      rotationRef.current.x += velocityRef.current.y;

      ecosystemGroup.rotation.y = rotationRef.current.y;
      ecosystemGroup.rotation.x = rotationRef.current.x;
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
    };

    // Zoom via Wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.015;
      camera.position.z = THREE.MathUtils.clamp(camera.position.z + zoomDelta, 14, 38);
      setZoomLevel(Math.round(camera.position.z));
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: false });

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = Math.max(300, container.clientWidth || 800);
      const newHeight = Math.max(380, container.clientHeight || 500);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop with Momentum & 2D Screen Space Projection for Satellite Labels
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const tempVec = new THREE.Vector3();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Reset smooth transition if triggered
      if (resetTriggerRef.current) {
        rotationRef.current.x += (0.2 - rotationRef.current.x) * 0.1;
        rotationRef.current.y += (0.4 - rotationRef.current.y) * 0.1;
        camera.position.z += (24 - camera.position.z) * 0.1;
        if (Math.abs(rotationRef.current.x - 0.2) < 0.01 && Math.abs(camera.position.z - 24) < 0.1) {
          resetTriggerRef.current = false;
        }
      } else if (!isDraggingRef.current) {
        // Inertial damping
        velocityRef.current.x *= 0.94;
        velocityRef.current.y *= 0.94;

        rotationRef.current.y += velocityRef.current.x;
        rotationRef.current.x += velocityRef.current.y;

        // Gentle ambient rotation when user is idle
        if (!prefersReducedMotion && Math.abs(velocityRef.current.x) < 0.001) {
          rotationRef.current.y += 0.0025;
        }
      }

      ecosystemGroup.rotation.x = rotationRef.current.x;
      ecosystemGroup.rotation.y = rotationRef.current.y;

      // Animate core pulsing & ring orbital precession
      if (!prefersReducedMotion) {
        coreMesh.rotation.y = elapsedTime * 0.15;
        wireframeLine.rotation.y = elapsedTime * 0.15;
        nucleus.scale.setScalar(1.0 + Math.sin(elapsedTime * 2.5) * 0.08);

        ring1.rotation.z = elapsedTime * 0.2;
        ring2.rotation.z = -elapsedTime * 0.15;
        ring3.rotation.y = elapsedTime * 0.12;

        particles.rotation.y = elapsedTime * 0.04;
      }

      // Update positions of orbiting satellite nodes
      const screenPositions: { [id: string]: { x: number; y: number; visible: boolean } } = {};

      satelliteMeshes.forEach(({ data, mesh }) => {
        const angle = data.initialAngle + (prefersReducedMotion ? 0 : elapsedTime * data.speed);
        mesh.position.x = Math.cos(angle) * data.radius;
        mesh.position.z = Math.sin(angle) * data.radius;
        mesh.position.y = data.elevation + Math.sin(elapsedTime * 1.5 + data.initialAngle) * 0.4;

        // Project 3D coordinate to 2D screen coordinate for interactive overlay
        mesh.getWorldPosition(tempVec);
        tempVec.project(camera);

        const isBehind = tempVec.z > 1.0;
        const screenX = (tempVec.x * 0.5 + 0.5) * container.clientWidth;
        const screenY = (-(tempVec.y * 0.5) + 0.5) * container.clientHeight;

        screenPositions[data.id] = {
          x: Math.round(screenX),
          y: Math.round(screenY),
          visible: !isBehind && screenX > 20 && screenX < container.clientWidth - 20 && screenY > 20 && screenY < container.clientHeight - 20,
        };
      });

      setSatelliteScreenCoords(screenPositions);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleReset = useCallback(() => {
    resetTriggerRef.current = true;
    setZoomLevel(24);
  }, []);

  const handleZoom = useCallback((direction: 'in' | 'out') => {
    const delta = direction === 'in' ? -3 : 3;
    setZoomLevel((prev) => {
      const next = THREE.MathUtils.clamp(prev + delta, 14, 38);
      return next;
    });
    resetTriggerRef.current = true;
  }, []);

  return (
    <div 
      className="relative w-full h-[520px] bg-card/40 rounded-b-xl overflow-hidden select-none touch-none flex items-center justify-center border-t border-line/40"
      ref={mountRef}
      style={{ cursor: isDraggingRef.current ? 'grabbing' : 'grab' }}
    >
      {/* Background Ambient Radial Glow */}
      <div 
        className="absolute w-[560px] h-[560px] rounded-full pointer-events-none opacity-30 blur-3xl transition-all duration-700" 
        style={{
          background: 'radial-gradient(circle, rgba(215,255,62,0.25) 0%, rgba(138,180,255,0.15) 45%, transparent 70%)',
        }}
      />

      {/* Cybernetic HUD Corner Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-primary/60 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-primary/60 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-primary/60 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-primary/60 pointer-events-none" />

      {/* Top Status Bar: Live Guidance & Controls */}
      <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur border border-line px-3 py-1.5 rounded-md font-mono text-[11px] text-foreground shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-primary font-bold">3D CORE //</span>
          <span className="text-muted-foreground hidden sm:inline">{activeTelemetry}</span>
        </div>

        {/* Viewport Control Tools */}
        <div className="flex items-center gap-1.5 pointer-events-auto bg-black/80 backdrop-blur border border-line p-1 rounded-md shadow-sm">
          <button
            onClick={() => handleZoom('in')}
            className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            title="Zoom in (or use mouse scroll wheel)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleZoom('out')}
            className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-primary transition-colors cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleReset}
            className="p-1.5 rounded hover:bg-surface text-muted-foreground hover:text-primary transition-colors cursor-pointer flex items-center gap-1 font-mono text-[10px]"
            title="Reset to default orientation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>

      {/* Bottom Hint Banner */}
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/75 backdrop-blur border border-line px-3 py-1 rounded-md font-mono text-[10px] text-muted-foreground">
          <Move className="w-3 h-3 text-primary animate-pulse" />
          <span>Click &amp; Drag in any direction to rotate 360° · Scroll wheel to zoom</span>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-muted-foreground bg-black/75 backdrop-blur border border-line px-2.5 py-1 rounded-md">
          <Layers className="w-3 h-3 text-accent" />
          <span>6 Active Nodes</span>
        </div>
      </div>

      {/* 2D Interactive Tooltip Chips Projecting Over 3D Orbiting Satellites */}
      {satellites.map((sat) => {
        const coords = satelliteScreenCoords[sat.id];
        if (!coords || !coords.visible) return null;

        const isHovered = hoveredSatellite?.id === sat.id;

        return (
          <div
            key={sat.id}
            onClick={() => {
              setActiveTelemetry(`${sat.name} · ${sat.tech}`);
              if (sat.id === 'agentic-ai') onNodeClick?.('agentic-ai-cloud');
              else if (sat.id === 'icp-blockchain') onNodeClick?.('decentralized-grid');
              else if (sat.id === 'sql-powerbi') onNodeClick?.('sales-bi-analytics');
              else if (sat.id === 'sysadmin') onNodeClick?.('windows-sysadmin-lab');
              else onNodeClick?.(sat.id);
            }}
            onMouseEnter={() => {
              setHoveredSatellite(sat);
              setActiveTelemetry(`${sat.name} · ${sat.tech}`);
            }}
            onMouseLeave={() => setHoveredSatellite(null)}
            className="absolute z-20 cursor-pointer pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out"
            style={{
              left: `${coords.x}px`,
              top: `${coords.y}px`,
            }}
          >
            {/* Interactive Pulse Dot */}
            <div className="relative flex items-center justify-center">
              <span 
                className="w-3.5 h-3.5 rounded-full animate-ping opacity-60 absolute" 
                style={{ backgroundColor: sat.hexColor }} 
              />
              <span 
                className="w-3 h-3 rounded-full border-2 border-black transition-transform duration-200" 
                style={{ 
                  backgroundColor: sat.hexColor,
                  transform: isHovered ? 'scale(1.4)' : 'scale(1.0)',
                  boxShadow: `0 0 12px ${sat.hexColor}`
                }} 
              />
            </div>

            {/* Label Chip */}
            <div 
              className={`mt-1.5 px-2.5 py-1 rounded-md backdrop-blur-md border text-center font-mono whitespace-nowrap shadow-lg transition-all duration-200 ${
                isHovered
                  ? 'bg-black/95 border-primary scale-110'
                  : 'bg-black/80 border-line/80 hover:border-primary/60'
              }`}
            >
              <div className="text-[11px] font-bold text-foreground flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: sat.hexColor }} />
                <span>{sat.name}</span>
              </div>
              <div className="text-[9px] text-muted-foreground">
                {sat.category}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
