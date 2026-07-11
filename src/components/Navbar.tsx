"use client";
import React, { useState, useEffect } from "react";
import { Menu, X, FileText, BookOpen } from "lucide-react";

const GH = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const links = [
  { label: "Abstract", href: "#abstract" },
  { label: "Highlights", href: "#highlights" },
  { label: "Dataset", href: "#dataset" },
  { label: "Result", href: "#leaderboard" },
  { label: "Citation", href: "#citation" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const nav: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
    background: scrolled ? "rgba(255,255,255,0.97)" : "#ffffff",
    borderBottom: `1px solid ${scrolled ? "#bbf7d0" : "#e2e8f0"}`,
    boxShadow: scrolled ? "0 2px 12px rgba(22,163,74,0.08)" : "none",
    transition: "all 0.3s ease",
  };
  const inner: React.CSSProperties = {
    maxWidth: 1200, margin: "0 auto", padding: "0 24px",
    height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
  };
  const logo: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 10,
    textDecoration: "none", cursor: "pointer",
  };
  const logoBox: React.CSSProperties = {
    width: 36, height: 36, borderRadius: 8,
    background: "linear-gradient(135deg, #15803d, #22c55e)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };
  const logoText: React.CSSProperties = {
    fontWeight: 800, fontSize: 17, color: "#14532d", letterSpacing: "-0.3px",
  };
  const navLink: React.CSSProperties = {
    fontSize: 13, fontWeight: 600, color: "#334155",
    textDecoration: "none", transition: "color 0.15s",
    padding: "4px 0",
  };
  const paperBtn: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 16px", borderRadius: 8,
    background: "linear-gradient(135deg, #15803d, #22c55e)",
    color: "#fff", fontWeight: 700, fontSize: 13,
    border: "none", cursor: "pointer", textDecoration: "none",
    boxShadow: "0 2px 8px rgba(22,163,74,0.3)",
  };
  const ghBtn: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: 6,
    padding: "7px 14px", borderRadius: 8,
    background: "#fff", color: "#334155", fontWeight: 600, fontSize: 13,
    border: "1px solid #e2e8f0", cursor: "pointer", textDecoration: "none",
  };

  return (
    <header style={nav}>
      <div style={inner}>
        <a href="#" style={logo}>
          <div style={logoBox}>
            <BookOpen style={{ width: 18, height: 18, color: "#fff" }} />
          </div>
          <span style={logoText}>BanglarMukh</span>
        </a>

        {/* Desktop nav */}
        <nav style={{ display: "flex", gap: 32 }} className="hidden md:flex">
          {links.map(l => (
            <a key={l.label} href={l.href} style={navLink}
              onMouseEnter={e => (e.currentTarget.style.color = "#15803d")}
              onMouseLeave={e => (e.currentTarget.style.color = "#334155")}
            >{l.label}</a>
          ))}
        </nav>

        <div style={{ display: "flex", gap: 10 }} className="hidden md:flex">
          <a href="https://github.com/rasel1510/BanglarMukh" style={ghBtn}><GH /><span>Code</span></a>
          <a href="#" style={paperBtn}><FileText style={{ width: 14, height: 14 }} /><span>Paper</span></a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden"
          style={{ background: "none", border: "1px solid #e2e8f0", borderRadius: 8, padding: 8, cursor: "pointer", color: "#334155" }}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div style={{ background: "#fff", borderTop: "1px solid #dcfce7", padding: "16px 24px 20px" }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              style={{ display: "block", padding: "10px 0", borderBottom: "1px solid #f0fdf4", fontSize: 15, fontWeight: 600, color: "#1e293b", textDecoration: "none" }}>{l.label}</a>
          ))}
          <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
            <a href="https://github.com/rasel1510/BanglarMukh" style={{ ...ghBtn, flex: 1, justifyContent: "center" }}><GH /><span>GitHub</span></a>
            <a href="#" style={{ ...paperBtn, flex: 1, justifyContent: "center" }}><FileText style={{ width: 14, height: 14 }} /><span>Paper</span></a>
          </div>
        </div>
      )}
    </header>
  );
}
