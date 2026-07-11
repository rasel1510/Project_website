"use client";
import React, { useState } from "react";
import { FileText, Database, Play, Eye, EyeOff, Users } from "lucide-react";

const GH = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const authors = [
  { name: "Author One*", affil: "University of Dhaka" },
  { name: "Author Two*", affil: "BUET" },
  { name: "Author Three", affil: "University of Dhaka" },
  { name: "Author Four", affil: "MIT" },
  { name: "Author Five", affil: "Stanford University" },
];

const stats = [
  { val: "1,448", label: "Expert Images" },
  { val: "15", label: "Domains" },
  { val: "6+6", label: "Dialects & Languages" },
  { val: "66,608", label: "Evaluation Artifacts" },
];

export default function Hero() {
  const [anon, setAnon] = useState(true);

  return (
    <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#ffffff 55%)", paddingTop: 100, paddingBottom: 72 }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>



        {/* Title */}
        <h1 style={{ fontSize: "clamp(24px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.25, letterSpacing: "-0.03em", color: "#14532d", marginBottom: 40, maxWidth: 900, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ display: "block", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 900, color: "#15803d", marginBottom: 12, letterSpacing: "-0.04em" }}>BanglarMukh</span>
          A Physics-Aware Multilingual Multimodal Vision Language Benchmark for Evaluating Cultural and Traditional Grounding
        </h1>

        {/* Stats row */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginBottom: 44 }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: "#ffffff", border: "1px solid #bbf7d0", borderRadius: 12, padding: "14px 24px", minWidth: 120, boxShadow: "0 2px 8px rgba(22,163,74,0.06)" }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#15803d", lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Author toggle */}
        <div style={{ marginBottom: 40 }}>
          <button onClick={() => setAnon(!anon)} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 22px", border: "1.5px solid #bbf7d0", borderRadius: 999, background: "#fff", cursor: "pointer", fontSize: 13, fontWeight: 700, color: "#15803d", marginBottom: 20, boxShadow: "0 1px 4px rgba(22,163,74,0.1)" }}>
            {anon ? <><Eye size={15} /><span>Show Author Details (Camera-Ready Preview)</span></> : <><EyeOff size={15} /><span>Switch to Anonymous Mode</span></>}
          </button>

          {anon ? (
            <div style={{ background: "#f0fdf4", border: "2px dashed #86efac", borderRadius: 16, padding: "20px 36px", display: "inline-block" }}>
              <div style={{ fontSize: 15, fontWeight: 800, color: "#14532d" }}>Paper ID: 14082</div>
              <div style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, marginTop: 4 }}>AAAI 2027 · Double-Blind Peer Review</div>
              <div style={{ fontSize: 12, color: "#86efac", fontStyle: "italic", marginTop: 8 }}>Author identities withheld for blind review</div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "16px 32px" }}>
                {authors.map((a, i) => (
                  <div key={i} style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>{a.name}</div>
                    <div style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>{a.affil}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 12 }}>* Equal contribution</div>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
          {[
            { icon: <FileText size={16} />, label: "Download Paper", bg: "linear-gradient(135deg,#15803d,#22c55e)", color: "#fff", shadow: "0 4px 14px rgba(22,163,74,0.3)", href: "#" },
            { icon: <GH />, label: "GitHub Code", bg: "#fff", color: "#1e293b", border: "1px solid #e2e8f0", shadow: "0 1px 4px rgba(0,0,0,0.06)", href: "https://github.com/rasel1510/BanglarMukh" },
            { icon: <Database size={16} />, label: "Dataset (HF)", bg: "#fff", color: "#1e293b", border: "1px solid #e2e8f0", shadow: "0 1px 4px rgba(0,0,0,0.06)", href: "#" },
            { icon: <Play size={15} />, label: "Live Demo", bg: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0", shadow: "0 1px 4px rgba(22,163,74,0.08)", href: "#dataset" },
          ].map((b, i) => (
            <a key={i} href={b.href} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 22px", borderRadius: 10, background: b.bg, color: b.color, fontWeight: 700, fontSize: 14, border: b.border ?? "none", boxShadow: b.shadow, textDecoration: "none", transition: "transform 0.15s", cursor: "pointer" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >{b.icon}{b.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
