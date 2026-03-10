export default function AboutPage() {
    return (
        <>
            <p className="chapter-label">Chapter I</p>
            <h2 className="chapter-title">About the Author</h2>
            <p className="chapter-subtitle">A brief introduction to the journey</p>
            <div className="chapter-rule" />

            <p className="drop-cap text-[#3d3229] leading-[1.85] mb-4" style={{ textAlign: "justify" }}>
                Results-driven Full-Stack Developer with an M.Tech in Computer Science from SRMIST
                and a strong foundation in Data Structures &amp; Algorithms and System Design. Expert in
                designing scalable backends using Node.js, Spring Boot, and FastAPI, integrating AI/LLM
                capabilities, and deploying on AWS/GCP.
            </p>

            <div className="margin-note">
                🔬 Research focus: Cloud Native Architecture, Microservices, and scalable AI solutions
            </div>

            <p className="text-[#3d3229] leading-[1.85] mb-4" style={{ textAlign: "justify" }}>
                Optimized API latency by 30% and reduced deployment time by 40% through CI/CD pipelines.
                With hands-on experience at GeeksforGeeks and advanced cybersecurity training from IIT
                Madras, the approach balances innovation with security-first thinking.
            </p>

            <div className="code-block" data-lang="profile">
                <span className="text-[#8b6914]">const</span> developer = {"{"}<br />
                &nbsp;&nbsp;name: <span className="text-[#a0522d]">&quot;Sudesh P&quot;</span>,<br />
                &nbsp;&nbsp;role: <span className="text-[#a0522d]">&quot;Full-Stack Engineer&quot;</span>,<br />
                &nbsp;&nbsp;focus: [<span className="text-[#2d4a2d]">&quot;Systems&quot;</span>, <span className="text-[#2d4a2d]">&quot;AI&quot;</span>, <span className="text-[#2d4a2d]">&quot;Cloud&quot;</span>],<br />
                {"}"};
            </div>

            {/* Research areas */}
            <div className="mt-4 pt-3 border-t border-[#e8ddd0]">
                <p className="text-[0.6rem] font-bold text-[#b87333] uppercase tracking-[0.15em] mb-2">
                    Areas of Expertise
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                    {["Full-Stack Development", "AI / LLM Systems", "Cloud Architecture", "System Design",
                        "Microservices", "Cybersecurity",
                    ].map((a) => (
                        <div key={a} className="flex items-center gap-2 text-[0.68rem] text-[#3d3229]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#b87333] opacity-60" />
                            {a}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
