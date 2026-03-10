export default function ContactPage() {
    const links = [
        { label: "Email", value: "Mrsudesh17@gmail.com", href: "mailto:Mrsudesh17@gmail.com", icon: "✉️" },
        { label: "Phone", value: "7904068192", href: "tel:+917904068192", icon: "📞" },
        { label: "LinkedIn", value: "linkedin.com/in/sudesh-p-8a656b358", href: "https://www.linkedin.com/in/sudesh-p-8a656b358/", icon: "🔗" },
        { label: "GitHub", value: "github.com/sudeshsudhii", href: "https://github.com/sudeshsudhii", icon: "⚙️" },
        { label: "Website", value: "sudhii.in", href: "https://www.sudhii.in", icon: "🌐" },
    ];

    return (
        <>
            <p className="chapter-label">Final Chapter</p>
            <h2 className="chapter-title">Get In Touch</h2>
            <p className="chapter-subtitle">Let&apos;s collaborate and build something remarkable</p>
            <div className="chapter-rule" />

            <p className="drop-cap text-[#3d3229] leading-[1.85] mb-5" style={{ textAlign: "justify" }}>
                Open to opportunities in full-stack development, AI/ML engineering, and systems
                architecture. Whether you have a challenging project, a research collaboration, or an
                exciting role — feel free to reach out.
            </p>

            <div className="space-y-2.5">
                {links.map((l) => (
                    <a
                        key={l.label}
                        href={l.href}
                        target={l.label !== "Email" && l.label !== "Phone" ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="entry-card flex items-center gap-3 no-underline"
                    >
                        <span className="text-base">{l.icon}</span>
                        <div>
                            <p className="text-[0.52rem] text-[#b8a894] uppercase tracking-[0.15em] font-medium">
                                {l.label}
                            </p>
                            <p className="text-[0.72rem] font-semibold text-[#1a1612]">
                                {l.value}
                            </p>
                        </div>
                    </a>
                ))}
            </div>

            <div className="margin-note mt-4">
                🤝 Response time: typically within 24 hours
            </div>
        </>
    );
}
