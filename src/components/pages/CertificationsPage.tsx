const certs = [
    {
        title: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        desc: "Cloud concepts, AWS services, security, architecture, and pricing models.",
        color: "#8b6914",
    },
    {
        title: "Full Stack Web Development",
        issuer: "GeeksforGeeks",
        desc: "Frontend (React.js), backend (Node.js/Express), databases, and deployment best practices.",
        color: "#2d4a2d",
    },
    {
        title: "Cybersecurity Fundamentals",
        issuer: "IIT Madras",
        desc: "Network security, ethical hacking, vulnerability assessment, and secure coding.",
        color: "#a0522d",
    },
];

export default function CertificationsPage() {
    return (
        <>
            <p className="chapter-label">Chapter VI</p>
            <h2 className="chapter-title">Certifications</h2>
            <p className="chapter-subtitle">Professional credentials and validations</p>
            <div className="chapter-rule" />

            <div className="space-y-4">
                {certs.map((c) => (
                    <div key={c.title} className="entry-card">
                        <div className="flex items-start gap-3">
                            <div
                                className="w-7 h-7 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                                style={{ background: `${c.color}15`, border: `1px solid ${c.color}30` }}
                            >
                                <svg className="w-3.5 h-3.5" style={{ color: c.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[0.73rem] font-bold text-[#1a1612] mb-0.5" style={{ fontFamily: "var(--font-serif)" }}>
                                    {c.title}
                                </p>
                                <p className="text-[0.58rem] font-semibold mb-1" style={{ color: c.color }}>
                                    {c.issuer}
                                </p>
                                <p className="text-[0.65rem] text-[#6b5b4f] leading-relaxed">{c.desc}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
