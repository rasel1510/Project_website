"use client";
import React, { useState } from "react";
import { Clipboard, Check, Quote } from "lucide-react";

const bib = `@article{ahmed2027banglarmukh,
  title   = {BanglarMukh: A Physics-Aware Multilingual Multimodal
             Vision Language Benchmark for Evaluating Cultural
             and Traditional Grounding},
  author  = {Ahmed, Mohammad Rasel and Saha, Dip Kumar and
             Morol, Md. Kishor and Hosain, Md Tanzib and
             Fahad, Nafiz},
  journal = {arXiv preprint},
  year    = {2027}
}`;

export default function BibTeX() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(bib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="citation" style={{ background: "#fff", borderTop: "1px solid #dcfce7", padding: "44px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ maxWidth: 820, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 30 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 15px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
              <Quote size={12} /> Citation
            </div>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: "#14532d", marginBottom: 10 }}>Cite BanglarMukh</h2>
            <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.65 }}>If our benchmark or paper is useful to your research, please cite us using the BibTeX entry below.</p>
          </div>

          <div style={{ border: "1px solid #bbf7d0", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 16px rgba(22,163,74,0.08)" }}>
            {/* Editor bar */}
            <div style={{ background: "#1e293b", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", fontFamily: "monospace", marginLeft: 6 }}>banglarmukh.bib</span>
              </div>
              <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 13px", borderRadius: 7, border: copied ? "1px solid #22c55e" : "1px solid #334155", background: copied ? "#14532d" : "#0f172a", color: copied ? "#86efac" : "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all 0.2s" }}>
                {copied ? <><Check size={13} /> Copied!</> : <><Clipboard size={13} /> Copy BibTeX</>}
              </button>
            </div>

            {/* Code */}
            <div style={{ background: "#0f172a", padding: "20px", overflowX: "auto" }}>
              <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.8, color: "#86efac", whiteSpace: "pre", margin: 0 }}>{bib}</pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
