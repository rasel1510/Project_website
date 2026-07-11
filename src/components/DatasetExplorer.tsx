"use client";
import React, { useState } from "react";
import { Search, X, ChevronLeft, ChevronRight, Download, Maximize2, BarChart2, Filter, ImageIcon } from "lucide-react";

// List of all 16 sample images with their categories and descriptions
const sampleImages = [
  { file: "achievements_102.png", category: "Achievements", group: "Culture & Heritage", desc: "Showcasing milestones, honors, and notable achievements in Bangladeshi history and development." },
  { file: "attire_002.jpg", category: "Attire", group: "Culture & Heritage", desc: "Traditional Bangladeshi attire detailing fine fabric textures and regional clothing styles." },
  { file: "crafts_115.png", category: "Crafts", group: "Culture & Heritage", desc: "Intricate local craftsmanship, showing hand-made artifacts from rural parts of Bangladesh." },
  { file: "education_096.png", category: "Education", group: "Culture & Heritage", desc: "Visual cues capturing classroom settings, educational materials, and school life in Bangladesh." },
  { file: "festival_039.png", category: "Festival", group: "Culture & Heritage", desc: "Vibrant moments from traditional festivals, showing cultural celebrations and community gatherings." },
  { file: "fishes_031.jpg", category: "Fishes", group: "Nature & Wildlife", desc: "A specimen of local fish species, representative of the rich riverine ecosystem of Bangladesh." },
  { file: "food_105.png", category: "Food", group: "Food & Sweets", desc: "Traditional Bengali meal preparation, capturing authentic culinary heritage and presentation." },
  { file: "movements_050.png", category: "Movements", group: "Culture & Heritage", desc: "Cultural dances, actions, and physical movements characteristic of local heritage." },
  { file: "nature_072.png", category: "Nature", group: "Nature & Wildlife", desc: "The lush green landscapes, rural scenery, and agricultural fields of Bangladesh." },
  { file: "personality_021.png", category: "Personality", group: "Culture & Heritage", desc: "Portraits and figures representing notable figures or traditional Bangladeshi characters." },
  { file: "places_022.png", category: "Places", group: "Culture & Heritage", desc: "Historical landmarks, architectural sites, and prominent places of interest across the country." },
  { file: "river_001.png", category: "River", group: "Nature & Wildlife", desc: "The scenic river networks, boat transports, and delta landscape that define Bangladesh." },
  { file: "river_028.png", category: "River", group: "Nature & Wildlife", desc: "Visual details of the riverine lifestyle, fishing activities, and water bodies of the delta." },
  { file: "sports_019.png", category: "Sports", group: "Culture & Heritage", desc: "Traditional sports and games played in the rural and urban parts of Bangladesh." },
  { file: "sweet_011.png", category: "Sweet", group: "Food & Sweets", desc: "Famous Bangladeshi sweets (Mishti), representing the traditional dessert craftsmanship." },
  { file: "wildlife_087.jpg", category: "Wildlife", group: "Nature & Wildlife", desc: "Local fauna and wildlife species native to the Sundarbans and tropical forests of Bangladesh." }
];

const filterGroups = ["All", "Culture & Heritage", "Nature & Wildlife", "Food & Sweets"];

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filtered list based on Search and Tabs
  const filteredImages = sampleImages.filter((img) => {
    const matchesSearch = img.file.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          img.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === "All" || img.group === activeTab;
    return matchesSearch && matchesTab;
  });

  const openLightbox = (index: number) => {
    // Find the original index of the filtered image in the full list
    const originalIndex = sampleImages.findIndex(img => img.file === filteredImages[index].file);
    if (originalIndex !== -1) {
      setLightboxIndex(originalIndex);
    }
  };

  const navigateLightbox = (direction: "prev" | "next") => {
    if (lightboxIndex === null) return;
    let newIndex = lightboxIndex;
    if (direction === "prev") {
      newIndex = lightboxIndex === 0 ? sampleImages.length - 1 : lightboxIndex - 1;
    } else {
      newIndex = lightboxIndex === sampleImages.length - 1 ? 0 : lightboxIndex + 1;
    }
    setLightboxIndex(newIndex);
  };

  // Helper to determine category tag background/text colors
  const getCategoryStyles = (group: string) => {
    switch (group) {
      case "Nature & Wildlife":
        return { bg: "#f0fdf4", border: "#bbf7d0", color: "#16a34a" };
      case "Food & Sweets":
        return { bg: "#fffbeb", border: "#fef3c7", color: "#d97706" };
      case "Culture & Heritage":
      default:
        return { bg: "#eff6ff", border: "#dbeafe", color: "#2563eb" };
    }
  };

  return (
    <section id="dataset" style={{ background: "#f8fafc", borderTop: "1px solid #dcfce7", padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 48px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "5px 16px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 16 }}>
            Dataset Samples
          </div>
          <h2 style={{ fontSize: 32, fontWeight: 800, color: "#14532d", marginBottom: 12 }}>Explore BanglarMukh Images</h2>
          <p style={{ fontSize: 15, color: "#475569", lineHeight: 1.7 }}>
            Browse sample visual cues traversing 15 culturally grounded domains. These expert-annotated images form the core visual benchmark for testing physics awareness and cultural reasoning in LVLMs.
          </p>
        </div>

        {/* Search and Filters panel */}
        <div style={{ background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16, padding: "20px", marginBottom: 32, boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
            
            {/* Filter Tabs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {filterGroups.map((group) => {
                const isActive = activeTab === group;
                return (
                  <button
                    key={group}
                    onClick={() => setActiveTab(group)}
                    style={{
                      padding: "8px 16px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      border: isActive ? "1px solid #22c55e" : "1px solid #e2e8f0",
                      background: isActive ? "#f0fdf4" : "#fff",
                      color: isActive ? "#15803d" : "#475569",
                    }}
                  >
                    {group}
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div style={{ position: "relative", minWidth: "260px", flex: "1", maxWidth: "400px" }}>
              <div style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                <Search size={16} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by filename or category..."
                style={{
                  width: "100%",
                  padding: "10px 12px 10px 38px",
                  borderRadius: "10px",
                  border: "1px solid #cbd5e1",
                  fontSize: "13px",
                  outline: "none",
                  transition: "border-color 0.2s ease, box-shadow 0.2s ease",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#22c55e";
                  e.target.style.boxShadow = "0 0 0 3px rgba(34, 197, 94, 0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#cbd5e1";
                  e.target.style.boxShadow = "none";
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: "#94a3b8", cursor: "pointer", display: "flex", alignItems: "center" }}
                >
                  <X size={14} />
                </button>
              )}
            </div>

          </div>
        </div>

        {/* Grid Display */}
        {filteredImages.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 20px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: "#f1f5f9", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 12, color: "#64748b" }}>
              <ImageIcon size={22} />
            </div>
            <h3 style={{ fontSize: "16px", fontWeight: 700, color: "#1e293b", marginBottom: 4 }}>No images found</h3>
            <p style={{ fontSize: "13px", color: "#64748b" }}>Try adjusting your search query or switching category filters.</p>
          </div>
        ) : (
          <div style={{ display: "grid", gap: "20px", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
            {filteredImages.map((img, index) => {
              const isHovered = hoveredIndex === index;
              const catStyle = getCategoryStyles(img.group);
              
              return (
                <div
                  key={img.file}
                  onClick={() => openLightbox(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    background: "#fff",
                    border: isHovered ? "1px solid #86efac" : "1px solid #e2e8f0",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    boxShadow: isHovered ? "0 12px 24px -8px rgba(22,163,74,0.18)" : "0 4px 6px -1px rgba(0,0,0,0.03)",
                    transform: isHovered ? "translateY(-4px)" : "translateY(0)",
                    transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Image container */}
                  <div style={{ height: "180px", overflow: "hidden", position: "relative", background: "#f8fafc" }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={`/Dataset_images/${img.file}`}
                      alt={img.file}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: isHovered ? "scale(1.05)" : "scale(1)",
                        transition: "transform 0.35s ease",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    {/* Dark gradient overlay on hover */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(20, 83, 45, 0.4)",
                        opacity: isHovered ? 1 : 0,
                        transition: "opacity 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div style={{ background: "#fff", color: "#15803d", width: "40px", height: "40px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.15)", transform: isHovered ? "scale(1)" : "scale(0.8)", transition: "transform 0.25s ease" }}>
                        <Maximize2 size={18} />
                      </div>
                    </div>
                  </div>

                  {/* Details section */}
                  <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ padding: "3px 10px", borderRadius: 999, background: catStyle.bg, border: `1px solid ${catStyle.border}`, color: catStyle.color, fontSize: 10, fontWeight: 700 }}>
                        {img.category}
                      </span>
                      <span style={{ fontSize: 10, color: "#94a3b8", fontWeight: 500 }}>
                        {img.file.endsWith(".png") ? "PNG" : "JPG"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12.5px",
                        fontWeight: 700,
                        color: isHovered ? "#15803d" : "#334155",
                        wordBreak: "break-all",
                        lineHeight: 1.4,
                      }}
                    >
                      {img.file}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Stats table */}
        <div style={{ marginTop: 56, background: "#fff", border: "1px solid #bbf7d0", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(22,163,74,0.03)" }}>
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

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            animation: "fadeIn 0.2s ease-out",
          }}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes modalScale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            .lightbox-card { animation: modalScale 0.25s cubic-bezier(0.34, 1.56, 0.64, 1); }
          `}</style>
          
          {/* Lightbox container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="lightbox-card"
            style={{
              background: "#fff",
              borderRadius: "24px",
              border: "1px solid #bbf7d0",
              maxWidth: "960px",
              width: "100%",
              maxHeight: "90vh",
              overflow: "hidden",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
              display: "grid",
              gridTemplateColumns: "1fr",
              position: "relative",
            }}
          >
            {/* Responsive grid for large screens */}
            <div className="lightbox-grid" style={{ display: "grid", gridTemplateColumns: "1fr" }}>
              <style>{`
                @media(min-width:768px){
                  .lightbox-grid { grid-template-columns: 1.2fr 0.8fr !important; }
                }
              `}</style>

              {/* Left pane: Image viewer */}
              <div style={{ background: "#0f172a", position: "relative", height: "450px", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/Dataset_images/${sampleImages[lightboxIndex].file}`}
                  alt={sampleImages[lightboxIndex].file}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain",
                    padding: "16px",
                  }}
                />

                {/* Left/Right Floating navigation buttons inside image pane */}
                <button
                  onClick={() => navigateLightbox("prev")}
                  style={{
                    position: "absolute",
                    left: "16px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.borderColor = "#22c55e"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={() => navigateLightbox("next")}
                  style={{
                    position: "absolute",
                    right: "16px",
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(4px)",
                    border: "1.5px solid rgba(255,255,255,0.2)",
                    color: "#fff",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#22c55e"; e.currentTarget.style.borderColor = "#22c55e"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; }}
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Right pane: Metadata & controls */}
              <div style={{ padding: "32px", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#fff" }}>
                <div>
                  {/* Close and category */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <span style={{ padding: "4px 12px", borderRadius: 999, background: "#dcfce7", border: "1px solid #86efac", color: "#15803d", fontSize: 11, fontWeight: 700, textTransform: "uppercase" }}>
                      {sampleImages[lightboxIndex].category}
                    </span>
                    <button
                      onClick={() => setLightboxIndex(null)}
                      style={{
                        background: "#f1f5f9",
                        border: "none",
                        width: "36px",
                        height: "36px",
                        borderRadius: "50%",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#475569",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "#f1f5f9"; e.currentTarget.style.color = "#475569"; }}
                    >
                      <X size={18} />
                    </button>
                  </div>

                  {/* Title / Filename */}
                  <h3 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", marginBottom: "8px", fontFamily: "monospace", wordBreak: "break-all" }}>
                    {sampleImages[lightboxIndex].file}
                  </h3>
                  <div style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 500, marginBottom: "20px" }}>
                    Path: <span style={{ fontFamily: "monospace" }}>/Dataset_images/{sampleImages[lightboxIndex].file}</span>
                  </div>

                  {/* Description */}
                  <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "16px", marginBottom: "24px" }}>
                    <h4 style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "8px" }}>
                      Visual Cue Description
                    </h4>
                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.6 }}>
                      {sampleImages[lightboxIndex].desc}
                    </p>
                  </div>
                </div>

                {/* Bottom actions: download */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <a
                    href={`/Dataset_images/${sampleImages[lightboxIndex].file}`}
                    download={sampleImages[lightboxIndex].file}
                    style={{
                      flex: 1,
                      padding: "12px",
                      background: "#15803d",
                      color: "#fff",
                      borderRadius: "10px",
                      fontWeight: 700,
                      fontSize: "14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      textDecoration: "none",
                      boxShadow: "0 4px 12px rgba(22,163,74,0.2)",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "#166534"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "#15803d"; }}
                  >
                    <Download size={16} /> Download Image
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}

