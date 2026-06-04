"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Canvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0f, 0.025);

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Create the Y2K Cyber Grid
    const gridHelper = new THREE.GridHelper(100, 40, 0x8b5cf6, 0x3b1c73);
    gridHelper.position.y = -2;
    // Lower grid opacity
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.25;
      });
    } else {
      gridHelper.material.transparent = true;
      gridHelper.material.opacity = 0.25;
    }
    scene.add(gridHelper);

    // Secondary grid above for cage effect
    const topGridHelper = new THREE.GridHelper(100, 40, 0x8b5cf6, 0x3b1c73);
    topGridHelper.position.y = 12;
    if (Array.isArray(topGridHelper.material)) {
      topGridHelper.material.forEach((mat) => {
        mat.transparent = true;
        mat.opacity = 0.08;
      });
    } else {
      topGridHelper.material.transparent = true;
      topGridHelper.material.opacity = 0.08;
    }
    scene.add(topGridHelper);

    // 3. Floating particles (Matrix/Starfield data packets)
    const particleCount = 180;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const speeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      // Spread particles in a box
      positions[i * 3] = (Math.random() - 0.5) * 60; // X
      positions[i * 3 + 1] = Math.random() * 20 - 5; // Y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60; // Z
      speeds[i] = Math.random() * 0.05 + 0.01;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Custom glowing particle material
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xa78bfa,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, particleMaterial);
    scene.add(particles);

    // 4. Mouse movement tracking for interactive parallax
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates (-1 to 1)
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // 5. Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow scroll effect for the grid (shifting position backward to simulate flight)
      gridHelper.position.z = (elapsedTime * 2) % (100 / 40);
      topGridHelper.position.z = (elapsedTime * 2) % (100 / 40);

      // Animate floating particles
      const positionsArr = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        // Move particle downward/forward
        positionsArr[i * 3 + 2] += speeds[i]; // Move Z forward
        
        // Reset if it gets past camera
        if (positionsArr[i * 3 + 2] > 30) {
          positionsArr[i * 3 + 2] = -30;
          positionsArr[i * 3] = (Math.random() - 0.5) * 60;
          positionsArr[i * 3 + 1] = Math.random() * 20 - 5;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      // Lerp mouse coordinates for smooth inertia parallax
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Shift camera slightly based on mouse
      camera.position.x = mouseRef.current.x * 2.5;
      camera.position.y = 5 + mouseRef.current.y * 1.5;
      camera.lookAt(0, 2, -5);

      renderer.render(scene, camera);
    };

    animate();

    // 6. Handle Resizing
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      particleMaterial.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 bg-[#0B0B0F] overflow-hidden"
      style={{ pointerEvents: "none" }}
    />
  );
}
