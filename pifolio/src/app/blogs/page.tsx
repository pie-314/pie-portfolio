"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import "../globals.css";

export default function BlogsIndex() {
    const [theme, setTheme] = useState<"light" | "dark">("light");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
        const observerOptions = { root: null, rootMargin: "0px 0px -50px 0px", threshold: 0 };
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
                        <Link href="/#projects">Projects</Link>
                        <Link href="/blogs" style={{ color: "var(--text-strong)" }}>Blogs</Link>
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
                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="icon-btn mobile-menu-btn"
                            aria-label="Toggle Mobile Menu"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <i className={isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"}></i>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Menu Dropdown */}
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
                <section
                    id="writing"
                    className="section fade-in-up"
                    style={{ ["--delay" as string]: "0.2s" }}
                >
                    <div style={{ marginBottom: "2rem" }}>
                        <Link href="/" className="project-link" style={{ display: "inline-flex", marginBottom: "2rem", border: "none", padding: 0 }}>
                            <i className="ri-arrow-left-line" style={{ marginRight: "0.5rem" }}></i> Back to Home
                        </Link>
                        <h2 className="section-heading" style={{ marginTop: 0 }}>
                            Blogs <span className="muted">/ Writing</span>
                        </h2>
                    </div>

                    <div className="blogs-list">
                        <Link
                            href="/blog/how-i-built-a-crash-safe-database-engine-in-c"
                            className="blog-item"
                        >
                            <div className="blog-meta">Mar 2024 • Tech Deep Dive</div>
                            <h3 className="blog-title">How I built a Crash-Safe Database Engine in C</h3>
                            <p className="blog-excerpt">
                                A comprehensive look into Write-Ahead Logs, data persistence, and C architecture.
                            </p>
                        </Link>

                        <a
                            href="https://physicsforkidss.blogspot.com/2024/10/general-relativity-for-kids-to.html"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="blog-item"
                        >
                            <div className="blog-meta">Oct 2024 • Mental Models</div>
                            <h3 className="blog-title">General Relativity for Kids</h3>
                            <p className="blog-excerpt">
                                Distilling complex physics concepts into accessible mental models for anyone to understand.
                            </p>
                        </a>
                    </div>
                </section>

                <footer className="footer-bottom fade-in-up" style={{ ["--delay" as string]: "0.4s", marginTop: "4rem" }}>
                    <p>&copy; 2026 Aadarsh Chandra. Designed from first principles.</p>
                </footer>
            </main>
        </>
    );
}
