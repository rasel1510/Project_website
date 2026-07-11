"use client";
import React, { useState, useMemo } from "react";
import { Award, Search, ArrowUpDown, Info } from "lucide-react";

const models = [
  { name: "Human Baseline", org: "Native Speakers", size: "—", overall: 94.8, cultural: 96.2, physics: 93.4, dialect: 94.8, human: true },
  { name: "GPT-4o (2024-05)", org: "OpenAI", size: "Proprietary", overall: 76.5, cultural: 79.2, physics: 73.8, dialect: 62.4 },
  { name: "Claude 3.5 Sonnet", org: "Anthropic", size: "Proprietary", overall: 75.2, cultural: 78.4, physics: 72.0, dialect: 58.5 },
  { name: "Gemini 1.5 Pro", org: "Google", size: "Proprietary", overall: 74.8, cultural: 77.0, physics: 72.6, dialect: 60.1 },
  { name: "Qwen2-VL-72B", org: "Alibaba", size: "72B", overall: 71.0, cultural: 73.5, physics: 68.5, dialect: 52.8 },
  { name: "LLaVA-NeXT-72B", org: "LLaVA-Team", size: "72B", overall: 66.4, cultural: 69.0, physics: 63.8, dialect: 44.2 },
  { name: "Qwen2-VL-7B", org: "Alibaba", size: "7B", overall: 59.8, cultural: 62.1, physics: 57.5, dialect: 38.6 },
  { name: "LLaVA-NeXT-13B", org: "LLaVA-Team", size: "13B", overall: 54.1, cultural: 56.4, physics: 51.8, dialect: 32.1 },
  { name: "InstructBLIP-13B", org: "Salesforce", size: "13B", overall: 38.5, cultural: 40.2, physics: 36.8, dialect: 18.4 },
  { name: "BLIP-2 (Flan-T5-XXL)", org: "Salesforce", size: "12.1B", overall: 32.1, cultural: 33.5, physics: 30.7, dialect: 12.5 },
];

type SortKey = "overall" | "cultural" | "physics" | "dialect" | "name" | "org";

export default function Leaderboard() {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("overall");
  const [asc, setAsc] = useState(false);

  const sorted = useMemo(() => {
    const filtered = models.filter(m =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.org.toLowerCase().includes(query.toLowerCase())
    );
    return filtered.sort((a, b) => {
      if (a.human) return -1;
      if (b.human) return 1;
      const av = a[sortKey] as string | number;
      const bv = b[sortKey] as string | number;
      if (typeof av === "number" && typeof bv === "number") return asc ? av - bv : bv - av;
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    }).map((m, i, arr) => ({ ...m, rank: m.human ? undefined : arr.filter(x => !x.human).indexOf(m) + 1 }));
  }, [query, sortKey, asc]);

  const toggleSort = (k: SortKey) => { if (sortKey === k) setAsc(!asc); else { setSortKey(k); setAsc(false); } };

  const TH = ({ label, k, right = false }: { label: string; k: SortKey; right?: boolean }) => (
    <th onClick={() => toggleSort(k)} style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: sortKey === k ? "#15803d" : "#334155", cursor: "pointer", textAlign: right ? "right" : "left", background: "#f0fdf4", borderBottom: "2px solid #bbf7d0", whiteSpace: "nowrap" }}>
      <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
        {label} <ArrowUpDown size={11} />
      </span>
    </th>
  );

  const rankBadge = (rank?: number, human?: boolean) => {
    if (human) return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#dcfce7", border: "1.5px solid #22c55e", color: "#15803d", fontSize: 11, fontWeight: 800 }}>H</span>;
    if (rank === 1) return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#fef9c3", border: "1.5px solid #fbbf24", color: "#92400e", fontSize: 11, fontWeight: 800 }}>1</span>;
    if (rank === 2) return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#f1f5f9", border: "1.5px solid #94a3b8", color: "#475569", fontSize: 11, fontWeight: 800 }}>2</span>;
    if (rank === 3) return <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 28, height: 28, borderRadius: "50%", background: "#fff7ed", border: "1.5px solid #f97316", color: "#7c2d12", fontSize: 11, fontWeight: 800 }}>3</span>;
    return <span style={{ fontSize: 12, fontWeight: 600, color: "#94a3b8" }}>{rank}</span>;
  };

  return (
    <section id="leaderboard" style={{ background: "#f0fdf4", borderTop: "1px solid #dcfce7", padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            <Award size={12} /> Evaluation Results
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532d", marginBottom: 12 }}>Model Leaderboard</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}>Benchmarking closed and open-source VLMs on BanglarMukh. Ranked by Overall Accuracy (%).</p>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div style={{ position: "relative", maxWidth: 280, width: "100%" }}>
            <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#94a3b8" }} />
            <input type="text" placeholder="Search models..." value={query} onChange={e => setQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: 36, paddingRight: 14, paddingTop: 10, paddingBottom: 10, border: "1.5px solid #bbf7d0", borderRadius: 10, fontSize: 13, color: "#0f172a", outline: "none", fontFamily: "inherit", background: "#fff" }} />
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: "#64748b", fontWeight: 600 }}>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 12, background: "#dcfce7", border: "1.5px solid #22c55e", borderRadius: "50%", display: "inline-block" }} /> Human Baseline
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 12, background: "#fef9c3", border: "1.5px solid #fbbf24", borderRadius: "50%", display: "inline-block" }} /> Top Rank
            </span>
          </div>
        </div>

        {/* Table */}
        <div style={{ background: "#fff", border: "1px solid #bbf7d0", borderRadius: 16, overflow: "hidden", boxShadow: "0 4px 20px rgba(22,163,74,0.08)" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>
                  <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#334155", textAlign: "center", background: "#f0fdf4", borderBottom: "2px solid #bbf7d0", width: 64 }}>Rank</th>
                  <TH label="Model" k="name" />
                  <TH label="Creator" k="org" />
                  <th style={{ padding: "12px 16px", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#334155", textAlign: "center", background: "#f0fdf4", borderBottom: "2px solid #bbf7d0" }}>Size</th>
                  <TH label="Overall %" k="overall" right />
                  <TH label="Cultural %" k="cultural" right />
                  <TH label="Physics %" k="physics" right />
                  <TH label="Dialects %" k="dialect" right />
                </tr>
              </thead>
              <tbody>
                {sorted.map((m, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0fdf4", background: m.human ? "#f0fdf4" : "#fff" }}
                    onMouseEnter={e => !m.human && (e.currentTarget.style.background = "#fafff8")}
                    onMouseLeave={e => !m.human && (e.currentTarget.style.background = "#fff")}
                  >
                    <td style={{ padding: "14px 16px", textAlign: "center" }}>{rankBadge(m.rank, m.human)}</td>
                    <td style={{ padding: "14px 16px", fontWeight: 700, color: m.human ? "#14532d" : "#0f172a" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        {m.name}
                        {m.human && <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", textTransform: "uppercase", letterSpacing: "0.05em" }}>Baseline</span>}
                      </span>
                    </td>
                    <td style={{ padding: "14px 16px", color: "#475569", fontWeight: 500 }}>{m.org}</td>
                    <td style={{ padding: "14px 16px", textAlign: "center", fontFamily: "monospace", fontWeight: 700, color: "#64748b" }}>{m.size}</td>
                    <td style={{ padding: "14px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 800, color: m.human ? "#15803d" : "#0f172a", fontSize: 14 }}>{m.overall.toFixed(1)}%</td>
                    <td style={{ padding: "14px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#334155" }}>{m.cultural.toFixed(1)}%</td>
                    <td style={{ padding: "14px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#334155" }}>{m.physics.toFixed(1)}%</td>
                    <td style={{ padding: "14px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#334155" }}>{m.dialect.toFixed(1)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Finding note */}
        <div style={{ marginTop: 24, background: "#fff", border: "1px solid #bbf7d0", borderRadius: 12, padding: "18px 20px", display: "flex", gap: 14, alignItems: "flex-start", boxShadow: "0 2px 8px rgba(22,163,74,0.05)" }}>
          <div style={{ width: 36, height: 36, minWidth: 36, borderRadius: 8, background: "#dcfce7", border: "1px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Info size={16} color="#15803d" />
          </div>
          <div>
            <div style={{ fontWeight: 700, color: "#14532d", fontSize: 14, marginBottom: 4 }}>Key Research Finding</div>
            <p style={{ fontSize: 13, color: "#334155", lineHeight: 1.7 }}>
              Proprietary models like GPT-4o degrade significantly in dialect accuracy (↓62.4%) on Noakhailla and Chatgaya queries. Performance on physics-correctness audits also drops sharply, revealing that current VLMs struggle to simultaneously ground vision, dialect grammar, and physical constraints.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
