"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader";

import CoverPage from "@/components/pages/CoverPage";
import AboutPage from "@/components/pages/AboutPage";
import SkillsPage from "@/components/pages/SkillsPage";
import ExperiencePage from "@/components/pages/ExperiencePage";
import ProjectsPage from "@/components/pages/ProjectsPage";
import EducationPage from "@/components/pages/EducationPage";
import CertificationsPage from "@/components/pages/CertificationsPage";
import ContactPage from "@/components/pages/ContactPage";

const mobilePages = [
    { id: 0, Content: CoverPage, label: "Cover", bmIcon: "📕" },
    { id: 1, Content: AboutPage, label: "About", bmIcon: "👤" },
    { id: 2, Content: SkillsPage, label: "Skills", bmIcon: "👤" },
    { id: 3, Content: ExperiencePage, label: "Work", bmIcon: "💼" },
    { id: 4, Content: ProjectsPage, label: "Projects", bmIcon: "💼" },
    { id: 5, Content: EducationPage, label: "Study", bmIcon: "🎓" },
    { id: 6, Content: CertificationsPage, label: "Certs", bmIcon: "🎓" },
    { id: 7, Content: ContactPage, label: "Contact", bmIcon: "✉️" },
    { id: 8, Content: null, label: "End", bmIcon: "✨" },
];

export default function MobileBook() {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [direction, setDirection] = useState(1); // 1 = right (next), -1 = left (prev)

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 2200);
        return () => clearTimeout(t);
    }, []);

    const totalPages = mobilePages.length;

    const goToPage = useCallback((pageIndex: number) => {
        if (pageIndex < 0 || pageIndex >= totalPages) return;
        setDirection(pageIndex > currentPage ? 1 : -1);
        setCurrentPage(pageIndex);
    }, [currentPage, totalPages]);

    const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
    const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

    // Framer motion variants for simple horizontal slide
    const variants = {
        enter: (direction: number) => {
            return {
                x: direction > 0 ? "100%" : "-100%",
                opacity: 0,
            };
        },
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (direction: number) => {
            return {
                x: direction < 0 ? "100%" : "-100%",
                opacity: 0,
            };
        },
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    const PageContent = mobilePages[currentPage].Content;

    return (
        <div className="flex flex-col h-[100dvh] w-full overflow-hidden bg-[#e8ddd0] relative" style={{ touchAction: "pan-y" }}>
            {loading && <Loader />}

            <div className="flex-1 relative w-full h-full overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentPage}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={1}
                        onDragEnd={(e, { offset, velocity }) => {
                            const swipe = swipePower(offset.x, velocity.x);

                            if (swipe < -swipeConfidenceThreshold) {
                                nextPage();
                            } else if (swipe > swipeConfidenceThreshold) {
                                prevPage();
                            }
                        }}
                        className="absolute inset-0 w-full h-full flex items-center justify-center p-4"
                    >
                        <div className="w-full max-w-lg h-[90%] bg-[#f4ebd8] rounded-r-lg rounded-bl-sm shadow-2xl relative border-l-8 border-[#3d3229] flex flex-col items-center justify-center page-content overflow-y-auto overflow-x-hidden p-6 pb-12">

                            {/* Paper texture overlay */}
                            <div className="absolute inset-0 pointer-events-none opacity-[0.15]" style={{ background: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")" }} />

                            {/* Content area */}
                            <div className="w-full h-full relative z-10 custom-scrollbar">
                                {currentPage === 0 ? (
                                    <CoverPage />
                                ) : PageContent ? (
                                    <PageContent />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-center">
                                        <p className="text-[#b87333] text-sm tracking-[0.3em] uppercase mb-4 font-bold">Thank You</p>
                                        <p className="text-[#8b7b6f] italic text-lg" style={{ fontFamily: "var(--font-serif)" }}>
                                            — fin —
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Page Number */}
                            <div className="absolute bottom-4 left-0 right-0 text-center">
                                <span className="text-[#b8a894] font-mono text-xs tracking-widest">{currentPage + 1}</span>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-20">
                {mobilePages.map((page, i) => (
                    <button
                        key={page.id}
                        onClick={() => goToPage(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${currentPage === i ? "bg-[#3d3229] scale-125" : "bg-[#b8a894] opacity-50"
                            }`}
                        aria-label={`Go to page ${i + 1}`}
                    />
                ))}
            </div>

            {/* Swipe Hint */}
            <motion.p
                className="absolute bottom-2 left-1/2 -translate-x-1/2 z-40 text-[0.6rem] text-[#8b7b6f] tracking-[0.15em] opacity-80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3 }}
            >
                ← SWIPE →
            </motion.p>
        </div>
    );
}
