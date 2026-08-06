"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminThreatsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for threats list and modals
  const [threatsList, setThreatsList] = useState([
    { id: "THR-501", vector: "APT-28 Spear Phishing", target: "Corporate Executives", risk: "98/100", origin: "Eastern Europe", status: "Active Block" },
    { id: "THR-502", vector: "Zero-Day Log4j Exploit", target: "Auth Gateway Nodes", risk: "95/100", origin: "Global Botnet", status: "Patched" },
    { id: "THR-503", vector: "Credential Stuffing Botnet", target: "User Login Portals", risk: "88/100", origin: "Multiple Proxies", status: "Rate-Limited" },
    { id: "THR-504", vector: "Malicious API Scraping", target: "OSINT Telemetry Endpoints", risk: "82/100", origin: "Cloud Provider ASNs", status: "Blocked" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDossierModalOpen, setIsDossierModalOpen] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState(null);

  const [threatVector, setThreatVector] = useState("");
  const [targetAsset, setTargetAsset] = useState("");
  const [riskScore, setRiskScore] = useState("90/100");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setAdminUser({
            name: parsed.name || "Admin",
            role: "Super Admin",
            initial: parsed.name ? parsed.name.charAt(0).toUpperCase() : "A"
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleAddThreatSubmit = (e) => {
    e.preventDefault();
    if (!threatVector.trim() || !targetAsset.trim()) return;

    const randomId = "THR-" + Math.floor(510 + Math.random() * 400);

    const newEntry = {
      id: randomId,
      vector: threatVector,
      target: targetAsset,
      risk: riskScore.includes('/100') ? riskScore : `${riskScore}/100`,
      origin: "Global Autonomous ASN",
      status: "Active Block"
    };

    setThreatsList([newEntry, ...threatsList]);
    setThreatVector("");
    setTargetAsset("");
    setIsAddModalOpen(false);
    setSuccessMsg("Global threat intelligence feed added successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleViewDossier = (item) => {
    setSelectedThreat(item);
    setIsDossierModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 🔍 DOSSIER MODAL */}
      {isDossierModalOpen && selectedThreat && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">{selectedThreat.id} // THREAT DOSSIER</span>
                <h3 className="text-lg font-extrabold text-white">{selectedThreat.vector}</h3>
              </div>
              <button 
                onClick={() => setIsDossierModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Target Asset:</span>
                <span className="text-white font-bold">{selectedThreat.target}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Risk Score:</span>
                <span className="text-red-400 font-bold">{selectedThreat.risk}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Geographic Origin:</span>
                <span className="text-lime-400 font-bold">{selectedThreat.origin}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Defense Status:</span>
                <span className="text-emerald-400 font-bold">{selectedThreat.status}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsDossierModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}

      {/* ➕ ADD THREAT MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">AI SENTINEL ENGINE</span>
                <h3 className="text-lg font-extrabold text-white">Add Threat Feed Vector</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddThreatSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Threat Vector / Actor</label>
                <input 
                  type="text" 
                  placeholder="e.g. Ransomware Payload v3"
                  value={threatVector}
                  onChange={(e) => setThreatVector(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Target Asset</label>
                <input 
                  type="text" 
                  placeholder="e.g. Cloud Storage Buckets"
                  value={targetAsset}
                  onChange={(e) => setTargetAsset(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Risk Score (out of 100)</label>
                <input 
                  type="text" 
                  placeholder="92/100"
                  value={riskScore}
                  onChange={(e) => setRiskScore(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Publish Threat Intelligence
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-lime-500 text-black font-extrabold px-6 py-3 rounded-2xl shadow-2xl text-xs uppercase tracking-wider animate-bounce">
          {successMsg}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#050914] border-r border-gray-800/80 flex flex-col justify-between p-5 select-none hidden lg:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
            <div>
              <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">footpryx</h1>
              <p className="text-[9px] text-gray-400 font-mono tracking-widest">CYBER INTELLIGENCE</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <Link href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>👥</span> Users
            </Link>
            <Link href="/admin/threats" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>⚡</span> Threat Intelligence
            </Link>
            <Link href="/admin/scans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔍</span> Scans & Reports
            </Link>
            <Link href="/admin/breaches" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breaches
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Admin Secured
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Threat Intelligence Feeds</h2>
            <p className="text-xs text-gray-400">Active telemetry on global threat actors, exploit vectors and botnets.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-black font-extrabold flex items-center justify-center text-sm">
              {adminUser.initial}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">{adminUser.name}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Super Admin</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Live Threat Vectors ({threatsList.length} Active)</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-3 py-1 rounded-lg border border-lime-500/30">AI Sentinel Active</span>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Add Threat Feed
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Threat ID</th>
                    <th className="pb-3">Vector / Actor</th>
                    <th className="pb-3">Target Asset</th>
                    <th className="pb-3">Risk Score</th>
                    <th className="pb-3">Origin / Geo</th>
                    <th className="pb-3">Defense Status</th>
                    <th className="pb-3 text-right">Dossier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {threatsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.vector}</td>
                      <td className="py-4 text-gray-300">{item.target}</td>
                      <td className="py-4 text-red-400 font-bold">{item.risk}</td>
                      <td className="py-4 text-gray-400">{item.origin}</td>
                      <td className="py-4 text-emerald-400 font-bold">{item.status}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleViewDossier(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          View Dossier
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}