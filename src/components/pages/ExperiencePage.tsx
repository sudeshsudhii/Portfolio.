const experiences = [
    {
        title: "GeeksforGeeks",
        role: "Full Stack Development Intern",
        period: "March 2025 – March 2026",
        bullets: [
            "Architected and deployed 3+ scalable Microservices applications using React, Node.js, and Spring Boot, serving 500+ daily active users.",
            "Engineered secure RESTful APIs with JWT authentication and Role-Based Access Control (RBAC), implementing Distributed Systems best practices.",
            "Optimized database queries in MongoDB and MySQL, achieving a 30% reduction in API response time for complex data aggregations.",
            "Implemented CI/CD pipelines via GitHub Actions to automate testing/deployment, cutting release time by 40%.",
        ],
    },
    {
        title: "IIT Madras",
        role: "Cybersecurity Trainee",
        period: "December 2025",
        bullets: [
            "Conducted vulnerability assessments and penetration testing, identifying and patching 15+ critical security flaws (XSS, SQLi).",
            "Analyzed network traffic using Wireshark to detect anomalies and strengthen firewall rules.",
        ],
    },
];

export default function ExperiencePage() {
    return (
        <>
            <p className="chapter-label">Chapter III</p>
            <h2 className="chapter-title">Experience</h2>
            <p className="chapter-subtitle">Professional journey and key contributions</p>
            <div className="chapter-rule" />

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp.title} className="entry-card">
                        <div className="flex items-baseline justify-between gap-2 mb-0.5">
                            <p className="text-[0.78rem] font-bold text-[#1a1612]" style={{ fontFamily: "var(--font-serif)" }}>
                                {exp.title}
                            </p>
                            <span className="text-[0.55rem] text-[#8b7b6f] font-mono whitespace-nowrap">
                                {exp.period}
                            </span>
                        </div>
                        <p className="text-[0.65rem] text-[#b87333] italic font-semibold mb-2">{exp.role}</p>

                        <ul className="space-y-1.5">
                            {exp.bullets.map((b, i) => (
                                <li key={i} className="flex items-start gap-2 text-[0.7rem] text-[#3d3229] leading-relaxed">
                                    <span className="mt-1.5 w-1 h-1 rounded-full bg-[#b87333] flex-shrink-0 opacity-70" />
                                    {b}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="margin-note">
                📊 Key metrics: 30% API latency reduction · 40% faster deployments · 500+ DAU
            </div>
        </>
    );
}
