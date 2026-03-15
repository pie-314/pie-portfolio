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
        { id: "what-is-a-neuron", text: "What is a Neuron?", level: 2 },
        { id: "the-structure-in-c", text: "The Structure in C", level: 3 },
        { id: "step-1-making-a-prediction", text: "Step 1: Making a Prediction", level: 2 },
        { id: "step-2-how-the-neuron-knows-its-wrong", text: "Step 2: How the Neuron Knows It's Wrong", level: 2 },
        { id: "why-we-use-squared-error", text: "Why We Use Squared Error", level: 3 },
        { id: "sum-of-squared-errors-sse", text: "Sum of Squared Errors (SSE)", level: 3 },
        { id: "step-3-learning-via-gradient-descent", text: "Step 3: Learning via Gradient Descent", level: 2 },
        { id: "step-4-training-the-neuron", text: "Step 4: Training the Neuron", level: 2 },
        { id: "mathematical-sequences-the-results", text: "Mathematical Sequences", level: 2 },
        { id: "the-fibonacci-sequence", text: "1. The Fibonacci Sequence", level: 3 },
        { id: "arithmetic-progressions-ap", text: "2. Arithmetic Progressions", level: 3 },
        { id: "geometric-progressions-gp", text: "3. Geometric Progressions", level: 3 },
        { id: "mapping-code-to-machine-learning-concepts", text: "Mapping Concepts", level: 2 },
        { id: "limitations-and-final-thoughts", text: "Limitations & Thoughts", level: 2 },
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
                                    Building a Neural Network from Scratch in C
                                </h1>
                                <div
                                    className="blog-meta"
                                    style={{
                                        fontFamily: "var(--font-mono)",
                                        color: "var(--text-muted)",
                                        marginBottom: "2rem",
                                    }}
                                >
                                    Mar 2026 • Machine Learning
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
                                    For the past few months, I’ve been completely hooked on the
                                    "how" of AI. It’s one thing to use a chatbot, but it’s another
                                    thing entirely to understand the tiny gears turning under the
                                    hood. Eventually, I decided I had to build a neuron myself.
                                </p>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The neuron is the smallest computational unit of a neural
                                    network—the DNA of every AI system you’ve ever used. But
                                    building a full-scale network is like trying to fight Goliath
                                    before you’ve even picked up a stone. To keep things manageable,
                                    I started with the simplest possible system: a single neuron
                                    capable of detecting patterns in numbers, specifically <strong>Arithmetic
                                        Progressions (AP)</strong>, <strong>Geometric Progressions (GP)</strong>, and
                                    the <strong>Fibonacci sequence</strong>.
                                </p>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    It was a deeply educational experience. What fascinated me most
                                    was realizing that, at its core, "learning" is just a set of
                                    numbers adjusting themselves to be slightly less wrong. Here is
                                    how it works.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="what-is-a-neuron"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    What is a Neuron?
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    To understand a neural network, you have to start with the
                                    "cell." In simple terms, a neuron is just a function. It takes
                                    inputs, multiplies them by "weights" (to decide how important
                                    they are), adds a "bias" (a constant nudge), and produces an
                                    output.
                                </p>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The math looks like this:
                                </p>

                                <div style={{
                                    background: "var(--bg-surface)",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--text-strong)"
                                }}>
                                    output = (w₁ × x₁) + (w₂ × x₂) + bias
                                </div>

                                <p style={{ marginBottom: "1.5rem" }}>
                                    In my implementation, the neuron tries to predict the next
                                    number in a sequence by looking at the <strong>current</strong> number
                                    and the <strong>previous</strong> one.
                                </p>

                                <h3
                                    id="the-structure-in-c"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    The Structure in C
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    I defined the neuron as a simple <code>struct</code>. I initialized
                                    the weights at <code>0.5</code>, though in "real" machine learning,
                                    you’d usually start with random numbers.
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
                                    <code>{`typedef struct {
    double w1;    // Weight for the current number
    double w2;    // Weight for the previous number
    double bias;  // The constant adjustment
} Neuron;`}</code>
                                </pre>

                                <p style={{ marginBottom: "2.5rem" }}>
                                    In this setup, <code>w1</code> is the importance of the most recent
                                    number, <code>w2</code> is for the one before it, and the <code>bias</code> shifts
                                    the whole prediction up or down.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="step-1-making-a-prediction"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Step 1: Making a Prediction (The Forward Pass)
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    Once we have our neuron, it’s time to put it to work. It takes
                                    the current and previous numbers and makes its best "guess" at
                                    the next value.
                                </p>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The formula is straightforward:
                                </p>

                                <div style={{
                                    background: "var(--bg-surface)",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--text-strong)"
                                }}>
                                    prediction = (w₁ × current) + (w₂ × previous) + bias
                                </div>

                                <p style={{ marginBottom: "2.5rem" }}>
                                    Think of this as the neuron’s internal logic. At this stage—the
                                    <strong> Forward Pass</strong>—the model is just calculating. It isn't
                                    changing its mind yet. The learning only happens once the
                                    neuron realizes just how wrong that guess was.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="step-2-how-the-neuron-knows-its-wrong"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Step 2: How the Neuron Knows It’s Wrong
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    After the guess is made, we have to check the "accuracy." The
                                    simplest way is to find the raw error:
                                </p>

                                <div style={{
                                    background: "var(--bg-surface)",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--text-strong)"
                                }}>
                                    error = target - prediction
                                </div>

                                <h3
                                    id="why-we-use-squared-error"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    Why We Use Squared Error
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    In practice, machine learning doesn't just look at the raw error.
                                    We usually square it:
                                </p>

                                <div style={{
                                    background: "var(--bg-surface)",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--text-strong)"
                                }}>
                                    loss = (target - prediction)²
                                </div>

                                <p style={{ marginBottom: "1rem" }}>
                                    This does two clever things:
                                </p>
                                <ol
                                    style={{
                                        listStyleType: "decimal",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <li>
                                        <strong>It treats positive and negative errors the same.</strong>{" "}
                                        (Distance is distance, regardless of direction).
                                    </li>
                                    <li>
                                        <strong>It penalizes big mistakes.</strong> Because we’re
                                        squaring the number, a small error stays small, but a large
                                        error becomes massive, forcing the neuron to pay more
                                        attention.
                                    </li>
                                </ol>

                                <h3
                                    id="sum-of-squared-errors-sse"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    Sum of Squared Errors (SSE)
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    When we train on a whole set of data, we want to know the{" "}
                                    <em>total</em> error across every example. We call this the{" "}
                                    <strong>Sum of Squared Errors (SSE)</strong>:
                                </p>

                                <div style={{
                                    background: "var(--bg-surface)",
                                    padding: "1rem",
                                    borderRadius: "8px",
                                    border: "1px solid var(--border-light)",
                                    display: "flex",
                                    justifyContent: "center",
                                    marginBottom: "1.5rem",
                                    fontFamily: "var(--font-mono)",
                                    color: "var(--text-strong)"
                                }}>
                                    SSE = Σ (targetᵢ - predictionᵢ)²
                                </div>

                                <p style={{ marginBottom: "2.5rem" }}>
                                    <strong>The ultimate goal:</strong> Minimize this loss until it's as close to zero as possible.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="step-3-learning-via-gradient-descent"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Step 3: Learning via Gradient Descent
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    Now for the "Aha!" moment. Once the neuron knows its error, it
                                    uses <strong>Gradient Descent</strong> to update its parameters.
                                    Gradient descent is essentially a way to "walk down" the hill of
                                    error until you reach the valley of accuracy.
                                </p>
                                <p style={{ marginBottom: "1rem" }}>
                                    The program runs a loop that updates <code>w1</code>, <code>w2</code>,
                                    and <code>bias</code> using these rules:
                                </p>

                                <ul
                                    style={{
                                        listStyleType: "disc",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "1.5rem",
                                        fontFamily: "var(--font-mono)",
                                    }}
                                >
                                    <li>w₁ += learning_rate × error × current</li>
                                    <li>w₂ += learning_rate × error × previous</li>
                                    <li>bias += learning_rate × error</li>
                                </ul>

                                <p style={{ marginBottom: "2.5rem" }}>
                                    The <strong>learning rate</strong> is our "step size." If it’s too
                                    big, the neuron overreacts; if it’s too small, it takes forever to
                                    learn. Every time the neuron makes a mistake, these formulas nudge
                                    the weights in the direction that would have made the prediction
                                    more accurate.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="step-4-training-the-neuron"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Step 4: Training the Neuron
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    To actually "teach" it, we feed it the training data repeatedly. Each
                                    pass through the data is like a study session. The neuron guesses,
                                    checks the answer, and nudges its weights.
                                </p>
                                <p style={{ marginBottom: "1rem" }}>
                                    Here is a simplified look at that training loop:
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
                                    <code>{`for (int i = 0; i < iterations; i++) {
    for (int j = 0; j < size; j++) {
        // The Forward Pass
        double prediction = model->w1 * curr[j] + model->w2 * prev[j] + model->bias;

        // Calculate the difference
        double error = target[j] - prediction;

        // Gradient Descent: The "Nudge"
        model->w1 += learning_rate * error * curr[j];
        model->w2 += learning_rate * error * prev[j];
        model->bias += learning_rate * error;
    }
}`}</code>
                                </pre>

                                <p style={{ marginBottom: "2.5rem" }}>
                                    After enough iterations, the weights stop jumping around and settle
                                    (converge) on the pattern.
                                </p>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="mathematical-sequences-the-results"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Mathematical Sequences: The Results
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The most satisfying part was seeing the neuron "discover" the rules
                                    of math. It didn't memorize the numbers; it found the <em>relationship</em> between
                                    them.
                                </p>

                                <h3
                                    id="the-fibonacci-sequence"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    1. The Fibonacci Sequence
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    The rule is F(n) = F(n-1) + F(n-2).
                                    <br />
                                    After training, the neuron’s weights naturally settled near:
                                </p>
                                <ul
                                    style={{
                                        listStyleType: "disc",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <li>w₁ ≈ 1</li>
                                    <li>w₂ ≈ 1</li>
                                    <li>bias ≈ 0</li>
                                </ul>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    It essentially "wrote" its own Fibonacci code. If you give it <code>3</code> and{" "}
                                    <code>5</code>, it calculates (1 × 5) + (1 × 3) + 0 = 8.
                                </p>

                                <h3
                                    id="arithmetic-progressions-ap"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    2. Arithmetic Progressions (AP)
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    For a sequence that adds a constant (like 2, 4, 6... where d=2):
                                </p>
                                <ul
                                    style={{
                                        listStyleType: "disc",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <li>w₁ ≈ 1</li>
                                    <li>w₂ ≈ 0</li>
                                    <li>bias ≈ d (e.g., 2)</li>
                                </ul>

                                <h3
                                    id="geometric-progressions-gp"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.2rem",
                                        marginBottom: "1rem",
                                        marginTop: "1.5rem",
                                    }}
                                >
                                    3. Geometric Progressions (GP)
                                </h3>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    For a sequence that multiplies by a ratio (like 3, 9, 27... where r=3):
                                </p>
                                <ul
                                    style={{
                                        listStyleType: "disc",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "2.5rem",
                                    }}
                                >
                                    <li>w₁ ≈ r (e.g., 3)</li>
                                    <li>w₂ ≈ 0</li>
                                    <li>bias ≈ 0</li>
                                </ul>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="mapping-code-to-machine-learning-concepts"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Mapping Code to Machine Learning Concepts
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    Even this tiny program is a mirror of what the big AI models are doing.
                                </p>
                                <div style={{ overflowX: "auto", marginBottom: "2.5rem" }}>
                                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                                        <thead>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <th style={{ padding: "0.75rem" }}>C Code Component</th>
                                                <th style={{ padding: "0.75rem" }}>ML Concept</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)" }}>Neuron struct</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Perceptron</td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)" }}>w1, w2</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Weights</td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem", fontFamily: "var(--font-mono)" }}>bias</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Bias</td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem" }}>Prediction equation</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Forward Pass</td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem" }}>Error calculation</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Loss Function</td>
                                            </tr>
                                            <tr style={{ borderBottom: "1px solid var(--border-light)" }}>
                                                <td style={{ padding: "0.75rem" }}>Parameter updates</td>
                                                <td style={{ padding: "0.75rem", fontWeight: "bold" }}>Gradient Descent</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <hr
                                    style={{
                                        border: "0",
                                        borderTop: "1px solid var(--border-light)",
                                        margin: "2rem 0",
                                    }}
                                />

                                <h2
                                    id="limitations-and-final-thoughts"
                                    style={{
                                        color: "var(--text-strong)",
                                        fontSize: "1.5rem",
                                        marginBottom: "1rem",
                                        marginTop: "2rem",
                                    }}
                                >
                                    Limitations and Final Thoughts
                                </h2>
                                <p style={{ marginBottom: "1.5rem" }}>
                                    I’ll be the first to admit: this neuron is a simple creature.
                                </p>
                                <ol
                                    style={{
                                        listStyleType: "decimal",
                                        paddingLeft: "1.5rem",
                                        marginBottom: "1.5rem",
                                    }}
                                >
                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <strong>It’s Linear:</strong> It can only learn patterns that fit a
                                        straight line. It can't handle complex, non-linear curves.
                                    </li>
                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <strong>It’s Lonely:</strong> It only has two inputs. Modern networks
                                        have thousands.
                                    </li>
                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <strong>It’s Shallow:</strong> Real AI uses "layers" of neurons to
                                        process information in stages.
                                    </li>
                                </ol>
                                <p style={{ marginBottom: "2.5rem" }}>
                                    Despite that, building this was a revelation. It stripped away the hype
                                    of "Artificial Intelligence" and replaced it with something much cooler:
                                    elegant, self-correcting math.
                                    <br /><br />
                                    You can find the full source code on GitHub: <a href="https://github.com/pie-314/neural-network-from-scratch-c" target="_blank" rel="noopener noreferrer" style={{ color: "var(--accent)" }}>pie-314/neural-network-from-scratch-c</a>.
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
