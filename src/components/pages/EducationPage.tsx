export default function EducationPage() {
    return (
        <>
            <p className="chapter-label">Chapter V</p>
            <h2 className="chapter-title">Education</h2>
            <p className="chapter-subtitle">Academic foundation and scholarly pursuits</p>
            <div className="chapter-rule" />

            <div className="space-y-5">
                {/* M.Tech */}
                <div className="entry-card">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="text-[0.78rem] font-bold text-[#1a1612]" style={{ fontFamily: "var(--font-serif)" }}>
                            M.Tech in Computer Science
                        </p>
                        <span className="text-[0.55rem] text-[#8b7b6f] font-mono whitespace-nowrap">
                            2024 – Present
                        </span>
                    </div>
                    <p className="text-[0.68rem] text-[#6b5b4f] italic">SRMIST, Kattankulathur</p>
                    <p className="text-[0.68rem] text-[#b87333] font-semibold mt-1">CGPA: 9.0 / 10 (Expected)</p>
                </div>

                {/* B.Tech */}
                <div className="entry-card">
                    <div className="flex items-baseline justify-between gap-2 mb-0.5">
                        <p className="text-[0.78rem] font-bold text-[#1a1612]" style={{ fontFamily: "var(--font-serif)" }}>
                            B.Tech in Information Technology
                        </p>
                        <span className="text-[0.55rem] text-[#8b7b6f] font-mono whitespace-nowrap">
                            2020 – 2024
                        </span>
                    </div>
                    <p className="text-[0.68rem] text-[#6b5b4f] italic">Sri Balaji Chockalingam Engineering College</p>
                    <p className="text-[0.68rem] text-[#b87333] font-semibold mt-1">CGPA: 8.05 / 10</p>
                </div>
            </div>

            <div className="margin-note mt-5">
                📚 Coursework: Advanced Algorithms, Machine Learning, Cloud Computing, Network Security
            </div>

            {/* Decorative quote */}
            <div className="mt-6 pt-4 border-t border-[#e8ddd0] text-center">
                <p
                    className="text-[0.72rem] text-[#b8a894] italic leading-relaxed"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    &ldquo;The best way to predict the future<br />is to invent it.&rdquo;
                </p>
                <p className="text-[0.55rem] text-[#c4b5a0] mt-1 tracking-wider">— Alan Kay</p>
            </div>
        </>
    );
}
