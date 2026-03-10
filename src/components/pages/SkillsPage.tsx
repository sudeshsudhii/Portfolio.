const skills = [
    { category: "Languages", items: ["JavaScript (ES6+)", "TypeScript", "Java", "Python", "SQL", "Dart"], accent: "#8b6914" },
    { category: "Frontend", items: ["React.js", "Next.js", "Redux Toolkit", "Tailwind CSS"], accent: "#1a3a5c" },
    { category: "Backend / Core", items: ["Node.js", "Express.js", "Spring Boot", "FastAPI", "Microservices"], accent: "#a0522d" },
    { category: "Databases", items: ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Firebase"], accent: "#2d4a2d" },
    { category: "Cloud / DevOps", items: ["AWS", "GCP", "Docker", "Kubernetes", "CI/CD", "Nginx"], accent: "#8b6914" },
    { category: "AI / Security", items: ["LLM Integration", "Dialogflow", "JWT", "OAuth 2.0", "RBAC"], accent: "#a0522d" },
];

export default function SkillsPage() {
    return (
        <>
            <p className="chapter-label">Chapter II</p>
            <h2 className="chapter-title">Technical Arsenal</h2>
            <p className="chapter-subtitle">Technologies and frameworks mastered</p>
            <div className="chapter-rule" />

            <div className="space-y-4">
                {skills.map((s) => (
                    <div key={s.category}>
                        <div className="flex items-center gap-2 mb-1.5">
                            <span
                                className="w-2 h-2 rounded-sm"
                                style={{ background: s.accent }}
                            />
                            <p className="text-[0.65rem] font-bold text-[#1a1612] uppercase tracking-[0.12em]">
                                {s.category}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-1.5 pl-4">
                            {s.items.map((item) => (
                                <span key={item} className="book-tag">{item}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="margin-note mt-4">
                ⚡ Strong foundation in DSA and System Design — key to scalable architecture decisions
            </div>
        </>
    );
}
