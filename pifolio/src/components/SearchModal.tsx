"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface SearchItem {
    id: string;
    title: string;
    description: string;
    type: "Project" | "Blog";
    link: string;
}

const SEARCH_DATA: SearchItem[] = [
    {
        id: "p1",
        title: "Rustorian",
        description: "A Rust-based Async Historian with monthly SQLite rotation. Designed for robust backend data management and high performance.",
        type: "Project",
        link: "/projects",
    },
    {
        id: "p2",
        title: "Neural Net from Scratch (C)",
        description: "Implementations of forward and backpropagation logic entirely from scratch in raw C, disregarding external machine learning frameworks.",
        type: "Project",
        link: "/projects",
    },
    {
        id: "p3",
        title: "RadishDB",
        description: "A highly-optimized, crash-safe storage engine built from scratch in C. Implements WAL and POSIX mmap APIs.",
        type: "Project",
        link: "/projects",
    },
    {
        id: "p4",
        title: "TRX Package Manager",
        description: "A blazing fast, terminal-native package manager utilizing Ratatui to deliver a beautiful, modern workflow CLI.",
        type: "Project",
        link: "/projects",
    },
    {
        id: "b1",
        title: "How I built a Crash-Safe Database Engine in C",
        description: "A comprehensive look into Write-Ahead Logs, data persistence, and C architecture.",
        type: "Blog",
        link: "/blog/how-i-built-a-crash-safe-database-engine-in-c",
    },
    {
        id: "b2",
        title: "General Relativity for Kids",
        description: "Distilling complex physics concepts into accessible mental models for anyone to understand.",
        type: "Blog",
        link: "https://physicsforkidss.blogspot.com/2024/10/general-relativity-for-kids-to.html",
    },
];

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            document.body.style.overflow = "hidden";
        } else {
            setQuery("");
            document.body.style.overflow = "";
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const filteredData = query
        ? SEARCH_DATA.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase()) ||
            item.description.toLowerCase().includes(query.toLowerCase())
        )
        : SEARCH_DATA;

    const handleSelect = (link: string) => {
        onClose();
        if (link.startsWith("http")) {
            window.open(link, "_blank");
        } else {
            router.push(link);
        }
    };

    return (
        <div className="search-overlay" onClick={onClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-header">
                    <i className="ri-search-line search-icon"></i>
                    <input
                        ref={inputRef}
                        type="text"
                        className="search-input"
                        placeholder="Search projects, blogs..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button className="search-close-btn" onClick={onClose}>
                        <kbd className="cmd-key">ESC</kbd>
                    </button>
                </div>

                <div className="search-results">
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <div
                                key={item.id}
                                className="search-result-item"
                                onClick={() => handleSelect(item.link)}
                            >
                                <div className="search-result-icon">
                                    <i className={item.type === "Project" ? "ri-hammer-line" : "ri-article-line"}></i>
                                </div>
                                <div className="search-result-content">
                                    <h4 className="search-result-title">{item.title}</h4>
                                    <span className="search-result-badge">{item.type}</span>
                                </div>
                                <i className="ri-arrow-right-line search-result-arrow"></i>
                            </div>
                        ))
                    ) : (
                        <div className="search-empty text-center muted" style={{ padding: "2rem" }}>
                            <i className="ri-ghost-line" style={{ fontSize: "2rem", marginBottom: "1rem", display: "block" }}></i>
                            <p>No results found for "{query}"</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
