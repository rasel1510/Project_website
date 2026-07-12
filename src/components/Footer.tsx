"use client";
import React from "react";
import { BookOpen, Mail, ExternalLink } from "lucide-react";

const GH = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Footer() {
  return (
    <footer style={{ background: "#f0fdf4", borderTop: "1px solid #bbf7d0", padding: "48px 0 32px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 32 }}>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg,#15803d,#22c55e)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen style={{ width: 16, height: 16, color: "#fff" }} />
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, color: "#14532d" }}>BanglarMukh</span>
            </div>
            <p style={{ fontSize: 13, color: "#475569", maxWidth: 320, lineHeight: 1.7 }}>
              Physics-Aware Multilingual Multimodal Vision Language Benchmark for Evaluating Cultural and Traditional Grounding.
            </p>
          </div>

          {/* Quick Links */}
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803d", marginBottom: 12 }}>Resources</div>
              {[
                { label: "Paper (PDF)", href: "#" },
                { label: "GitHub Code", href: "https://github.com/rasel1510/BanglarMukh" },
                { label: "Dataset (HuggingFace)", href: "https://huggingface.co/datasets/Rasel2091/BanglarMukh/tree/main" },
                { label: "Leaderboard", href: "#leaderboard" },
              ].map(l => (
                <a key={l.label} href={l.href} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#334155", textDecoration: "none", marginBottom: 8, fontWeight: 500 }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#15803d")}
                  onMouseLeave={e => (e.currentTarget.style.color = "#334155")}
                >
                  <ExternalLink size={11} />{l.label}
                </a>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#15803d", marginBottom: 12 }}>Contact</div>
              <a href="mailto:contact@banglarmukh.org" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#334155", textDecoration: "none", fontWeight: 500, marginBottom: 8 }}>
                <Mail size={13} /> contact@banglarmukh.org
              </a>
              <a href="https://github.com/rasel1510/BanglarMukh" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#334155", textDecoration: "none", fontWeight: 500 }}>
                <GH /> GitHub Repository
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ marginTop: 36, paddingTop: 20, borderTop: "1px solid #bbf7d0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 12, color: "#64748b", fontWeight: 500 }}>
            © {new Date().getFullYear()} BanglarMukh · All rights reserved.
          </p>
          <p style={{ fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>
            CC BY-NC 4.0 License
          </p>
        </div>
      </div>
    </footer>
  );
}
