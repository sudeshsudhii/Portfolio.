"use client";

import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import Loader from "@/components/Loader";
import { Scene } from "@/components/canvas/Scene";

export default function DesktopBook() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Artificial load time to ensure 3D scene compiles shaders smoothly
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {loading && <Loader />}

      <div className="w-full h-[100dvh] bg-[#1e1c1a] overflow-hidden fixed inset-0">
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 5], fov: 45 }}
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]} // Support high-DPI displays
        >
          <color attach="background" args={['#1e1c1a']} />

          {/* Main 3D Book Environment */}
          <Scene />

          {/* Preload textures/fonts to prevent pop-in */}
          <Preload all />
        </Canvas>

        {/* Scroll hint overlay */}
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-10 opacity-60">
          <p className="text-[#c4b5a0] text-[0.6rem] tracking-[0.2em] font-mono uppercase">
            Scroll Down to Open
          </p>
        </div>
      </div>
    </>
  );
}
