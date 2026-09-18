"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

interface RobotModelViewerProps {
  className?: string;
  enableControls?: boolean;
  autoRotate?: boolean;
}

export default function RobotModelViewer({
  className = "w-full h-80",
  enableControls = true,
  autoRotate = true,
}: RobotModelViewerProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // 1. Scene setup
    const scene = new THREE.Scene();

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 3.8);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // 4. Lights setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.6);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38a1f3, 2.5); // Cyan key light
    dirLight1.position.set(5, 10, 7);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5); // Fill light
    dirLight2.position.set(-5, 5, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x0062b1, 2.5, 10);
    pointLight.position.set(0, -2, 2);
    scene.add(pointLight);

    // 5. Controls
    let controls: OrbitControls | null = null;
    if (enableControls) {
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = true;
      controls.maxPolarAngle = Math.PI / 2 + 0.1;
      controls.minDistance = 2;
      controls.maxDistance = 8;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = 1.5;
    }

    // 6. Load GLB Model - ANIMATION REMOVED / IGNORED
    let loadedModel: THREE.Group | null = null;
    const loader = new GLTFLoader();

    loader.load(
      "/assets/genkub_greeting_robot.glb",
      (gltf) => {
        // NOTE: gltf.animations is intentionally NOT passed to an AnimationMixer.
        // This removes/disables all built-in animations of the 3D model!
        loadedModel = gltf.scene;

        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        loadedModel.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2.2 / (maxDim || 1);
        loadedModel.scale.set(scale, scale, scale);
        loadedModel.position.y += 0.1;

        loadedModel.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        scene.add(loadedModel);
        setLoading(false);
      },
      undefined,
      (err) => {
        console.error("Error loading 3D robot GLB model:", err);
        setError("Failed to load 3D model");
        setLoading(false);
      }
    );

    // 7. Render loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (controls) {
        controls.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    // 8. Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (controls) controls.dispose();
      renderer.dispose();
      if (container) container.innerHTML = "";
    };
  }, [enableControls, autoRotate]);

  return (
    <div className={`relative ${className}`}>
      {loading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/10 rounded-2xl backdrop-blur-xs z-10">
          <div className="w-8 h-8 border-3 border-[#38a1f3] border-t-transparent rounded-full animate-spin mb-2" />
          <span className="text-xs font-bold text-slate-600">Loading 3D Model...</span>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50 text-red-600 text-xs font-bold rounded-2xl p-4 z-10">
          {error}
        </div>
      )}

      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
}
