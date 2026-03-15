"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../../globals.css";

export default function BlogPost() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const [activeId, setActiveId] = useState("");
    const [tocProgress, setTocProgress] = useState(0);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0px 0px -80% 0px" },
        );

        const headingElements = document.querySelectorAll("h2[id], h3[id]");
        headingElements.forEach((el) => observer.observe(el));

        const handleScroll = () => {
            const winScroll =
                document.body.scrollTop || document.documentElement.scrollTop;
            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            setTocProgress(scrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            headingElements.forEach((el) => observer.unobserve(el));
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const headings = [
        { id: "4-years-12-distros-and-1-mid-life-crisis", text: "4 Years, 12 Distros, and 1 Mid-Life Crisis", level: 2 },
        { id: "competitive-copy-pasting-the-arch-wiki-experience", text: "Competitive Copy-Pasting: The Arch Wiki...", level: 2 },
        { id: "the-arch-breaks-every-tuesday-lie", text: "The \"Arch Breaks Every Tuesday\" Lie", level: 2 },
        { id: "if-it-exists-on-the-internet-its-one-command-away", text: "If it Exists on the Internet, It’s One...", level: 2 },
        { id: "bleeding-edge-tools-for-people-who-actually-build-things", text: "Bleeding Edge Tools", level: 2 },
        { id: "i-use-arch-btw-and-now-you-know-why", text: "I Use Arch Btw (And Now You Know Why)", level: 2 },
    ];

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)",
        ).matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute("data-theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            setTheme("light");
        }

        const fadeElements = document.querySelectorAll(".fade-in-up");
        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -50px 0px",
            threshold: 0,
        };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.classList.add("visible");
                    observer.unobserve(el);
                    setTimeout(() => {
                        el.style.transitionDelay = "0s";
                    }, 800);
                }
            });
        }, observerOptions);

        fadeElements.forEach((el) => sectionObserver.observe(el));
        setTimeout(() => {
            const initialElements = document.querySelectorAll(
                ".hero-section, .top-nav, .blog-content-wrapper",
            );
            initialElements.forEach((el) => el.classList.add("visible"));
        }, 50);
    }, []);

    const toggleTheme = () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        setTheme(newTheme);
    };

    return (
        <>
            <nav
                className="top-nav fade-in-up"
                style={{ ["--delay" as string]: "0.1s" }}
            >
                <div className="nav-container">
                    <div className="logo">
                        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                            AC<span>.</span>
                        </Link>
                    </div>
                    <div className="nav-links hidden-mobile">
                        <Link href="/#experience">Experience</Link>
                        <Link href="/#projects">Projects</Link>
                        <Link href="/blogs" style={{ color: "var(--text-strong)" }}>
                            Blogs
                        </Link>
                    </div>
                    <div className="nav-actions">
                        <button
                            id="themeToggleBtn"
                            className="icon-btn theme-toggle tooltip tooltip-bottom"
                            data-tooltip="Toggle Mode"
                            aria-label="Toggle Dark Mode"
                            onClick={toggleTheme}
                        >
                            <i
                                className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"}
                                id="themeIcon"
                            ></i>
                        </button>
                        <button
                            className="icon-btn mobile-menu-btn"
                            aria-label="Toggle Mobile Menu"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i
                                className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}
                            ></i>
                        </button>
                    </div>
                </div>
            </nav>

            {isMobileMenuOpen && (
                <div className="mobile-nav-dropdown fade-in-up visible">
                    <Link href="/#experience" onClick={() => setIsMobileMenuOpen(false)}>
                        Experience
                    </Link>
                    <Link href="/projects" onClick={() => setIsMobileMenuOpen(false)}>
                        Projects
                    </Link>
                    <Link href="/blogs" onClick={() => setIsMobileMenuOpen(false)}>
                        Blogs
                    </Link>
                </div>
            )}

            <main className="page-wrapper" style={{ paddingTop: "2rem" }}>
                <div className="blog-container">
                    <aside
                        className="blog-toc-wrapper fade-in-up"
                        style={{ ["--delay" as string]: "0.2s" }}
                    >
                        <h4 className="blog-toc-header">On this page</h4>
                        <div className="blog-toc-meta">{headings.length} sections</div>

                        <div className="toc-progress-bar">
                            <div
                                className="toc-progress-fill"
                                style={{ width: `${tocProgress}%` }}
                            ></div>
                            <span className="toc-progress-text">
                                {Math.round(tocProgress)}%
                            </span>
                        </div>

                        <ul className="toc-list">
                            {headings.map((heading) => (
                                <li
                                    key={heading.id}
                                    className={`toc-item level-${heading.level}`}
                                >
                                    <a
                                        href={`#${heading.id}`}
                                        className={`toc-link ${activeId === heading.id ? "active" : ""}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document
                                                .getElementById(heading.id)
                                                ?.scrollIntoView({ behavior: "smooth" });
                                            setActiveId(heading.id);
                                        }}
                                    >
                                        {heading.text}
                                    </a>
                                    <div className="toc-active-dot"></div>
                                </li>
                            ))}
                        </ul>
                    </aside>
                    <div
                        className="blog-content-wrapper fade-in-up"
                        style={{ ["--delay" as string]: "0.3s" }}
                    >
                        <article className="article-content">
                            <div style={{ marginBottom: "2rem" }}>
                                <Link
                                    href="/blogs"
                                    className="project-link"
                                    style={{
                                        display: "inline-flex",
                                        marginBottom: "2rem",
                                        border: "none",
                                        padding: 0,
                                    }}
                                >
                                    <i
                                        className="ri-arrow-left-line"
                                        style={{ marginRight: "0.5rem" }}
                                    ></i>{" "}
                                    Back to Blogs
                                </Link>
                                <h1
                                    className="hero-title"
                                    style={{ fontSize: "2.5rem", marginBottom: "1rem" }}
                                >
                                    I Use Arch, and No, I Don't Live in a Cave
                                </h1>
                                <div
                                    className="blog-meta"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        color: "var(--text-muted)",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    Mar 2026 • Linux / Setup
                                </div>
                            </div>

                            <div
                                className="blog-body"
                                style={{
                                    color: "var(--text-main)",
                                    fontSize: "1.05rem",
                                    lineHeight: "1.8",
                                }}
                            >
                                <p style={{ marginBottom: "1.5rem" }}>
                                    If the internet is to be believed, I should have grown a wizard beard, forgotten what the sun looks like, and started reciting hex code in my sleep by now. I am some snarky hoodie-wearing basement dweller. In contrast, I am 18 year old dev, who just wants a fast machine that works. I am using Arch for more than a year now. Arch isn't a personality disorder, it's just a really good tool with lot of misconceptions around it.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="4-years-12-distros-and-1-mid-life-crisis"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    4 Years, 12 Distros, and 1 Mid-Life Crisis
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    Like every other kid who watched one episode of Mr. Robot, I started my journey with Kali Linux, only to realize I wasn't actually a cyber-vigilante. After an era of endless distro-hopping, I tried to settle down with Ubuntu. But something felt 'off', it felt clunky and perpetually broken. I hit a wall of 'hopper fatigue' and actually tried crawling back to Windows. The sheer amount of bloatware and resource-draining background noise made 'broken' Ubuntu look like a dream. That was the turning point. I decided to aim for the far side of the river, Arch. I’ll admit, the elitist memes had me intimidated, so I used Manjaro as a six-month training camp before I finally worked up the nerve to go full Arch.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    A year ago, I was actually happy with Manjaro. It’s still my top recommendation for anyone who wants a solid system (Fedora is a close second). But I had this itch to go 'bare metal.'
                                    Moving to Arch was one of the best moves I’ve made. Building it step-by-step let me cut the noise and keep only what I actually need. You don't have to be a minimalist monk, you can just install KDE and get to work.
                                    (And yes, we’ll talk about that 'impossible' installation in the next part. Spoiler: It’s not that deep.)
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="competitive-copy-pasting-the-arch-wiki-experience"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Competitive Copy-Pasting: The Arch Wiki Experience
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    I’ll be honest: installing Arch is harder than clicking 'Next' on a Windows installer. You have to configure everything yourself, drivers included. But it’s not some unclimbable mountain, it’s just a literacy test.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    If you can read and copy-paste from the official Wiki, you can install Arch. It’s that simple. The beauty is that by the time you hit the desktop, you actually understand how your audio, video, and networking work. Arch isn’t 'hard,' it’s just honest. You don't even need to be a genius to get through it; just follow the recipe, and life gets a whole lot simpler.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="the-arch-breaks-every-tuesday-lie"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    The "Arch Breaks Every Tuesday" Lie
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    There is a massive misconception that Arch breaks if you so much as look at it wrong. In my experience? It breaks even less than Ubuntu.
                                </p>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    It sounds crazy because everyone calls the 'rolling release' model a hazard, but it’s actually the best part. Instead of a massive, system-wide heart transplant every six months that breaks half your drivers, Arch gives you small, manageable chunks of updates. You aren't rebuilding the house; you’re just tightening a few screws.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    All it takes is a quick pacman -Syu with your morning coffee, and your system stays more stable than ever. It’s not a ticking time bomb, it’s just a well-oiled machine.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="if-it-exists-on-the-internet-its-one-command-away"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    If it Exists on the Internet, It’s One Command Away
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The true 'magic' of Arch is the AUR (Arch User Repository). Forget hunting for .deb files, adding sketchy PPAs, or the Windows ritual of clicking 'Next, Next, Next' on an .exe.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    On Arch, every piece of software and its latest version is just one command away. Whether it's yay -S pkg (or paru, if that’s your thing), you have what you need instantly. Even if an app launched yesterday, it’s usually there, waiting gracefully. Updating is just as easy; run yay again, and you’re done. It’s an endless, organized library of basically every package you can imagine.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="bleeding-edge-tools-for-people-who-actually-build-things"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Bleeding Edge Tools for People Who Actually Build Things
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The rolling release model isn't just a convenience, it’s a superpower for developers. You get the latest compilers and libraries the second they drop. I personally live in Neovim bcause I’m obsessed with keybindings, but if you want to use VS Code or Zed or even Antigravity, Arch won't judge you (though I might).
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    That’s the best part, "you choose". You mold the system to fit your needs, not the other way around. And for the less-mentioned side of Arch is gaming. With the latest kernels and excellent support for Steam and Proton, games don't just run games but they fly. Your machine basically becomes a beast that handles productivity by day and high-end gaming by night.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="i-use-arch-btw-and-now-you-know-why"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    I Use Arch Btw (And Now You Know Why)
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    Don’t let the memes scare you. Arch isn't the chaotic nightmare it’s depicted to be; it’s for anyone who wants a clean experience without the unnecessary hand-holding.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    In reality, 90% of the Arch experience is just reading plain English. If you can read, you can use Arch comfortably. The system doesn't demand a genius; it just wants a user who knows how to follow instructions. I didn’t lose my life to Arch, if anything, I finally got the control back.
                                </p>

                                {/* ABOUT THE AUTHOR */}
                                <div style={{
                                    marginTop: "4rem",
                                    padding: "2rem",
                                    background: "var(--bg-surface)",
                                    borderRadius: "12px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    gap: "1.5rem",
                                    alignItems: "center",
                                    flexWrap: "wrap"
                                }}>
                                    <img
                                        src={theme === "dark" ? "/black_bg_pi.png" : "/white_bg_pi.png"}
                                        alt="Aadarsh Chandra"
                                        style={{
                                            width: "80px",
                                            height: "80px",
                                            borderRadius: "50%",
                                            objectFit: "cover",
                                            border: "2px solid var(--border-light)"
                                        }}
                                    />
                                    <div>
                                        <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem", color: "var(--text-strong)" }}>
                                            Aadarsh Chandra (Pi)
                                        </h3>
                                        <p style={{ fontSize: "0.95rem", color: "var(--text-main)", lineHeight: "1.6", margin: 0 }}>
                                            I am an 18-year-old self-employed developer building full-stack web applications,
                                            Python/Rust backends, and low-level systems. I learn by building things from first principles.
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </article>
                    </div>
                </div>

                <footer
                    className="footer-bottom fade-in-up"
                    style={{ ["--delay" as string]: "0.4s", marginTop: "4rem" }}
                >
                    <p>&copy; 2026 Aadarsh Chandra. Designed from first principles.</p>
                </footer>
            </main>
        </>
    );
}
