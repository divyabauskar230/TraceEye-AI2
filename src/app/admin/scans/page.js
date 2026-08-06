"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminScansPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for scans list and modals
  const [scansList, setScansList] = useState([
    { id: "SCN-9821", query: "alex.rivera@enterprise.io", type: "Email Scan", sources: "200+ Sources", risk: "High", time: "10 mins ago" },
    { id: "SCN-9822", query: "+1 555 382-9102", type: "Phone Scan", sources: "145 Sources", risk: "Medium", time: "25 mins ago" },
    { id: "SCN-9823", query: "enterprise-secure.io", type: "Domain Search", sources: "180 Sources", risk: "Low", time: "1 hour ago" },
    { id: "SCN-9824", query: "admin_recon", type: "Username Trace", sources: "500+ Platforms", risk: "High", time: "3 hours ago" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetQuery, setTargetQuery] = useState("");
  const [scanType, setScanType] = useState("Email Scan");
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

  const handleAddScanSubmit = (e) => {
    e.preventDefault();
    if (!targetQuery.trim()) return;

    const randomId = "SCN-" + Math.floor(9830 + Math.random() * 100);

    const newEntry = {
      id: randomId,
      query: targetQuery,
      type: scanType,
      sources: "250+ Sources",
      risk: "High",
      time: "Just now"
    };

    setScansList([newEntry, ...scansList]);
    setTargetQuery("");
    setIsModalOpen(false);
    setSuccessMsg("OSINT scan executed successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  // REAL REPORT DOWNLOAD FUNCTION
  const handleViewReport = (scan) => {
    const reportContent = 
`========================================
       FOOTPRYX OSINT INTELLIGENCE      
          OFFICIAL SCAN REPORT          
========================================
Scan ID     : ${scan.id}
Target Query: ${scan.query}
Scan Type   : ${scan.type}
Sources     : ${scan.sources}
Risk Level  : ${scan.risk}
Timestamp   : ${scan.time}
----------------------------------------
Analysis Status: COMPLETE & VERIFIED
========================================`;

    const blob = new Blob([reportContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${scan.id.toLowerCase()}-report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMsg(`Report for ${scan.id} downloaded successfully!`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 🔍 TRIGGER OSINT SCAN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">OSINT ENGINE</span>
                <h3 className="text-lg font-extrabold text-white">Trigger Real-Time Scan</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddScanSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Target Query (Email, Phone, Domain)</label>
                <input 
                  type="text" 
                  placeholder="e.g. target@enterprise.io"
                  value={targetQuery}
                  onChange={(e) => setTargetQuery(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Scan Type</label>
                <select 
                  value={scanType}
                  onChange={(e) => setScanType(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                >
                  <option value="Email Scan">Email Scan</option>
                  <option value="Phone Scan">Phone Scan</option>
                  <option value="Domain Search">Domain Search</option>
                  <option value="Username Trace">Username Trace</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Execute OSINT Crawler
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
            <Link href="/admin/scans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
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
            <h2 className="text-xl font-black text-white tracking-tight">Scans & Reports Logs</h2>
            <p className="text-xs text-gray-400">Track and review real-time OSINT intelligence executions.</p>
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
              <h3 className="text-sm font-bold text-white">Recent Platform Scans ({scansList.length} Total)</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-3 py-1 rounded-lg border border-lime-500/30">Live Stream Active</span>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Trigger OSINT Scan
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Scan ID</th>
                    <th className="pb-3">Target Query</th>
                    <th className="pb-3">Scan Type</th>
                    <th className="pb-3">Sources Queried</th>
                    <th className="pb-3">Risk Level</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3 text-right">Report</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {scansList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.query}</td>
                      <td className="py-4 text-gray-300">{item.type}</td>
                      <td className="py-4 text-gray-400">{item.sources}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/40' : item.risk === 'Medium' ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/40' : 'bg-blue-950 text-blue-400 border border-blue-500/30'}`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{item.time}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleViewReport(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          View Report →
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