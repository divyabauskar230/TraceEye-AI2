"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDarkWebPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newAsset, setNewAsset] = useState("");
  const [assetType, setAssetType] = useState("Email");

  const [isExamineModalOpen, setIsExamineModalOpen] = useState(false);
  const [selectedExposure, setSelectedExposure] = useState(null);

  const [exposuresList, setExposuresList] = useState([
    { id: "DWX-801", asset: "user@domain.com", leakSource: "Combination Darkweb Dump #4", category: "Credentials", risk: "Critical", date: "May 26, 2025" },
    { id: "DWX-802", asset: "example.com", category: "API Keys", leakSource: "Private Telegram Channel Leak", risk: "High", date: "May 22, 2025" },
    { id: "DWX-803", asset: "user123", category: "Username Hash", leakSource: "Ransomware Forum Leak Market", risk: "Medium", date: "May 15, 2025" },
    { id: "DWX-804", asset: "user@domain.com", category: "Personal PII", leakSource: "Pastebin Dark Mirror", risk: "High", date: "May 10, 2025" },
  ]);

  const handleAddAssetSubmit = (e) => {
    e.preventDefault();
    if (!newAsset.trim()) return;

    const newEntry = {
      id: "DWX-" + Math.floor(810 + Math.random() * 100),
      asset: newAsset,
      category: assetType === "Email" ? "Credentials" : "Domain Config",
      leakSource: "Live Darknet Crawler Index",
      risk: "High",
      date: "Just now"
    };

    setExposuresList([newEntry, ...exposuresList]);
    setNewAsset("");
    setIsAddModalOpen(false);
    setSuccessMsg("Asset successfully registered for 24/7 dark web tracking!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleExamine = (item) => {
    setSelectedExposure(item);
    setIsExamineModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* ADD ASSET MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">DARKNET RADAR</span>
                <h3 className="text-lg font-extrabold text-white">Add Asset to 24/7 Monitor</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAssetSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Asset Value (Email, Domain, Username)</label>
                <input 
                  type="text" 
                  placeholder="e.g. secure@mycompany.com"
                  value={newAsset}
                  onChange={(e) => setNewAsset(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Category</label>
                <select 
                  value={assetType}
                  onChange={(e) => setAssetType(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                >
                  <option value="Email">Email / Credentials</option>
                  <option value="Domain">Domain / API</option>
                  <option value="Username">Username</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Deploy Darkweb Tracker
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🟢 EXAMINE MODAL (LIME GREEN THEME MATCHED) */}
      {isExamineModalOpen && selectedExposure && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">{selectedExposure.id} // THREAT FORENSICS</span>
                <h3 className="text-lg font-extrabold text-white">{selectedExposure.asset}</h3>
              </div>
              <button 
                onClick={() => setIsExamineModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Leak Source:</span>
                <span className="text-white font-bold">{selectedExposure.leakSource}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Exposure Type:</span>
                <span className="text-lime-400 font-bold">{selectedExposure.category}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Risk Severity:</span>
                <span className="text-lime-400 font-bold">{selectedExposure.risk}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Detection Timestamp:</span>
                <span className="text-gray-400">{selectedExposure.date}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsExamineModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              CLOSE THREAT ANALYSIS
            </button>
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
            <Link href="/user-panel" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/user-panel/scan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breach Scan
            </Link>
            <Link href="/user-panel/reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Breach Reports
            </Link>
            <Link href="/user-panel/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🌐</span> Dark Web Monitor
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Darknet Radar Online
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Dark Web Live Exposure Monitor</h2>
            <p className="text-xs text-gray-400">Continuous background tracking of your registered digital footprints.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Active Darkweb Exposures ({exposuresList.length} Found)</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Scanned across underground onion forums, paste sites & leak channels.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-lime-500/20"
              >
                <span>+</span> Add Asset to Monitor
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Threat ID</th>
                    <th className="pb-3">Exposed Asset</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Leak Source</th>
                    <th className="pb-3">Risk Severity</th>
                    <th className="pb-3">Detected Date</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {exposuresList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.asset}</td>
                      <td className="py-4 text-gray-300">{item.category}</td>
                      <td className="py-4 text-gray-400">{item.leakSource}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'Critical' ? 'bg-lime-950 text-lime-400 border border-lime-500/40' : item.risk === 'High' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-blue-950 text-blue-400 border border-blue-500/30'}`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{item.date}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleExamine(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Examine →
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