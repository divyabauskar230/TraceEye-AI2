"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDarkwebPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for darkweb feeds and modals
  const [darkwebFeeds, setDarkwebFeeds] = useState([
    { id: "DW-801", source: "Tor Hidden Forum", leak: "Enterprise Credentials Market", risk: "Critical", items: "12,400 rows", status: "Crawling Active" },
    { id: "DW-802", source: "I2P Paste Site", leak: "Executive Passwords Dump", risk: "High", items: "850 rows", status: "Indexed" },
    { id: "DW-803", source: "Telegram Leak Channel", leak: "Database Access Tokens", risk: "Critical", items: "3,100 rows", status: "Alert Sent" },
    { id: "DW-804", source: "Ransomware Extortion Blog", leak: "Source Code Repository Snippets", risk: "High", items: "45 files", status: "Monitoring" },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isInspectModalOpen, setIsInspectModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [sourceName, setSourceName] = useState("");
  const [leakDesc, setLeakDesc] = useState("");
  const [riskLevel, setRiskLevel] = useState("Critical");
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

  const handleAddFeedSubmit = (e) => {
    e.preventDefault();
    if (!sourceName.trim() || !leakDesc.trim()) return;

    const randomId = "DW-" + Math.floor(810 + Math.random() * 150);

    const newEntry = {
      id: randomId,
      source: sourceName,
      leak: leakDesc,
      risk: riskLevel,
      items: "500 rows",
      status: "Crawling Active"
    };

    setDarkwebFeeds([newEntry, ...darkwebFeeds]);
    setSourceName("");
    setLeakDesc("");
    setIsAddModalOpen(false);
    setSuccessMsg("Darkweb surveillance stream added successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleInspect = (item) => {
    setSelectedItem(item);
    setIsInspectModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 🔍 INSPECT MODAL */}
      {isInspectModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-red-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold">{selectedItem.id} // DARKNET INTEL</span>
                <h3 className="text-lg font-extrabold text-white">{selectedItem.leak}</h3>
              </div>
              <button 
                onClick={() => setIsInspectModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Darkweb Source:</span>
                <span className="text-white font-bold">{selectedItem.source}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Risk Level:</span>
                <span className="text-red-400 font-bold">{selectedItem.risk}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Volume / Size:</span>
                <span className="text-lime-400 font-bold">{selectedItem.items}</span>
              </div>
            </div>

            <button 
              onClick={() => setIsInspectModalOpen(false)}
              className="w-full bg-red-500 hover:bg-red-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Intel
            </button>
          </div>
        </div>
      )}

      {/* ➕ ADD FEED MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-red-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold">TOR SURVEILLANCE</span>
                <h3 className="text-lg font-extrabold text-white">Add Darkweb Feed</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFeedSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Darknet Source</label>
                <input 
                  type="text" 
                  placeholder="e.g. Tor Hidden Market"
                  value={sourceName}
                  onChange={(e) => setSourceName(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Leak Description</label>
                <input 
                  type="text" 
                  placeholder="e.g. Corporate Database Dump"
                  value={leakDesc}
                  onChange={(e) => setLeakDesc(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Risk Severity</label>
                <select 
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-red-500 font-sans"
                >
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-red-500 hover:bg-red-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Initialize Tor Crawler
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
            <Link href="/admin/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🌐</span> Dark Web Monitoring
            </Link>
            <Link href="/admin/domains" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Domain Monitoring
            </Link>
            <Link href="/admin/emails" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>✉️</span> Email Monitoring
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
            <h2 className="text-xl font-black text-white tracking-tight">Dark Web Monitoring</h2>
            <p className="text-xs text-gray-400">Live surveillance on Tor networks, hidden services and paste sites.</p>
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
              <h3 className="text-sm font-bold text-white">Active Darkweb Surveillance Streams ({darkwebFeeds.length})</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-red-400 bg-red-950/60 px-3 py-1 rounded-lg border border-red-500/30">Tor Node Live</span>
                <button 
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-red-500 hover:bg-red-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Add Darkweb Feed
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Feed ID</th>
                    <th className="pb-3">Darknet Source</th>
                    <th className="pb-3">Leak Description</th>
                    <th className="pb-3">Risk Severity</th>
                    <th className="pb-3">Volume</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {darkwebFeeds.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-red-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.source}</td>
                      <td className="py-4 text-gray-300">{item.leak}</td>
                      <td className="py-4 text-red-400 font-bold">{item.risk}</td>
                      <td className="py-4 text-gray-400">{item.items}</td>
                      <td className="py-4 text-emerald-400 font-bold">{item.status}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleInspect(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Inspect
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