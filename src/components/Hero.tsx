"use client";
import React from "react";
import { FileText, Database } from "lucide-react";

const GH = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const authors = [
  { name: "Mohammad Rasel Ahmed", affils: ["Elite Research Lab", "NYC USA"] },
  { name: "Dip Kumar Saha", affils: ["Elite Research Lab", "Stamford University Bangladesh"] },
  { name: "Md. Kishor Morol", affils: ["Elite Research Lab", "Cornell University USA"] },
];


export default function Hero() {
  return (
    <section style={{ background: "linear-gradient(160deg,#f0fdf4 0%,#ffffff 55%)", paddingTop: 112, paddingBottom: 76 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(21px, 3.2vw, 34px)", fontWeight: 800, lineHeight: 1.35, letterSpacing: "-0.02em", color: "#14532d", marginBottom: 36, maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
          <span style={{ display: "block", fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 900, color: "#15803d", marginBottom: 12, letterSpacing: "-0.04em" }}>BanglarMukh</span>
          A Physics-Aware Multilingual Multimodal Vision Language Benchmark for Evaluating Cultural and Traditional Grounding
        </h1>

        {/* Authors */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "18px 52px", marginBottom: 40 }}>
          {authors.map((auth, i) => (
            <div key={i} style={{ textAlign: "center", minWidth: 200 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a", marginBottom: 4 }}>{auth.name}</div>
              {auth.affils.map((aff, idx) => (
                <div key={idx} style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, maxWidth: 280, marginLeft: "auto", marginRight: "auto", lineHeight: 1.4 }}>{aff}</div>
              ))}
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
          {[
            { icon: <FileText size={16} />, label: "Paper", href: "https://github.com/rasel1510/BanglarMukh" },
            { icon: <GH />, label: "GitHub Code", href: "https://github.com/rasel1510/BanglarMukh" },
            { icon: <Database size={16} />, label: "Dataset (HF)", href: "https://huggingface.co/datasets/Rasel2091/BanglarMukh/tree/main" },
          ].map((b, i) => (
            <a key={i} href={b.href}
              style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                gap: 8, padding: "12px 24px", borderRadius: 10,
                background: "#fff", color: "#1e293b", fontWeight: 700, fontSize: 15,
                border: "1px solid #e2e8f0",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                textDecoration: "none", transition: "transform 0.15s, box-shadow 0.15s",
                cursor: "pointer", minWidth: 145,
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.06)"; }}
            >{b.icon}{b.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
