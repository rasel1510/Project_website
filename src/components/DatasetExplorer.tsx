"use client";
import React, { useState } from "react";
import { ImageIcon, CheckCircle2, Eye, RefreshCw, BarChart2 } from "lucide-react";

const dialects = [
  {
    id: "chittagong", name: "Chittagong (Chatgaya)", physics: "Friction & Elasticity", category: "Traditional Clothing",
    file: "saree_folds_chittagong.png",
    qBn: "ঐ ছবির মধ্যে মেয়াডায় যে শাড়ি পইড়গি, এই শাড়ির ভাঁজ আর কুঁচি কোন বলের কারণে ঝুলে থাকে?",
    optsBn: ["A) ঘর্ষণ বল এবং অভিকর্ষ বল", "B) শুধুমাত্র চৌম্বক বল", "C) সেন্ট্রিফিউগাল বল", "D) রাসায়নিক বিক্রিয়া"],
    qEn: "Which forces maintain the folds and pleats of the draped saree?",
    optsEn: ["A) Frictional force and Gravitational force", "B) Magnetic force only", "C) Centrifugal force", "D) Chemical reaction"],
    ans: 0, expEn: "Friction between fabric layers stabilises pleats while gravity pulls the cloth downward, creating characteristic fold patterns.",
    expBn: "শাড়ির সুতার মধ্যকার ঘর্ষণ বল কুঁচিকে স্থির রাখে এবং অভিকর্ষ বল শাড়িকে নিচে টানে।",
  },
  {
    id: "noakhali", name: "Noakhali (Noakhailla)", physics: "Specular Reflection", category: "Culinary & Kitchenware",
    file: "brass_pitcher_noakhali.png",
    qBn: "কুপি বাতির আলোতে তামা-পিতলের কলসির গায়ে যে চোকচইক্কা দাগ দেখা যায়, হ্যার পিছনের বৈজ্ঞানিক কারণ কি?",
    optsBn: ["A) আলোর প্রতিসরণ", "B) আলোর নিয়মিত প্রতিফলন", "C) আলোক তড়িৎ ক্রিয়া", "D) আলোর ব্যতিচার"],
    qEn: "What phenomenon causes the bright highlight on the brass pitcher under lantern light?",
    optsEn: ["A) Refraction of light", "B) Specular reflection of light", "C) Photoelectric effect", "D) Interference of light"],
    ans: 1, expEn: "The smooth polished metallic surface causes specular (mirror-like) reflection, concentrating reflected rays into a bright highlight.",
    expBn: "তামার মসৃণ পালিশ করা তলে আলোর নিয়মিত প্রতিফলন ঘটে, যার ফলে তীব্র আলোক বিন্দু সৃষ্টি হয়।",
  },
  {
    id: "rajshahi", name: "Rajshahi (Varendra)", physics: "Evaporative Cooling", category: "Traditional Crafts",
    file: "clay_pottery_rajshahi.png",
    qBn: "মাটির সানকিতে গরম ভাত বাড়লে তা তাড়াতাড়ি ঠান্ডা হয় ক্যালা, মাটির পাত্রের কোন গুণের জন্য?",
    optsBn: ["A) মাটির অতি সূক্ষ্ম ছিদ্র দিয়ে বাষ্পীভবন", "B) অতি উচ্চ তাপ পরিবাহিতা", "C) বিকিরণ ক্ষমতা শূন্য", "D) রাসায়নিক শোষণ"],
    qEn: "Why does hot rice cool faster on a traditional porous clay plate?",
    optsEn: ["A) Evaporative cooling through micro-pores", "B) Very high thermal conductivity", "C) Zero radiative power", "D) Chemical heat absorption"],
    ans: 0, expEn: "Clay micro-pores allow moisture evaporation, extracting latent heat from the food surface and rapidly cooling it.",
    expBn: "মাটির ক্ষুদ্রাতিক্ষুদ্র ছিদ্রে জলীয় বাষ্পীভবনের সময় সুপ্ততাপ শোষণ হয়, ফলে খাবার দ্রুত ঠান্ডা হয়।",
  },
  {
    id: "sylheti", name: "Sylheti (Sylhety)", physics: "Archimedes Buoyancy", category: "Rural Transport",
    file: "bamboo_raft_sylheti.png",
    qBn: "বাশের ভেলা অততা ভার নিয়ে পানির ওপরে ভাইসা থাকে কিলাকা?",
    optsBn: ["A) সান্দ্রতা বল", "B) আর্কিমিডিসের প্লবতা নীতি", "C) পৃষ্ঠটান বল", "D) তরলের বাষ্পচাপ"],
    qEn: "How does a heavy bamboo raft float stably?",
    optsEn: ["A) Viscous drag", "B) Archimedes' Buoyancy Principle", "C) Surface tension", "D) Fluid vapor pressure"],
    ans: 1, expEn: "The raft displaces water equal to its weight; Archimedes' principle states the upward buoyant force balances gravity.",
    expBn: "আর্কিমিডিসের নীতি অনুযায়ী, ভেলা অপসারিত পানির ওজনের সমপরিমাণ ঊর্ধ্বমুখী প্লবতা বল পায়।",
  },
  {
    id: "standard", name: "Standard Bengali (Rarh)", physics: "Tyndall & Rayleigh Scattering", category: "Festival & Optics",
    file: "puja_smoke_standard.png",
    qBn: "পূজামণ্ডপে ধূপের ধোঁয়ার মধ্য দিয়ে সূর্যের আলোর রেখা দেখা গেলে কোন বিচ্ছুরণ প্রক্রিয়া ঘটে?",
    optsBn: ["A) টিন্ডাল প্রভাব ও রেলে বিচ্ছুরণ", "B) আলোর সমবর্তন", "C) আলোর প্রতিসরণ", "D) আলোর অপবর্তন"],
    qEn: "When sunlight beams are visible through incense smoke, which scattering processes occur?",
    optsEn: ["A) Tyndall Effect & Rayleigh Scattering", "B) Polarization", "C) Refraction", "D) Diffraction"],
    ans: 0, expEn: "Colloidal smoke particles scatter the beam (Tyndall effect), with shorter blue wavelengths scattered more strongly (Rayleigh scattering).",
    expBn: "ধোঁয়ার কণাগুলো আলোর রশ্মিকে দৃশ্যমান করে (টিন্ডাল প্রভাব) এবং নীল আলো বেশি বিচ্ছুরিত হয় (রেলে বিচ্ছুরণ)।",
  },
];

const statsRows = [
  { name: "Standard Bengali (Rarh)", type: "Native Dialect", artifacts: "5,550" },
  { name: "Chittagong (Chatgaya)", type: "Native Dialect", artifacts: "5,550" },
  { name: "Noakhali (Noakhailla)", type: "Native Dialect", artifacts: "5,550" },
  { name: "Rajshahi (Varendra)", type: "Native Dialect", artifacts: "5,550" },
  { name: "Sylheti (Sylhety)", type: "Native Dialect", artifacts: "5,550" },
  { name: "Barishal (Barisaliya)", type: "Native Dialect", artifacts: "5,550" },
  { name: "6 Intl. Languages (EN,BN,HI,UR,ZH,FR)", type: "Standard Languages", artifacts: "33,308" },
];

export default function DatasetExplorer() {
  const [active, setActive] = useState("chittagong");
  const [showAns, setShowAns] = useState(false);
  const [showEn, setShowEn] = useState(false);
  const cur = dialects.find(d => d.id === active)!;

  return (
    <section id="dataset" style={{ background: "#fff", borderTop: "1px solid #dcfce7", padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            Interactive Explorer
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532d", marginBottom: 12 }}>Explore BanglarMukh Samples</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}>Browse sample questions across dialects and see how cultural grounding and physics reasoning are evaluated together.</p>
        </div>

        {/* Explorer */}
        <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr" }} className="explorer-lg">
          <style>{`@media(min-width:1024px){.explorer-lg{grid-template-columns:260px 1fr}}`}</style>

          {/* Tabs */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#94a3b8", marginBottom: 4 }}>Select Dialect</div>
            {dialects.map(d => (
              <button key={d.id} onClick={() => { setActive(d.id); setShowAns(false); }}
                style={{ textAlign: "left", padding: "12px 16px", borderRadius: 10, cursor: "pointer", border: active === d.id ? "1.5px solid #22c55e" : "1px solid #e2e8f0", background: active === d.id ? "#f0fdf4" : "#fff", color: active === d.id ? "#14532d" : "#334155", fontWeight: active === d.id ? 700 : 500, fontSize: 13, transition: "all 0.15s" }}
              >
                <div>{d.name}</div>
                <div style={{ fontSize: 11, marginTop: 2, color: active === d.id ? "#16a34a" : "#94a3b8" }}>{d.physics}</div>
              </button>
            ))}
          </div>

          {/* Card */}
          <div style={{ background: "#fff", border: "1px solid #bbf7d0", borderRadius: 16, padding: "28px", boxShadow: "0 2px 12px rgba(22,163,74,0.06)" }}>

            {/* Top row */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #dcfce7" }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span style={{ padding: "4px 12px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700 }}>{cur.category}</span>
                <span style={{ padding: "4px 12px", borderRadius: 999, background: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a", fontSize: 11, fontWeight: 700 }}>{cur.physics}</span>
              </div>
              <button onClick={() => setShowEn(!showEn)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "#15803d" }}>
                <RefreshCw size={12} /> {showEn ? "Bengali" : "English"}
              </button>
            </div>

            {/* Content */}
            <div style={{ display: "grid", gap: 24, gridTemplateColumns: "1fr" }} className="sample-inner">
              <style>{`@media(min-width:640px){.sample-inner{grid-template-columns:1fr 1fr}}`}</style>

              {/* Image placeholder */}
              <div style={{ minHeight: 200, background: "#f0fdf4", border: "2px dashed #86efac", borderRadius: 12, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10, padding: 20, textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "#dcfce7", border: "1px solid #86efac", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ImageIcon size={22} color="#15803d" />
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#334155", fontFamily: "monospace" }}>{cur.file}</div>
                <div style={{ fontSize: 11, color: "#64748b", lineHeight: 1.5 }}>Dataset image placeholder<br /><em style={{ color: "#94a3b8" }}>(add your image here)</em></div>
              </div>

              {/* Q & A */}
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: "#94a3b8", marginBottom: 8 }}>Question</div>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#0f172a", lineHeight: 1.6, marginBottom: 16 }}>
                  {showEn ? cur.qEn : cur.qBn}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {(showEn ? cur.optsEn : cur.optsBn).map((opt, i) => (
                    <div key={i} style={{
                      padding: "10px 14px", borderRadius: 8, fontSize: 13,
                      border: showAns ? (i === cur.ans ? "1.5px solid #22c55e" : "1px solid #e2e8f0") : "1px solid #e2e8f0",
                      background: showAns ? (i === cur.ans ? "#dcfce7" : "#fafafa") : "#fafafa",
                      color: showAns ? (i === cur.ans ? "#14532d" : "#94a3b8") : "#334155",
                      fontWeight: showAns && i === cur.ans ? 700 : 500,
                    }}>{opt}</div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reveal */}
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #dcfce7" }}>
              {!showAns ? (
                <button onClick={() => setShowAns(true)} style={{ width: "100%", padding: "12px", background: "#15803d", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: "0 4px 12px rgba(22,163,74,0.25)" }}>
                  <Eye size={16} /> Reveal Answer & Explanation
                </button>
              ) : (
                <div style={{ background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 10, padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontWeight: 700, color: "#15803d", fontSize: 13, marginBottom: 8 }}>
                    <CheckCircle2 size={16} /> Correct Answer: {String.fromCharCode(65 + cur.ans)}
                  </div>
                  <p style={{ fontSize: 13, color: "#166534", lineHeight: 1.7 }}>{showEn ? cur.expEn : cur.expBn}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats table */}
        <div style={{ marginTop: 48, background: "#fff", border: "1px solid #bbf7d0", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(22,163,74,0.06)" }}>
          <div style={{ background: "#f0fdf4", borderBottom: "1px solid #bbf7d0", padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h3 style={{ fontSize: 16, fontWeight: 800, color: "#14532d", display: "flex", alignItems: "center", gap: 8 }}>
                <BarChart2 size={18} color="#15803d" /> Dataset Statistics
              </h3>
              <p style={{ fontSize: 12, color: "#16a34a", marginTop: 2 }}>66,608 total artifacts · 1,448 expert images · 15 domains</p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              {[["66,608","Artifacts"],["1,448","Images"],["15","Domains"]].map(([v,l]) => (
                <div key={l} style={{ background: "#fff", border: "1px solid #bbf7d0", borderRadius: 10, padding: "10px 16px", textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 900, color: "#15803d" }}>{v}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#f8fffe", borderBottom: "1px solid #dcfce7" }}>
                  {["Language / Dialect","Type","Images","Artifacts","Focus"].map(h => (
                    <th key={h} style={{ padding: "12px 16px", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", color: "#334155", textAlign: h === "Images" || h === "Artifacts" ? "right" : "left" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {statsRows.map((r, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #f0fdf4" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#f0fdf4")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "12px 16px", fontWeight: 700, color: "#0f172a" }}>{r.name}</td>
                    <td style={{ padding: "12px 16px" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, background: r.type === "Standard Languages" ? "#f0fdf4" : "#dcfce7", border: `1px solid ${r.type === "Standard Languages" ? "#bbf7d0" : "#86efac"}`, color: "#15803d", fontSize: 11, fontWeight: 700 }}>{r.type}</span>
                    </td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 700, color: "#334155" }}>1,448</td>
                    <td style={{ padding: "12px 16px", textAlign: "right", fontFamily: "monospace", fontWeight: 800, color: "#15803d" }}>{r.artifacts}</td>
                    <td style={{ padding: "12px 16px", color: "#64748b", fontSize: 12 }}>
                      {r.type === "Native Dialect" ? "Regional phonology, morphology & syntax" : "Global VLM comparison across languages"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
