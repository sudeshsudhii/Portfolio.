"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
    const [visible, setVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((p) => {
                if (p >= 100) { clearInterval(interval); setTimeout(() => setVisible(false), 400); return 100; }
                return Math.min(p + Math.random() * 15 + 5, 100);
            });
        }, 100);
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div className="loader-overlay" exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
                    {/* Book flip animation */}
                    <div className="loader-book" style={{ perspective: "400px" }}>
                        <div className="loader-page" />
                        <div className="loader-page" style={{ animationDelay: "0.3s" }} />
                        <div className="loader-page" style={{ animationDelay: "0.6s" }} />
                    </div>

                    {/* Progress */}
                    <div className="w-32">
                        <div className="h-[1px] bg-[rgba(255,255,255,0.08)] rounded overflow-hidden">
                            <motion.div
                                className="h-full bg-[#b87333]"
                                style={{ width: `${progress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                    </div>

                    <p className="text-[0.55rem] tracking-[0.35em] uppercase text-[#b87333] font-semibold">
                        Opening Portfolio
                    </p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
