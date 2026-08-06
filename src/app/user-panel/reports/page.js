"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserReportsPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  
  const [reportsList, setReportsList] = useState([
    { id: "REP-401", target: "user@domain.com", type: "Email Compromise Dossier", breaches: "6 Sources", risk: "High", date: "May 26, 2025" },
    { id: "REP-402", target: "example.com", type: "Domain Infrastructure Audit", breaches: "4 Sources", risk: "Medium", date: "May 20, 2025" },
    { id: "REP-403", target: "user123", type: "Username Footprint Trace", breaches: "3 Sources", risk: "Medium", date: "May 14, 2025" },
    { id: "REP-404", target: "+1 987 654 3210", type: "Phone Intelligence Report", breaches: "1 Source", risk: "Low", date: "May 10, 2025" },
  ]);

  const handleGenerateReport = () => {
    const randomId = "REP-" + Math.floor(410 + Math.random() * 500);
    const newReport = {
      id: randomId,
      target: "enterprise-secure.io",
      type: "Comprehensive Deep Scan",
      breaches: "8 Sources",
      risk: "High",
      date: "Just now"
    };

    setReportsList([newReport, ...reportsList]);
    setSuccessMsg("New intelligence report generated successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleDownload = (rep) => {
    const reportText = 
`========================================
       FOOTPRYX CYBER INTELLIGENCE      
         OFFICIAL USER REPORT           
========================================
Report ID   : ${rep.id}
Target Asset: ${rep.target}
Report Type : ${rep.type}
Breaches    : ${rep.breaches}
Risk Level  : ${rep.risk}
Generated On: ${rep.date}
----------------------------------------
Status: VERIFIED & ENCRYPTED
========================================`;

    const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${rep.id.toLowerCase()}-report.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMsg(`Report ${rep.id} downloaded successfully!`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
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
            <Link href="/user-panel/reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
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
            Reports Vault Secure
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Breach & Threat Reports</h2>
            <p className="text-xs text-gray-400">Access and download your historical OSINT security reports.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Generated Reports Vault ({reportsList.length} Total)</h3>
              <button 
                onClick={handleGenerateReport}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-lime-500/20"
              >
                <span>+</span> Generate New Report
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Report ID</th>
                    <th className="pb-3">Target Asset</th>
                    <th className="pb-3">Report Type</th>
                    <th className="pb-3">Breaches Found</th>
                    <th className="pb-3">Risk Level</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {reportsList.map((rep) => (
                    <tr key={rep.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{rep.id}</td>
                      <td className="py-4 text-white font-bold">{rep.target}</td>
                      <td className="py-4 text-gray-300">{rep.type}</td>
                      <td className="py-4 text-gray-400">{rep.breaches}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rep.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/40' : rep.risk === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-lime-950 text-lime-400 border border-lime-500/30'}`}>
                          {rep.risk}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{rep.date}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDownload(rep)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3.5 py-1.5 rounded-xl border border-gray-800 cursor-pointer text-xs transition flex items-center gap-1.5 ml-auto"
                        >
                          <span>📥</span> Download
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