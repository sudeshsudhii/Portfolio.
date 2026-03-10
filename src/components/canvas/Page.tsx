import { forwardRef, useRef, useMemo } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { MathUtils } from "three";

// Constants for physical book dimensions
export const PAGE_WIDTH = 1.2;
export const PAGE_HEIGHT = 1.7;
export const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 64;

type PageProps = {
    number: number;
    rotation: [number, number, number];
    position: [number, number, number];
    leftContent?: React.ReactNode;
    rightContent?: React.ReactNode;
    frontColor?: string;
    backColor?: string;
    isCover?: boolean;
    opened?: boolean; // True if this page has been flipped
};

export const Page = forwardRef<THREE.Group, PageProps>(
    (
        {
            rotation,
            position,
            leftContent,
            rightContent,
            frontColor = "#f4ebd8", // Paper color
            backColor = "#f4ebd8",
            isCover = false,
            opened = false,
        },
        ref
    ) => {
        const group = useRef<THREE.Group>(null);
        const geometryRef = useRef<THREE.BoxGeometry>(null);

        // We use a spring to smoothly interpolate the "flip progress" from 0.0 (closed/right) to 1.0 (opened/left)
        const flipProgress = useRef(0);
        const targetFlipProgress = opened ? 1 : 0;

        // Use memo to only create geometry once
        const geometry = useMemo(() => {
            const geo = new THREE.BoxGeometry(
                PAGE_WIDTH,
                PAGE_HEIGHT,
                isCover ? PAGE_DEPTH * 3 : PAGE_DEPTH,
                PAGE_SEGMENTS,
                1, // height segments
                1  // depth segments
            );
            geo.translate(PAGE_WIDTH / 2, 0, 0); // Translate so origin is at the spine (left edge)
            return geo;
        }, [isCover]);

        // Store original positions for deformation calculations
        const originalPositions = useMemo(() => {
            const positionAttribute = geometry.attributes.position;
            return new Float32Array(positionAttribute.array);
        }, [geometry]);

        useFrame((_, delta) => {
            // Smoothly animate the flip progress
            flipProgress.current = MathUtils.damp(
                flipProgress.current,
                targetFlipProgress,
                8, // Lambda (speed)
                delta
            );

            // Perform Vertex Manipulation based on flip progress
            if (geometryRef.current) {
                const positions = geometryRef.current.attributes.position;
                const vertexCount = positions.count;

                // Bending Physics Logic
                // As a page flips, it lifts from the right edge, curls toward the spine, and falls left.
                for (let i = 0; i < vertexCount; i++) {
                    const ix = i * 3;
                    const iy = i * 3 + 1;
                    const iz = i * 3 + 2;

                    const ox = originalPositions[ix]; // X distance from spine (0 to PAGE_WIDTH)
                    const oy = originalPositions[iy];
                    const oz = originalPositions[iz];

                    // Normalize X distance from spine (0.0 at spine, 1.0 at outer edge)
                    const normX = ox / PAGE_WIDTH;

                    // The flip curve intensity peaks when halfway turned (~0.5)
                    const flipIntensity = Math.sin(flipProgress.current * Math.PI);

                    // Rotate the entire group to simulate the 180-degree flip
                    // but we apply additional vertex bending to make it look like paper.
                    let dx = ox;
                    const dy = oy;
                    let dz = oz;

                    // Dynamic curl radius when turning
                    if (flipIntensity > 0.01 && normX > 0) {
                        const curlRadius = 0.3; // Base bend radius
                        const curlFactor = flipIntensity * normX * Math.PI; // Curl amount
                        dx = ox - Math.sin(curlFactor) * curlRadius * flipIntensity;
                        dz = oz + (1 - Math.cos(curlFactor)) * curlRadius * flipIntensity;

                        // Lift the page up slightly in the middle of the flip
                        dz += Math.sin(normX * Math.PI) * 0.1 * flipIntensity;
                    }

                    positions.setXYZ(i, dx, dy, dz);
                }
                positions.needsUpdate = true;
            }

            // Rotate group around spine
            if (group.current) {
                // Spine rotation from 0 (right) to 180 (left)
                const maxRotation = Math.PI;
                group.current.rotation.y = -(flipProgress.current * maxRotation);
            }
        });

        return (
            <group ref={ref} rotation={rotation} position={position}>
                <group ref={group}>
                    <mesh castShadow receiveShadow geometry={geometry} ref={geometryRef}>
                        {/* Multiple materials for a BoxGeometry (Right, Left, Top, Bottom, Front, Back) */}
                        <meshStandardMaterial attach="material-0" color={frontColor} roughness={0.8} />
                        <meshStandardMaterial attach="material-1" color={backColor} roughness={0.8} />
                        <meshStandardMaterial attach="material-2" color={frontColor} roughness={0.8} />
                        <meshStandardMaterial attach="material-3" color={frontColor} roughness={0.8} />
                        <meshStandardMaterial attach="material-4" color={frontColor} roughness={0.9} /> {/* Front Face */}
                        <meshStandardMaterial attach="material-5" color={backColor} roughness={0.9} />  {/* Back Face */}
                    </mesh>

                    {/* FRONT HTML Content */}
                    {rightContent && (
                        <Html
                            transform
                            position={[PAGE_WIDTH / 2, 0, (isCover ? PAGE_DEPTH * 1.5 : PAGE_DEPTH) + 0.001]}
                            rotation={[0, 0, 0]}
                            occlude="blending"
                            zIndexRange={[100, 0]}
                        >
                            <div
                                style={{
                                    width: `${PAGE_WIDTH * 400}px`, // Scale R3F units to DOM pixels (e.g., 1 unit = 400px)
                                    height: `${PAGE_HEIGHT * 400}px`,
                                    backgroundColor: "transparent",
                                    pointerEvents: opened ? "none" : "auto", // Can't click front if page is laid on the left
                                    transform: 'scale(0.0025)', // Re-scale back down to match physical 3D dimensions
                                    transformOrigin: 'center'
                                }}
                            >
                                {rightContent}
                            </div>
                        </Html>
                    )}

                    {/* BACK HTML Content (Rotated 180 deg) */}
                    {leftContent && (
                        <Html
                            transform
                            position={[PAGE_WIDTH / 2, 0, -(isCover ? PAGE_DEPTH * 1.5 : PAGE_DEPTH) - 0.001]}
                            rotation={[0, Math.PI, 0]}
                            occlude="blending"
                            zIndexRange={[100, 0]}
                        >
                            <div
                                style={{
                                    width: `${PAGE_WIDTH * 400}px`,
                                    height: `${PAGE_HEIGHT * 400}px`,
                                    backgroundColor: "transparent",
                                    pointerEvents: opened ? "auto" : "none",
                                    transform: 'scale(0.0025)',
                                    transformOrigin: 'center'
                                }}
                            >
                                {leftContent}
                            </div>
                        </Html>
                    )}
                </group>
            </group>
        );
    }
);

Page.displayName = "Page";
