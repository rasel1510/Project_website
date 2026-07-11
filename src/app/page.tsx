import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Abstract from "@/components/Abstract";
import Highlights from "@/components/Highlights";
import DatasetExplorer from "@/components/DatasetExplorer";
import Leaderboard from "@/components/Leaderboard";
import BibTeX from "@/components/BibTeX";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ background: "#ffffff", minHeight: "100vh" }}>
      <Navbar />
      <Hero />
      <Abstract />
      <Highlights />
      <DatasetExplorer />
      <Leaderboard />
      <BibTeX />
      <Footer />
    </main>
  );
}
