"use client";
import React from "react";
import { Database, Globe, Atom, BarChart2 } from "lucide-react";

const cards = [
  {
    number: "01",
    icon: <Database size={22} color="#6366f1" />,
    iconBg: "#f5f3ff", iconBorder: "#e0e7ff",
    accentColor: "#6366f1",
    accentBg: "#f5f3ff",
    accentBorder: "#e0e7ff",
    tag: "Large-Scale Benchmark",
    title: "BanglarMukh: A Culturally-Rooted Benchmark",
    desc: "We introduce BanglarMukh, a large-scale, culturally and traditionally linked multilingual and multi-dialectal benchmark for Bangla understanding, built on 1,448 manually collected images with superior annotations evaluated by accumulated cross-verification procedures.",
  },
  {
    number: "02",
    icon: <Globe size={22} color="#0ea5e9" />,
    iconBg: "#f0f9ff", iconBorder: "#bae6fd",
    accentColor: "#0ea5e9",
    accentBg: "#f0f9ff",
    accentBorder: "#bae6fd",
    tag: "66.6k Artifacts",
    title: "Multilingual & Multi-Dialectal Expansion",
    desc: "We enlarged the benchmark to six languages and six native dialects, producing 66.6k total artifacts over captioning and visual question answering, and activating methodical assessment over historically rooted languages and native dialects.",
  },
  {
    number: "03",
    icon: <Atom size={22} color="#10b981" />,
    iconBg: "#ecfdf5", iconBorder: "#a7f3d0",
    accentColor: "#10b981",
    accentBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
    tag: "Physics-Aware",
    title: "Physics-Aware Conceptual Annotations",
    desc: "We enhance the dataset incorporating physics-aware conceptual annotations, activating assessment of deeper visual reasoning beyond base VQA along with captioning — enabling evaluation of genuine scientific understanding in cultural contexts.",
  },
  {
    number: "04",
    icon: <BarChart2 size={22} color="#f59e0b" />,
    iconBg: "#fffbeb", iconBorder: "#fde68a",
    accentColor: "#f59e0b",
    accentBg: "#fffbeb",
    accentBorder: "#fde68a",
    tag: "Comprehensive Evaluation",
    title: "Extensive State-of-the-Art VLM Evaluation",
    desc: "We conduct extensive evaluations on state-of-the-art VLMs and LLMs, analyzing their abilities over multilingual, multi-dialectal, and physics-conscious reasoning settings, exposing prime limitations in cultural and conceptual understanding.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "44px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 30px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 15px", borderRadius: 999, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
            Core Contributions
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Key Highlights</h2>
          <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.65 }}>
            BanglarMukh is the first benchmark evaluating cultural grounding, physics-aware reasoning, and regional linguistic diversity simultaneously in Vision-Language Models.
          </p>
        </div>

        {/* ── 4 cards in a row on desktop, 2 on tablet, 1 on mobile ── */}
        <style>{`
          .highlights-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 18px;
          }
          @media (min-width: 640px) {
            .highlights-grid { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .highlights-grid { grid-template-columns: repeat(4, 1fr); }
          }
        `}</style>

        <div className="highlights-grid">
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 14,
                padding: "22px 20px 20px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(0,0,0,0.10)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Accent stripe */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.accentColor, borderRadius: "14px 14px 0 0" }} />

              {/* Number + icon row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 10,
                  background: c.iconBg, border: `1px solid ${c.iconBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {c.icon}
                </div>
                <span style={{
                  fontSize: 30, fontWeight: 900, color: "#f1f5f9",
                  letterSpacing: "-1.5px", lineHeight: 1,
                  userSelect: "none"
                }}>
                  {c.number}
                </span>
              </div>

              {/* Tag pill */}
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.07em",
                padding: "3px 9px", borderRadius: 999,
                background: c.accentBg, border: `1px solid ${c.accentBorder}`,
                color: c.accentColor, marginBottom: 10
              }}>
                {c.tag}
              </div>

              <h3 style={{ fontSize: 14.5, fontWeight: 800, color: "#0f172a", marginBottom: 8, lineHeight: 1.4 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.7, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
