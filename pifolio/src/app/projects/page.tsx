"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function ProjectsIndex() {
    const [theme, setTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute("data-theme", "dark");
            setTheme("dark");
        } else {
            document.documentElement.setAttribute("data-theme", "light");
            setTheme("light");
        }

        const fadeElements = document.querySelectorAll(".fade-in-up");
        const observerOptions = { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0.1 };
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const el = entry.target as HTMLElement;
                    el.classList.add("visible");
                    observer.unobserve(el);
                    setTimeout(() => { el.style.transitionDelay = "0s"; }, 800);
                }
            });
        }, observerOptions);

        fadeElements.forEach((el) => sectionObserver.observe(el));
        setTimeout(() => {
            const initialElements = document.querySelectorAll(".top-nav, .section");
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
            <nav className="top-nav fade-in-up" style={{ ["--delay" as string]: "0.1s" }}>
                <div className="nav-container">
                    <div className="logo">
                        <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
                            AC<span>.</span>
                        </Link>
                    </div>
                    <div className="nav-links hidden-mobile">
                        <Link href="/#experience">Experience</Link>
                        <Link href="/projects" style={{ color: "var(--text-strong)" }}>Projects</Link>
                        <Link href="/blogs">Blogs</Link>
                    </div>
                    <div className="nav-actions">
                        <button
                            id="themeToggleBtn"
                            className="icon-btn theme-toggle tooltip tooltip-bottom"
                            data-tooltip="Toggle Mode"
                            aria-label="Toggle Dark Mode"
                            onClick={toggleTheme}
                        >
                            <i className={theme === "dark" ? "ri-sun-line" : "ri-moon-line"} id="themeIcon"></i>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="page-wrapper" style={{ paddingTop: "2rem" }}>
                <section
                    id="projects"
                    className="section fade-in-up"
                    style={{ ["--delay" as string]: "0.2s" }}
                >
                    <div style={{ marginBottom: "2rem" }}>
                        <Link href="/" className="project-link" style={{ display: "inline-flex", marginBottom: "2rem", border: "none", padding: 0 }}>
                            <i className="ri-arrow-left-line" style={{ marginRight: "0.5rem" }}></i> Back to Home
                        </Link>
                        <h2 className="section-heading" style={{ marginTop: 0 }}>
                            Projects
                        </h2>
                    </div>

                    <div className="projects-grid">
                        {/* Rustorian */}
                        <article className="project-card">
                            <div className="project-visual bg-gradient-orange">
                                <div className="project-mockup">
                                    <i className="devicon-rust-original mockup-icon"></i>
                                    <span className="mockup-text text-mono">Backend</span>
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project-status">
                                    <span className="status-dot dot-live tooltip" data-tooltip="Stable"></span> Rustorian
                                </div>
                                <p className="project-description">
                                    A Rust-based Async Historian with monthly SQLite rotation. Designed for robust backend data management and high performance.
                                </p>
                                <a href="https://github.com/pie-314/Rustorian" target="_blank" rel="noopener noreferrer" className="project-link">
                                    View Project <i className="ri-arrow-right-up-line"></i>
                                </a>
                            </div>
                        </article>

                        {/* Neural Net */}
                        <article className="project-card">
                            <div className="project-visual bg-gradient-purple">
                                <div className="project-mockup">
                                    <i className="devicon-c-plain mockup-icon"></i>
                                    <span className="mockup-text text-mono">ML Core</span>
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project-status">
                                    <span className="status-dot dot-dev tooltip" data-tooltip="In Active Development"></span> Neural Net from Scratch (C)
                                </div>
                                <p className="project-description">
                                    Implementations of forward and backpropagation logic entirely from scratch in raw C, disregarding external machine learning frameworks.
                                </p>
                                <a href="https://github.com/pie-314/neural-network-from-scratch-c" target="_blank" rel="noopener noreferrer" className="project-link">
                                    View Project <i className="ri-arrow-right-up-line"></i>
                                </a>
                            </div>
                        </article>

                        {/* RadishDB */}
                        <article className="project-card">
                            <div className="project-visual bg-gradient-gray">
                                <div className="project-mockup">
                                    <i className="ri-database-2-line mockup-icon"></i>
                                    <span className="mockup-text text-mono">0x4A1</span>
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project-status">
                                    <span className="status-dot dot-live tooltip" data-tooltip="Stable Version Released"></span> RadishDB
                                </div>
                                <p className="project-description">
                                    A highly-optimized, crash-safe storage engine built from scratch in C. Implements WAL and POSIX mmap APIs.
                                </p>
                                <a href="https://github.com/pie-314/radishdb" target="_blank" rel="noopener noreferrer" className="project-link">
                                    View Project <i className="ri-arrow-right-up-line"></i>
                                </a>
                            </div>
                        </article>

                        {/* TRX */}
                        <article className="project-card">
                            <div className="project-visual bg-gradient-blue">
                                <div className="project-mockup">
                                    <i className="devicon-rust-original mockup-icon"></i>
                                    <span className="mockup-text text-mono">0x7B2</span>
                                </div>
                            </div>
                            <div className="project-info">
                                <div className="project-status">
                                    <span className="status-dot dot-live tooltip" data-tooltip="TUI Active"></span> TRX Package Manager
                                </div>
                                <p className="project-description">
                                    A blazing fast, terminal-native package manager utilizing Ratatui to deliver a beautiful, modern workflow CLI.
                                </p>
                                <a href="https://github.com/pie-314/trx" target="_blank" rel="noopener noreferrer" className="project-link">
                                    View Project <i className="ri-arrow-right-up-line"></i>
                                </a>
                            </div>
                        </article>
                    </div>
                </section>

                <footer className="footer-bottom fade-in-up" style={{ ["--delay" as string]: "0.4s", marginTop: "4rem" }}>
                    <p>&copy; 2026 Aadarsh Chandra. Designed from first principles.</p>
                </footer>
            </main>
        </>
    );
}
