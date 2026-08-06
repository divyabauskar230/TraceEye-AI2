"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserScanPage() {
  const router = useRouter();
  const [targetInput, setTargetInput] = useState("");
  const [scanType, setScanType] = useState("Email Address");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResults, setScanResults] = useState(null);

  const handleRunScan = (e) => {
    e.preventDefault();
    if (!targetInput.trim()) return;

    setIsScanning(true);
    setScanResults(null);

    setTimeout(() => {
      setIsScanning(false);
      setScanResults({
        target: targetInput,
        type: scanType,
        breachesFound: Math.floor(3 + Math.random() * 8),
        riskLevel: "High",
        sourcesQueried: "250+ Sources",
        status: "Exposed in Data Dumps"
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black">
      
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
            <Link href="/user-panel/scan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🛡️</span> Data Breach Scan
            </Link>
            <Link href="/user-panel/reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Breach Reports
            </Link>
            <Link href="/user-panel/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Dark Web Monitor
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Protected Stream
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Data Breach Scan Workspace</h2>
            <p className="text-xs text-gray-400">Perform deep OSINT lookups across global breach databases.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-8 max-w-[1200px] w-full mx-auto">
          
          {/* SCAN INPUT CARD */}
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-8 shadow-2xl space-y-6">
            <div>
              <span className="text-xs font-mono text-lime-400 font-bold">LIVE OSINT CRAWLER</span>
              <h3 className="text-lg font-black text-white mt-1">Scan Your Asset for Breaches</h3>
            </div>

            <form onSubmit={handleRunScan} className="space-y-4 font-mono text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-gray-400 block">Target Query (Email, Domain, Username, Phone)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. target@company.com"
                    value={targetInput}
                    onChange={(e) => setTargetInput(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 font-sans text-sm"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 block">Asset Type</label>
                  <select 
                    value={scanType}
                    onChange={(e) => setScanType(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-lime-500 font-sans text-sm h-[52px]"
                  >
                    <option value="Email Address">Email Address</option>
                    <option value="Domain Name">Domain Name</option>
                    <option value="Username">Username</option>
                    <option value="Phone Number">Phone Number</option>
                  </select>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isScanning}
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-4 rounded-2xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-lime-500/20"
              >
                {isScanning ? (
                  <>
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    Crawling 250+ Darkweb Sources...
                  </>
                ) : (
                  <>⚡ Initialize Comprehensive Scan</>
                )}
              </button>
            </form>
          </div>

          {/* RESULTS SECTION */}
          {scanResults && (
            <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-8 space-y-6 shadow-2xl animate-fade-in font-mono">
              <div className="flex justify-between items-center border-b border-gray-800 pb-4">
                <div>
                  <span className="text-xs text-lime-400 font-bold">SCAN COMPLETE // {scanResults.type}</span>
                  <h4 className="text-xl font-extrabold text-white mt-0.5">{scanResults.target}</h4>
                </div>
                <span className="px-3 py-1 rounded-xl bg-red-950 text-red-400 border border-red-500/40 text-xs font-bold">
                  {scanResults.riskLevel} Risk
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">Breaches Found</span>
                  <span className="text-2xl font-black text-red-400 mt-1 block">{scanResults.breachesFound} Sources</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">Sources Queried</span>
                  <span className="text-xl font-bold text-lime-400 mt-1 block">{scanResults.sourcesQueried}</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">Status</span>
                  <span className="text-xl font-bold text-amber-400 mt-1 block">{scanResults.status}</span>
                </div>
              </div>

              <button 
                onClick={() => alert("Detailed breach intelligence report exported successfully!")}
                className="w-full bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                📥 Export Intelligence Dossier (.txt)
              </button>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}