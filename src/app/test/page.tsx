"use client";

import { Canvas } from "@react-three/fiber";

export default function TestPage() {
    return (
        <div style={{ width: "100%", height: "100vh", backgroundColor: "blue" }}>
            <Canvas>
                <ambientLight />
                <mesh>
                    <boxGeometry args={[2, 2, 2]} />
                    <meshStandardMaterial color="orange" />
                </mesh>
            </Canvas>
        </div>
    );
}
