export default function CoverPage() {
    return (
        <div className="cover-front">
            {/* Embossed borders */}
            <div className="cover-border" />
            <div className="cover-border-inner" />

            {/* Content */}
            <div className="relative z-10">
                <div className="gold-ornament mx-auto" style={{ width: "100px" }} />

                <p className="text-[0.55rem] tracking-[0.4em] uppercase text-[#d4a853] mb-8 font-medium mt-4">
                    Developer Portfolio
                </p>

                <h1
                    className="text-3xl sm:text-4xl font-black tracking-tight mb-1 text-[#f0ebe0]"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    Sudesh P
                </h1>

                <div className="gold-ornament mx-auto" />

                <p
                    className="text-[0.85rem] text-[#d4a853] font-semibold mt-4 mb-1"
                    style={{ fontFamily: "var(--font-serif)" }}
                >
                    M.Tech in Computer Science
                </p>
                <p className="text-[0.65rem] text-[#a89070] max-w-[200px] leading-relaxed mx-auto">
                    Full-Stack Development
                    <br />
                    AI/LLM Integration
                    <br />
                    Cloud Native Architecture
                </p>

                <div className="gold-ornament mx-auto mt-8" style={{ width: "100px" }} />

                <p className="text-[0.5rem] text-[#8b7b6f] mt-4 tracking-[0.3em] uppercase">
                    SRMIST · Kattankulathur · 2024
                </p>
            </div>

            {/* Corner ornaments */}
            <div className="absolute top-16 left-16 w-6 h-6 border-t border-l border-[rgba(212,168,83,0.3)]" />
            <div className="absolute top-16 right-16 w-6 h-6 border-t border-r border-[rgba(212,168,83,0.3)]" />
            <div className="absolute bottom-16 left-16 w-6 h-6 border-b border-l border-[rgba(212,168,83,0.3)]" />
            <div className="absolute bottom-16 right-16 w-6 h-6 border-b border-r border-[rgba(212,168,83,0.3)]" />
        </div>
    );
}
