"use client";

import { useState, useRef, useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { Page, PAGE_WIDTH, PAGE_DEPTH } from "./Page";

import CoverPage from "@/components/pages/CoverPage";
import AboutPage from "@/components/pages/AboutPage";
import SkillsPage from "@/components/pages/SkillsPage";
import ExperiencePage from "@/components/pages/ExperiencePage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import EducationPage from "@/components/pages/EducationPage";
import CertificationsPage from "@/components/pages/CertificationsPage";
import ContactPage from "@/components/pages/ContactPage";

const pagesData = [
    { left: null, right: <CoverPage />, isCover: true, coverColor: "#3d3229" },
    { left: <AboutPage />, right: <SkillsPage />, isCover: false },
    { left: <ExperiencePage />, right: <ProjectsPage />, isCover: false },
    { left: <EducationPage />, right: <CertificationsPage />, isCover: false },
    { left: <ContactPage />, right: null, isCover: true, coverColor: "#3d3229" },
];

export function Book() {
    const [page, setPage] = useState(0);
    const bookGroupRef = useRef<THREE.Group>(null);

    // Camera scroll animation variables
    const { camera } = useThree();
    const scrollY = useRef(0);

    // Initial Book Intro Animation using GSAP
    useEffect(() => {
        if (bookGroupRef.current) {
            // Book starts flat on the desk, zooming in on load
            gsap.fromTo(
                bookGroupRef.current.position,
                { y: 5, z: -5 },
                { y: 0, z: 0, duration: 2, ease: "power3.out" }
            );

            gsap.fromTo(
                bookGroupRef.current.rotation,
                { x: Math.PI / 4, y: Math.PI / 4 },
                { x: 0.1, y: 0, duration: 2, ease: "power3.out" }
            );
        }

        const handleWheel = (e: WheelEvent) => {
            // Prevent default only if we are taking over scroll
            scrollY.current += e.deltaY * 0.005;
            scrollY.current = Math.max(0, Math.min(scrollY.current, 10)); // Limit scroll depth

            // As user scrolls, camera zooms into the book
            gsap.to(camera.position, {
                z: 3 - scrollY.current * 0.2,
                y: 1 - scrollY.current * 0.1,
                duration: 0.5,
                ease: "power2.out"
            });

            // Open the book slightly when scrolled
            if (bookGroupRef.current) {
                gsap.to(bookGroupRef.current.rotation, {
                    x: 0.1 - scrollY.current * 0.02,
                    duration: 0.5
                });
            }
        };

        window.addEventListener("wheel", handleWheel);
        return () => window.removeEventListener("wheel", handleWheel);
    }, [camera]);

    const goToNextPage = () => {
        if (page < pagesData.length) {
            setPage(page + 1);
        }
    };

    const goToPrevPage = () => {
        if (page > 0) {
            setPage(page - 1);
        }
    };

    return (
        <group ref={bookGroupRef} position={[0, -0.5, 0]}>
            {/* Click handlers for flipping */}
            <mesh
                position={[PAGE_WIDTH / 2, 0, 0]}
                visible={false}
                onClick={goToNextPage}
            >
                <planeGeometry args={[PAGE_WIDTH, 2]} />
            </mesh>

            <mesh
                position={[-PAGE_WIDTH / 2, 0, 0]}
                visible={false}
                onClick={goToPrevPage}
            >
                <planeGeometry args={[PAGE_WIDTH, 2]} />
            </mesh>

            {pagesData.map((pageData, index) => {
                // Calculate stacking physical position so pages sit on top of each other
                // The higher the index, the "lower" it is in the closed book stack on the right
                // Pages that are opened (index < page) stack on the left side

                const isOpened = index < page;
                const depthOffset = isOpened
                    ? (index * PAGE_DEPTH)  // Left side stacking (bottom to top)
                    : -(index * PAGE_DEPTH); // Right side stacking (top to bottom)

                return (
                    <Page
                        key={index}
                        number={index}
                        position={[0, 0, depthOffset]}
                        rotation={[0, 0, 0]}
                        leftContent={pageData.left}
                        rightContent={pageData.right}
                        isCover={pageData.isCover}
                        frontColor={pageData.coverColor || "#f4ebd8"}
                        backColor={pageData.coverColor || "#f4ebd8"}
                        opened={isOpened}
                    />
                );
            })}
        </group>
    );
}
