"use client";
import React, { useState } from "react";
import { Clipboard, Check, Quote } from "lucide-react";

const bib = `@inproceedings{rahman2027banglarmukh,
  title     = {BanglarMukh: A Physics-Aware Multilingual Multimodal
               Vision Language Benchmark for Evaluating Cultural
               and Traditional Grounding},
  author    = {Rahman, Tasnim and Islam, Md. Rafiqul and
               Siddiqua, Ayesha and Chowdhury, Animesh and
               Hasan, Tanvir},
  booktitle = {Proceedings of the AAAI Conference on
               Artificial Intelligence (AAAI)},
  year      = {2027},
  pages     = {1--15}
}`;

export default function BibTeX() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(bib);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="citation" style={{ background: "#fff", borderTop: "1px solid #dcfce7", padding: "80px 0" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            <Quote size={12} /> Citation
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532d", marginBottom: 10 }}>Cite BanglarMukh</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}>If our benchmark or paper is useful to your research, please cite us using the BibTeX entry below.</p>
        </div>

        <div style={{ border: "1px solid #bbf7d0", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(22,163,74,0.08)" }}>
          {/* Editor bar */}
          <div style={{ background: "#1e293b", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b", display: "inline-block" }} />
              <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: "#64748b", fontFamily: "monospace", marginLeft: 8 }}>banglarmukh.bib</span>
            </div>
            <button onClick={copy} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: copied ? "1px solid #22c55e" : "1px solid #334155", background: copied ? "#14532d" : "#0f172a", color: copied ? "#86efac" : "#94a3b8", cursor: "pointer", fontSize: 12, fontWeight: 700, transition: "all 0.2s" }}>
              {copied ? <><Check size={13} /> Copied!</> : <><Clipboard size={13} /> Copy BibTeX</>}
            </button>
          </div>

          {/* Code */}
          <div style={{ background: "#0f172a", padding: "24px", overflowX: "auto" }}>
            <pre style={{ fontFamily: "'Courier New', monospace", fontSize: 13, lineHeight: 1.85, color: "#86efac", whiteSpace: "pre", margin: 0 }}>{bib}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}
