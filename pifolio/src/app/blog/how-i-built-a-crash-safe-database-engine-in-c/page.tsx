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
    { id: "why-c", text: "Why C?", level: 2 },
    {
      id: "the-core-in-memory-storage-and-hashtable",
      text: "The Core: In-Memory Storage and Hashtable",
      level: 2,
    },
    { id: "hash-tables", text: "Hash Tables", level: 3 },
    {
      id: "the-problem-surviving-crashes",
      text: "The Problem: Surviving Crashes",
      level: 2,
    },
    {
      id: "aof-rewrite-log-compaction-for-faster-recovery",
      text: "AOF Rewrite: Log Compaction for Faster Recovery",
      level: 2,
    },
    {
      id: "snapshots-faster-startup-with-rdbx",
      text: "Snapshots: Faster Startup with .rdbx",
      level: 2,
    },
    {
      id: "from-storage-engine-to-database-server",
      text: "From Storage Engine to Database Server",
      level: 2,
    },
    {
      id: "containerized-deployment-with-docker",
      text: "Containerized Deployment with Docker",
      level: 2,
    },
    { id: "architecture-overview", text: "Architecture Overview", level: 2 },
    {
      id: "what-building-radishdb-taught-me",
      text: "What Building RadishDB Taught Me",
      level: 2,
    },
    { id: "conclusion", text: "Conclusion", level: 2 },
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
                  How I Built a Crash-Safe Database Engine in C
                </h1>
                <div
                  className="blog-meta"
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--text-muted)",
                    marginBottom: "2rem",
                  }}
                >
                  Feb 2026 • Tech Deep Dive
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
                  Most developers use databases every day. Few actually know
                  what happens when the power goes out mid-write, or when a
                  system crashes halfway through saving data. Yet when the
                  database restarts, everything is still there. That reliability
                  isn’t magic. It comes from careful engineering.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  I wanted to understand this at a deeper level, so I built{" "}
                  <strong>RadishDB</strong>. It started as a simple in-memory
                  key–value store in C. Over time, I added persistence, crash
                  recovery, write-ahead logging, snapshots, TTL expiration, a
                  TCP server, and Docker deployment.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  The goal wasn’t to compete with Redis. It was to understand
                  how systems like Redis actually work under the hood.
                </p>

                {/* divider */}
                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="why-c"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Why C?
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  Since RadishDB is fundamentally a storage engine, performance
                  and predictability matter a lot. I wanted full control over
                  memory and disk behavior.
                </p>
                <p style={{ marginBottom: "1rem" }}>C gives you:</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>direct control over memory</li>
                  <li>no garbage collector</li>
                  <li>predictable performance</li>
                  <li>minimal abstraction between code and hardware</li>
                </ul>
                <p style={{ marginBottom: "1.5rem" }}>
                  When you're building a database, memory layout and disk writes
                  are not abstract ideas. They are the system itself.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  This is also why many real databases like Redis, SQLite, and
                  PostgreSQL are written in C. The language doesn’t hide
                  anything. If something goes wrong, you can usually see exactly
                  why.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  It also forces you to think carefully about every allocation,
                  every pointer, and every write to disk.
                </p>

                {/* divider */}
                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="the-core-in-memory-storage-and-hashtable"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  The Core: In-Memory Storage and Hashtable
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  RadishDB stores all data in memory. This makes reads and
                  writes extremely fast, since RAM access is much faster than
                  disk access.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  To organize data efficiently, I used a hash table.
                </p>

                <h3
                  id="hash-tables"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.2rem",
                    marginBottom: "1rem",
                    marginTop: "1.5rem",
                  }}
                >
                  Hash Tables
                </h3>
                <p style={{ marginBottom: "1.5rem" }}>
                  Hash tables allow fast lookup, insertion, and deletion,
                  usually in constant time O(1).
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  When a key is inserted, RadishDB computes a hash and maps it
                  to a bucket.
                </p>
                <p style={{ marginBottom: "1rem" }}>
                  I used the djb2 hash function:
                </p>

                <pre
                  style={{
                    background: "var(--bg-surface)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    overflowX: "auto",
                    marginBottom: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--text-strong)",
                  }}
                >
                  <code>{`unsigned long hash(const char *str) {
  unsigned long hash = 5381;
  for (int i = 0; str[i] != '\\0'; i++) {
    hash = hash * 33 + str[i];
  }
  return hash;
}`}</code>
                </pre>

                <p style={{ marginBottom: "1.5rem" }}>
                  If multiple keys map to the same bucket, they are stored using
                  separate chaining with a linked list. This keeps operations
                  fast even when collisions occur.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  At this stage, RadishDB was fast, but fragile. Everything
                  lived in memory. If the process crashed, all data was gone.
                  That led to the next problem.
                </p>

                {/* divider */}
                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="the-problem-surviving-crashes"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  The Problem: Surviving Crashes
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  An in-memory database is fast, but memory disappears when the
                  process stops.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  To solve this, I implemented Write-Ahead Logging (WAL) using
                  an Append-Only File (AOF). The idea is simple but powerful.
                  Every write operation is first written to disk before applying
                  it to memory.
                </p>
                <p style={{ marginBottom: "1rem" }}>For example:</p>

                <pre
                  style={{
                    background: "var(--bg-surface)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    overflowX: "auto",
                    marginBottom: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--text-strong)",
                  }}
                >
                  <code>{`SET name alice\nDEL name`}</code>
                </pre>

                <p style={{ marginBottom: "1.5rem" }}>
                  These commands are appended to a log file. If the database
                  crashes, RadishDB reads this file during startup and replays
                  the operations to rebuild memory.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  The log becomes the source of truth. Memory becomes a
                  reconstructed state. This ensures durability.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="aof-rewrite-log-compaction-for-faster-recovery"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  AOF Rewrite: Log Compaction for Faster Recovery
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  One problem with append-only logs is that they grow forever.
                  For example:
                </p>

                <pre
                  style={{
                    background: "var(--bg-surface)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    overflowX: "auto",
                    marginBottom: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--text-strong)",
                  }}
                >
                  <code>{`SET x 1\nSET x 2\nSET x 3\nSET x 4`}</code>
                </pre>

                <p style={{ marginBottom: "1.5rem" }}>
                  Only the final value matters. Similarly:
                </p>

                <pre
                  style={{
                    background: "var(--bg-surface)",
                    padding: "1rem",
                    borderRadius: "8px",
                    border: "1px solid var(--border-light)",
                    overflowX: "auto",
                    marginBottom: "1.5rem",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.9rem",
                    color: "var(--text-strong)",
                  }}
                >
                  <code>{`SET x 1\nDEL x`}</code>
                </pre>

                <p style={{ marginBottom: "1.5rem" }}>
                  The key no longer exists, but the log still contains both
                  operations. Over time, this slows startup and wastes disk
                  space.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  To fix this, RadishDB performs AOF rewrite. Instead of keeping
                  the full history, it writes only the current state into a new
                  file.
                </p>
                <p style={{ marginBottom: "1rem" }}>
                  The process works like this:
                </p>
                <ol
                  style={{
                    listStyleType: "decimal",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>Create a temporary file</li>
                  <li>Write current database state</li>
                  <li>Flush to disk using fsync</li>
                  <li>Atomically replace the old file using rename</li>
                </ol>
                <p style={{ marginBottom: "2.5rem" }}>
                  Rename is atomic on POSIX systems. This means even if a crash
                  happens during rewrite, the database will always have a valid
                  file. This ensures both safety and efficiency.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="snapshots-faster-startup-with-rdbx"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Snapshots: Faster Startup with .rdbx
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  While AOF is great for durability, replaying a long log can
                  take time. To solve this, I implemented snapshots using a
                  custom binary format called <code>.rdbx</code>.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  A snapshot stores the current state of the database, not the
                  history. This makes it:
                </p>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>smaller</li>
                  <li>faster to load</li>
                  <li>easier to transfer</li>
                </ul>
                <p style={{ marginBottom: "2.5rem" }}>
                  Snapshots are useful for backups and fast startup. AOF ensures
                  durability. Snapshots ensure speed and portability.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="from-storage-engine-to-database-server"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  From Storage Engine to Database Server
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  At this point, RadishDB could store and recover data. But it
                  wasn’t a real database server yet. To make it usable by
                  applications, I implemented a TCP server on port 6379.
                </p>
                <p style={{ marginBottom: "1rem" }}>The server:</p>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>creates a socket</li>
                  <li>listens for client connections</li>
                  <li>parses incoming commands</li>
                  <li>executes them</li>
                  <li>returns responses</li>
                </ul>
                <p style={{ marginBottom: "1rem" }}>
                  The architecture separates responsibilities:
                </p>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>
                    <strong>server.c</strong> handles networking
                  </li>
                  <li>
                    <strong>repl.c</strong> handles command parsing
                  </li>
                  <li>
                    <strong>engine.c</strong> handles storage logic
                  </li>
                </ul>
                <p style={{ marginBottom: "2.5rem" }}>
                  This separation makes the system easier to maintain and
                  extend. RadishDB became a real database service.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="containerized-deployment-with-docker"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Containerized Deployment with Docker
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  To make deployment easier, I containerized RadishDB using
                  Docker. The AOF file is stored in a Docker volume, which
                  ensures data persists even if the container stops.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  This makes RadishDB portable and consistent across
                  environments. It runs the same on local machines, servers, and
                  CI pipelines. GitHub Actions automate builds and deployment.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="architecture-overview"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Architecture Overview
                </h2>
                <p style={{ marginBottom: "1rem" }}>
                  RadishDB consists of several components:
                </p>
                <ul
                  style={{
                    listStyleType: "none",
                    paddingLeft: "0",
                    marginBottom: "2.5rem",
                  }}
                >
                  <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Engine</strong> - Handles in-memory storage, hash
                    table, and command execution.
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <strong>AOF</strong> - Logs every write operation to disk
                    for durability.
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <strong>AOF Rewrite</strong> - Compacts the log by writing
                    only the current state.
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Server</strong> - Handles TCP connections and client
                    communication.
                  </li>
                  <li style={{ marginBottom: "0.5rem" }}>
                    <strong>Docker</strong> - Provides consistent deployment and
                    persistent storage.
                  </li>
                </ul>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="what-building-radishdb-taught-me"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  What Building RadishDB Taught Me
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  This project taught me a lot about how databases actually
                  work. I learned:
                </p>
                <ul
                  style={{
                    listStyleType: "disc",
                    paddingLeft: "1.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  <li>how crash recovery works</li>
                  <li>how write-ahead logging ensures durability</li>
                  <li>how hash tables work internally</li>
                  <li>how to design binary file formats</li>
                  <li>how to build TCP servers</li>
                  <li>how memory management works in C</li>
                </ul>
                <p style={{ marginBottom: "1.5rem" }}>
                  More importantly, it changed how I think about systems.
                  Databases are not mysterious. They are carefully designed
                  systems that follow strict rules to ensure data safety.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  Every write, every disk flush, and every recovery step
                  matters.
                </p>

                <hr
                  style={{
                    border: "0",
                    borderTop: "1px solid var(--border-light)",
                    margin: "2rem 0",
                  }}
                />

                <h2
                  id="conclusion"
                  style={{
                    color: "var(--text-strong)",
                    fontSize: "1.5rem",
                    marginBottom: "1rem",
                    marginTop: "2rem",
                  }}
                >
                  Conclusion
                </h2>
                <p style={{ marginBottom: "1.5rem" }}>
                  RadishDB started as a small experiment to understand database
                  internals. It evolved into a crash-safe database engine with
                  logging, snapshots, networking, and deployment support.
                </p>
                <p style={{ marginBottom: "1.5rem" }}>
                  The project helped me understand durability, persistence, and
                  recovery in a practical way. Building it made databases feel
                  less like black boxes and more like systems built from simple,
                  reliable components.
                </p>
                <p style={{ marginBottom: "2.5rem" }}>
                  And that understanding was the real goal.
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
