"use client";

import { useState, useEffect, useCallback } from "react";
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

const spreads = [
  { id: 0, label: "Cover", left: null, right: CoverPage, bmClass: "bm-cover", bmIcon: "📕" },
  { id: 1, label: "About", left: AboutPage, right: SkillsPage, bmClass: "bm-about", bmIcon: "👤" },
  { id: 2, label: "Work", left: ExperiencePage, right: ProjectsPage, bmClass: "bm-skills", bmIcon: "💼" },
  { id: 3, label: "Study", left: EducationPage, right: CertificationsPage, bmClass: "bm-projects", bmIcon: "🎓" },
  { id: 4, label: "Contact", left: ContactPage, right: null, bmClass: "bm-contact", bmIcon: "✉️" },
];

type Particle = { id: number; left: string; size: number; duration: number; delay: number; opacity: number };

/* Dust particles — generated client-side only to avoid hydration mismatch */
function DustParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // eslint-disable-next-line
    setParticles(
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 8 + Math.random() * 12,
        delay: Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.3,
      }))
    );
  }, []);

  if (particles.length === 0) return null;

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="dust-particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
          }}
        />
      ))}
    </>
  );
}

export default function DesktopBook() {
  const [loading, setLoading] = useState(true);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(t);
  }, []);

  const totalSpreads = spreads.length;

  const goToSpread = useCallback(
    (spread: number) => {
      if (isFlipping || spread < 0 || spread >= totalSpreads) return;
      setIsFlipping(true);
      setCurrentSpread(spread);
      setTimeout(() => setIsFlipping(false), 700);
    },
    [isFlipping, totalSpreads]
  );

  const nextPage = useCallback(() => goToSpread(currentSpread + 1), [currentSpread, goToSpread]);
  const prevPage = useCallback(() => goToSpread(currentSpread - 1), [currentSpread, goToSpread]);

  /* Keyboard */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") { e.preventDefault(); nextPage(); }
      if (e.key === "ArrowLeft") { e.preventDefault(); prevPage(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [nextPage, prevPage]);

  /* Scroll */
  useEffect(() => {
    let t: NodeJS.Timeout;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      clearTimeout(t);
      t = setTimeout(() => {
        if (e.deltaY > 30) nextPage();
        if (e.deltaY < -30) prevPage();
      }, 80);
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [nextPage, prevPage]);

  /* Mouse parallax */
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const spread = spreads[currentSpread];
  const LeftContent = spread.left;
  const RightContent = spread.right;

  const bookTransform = `rotateX(${3 + mousePos.y * -1.5}deg) rotateY(${-1 + mousePos.x * 2}deg)`;

  return (
    <>
      {loading && <Loader />}

      {/* ===== DESK ENVIRONMENT ===== */}
      <div className="desk-environment">
        <div className="desk-light" />
        <DustParticles />
      </div>

      {/* ===== BOOK SCENE ===== */}
      <div className="book-scene">
        <div
          className="book-wrapper"
          style={{ transform: bookTransform, transition: "transform 0.15s ease-out" }}
        >
          <div className="book">
            {/* Physical book elements */}
            <div className="book-spine" />
            <div className="book-thickness-top" />
            <div className="book-thickness-right" />
            <div className="book-shadow" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentSpread}
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.5, ease: [0.645, 0.045, 0.355, 1] }}
              >
                {/* LEFT PAGE */}
                <div className="page-left">
                  {currentSpread === 0 ? (
                    <div className="cover-back" />
                  ) : LeftContent ? (
                    <div className="page-content">
                      <LeftContent />
                      <span className="page-number left">{currentSpread * 2}</span>
                    </div>
                  ) : (
                    <div className="page-content flex items-center justify-center h-full">
                      <p className="text-[#c4b5a0] italic text-sm" style={{ fontFamily: "var(--font-serif)" }}>
                        End
                      </p>
                    </div>
                  )}
                </div>

                {/* RIGHT PAGE */}
                <div className="page-right cursor-pointer" onClick={nextPage}>
                  {currentSpread === 0 ? (
                    <CoverPage />
                  ) : RightContent ? (
                    <div className="page-content">
                      <RightContent />
                      <span className="page-number right">{currentSpread * 2 + 1}</span>
                    </div>
                  ) : (
                    <div className="page-content flex items-center justify-center h-full">
                      <div className="text-center">
                        <p className="text-[#b87333] text-xs tracking-[0.3em] uppercase mb-2">Thank You</p>
                        <p className="text-[#c4b5a0] italic" style={{ fontFamily: "var(--font-serif)" }}>
                          — fin —
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Page corner curl */}
                  {currentSpread < totalSpreads - 1 && (
                    <div className="page-curl" onClick={(e) => { e.stopPropagation(); nextPage(); }} />
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ===== BOOKMARKS ===== */}
      <div className="bookmarks">
        {spreads.map((s, i) => (
          <button
            key={s.id}
            className={`bookmark-tab ${s.bmClass} ${currentSpread === i ? "active" : ""}`}
            onClick={() => goToSpread(i)}
            data-label={s.label}
            aria-label={s.label}
          >
            <span className="bm-icon">{s.bmIcon}</span>
          </button>
        ))}
      </div>

      {/* ===== BOTTOM NAV ===== */}
      <div className="book-nav">
        <button className="nav-arrow" onClick={prevPage} disabled={currentSpread === 0} aria-label="Previous">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {spreads.map((s, i) => (
          <button
            key={s.id}
            className={`nav-dot ${currentSpread === i ? "active" : ""}`}
            onClick={() => goToSpread(i)}
            title={s.label}
          />
        ))}

        <button className="nav-arrow" onClick={nextPage} disabled={currentSpread === totalSpreads - 1} aria-label="Next">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint */}
      <motion.p
        className="fixed bottom-11 left-1/2 -translate-x-1/2 z-40 text-[0.5rem] text-[rgba(255,255,255,0.25)] tracking-[0.15em]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
      >
        ← → Scroll · Click · Drag corner
      </motion.p>
    </>
  );
}
