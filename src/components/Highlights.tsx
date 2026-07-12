"use client";
import React from "react";
import { Database, Globe, Atom, BarChart2 } from "lucide-react";

const cards = [
  {
    number: "01",
    icon: <Database size={24} color="#6366f1" />,
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
    icon: <Globe size={24} color="#0ea5e9" />,
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
    icon: <Atom size={24} color="#10b981" />,
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
    icon: <BarChart2 size={24} color="#f59e0b" />,
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
    <section id="highlights" style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0", padding: "48px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 36px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            Core Contributions
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#0f172a", marginBottom: 12 }}>Key Highlights</h2>
          <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.7 }}>
            BanglarMukh is the first benchmark evaluating cultural grounding, physics-aware reasoning, and regional linguistic diversity simultaneously in Vision-Language Models.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {cards.map((c, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: 18,
                padding: "28px 24px 24px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                position: "relative",
                overflow: "hidden",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              {/* Accent stripe */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.accentColor, borderRadius: "18px 18px 0 0" }} />

              {/* Number + icon row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: c.iconBg, border: `1px solid ${c.iconBorder}`,
                  display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                  {c.icon}
                </div>
                <span style={{
                  fontSize: 36, fontWeight: 900, color: "#f1f5f9",
                  letterSpacing: "-2px", lineHeight: 1,
                  userSelect: "none"
                }}>
                  {c.number}
                </span>
              </div>

              {/* Tag pill */}
              <div style={{
                display: "inline-block", fontSize: 10, fontWeight: 700,
                textTransform: "uppercase", letterSpacing: "0.07em",
                padding: "3px 10px", borderRadius: 999,
                background: c.accentBg, border: `1px solid ${c.accentBorder}`,
                color: c.accentColor, marginBottom: 12
              }}>
                {c.tag}
              </div>

              <h3 style={{ fontSize: 15.5, fontWeight: 800, color: "#0f172a", marginBottom: 10, lineHeight: 1.4 }}>
                {c.title}
              </h3>
              <p style={{ fontSize: 13.5, color: "#64748b", lineHeight: 1.75, margin: 0 }}>
                {c.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
