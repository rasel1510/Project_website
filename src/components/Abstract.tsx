"use client";
import React, { useState } from "react";
import { BookOpen, ZoomIn, X } from "lucide-react";

const abstractText = (
  <>
    Bangla culture and tradition is distinctly utilizing local dialects, heritage, tradition, and regular visual practices, yet it is greatly absent from multimodal assessment. We introduce <strong style={{ color: "#15803d" }}>BanglarMukh</strong>, a culturally and traditionally rooted benchmark for evaluating Large Vision Language Models (LVLMs) on Bangladeshi tradition and culture over linguistic diversity. BanglarMukh encompasses <strong style={{ color: "#0f172a" }}>1,448 expert annotated images</strong> traversing <strong style={{ color: "#0f172a" }}>15 domains</strong> and reinforces both captioning and Visual Question Answering (VQA). Each category is expanded into <strong style={{ color: "#15803d" }}>six standard languages and six native dialects</strong>, generating <strong style={{ color: "#15803d" }}>66,608 evaluation artifacts</strong>. Experiments over various physics-aware LVLMs exhibit that assessment on base Bangla alone considerably inflates real-world result, accuracy and reasoning quality reduce clearly over dialect alters, with the superior reduction in free-form captioning. Languages such as Hindi, Urdu, Chinese conserve some traditional cues but remain weaker in framed reasoning. We release the dataset, prompts, and resulting scripts to ensure reproducible, culturally conscious benchmarking.
  </>
);

export default function Abstract() {
  const [zoom, setZoom] = useState(false);

  const section: React.CSSProperties = {
    background: "#fff",
    borderTop: "1px solid #dcfce7",
    padding: "44px 0",
  };
  const inner: React.CSSProperties = {
    maxWidth: 1280, margin: "0 auto", padding: "0 32px",
    display: "grid", gap: 36, alignItems: "start",
    gridTemplateColumns: "1fr",
  };

  return (
    <section id="abstract" style={section}>
      <div style={inner} className="md:grid-2col">
        <style>{`@media(min-width:768px){.md\\:grid-2col{grid-template-columns:1fr 1fr}}`}</style>

        {/* Left – Text */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 700, letterSpacing: "0.08em", color: "#15803d", marginBottom: 12 }}>
            <BookOpen size={15} /> Abstract
          </div>

          <div>
            <p style={{ fontSize: 14.5, color: "#334155", lineHeight: 1.8, textAlign: "justify" }}>
              {abstractText}
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginTop: 22 }}>
            {[
              { v: "66,608", l: "Artifacts", c: "#15803d" },
              { v: "15", l: "Domains", c: "#15803d" },
              { v: "6", l: "Languages", c: "#15803d" },
              { v: "6", l: "Dialects", c: "#15803d" },

            ].map(s => (
              <div key={s.l} style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, padding: "11px 16px", minWidth: 76, textAlign: "center" }}>
                <div style={{ fontSize: 19, fontWeight: 900, color: s.c, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Figure */}
        <div>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 14, overflow: "hidden" }}>
            <div style={{ background: "#dcfce7", borderBottom: "1px solid #bbf7d0", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#14532d" }}>Methodology Overview</span>
              <button onClick={() => setZoom(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "6px 12px", background: "#fff", border: "1px solid #86efac", borderRadius: 7, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#15803d" }}>
                <ZoomIn size={13} /> Expand
              </button>
            </div>
            <div onClick={() => setZoom(true)} style={{ cursor: "zoom-in", padding: 18, minHeight: 240, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Main Methodology.png" alt="BanglarMukh Methodology" style={{ maxWidth: "100%", maxHeight: 340, objectFit: "contain", borderRadius: 8 }}
                onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>

          </div>
        </div>
      </div>

      {/* Lightbox */}
      {zoom && (
        <div onClick={() => setZoom(false)} style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(15,23,42,0.92)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button style={{ position: "absolute", top: 16, right: 16, background: "#fff", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} color="#0f172a" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/Main Methodology.png" alt="Methodology" style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: 12, boxShadow: "0 25px 60px rgba(0,0,0,0.5)" }} />
        </div>
      )}
    </section>
  );
}
