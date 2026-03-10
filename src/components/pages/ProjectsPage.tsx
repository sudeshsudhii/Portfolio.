const projects = [
    {
        title: "Intelligent Customer Support System",
        tech: "React · Node.js · Dialogflow · Docker",
        desc: [
            "AI-powered portal with Dialogflow chatbot automating 60% of routine queries.",
            "Real-time analytics dashboard using Chart.js for data-driven decisions.",
            "Containerized with Docker Compose for consistent environments.",
        ],
        tags: ["React", "Node.js", "MongoDB", "MySQL", "Dialogflow", "Docker"],
        github: "https://github.com/sudeshsudhii",
    },
    {
        title: "LocalCompat-AI",
        tech: "FastAPI · React · Gemini AI · Python",
        desc: [
            "Privacy-first binary analysis tool — zero external data leakage.",
            "Gemini AI integration achieving 95% accuracy in compatibility prediction.",
            "FastAPI backend handling 50MB+ uploads with async processing.",
        ],
        tags: ["FastAPI", "Python", "React", "Gemini AI"],
        github: "https://github.com/sudeshsudhii",
    },
    {
        title: "Campus Management System",
        tech: "Next.js · TypeScript · Express · MongoDB",
        desc: [
            "Managing 2000+ student records with role-based permissions.",
            "AWS S3 file handling with 99.9% data availability.",
        ],
        tags: ["Next.js", "TypeScript", "Express", "MongoDB", "AWS S3"],
        github: "https://github.com/sudeshsudhii",
    },
];

export default function ProjectsPage() {
    return (
        <>
            <p className="chapter-label">Chapter IV</p>
            <h2 className="chapter-title">Projects</h2>
            <p className="chapter-subtitle">Case studies from the engineering lab</p>
            <div className="chapter-rule" />

            <div className="space-y-4">
                {projects.map((p) => (
                    <div key={p.title} className="entry-card">
                        <p className="text-[0.75rem] font-bold text-[#1a1612] mb-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                            {p.title}
                        </p>
                        <p className="text-[0.55rem] text-[#8b7b6f] font-mono italic mb-2">{p.tech}</p>

                        <ul className="space-y-1 mb-2">
                            {p.desc.map((d, i) => (
                                <li key={i} className="flex items-start gap-2 text-[0.68rem] text-[#3d3229] leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#b87333] flex-shrink-0 opacity-70" />
                                    {d}
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-1.5 flex-wrap">
                            {p.tags.map((t) => (
                                <span key={t} className="book-tag text-[0.55rem]">{t}</span>
                            ))}
                            <a
                                href={p.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[0.55rem] text-[#b87333] font-semibold hover:underline ml-auto"
                            >
                                View Source →
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
