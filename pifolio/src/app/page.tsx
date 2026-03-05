"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import SearchModal from "../components/SearchModal";

export default function Portfolio() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Search Command Handle
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === "Escape") setIsSearchOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    // Check initial preference from localStorage or system theme
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

    /* --- Fade-In Animation Observer --- */
    const fadeElements = document.querySelectorAll(".fade-in-up");

    const observerOptions = {
      root: null,
      rootMargin: "0px 0px 100px 0px", // Trigger slightly before rolling into view
      threshold: 0,
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.classList.add("visible");
          observer.unobserve(el);

          // Cleanup delays so hover states and other transforms aren't hindered post-animation
          setTimeout(() => {
            el.style.transitionDelay = "0s";
          }, 400); // Shorter cleanup time
        }
      });
    }, observerOptions);

    fadeElements.forEach((el) => {
      sectionObserver.observe(el);
    });

    // Remove delay for the initial top elements immediately on load
    setTimeout(() => {
      const initialElements = document.querySelectorAll(
        ".hero-section, .top-nav",
      );
      initialElements.forEach((el) => el.classList.add("visible"));
    }, 50);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const toggleTheme = () => {
    document.body.classList.add("theme-transition");
    const currentTheme = document.documentElement.getAttribute("data-theme");
    let newTheme: "light" | "dark" = "light";

    if (currentTheme === "light") {
      newTheme = "dark";
    } else {
      newTheme = "light";
    }

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);

    setTimeout(() => {
      document.body.classList.remove("theme-transition");
    }, 400); // Remove class after transition finishes
  };

  const toggleExperience = (e: React.MouseEvent<HTMLDivElement>) => {
    const parent = e.currentTarget.parentElement;
    if (parent) {
      parent.classList.toggle("collapsed");
    }
  };

  return (
    <>
      {/* TOP NAVIGATION */}
      <nav
        className="top-nav fade-in-up"
        style={{ ["--delay" as string]: "0.1s" }}
      >
        <div className="nav-container">
          <div className="logo">
            AC<span>.</span>
          </div>
          <div className="nav-links hidden-mobile">
            <Link href="#experience">Experience</Link>
            <Link href="/projects">Projects</Link>
            <Link href="/blogs">Blogs</Link>
          </div>
          <div className="nav-actions">
            <div
              className="search-box tooltip tooltip-bottom"
              data-tooltip="Search..."
              onClick={() => setIsSearchOpen(true)}
              style={{ cursor: "pointer" }}
            >
              <i className="ri-search-line search-icon-mobile"></i>
              <span className="muted hidden-mobile">Search...</span>{" "}
              <kbd className="cmd-key hidden-mobile">⌘ K</kbd>
            </div>
            {/* Theme Toggle Button */}
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
            {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Navigation Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-nav-dropdown fade-in-up visible">
          <Link href="#experience" onClick={() => setIsMobileMenuOpen(false)}>
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

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <main className="page-wrapper">
        {/* HERO SECTION */}
        <section
          className="hero-section fade-in-up"
          style={{ ["--delay" as string]: "0.2s" }}
        >
          <div className="avatar-container">
            <div className="avatar-placeholder">
              {/* Placeholder avatar matching the modern look */}
              <img
                src={theme === "dark" ? "black_bg_pi.png" : "white_bg_pi.png"}
                alt="Aadarsh Profile"
              />
            </div>
          </div>

          <div className="hero-content">
            <h1 className="hero-title">
              Aadarsh Chandra ( Pi ){" "}
              <i className="ri-checkbox-circle-fill verified-icon"></i>
            </h1>
            <h2 className="hero-subtitle">Software Developer / Builder</h2>

            <div className="terminal-install">
              <div
                className="terminal-install-cmd-container tooltip tooltip-bottom"
                data-tooltip={copied ? "Copied!" : "Click to copy"}
                onClick={() => {
                  navigator.clipboard.writeText(
                    "curl -fsSL https://pidev.tech/install | sh",
                  );
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
              >
                <code className="terminal-install-cmd">
                  curl -fsSL https://pidev.tech/install | sh
                </code>
                <i
                  className={
                    copied
                      ? "ri-check-line text-green-500"
                      : "ri-file-copy-line"
                  }
                ></i>
              </div>
            </div>

            <p className="hero-bio">
              Hey! I&apos;m an 18-year-old self-employed developer. While I love
              diving deep into low-level systems (C, Rust, Kernel), I&apos;m
              primarily a passionate learner who builds full-stack web
              applications, robust Python/Rust backends, and practical tools. I
              build things from first principles and ship them fast.
            </p>

            <div className="social-links">
              <div className="social-pills">
                <a
                  href="https://github.com/pie-314"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <i className="ri-github-fill"></i> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/aadarsh-chandra-70a06429b/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <i className="ri-linkedin-fill"></i> LinkedIn
                </a>
                <a
                  href="https://x.com/pie314n"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-pill"
                >
                  <i className="ri-twitter-x-line"></i> Twitter
                </a>
                <Link
                  prefetch
                  href="aadarsh_chandra.pdf"
                  target="_blank"
                  className="social-pill"
                >
                  <i className="ri-file-text-line"></i> Resume
                </Link>
              </div>
            </div>

            <div className="tech-stack">
              <span className="stack-label">TECH EXPOSURE</span>
              <div className="stack-icons">
                <i
                  className="devicon-python-plain colored stack-logo tooltip"
                  data-tooltip="Python"
                ></i>
                <i
                  className="devicon-rust-original stack-logo tooltip"
                  data-tooltip="Rust"
                ></i>
                <i
                  className="devicon-c-plain colored stack-logo tooltip"
                  data-tooltip="C"
                ></i>
                <i
                  className="devicon-java-plain colored stack-logo tooltip"
                  data-tooltip="Java"
                ></i>
                <i
                  className="devicon-javascript-plain colored stack-logo tooltip"
                  data-tooltip="JavaScript"
                ></i>
                <i
                  className="devicon-docker-plain colored stack-logo tooltip"
                  data-tooltip="Docker"
                ></i>
                <i
                  className="devicon-postgresql-plain colored stack-logo tooltip"
                  data-tooltip="PostgreSQL"
                ></i>
                <i
                  className="devicon-linux-plain stack-logo tooltip"
                  data-tooltip="Linux"
                ></i>
                <i
                  className="devicon-git-plain colored stack-logo tooltip"
                  data-tooltip="Git"
                ></i>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE SECTION */}
        <section id="experience" className="section fade-in-up">
          <h2 className="section-heading">Experience</h2>

          <div className="experience-list">
            {/* Independent Developer Role */}
            <div className="experience-item">
              <div className="exp-header" onClick={toggleExperience}>
                <div className="exp-company-logo logo-dark">
                  <i className="ri-braces-fill"></i>
                </div>
                <div className="exp-title-block">
                  <h3 className="exp-role">
                    Independent Developer{" "}
                    <span className="exp-badge">Self-Employed</span>
                  </h3>
                  <p className="exp-company">Freelance & Open Source</p>
                </div>
                <div className="exp-meta">
                  <span className="exp-date">Present</span>
                  <span className="exp-location">Remote</span>
                  <i className="ri-arrow-up-s-line chevron"></i>
                </div>
              </div>
              <div className="exp-body">
                <ul>
                  <li>
                    Working as a self-employed developer, building end-to-end
                    applications.
                  </li>
                  <li>
                    Developing full-stack web applications and robust Python
                    APIs for process automation and data handling.
                  </li>
                  <li>
                    Building high-performance backend systems and CLIs in Rust
                    to handle complex asynchronous workflows.
                  </li>
                  <li>
                    Continuously exploring low-level systems (C, Kernel
                    development) to build strong foundational knowledge.
                  </li>
                </ul>
                <div className="exp-skills">
                  <span className="mini-tag">Python Backend</span>
                  <span className="mini-tag">Web Development</span>
                  <span className="mini-tag">Rust</span>
                  <span className="mini-tag">Open Source</span>
                </div>
              </div>
            </div>
          </div>
          {/* SECTION DIVIDER */}
          <div className="section-divider"></div>

          {/* PROJECTS SECTION */}
          <section id="projects" className="section fade-in-up">
            <h2 className="section-heading">Projects</h2>

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
                    <span
                      className="status-dot dot-live tooltip"
                      data-tooltip="Stable"
                    ></span>{" "}
                    Rustorian
                  </div>
                  <p className="project-description">
                    A Rust-based Async Historian with monthly SQLite rotation.
                    Designed for robust backend data management and high
                    performance.
                  </p>
                  <a
                    href="https://github.com/pie-314/Rustorian"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
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
                    <span
                      className="status-dot dot-dev tooltip"
                      data-tooltip="In Active Development"
                    ></span>{" "}
                    Neural Net from Scratch (C)
                  </div>
                  <p className="project-description">
                    Implementations of forward and backpropagation logic
                    entirely from scratch in raw C, disregarding external
                    machine learning frameworks.
                  </p>
                  <a
                    href="https://github.com/pie-314/neural-network-from-scratch-c"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
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
                    <span
                      className="status-dot dot-live tooltip"
                      data-tooltip="Stable Version Released"
                    ></span>{" "}
                    RadishDB
                  </div>
                  <p className="project-description">
                    A highly-optimized, crash-safe storage engine built from
                    scratch in C. Implements WAL and POSIX mmap APIs.
                  </p>
                  <a
                    href="https://github.com/pie-314/radishdb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
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
                    <span
                      className="status-dot dot-live tooltip"
                      data-tooltip="TUI Active"
                    ></span>{" "}
                    TRX Package Manager
                  </div>
                  <p className="project-description">
                    A blazing fast, terminal-native package manager utilizing
                    Ratatui to deliver a beautiful, modern workflow CLI.
                  </p>
                  <a
                    href="https://github.com/pie-314/trx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    View Project <i className="ri-arrow-right-up-line"></i>
                  </a>
                </div>
              </article>
            </div>
          </section>

          <div className="section-divider"></div>

          {/* GITHUB HEATMAP */}
          <section className="heatmap-section fade-in-up">
            <h2 className="section-label">GITHUB ACTIVITY</h2>
            <div className="heatmap-container">
              <img
                src="https://ghchart.rshah.org/475569/pie-314"
                alt="GitHub Heatmap representing pie-314's activity"
                className="github-heatmap"
              />
            </div>
          </section>
        </section>

        {/* SECTION DIVIDER */}
        <div className="section-divider"></div>

        {/* BLOGS SECTION */}
        <section id="writing" className="section fade-in-up">
          <h2 className="section-heading">
            Blogs <span className="muted">/ Writing</span>
          </h2>

          <div className="blogs-list">
            <Link
              href="/blog/how-i-built-a-crash-safe-database-engine-in-c"
              className="blog-item"
            >
              <div className="blog-meta">Mar 2026 • Tech Deep Dive</div>
              <h3 className="blog-title">
                How I built a Crash-Safe Database Engine in C
              </h3>
              <p className="blog-excerpt">
                A comprehensive look into Write-Ahead Logs, data persistence,
                and C architecture.
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
                Distilling complex physics concepts into accessible mental
                models for anyone to understand.
              </p>
            </a>
          </div>
        </section>

        <footer className="footer-bottom fade-in-up">
          <p>&copy; 2026 Aadarsh Chandra. Designed from first principles.</p>
        </footer>
      </main>
    </>
  );
}
