"use client";
import React from "react";
import { Atom, Languages, HeartHandshake, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: <Atom size={26} color="#15803d" />,
    iconBg: "#dcfce7", iconBorder: "#86efac",
    tag: "Physics-Aware",
    title: "Physics-Aware Grounding",
    desc: "Evaluates if VLMs understand physical principles in cultural contexts — ray optics on polished brass, elasticity of handloom sarees, fluid dynamics of rural rivers, and thermal properties of clay pottery.",
  },
  {
    icon: <Languages size={26} color="#15803d" />,
    iconBg: "#f0fdf4", iconBorder: "#bbf7d0",
    tag: "12 Varieties",
    title: "Linguistic & Dialect Diversity",
    desc: "Covers 6 standard languages (Bengali, Hindi, Urdu, Chinese, English, French) and 6 native dialects: Chatgaya, Noakhailla, Varendra, Sylhety, Barisaliya, and Standard Rarh.",
  },
  {
    icon: <HeartHandshake size={26} color="#15803d" />,
    iconBg: "#dcfce7", iconBorder: "#86efac",
    tag: "15 Domains",
    title: "Deep Cultural Heritage",
    desc: "1,448 expert images across 15 domains — traditional crafts (Nakshi Kantha, pottery), attire (Saree, Lungi), festivals, Bengal architecture, culinary practices, and rural heritage artefacts.",
  },
  {
    icon: <ShieldCheck size={26} color="#15803d" />,
    iconBg: "#f0fdf4", iconBorder: "#bbf7d0",
    tag: ">96% Consensus",
    title: "Expert Quality Assurance",
    desc: "Multi-stage validation with double-blind native speaker reviews, expert physics annotations, and grammar verification. Fully reproducible with open-source scripts and prompts.",
  },
];

export default function Highlights() {
  return (
    <section id="highlights" style={{ background: "#f0fdf4", borderTop: "1px solid #dcfce7", padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            Core Contributions
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532d", marginBottom: 12 }}>Key Contributions</h2>
          <p style={{ fontSize: 16, color: "#334155", lineHeight: 1.7 }}>
            BanglarMukh is the first benchmark evaluating cultural grounding, physics-aware reasoning, and regional linguistic diversity simultaneously in Vision-Language Models.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20 }}>
          {cards.map((c, i) => (
            <div key={i} style={{ background: "#fff", border: "1px solid #bbf7d0", borderRadius: 16, padding: "28px 24px", boxShadow: "0 2px 12px rgba(22,163,74,0.06)", transition: "box-shadow 0.2s,transform 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(22,163,74,0.12)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(22,163,74,0.06)"; (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; }}
            >
              <div style={{ width: 52, height: 52, borderRadius: 12, background: c.iconBg, border: `1px solid ${c.iconBorder}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                {c.icon}
              </div>
              <div style={{ display: "inline-block", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", padding: "3px 10px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", marginBottom: 12 }}>
                {c.tag}
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#14532d", marginBottom: 10 }}>{c.title}</h3>
              <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.75 }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
