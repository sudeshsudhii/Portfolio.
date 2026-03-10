"use client";

import { Environment, ContactShadows, Float } from "@react-three/drei";
import { Book } from "./Book";

export function Scene() {
    return (
        <>
            <ambientLight intensity={0.5} />

            {/* Main key light casting the dramatic shadow */}
            <spotLight
                position={[4, 5, 4]}
                angle={0.4}
                penumbra={1}
                intensity={2}
                castShadow
                shadow-mapSize={2048}
                shadow-bias={-0.0001}
            />

            {/* Fill light */}
            <directionalLight position={[-4, 3, -4]} intensity={0.3} />

            {/* Floating animation for the entire book */}
            <Float
                rotationIntensity={0.1}
                floatIntensity={0.2}
                speed={1.5}
            >
                <Book />
            </Float>

            {/* Realistic contact shadows on the "desk" */}
            <ContactShadows
                position={[0, -0.6, 0]}
                opacity={0.65}
                scale={10}
                blur={2.5}
                far={4}
            />

            {/* Beautiful studio environment map for reflections */}
            <Environment preset="city" />

            {/* A dark wooden desk surface */}
            <mesh position={[0, -0.61, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#1f1a17" roughness={0.9} />
            </mesh>
        </>
    );
}
