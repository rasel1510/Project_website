"use client";
import React, { useState } from "react";
import { Award, ZoomIn, X, Globe, MessageSquare } from "lucide-react";

interface TableInfo {
  id: string;
  label: string;
  path: string;
  caption: string;
}

const categories = {
  languages: [
    {
      id: "bangla",
      label: "Bangla",
      path: "/Images/Bangla Language Result.png",
      caption: "Zero-shot evaluation results on standard Bangla language queries for all baseline models."
    },
    {
      id: "english",
      label: "English",
      path: "/Images/English Language Result.png",
      caption: "Zero-shot evaluation results on standard English queries to measure linguistic alignment."
    },
    {
      id: "chinese",
      label: "Chinese",
      path: "/Images/Chinese Language result.png",
      caption: "Evaluation results on standard Chinese queries evaluating multilinguality."
    },
    {
      id: "french",
      label: "French",
      path: "/Images/French Language Result.png",
      caption: "Evaluation results on standard French queries."
    },
  ] as TableInfo[],
  dialects: [
    {
      id: "chittagong",
      label: "Chittagong",
      path: "/Images/Chittagong Dialects Language results.png",
      caption: "Evaluation results on Chittagong regional dialect, showing distinct local dialect patterns."
    },
    {
      id: "noakhali",
      label: "Noakhali",
      path: "/Images/Noakhali Dialect Language result.png",
      caption: "Evaluation results on Noakhali regional dialect, showing dialectal variations and challenges."
    },
    {
      id: "rajshahi",
      label: "Rajshahi",
      path: "/Images/Rajshahi dialect language result.png",
      caption: "Evaluation results on Rajshahi dialect."
    },
    {
      id: "sylhet",
      label: "Sylhet",
      path: "/Images/Sylhet Dialect Language Result.png",
      caption: "Evaluation results on Sylhet dialect."
    },
  ] as TableInfo[],
};

export default function Leaderboard() {
  const [activeCategory, setActiveCategory] = useState<"languages" | "dialects">("languages");
  const [activeTableId, setActiveTableId] = useState("bangla");
  const [zoom, setZoom] = useState(false);

  const currentTables = categories[activeCategory];
  const activeTable = currentTables.find(t => t.id === activeTableId) || currentTables[0];

  const handleCategoryChange = (cat: "languages" | "dialects") => {
    setActiveCategory(cat);
    setActiveTableId(categories[cat][0].id);
  };

  return (
    <section id="leaderboard" style={{ background: "#f0fdf4", borderTop: "1px solid #dcfce7", padding: "44px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 20px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 15px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
            <Award size={12} /> Evaluation Results
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: "#14532d" }}>Result Section</h2>
        </div>

        {/* Category Selector */}
        <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 20 }}>
          <button
            onClick={() => handleCategoryChange("languages")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              border: activeCategory === "languages" ? "2px solid #15803d" : "2px solid #e2e8f0",
              background: activeCategory === "languages" ? "#15803d" : "#fff",
              color: activeCategory === "languages" ? "#fff" : "#475569",
              fontWeight: 700,
              fontSize: 13.5,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeCategory === "languages" ? "0 3px 10px rgba(21,128,61,0.15)" : "none"
            }}
          >
            <Globe size={15} />
            Standard Languages
          </button>
          <button
            onClick={() => handleCategoryChange("dialects")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 10,
              border: activeCategory === "dialects" ? "2px solid #15803d" : "2px solid #e2e8f0",
              background: activeCategory === "dialects" ? "#15803d" : "#fff",
              color: activeCategory === "dialects" ? "#fff" : "#475569",
              fontWeight: 700,
              fontSize: 13.5,
              cursor: "pointer",
              transition: "all 0.2s ease",
              boxShadow: activeCategory === "dialects" ? "0 3px 10px rgba(21,128,61,0.15)" : "none"
            }}
          >
            <MessageSquare size={15} />
            Regional Dialects
          </button>
        </div>

        {/* Sub-tabs / Language pills */}
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10, marginBottom: 26 }}>
          {currentTables.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTableId(t.id)}
              style={{
                padding: "7px 16px",
                borderRadius: 999,
                border: "1px solid",
                borderColor: activeTableId === t.id ? "#15803d" : "#bbf7d0",
                background: activeTableId === t.id ? "#dcfce7" : "#fff",
                color: activeTableId === t.id ? "#14532d" : "#475569",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Table Display Frame */}
        <div style={{ background: "#fff", border: "1px solid #bbf7d0", borderRadius: 14, overflow: "hidden", boxShadow: "0 3px 16px rgba(22,163,74,0.08)" }}>
          {/* Header toolbar */}
          <div style={{ background: "#dcfce7", borderBottom: "1px solid #bbf7d0", padding: "12px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#14532d" }}>
              Evaluation Table — {activeTable.label} {activeCategory === "languages" ? "Language" : "Dialect"}
            </span>
            <button
              onClick={() => setZoom(true)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "7px 14px",
                background: "#fff",
                border: "1px solid #86efac",
                borderRadius: 7,
                cursor: "pointer",
                fontSize: 12.5,
                fontWeight: 700,
                color: "#15803d",
                transition: "all 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f0fdf4"}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              <ZoomIn size={14} /> Expand Table
            </button>
          </div>

          {/* Image Container */}
          <div
            onClick={() => setZoom(true)}
            style={{
              cursor: "zoom-in",
              padding: "20px 16px",
              minHeight: 340,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#fafafa"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeTable.path}
              alt={`${activeTable.label} Results Table`}
              style={{
                maxWidth: "100%",
                maxHeight: 480,
                objectFit: "contain",
                borderRadius: 6,
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
              }}
            />
          </div>

          {/* Footer Caption */}
          <div style={{ padding: "14px 18px", borderTop: "1px solid #bbf7d0", background: "#f0fdf4" }}>
            <p style={{ fontSize: 13, color: "#16a34a", fontWeight: 600, lineHeight: 1.55, margin: 0 }}>
              {activeTable.caption}
            </p>
          </div>
        </div>


      </div>

      {/* Lightbox / Zoom Modal */}
      {zoom && (
        <div
          onClick={() => setZoom(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15,23,42,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 24
          }}
        >
          <button
            style={{
              position: "absolute",
              top: 16,
              right: 16,
              background: "#fff",
              border: "none",
              borderRadius: "50%",
              width: 36,
              height: 36,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            <X size={18} color="#0f172a" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={activeTable.path}
            alt={`${activeTable.label} Results Table Zoomed`}
            style={{
              maxWidth: "95vw",
              maxHeight: "90vh",
              objectFit: "contain",
              borderRadius: 12,
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)"
            }}
          />
        </div>
      )}
    </section>
  );
}
