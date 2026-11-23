'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Camera, Pause, Play, Eye, RotateCw } from 'lucide-react';

export function ThreeF1CarHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [activeCam, setActiveCam] = useState<'hero' | 'front' | 'top'>('hero');

  // Keep references to Three.js objects for interaction
  const targetCamPosRef = useRef(new THREE.Vector3(5.2, 1.9, 5.4));
  const carGroupRef = useRef<THREE.Group | null>(null);
  const autoRotateRef = useRef(true);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090c, 0.045);

    const width = container.clientWidth || 1280;
    const height = container.clientHeight || 760;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(5.2, 1.9, 5.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    // Clear previous children
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    // Dynamic Studio Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x14171f, 0.7);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 8, 5);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimRed = new THREE.DirectionalLight(0xe10600, 3.8);
    rimRed.position.set(-6, 2.5, -4);
    scene.add(rimRed);

    const cyanUnder = new THREE.PointLight(0x00d2be, 1.8, 12);
    cyanUnder.position.set(0, 0.25, 0);
    scene.add(cyanUnder);

    // Carbon fiber ground mirror plane
    const groundGeo = new THREE.PlaneGeometry(36, 36);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x07080a,
      roughness: 0.35,
      metalness: 0.85,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    // Formula 1 Challenger Mesh Model Assembly
    const carGroup = new THREE.Group();
    carGroupRef.current = carGroup;

    // High Gloss Racing Red & Carbon Materials
    const redPaint = new THREE.MeshPhysicalMaterial({
      color: 0xe10600,
      metalness: 0.45,
      roughness: 0.15,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x141720,
      metalness: 0.85,
      roughness: 0.35,
    });

    const tireMat = new THREE.MeshStandardMaterial({
      color: 0x181a20,
      roughness: 0.88,
      metalness: 0.08,
    });

    const rimMat = new THREE.MeshStandardMaterial({
      color: 0xdcdfe4,
      metalness: 0.95,
      roughness: 0.18,
    });

    // 1. Monocoque / Main Chassis
    const chassisGeo = new THREE.BoxGeometry(0.85, 0.42, 3.8);
    const chassis = new THREE.Mesh(chassisGeo, carbonMat);
    chassis.position.set(0, 0.44, 0);
    chassis.castShadow = true;
    carGroup.add(chassis);

    // 2. Tapered Aero Nosecone
    const noseGeo = new THREE.ConeGeometry(0.38, 1.6, 6);
    const nose = new THREE.Mesh(noseGeo, redPaint);
    nose.rotation.x = Math.PI / 2;
    nose.position.set(0, 0.34, 1.8);
    nose.rotation.x = 0.09;
    nose.castShadow = true;
    carGroup.add(nose);

    // 3. Venturi Sidepods
    [-0.58, 0.58].forEach((x) => {
      const pod = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.38, 1.9), redPaint);
      pod.position.set(x, 0.40, -0.15);
      pod.castShadow = true;
      carGroup.add(pod);
    });

    // 4. Engine Airbox & Shark Fin
    const engineCover = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.48, 1.4), redPaint);
    engineCover.position.set(0, 0.68, -0.9);
    engineCover.castShadow = true;
    carGroup.add(engineCover);

    const sharkFin = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.42, 1.1), carbonMat);
    sharkFin.position.set(0, 0.92, -1.25);
    carGroup.add(sharkFin);

    // 5. Titanium Halo Cockpit Protection
    const halo = new THREE.Mesh(new THREE.TorusGeometry(0.28, 0.035, 10, 24, Math.PI), carbonMat);
    halo.rotation.x = Math.PI / 2;
    halo.position.set(0, 0.68, 0.35);
    carGroup.add(halo);

    // 6. Multi-Element Front Wing
    const frontWing = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.05, 0.55), carbonMat);
    frontWing.position.set(0, 0.14, 2.45);
    frontWing.castShadow = true;
    carGroup.add(frontWing);

    [-1.02, 1.02].forEach((x) => {
      const endplate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.26, 0.58), redPaint);
      endplate.position.set(x, 0.24, 2.45);
      carGroup.add(endplate);
    });

    // 7. Rear Wing Assembly & DRS Actuator
    const rearWingMain = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.06, 0.42), carbonMat);
    rearWingMain.position.set(0, 0.95, -2.15);
    rearWingMain.castShadow = true;
    carGroup.add(rearWingMain);

    const drsFlap = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.16, 0.05), redPaint);
    drsFlap.position.set(0, 1.06, -2.28);
    drsFlap.rotation.x = -0.35;
    carGroup.add(drsFlap);

    [-0.58, 0.58].forEach((x) => {
      const rearEndplate = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.48, 0.52), carbonMat);
      rearEndplate.position.set(x, 0.92, -2.18);
      carGroup.add(rearEndplate);
    });

    // 8. 4 Pirelli Slick Tires & Aerodynamic Wheel Covers
    const wheelPositions: [number, number, number][] = [
      [-0.92, 0.34, 1.55],
      [0.92, 0.34, 1.55],
      [-0.96, 0.36, -1.55],
      [0.96, 0.36, -1.55],
    ];

    wheelPositions.forEach(([x, y, z], idx) => {
      const radius = idx < 2 ? 0.34 : 0.36;
      const widthTire = idx < 2 ? 0.34 : 0.42;

      const tire = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, widthTire, 28), tireMat);
      tire.rotation.z = Math.PI / 2;
      tire.position.set(x, y, z);
      tire.castShadow = true;
      carGroup.add(tire);

      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.20, 0.20, widthTire + 0.02, 18), rimMat);
      rim.rotation.z = Math.PI / 2;
      rim.position.set(x, y, z);
      carGroup.add(rim);
    });

    scene.add(carGroup);

    // Interactive Drag to Rotate
    let isDragging = false;
    let prevX = 0;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevX = e.clientX;
    };
    const onPointerUp = () => {
      isDragging = false;
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevX;
      prevX = e.clientX;
      carGroup.rotation.y += dx * 0.008;
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointermove', onPointerMove);

    // Resize Handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || 1280;
      const h = container.clientHeight || 760;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Render / Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (autoRotateRef.current && !isDragging) {
        carGroup.rotation.y += 0.0035;
      }
      camera.position.lerp(targetCamPosRef.current, 0.06);
      camera.lookAt(0.6, 0.35, 0);
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
    };
  }, []);

  const switchCamera = (preset: 'hero' | 'front' | 'top') => {
    setActiveCam(preset);
    if (preset === 'hero') targetCamPosRef.current.set(5.2, 1.9, 5.4);
    if (preset === 'front') targetCamPosRef.current.set(0.4, 1.1, 6.2);
    if (preset === 'top') targetCamPosRef.current.set(0.8, 7.2, 1.2);
  };

  return (
    <div className="relative w-full h-[760px] overflow-hidden">
      {/* 3D WebGL Canvas Canvas Host */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        title="Click & Drag to Orbit 3D F1 Car"
      />

      {/* Floating 3D Telemetry HUD Controls */}
      <div className="absolute bottom-6 right-6 z-20 flex flex-col items-end gap-3 pointer-events-auto">
        <div className="bg-[#0e1015]/90 backdrop-blur-md border border-white/10 rounded-xl p-2.5 flex items-center gap-2 shadow-2xl">
          <div className="flex items-center gap-1.5 mr-1 text-xs font-mono font-bold text-gray-400 uppercase">
            <Camera size={13} className="text-[#e10600]" />
            <span>Angle</span>
          </div>

          <button
            type="button"
            onClick={() => switchCamera('hero')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition ${
              activeCam === 'hero'
                ? 'bg-[#e10600] text-white shadow-md shadow-[#e10600]/40'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            3/4 Hero
          </button>

          <button
            type="button"
            onClick={() => switchCamera('front')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition ${
              activeCam === 'front'
                ? 'bg-[#e10600] text-white shadow-md shadow-[#e10600]/40'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Front Aero
          </button>

          <button
            type="button"
            onClick={() => switchCamera('top')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition ${
              activeCam === 'top'
                ? 'bg-[#e10600] text-white shadow-md shadow-[#e10600]/40'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10'
            }`}
          >
            Top Down
          </button>

          <button
            type="button"
            onClick={() => setAutoRotate(!autoRotate)}
            className="p-2 rounded-lg bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 transition"
            title={autoRotate ? 'Pause 3D Rotation' : 'Resume 3D Rotation'}
          >
            {autoRotate ? <Pause size={14} /> : <Play size={14} />}
          </button>
        </div>

        <div className="bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-lg text-[10px] font-mono text-gray-400">
          DRAG TO ORBIT CHASSIS &bull; 798 KG MIN WEIGHT &bull; 1.6L V6 TURBO HYBRID
        </div>
      </div>
    </div>
  );
}