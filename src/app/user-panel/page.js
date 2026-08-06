"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState({ name: "User", email: "user@footpryx.com", initial: "U" });
  const [successMsg, setSuccessMsg] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [isAllBreachesModalOpen, setIsAllBreachesModalOpen] = useState(false);

useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (!savedUser) {
        router.push("/auth/login");
        return;
      }
      try {
        const parsed = JSON.parse(savedUser);
        setUserData({
          name: parsed.name || "User",
          email: parsed.email || "user@footpryx.com",
          initial: parsed.name ? parsed.name.charAt(0).toUpperCase() : "U"
        });
      } catch (e) {
        console.error(e);
        router.push("/auth/login");
      }
    }
  }, [router]);

  const handleImproveScore = () => {
    setSuccessMsg("Security scan initiated! Your score is optimizing...");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative overflow-x-hidden">
      
      {/* 📄 FULL REPORT MODAL */}
      {isReportModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">DARK WEB INTEL // FULL REPORT</span>
                <h3 className="text-lg font-extrabold text-white">Comprehensive Exposure Summary</h3>
              </div>
              <button 
                onClick={() => setIsReportModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Total Darkweb Hits:</span>
                <span className="text-red-400 font-bold">6 Exposures Found</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Associated Assets:</span>
                <span className="text-white font-bold">{userData.email}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Threat Status:</span>
                <span className="text-lime-400 font-bold">Mitigation Active</span>
              </div>
            </div>

            <button 
              onClick={() => setIsReportModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Report
            </button>
          </div>
        </div>
      )}

      {/* 🛡️ ALL BREACHES MODAL */}
      {isAllBreachesModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">ASSET FORENSICS</span>
                <h3 className="text-lg font-extrabold text-white">All Recorded Breaches</h3>
              </div>
              <button 
                onClick={() => setIsAllBreachesModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs max-h-64 overflow-y-auto pr-1">
              {[
                { name: "LinkedIn", email: userData.email, risk: "High", date: "May 26, 2025" },
                { name: "Adobe", email: userData.email, risk: "High", date: "May 20, 2025" },
                { name: "Dropbox", email: userData.email, risk: "Medium", date: "May 14, 2025" },
                { name: "Canva", email: userData.email, risk: "Low", date: "May 10, 2025" },
                { name: "Twitter", email: userData.email, risk: "High", date: "May 02, 2025" },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-black/50 p-3 rounded-xl border border-gray-800">
                  <div>
                    <span className="text-white font-bold">{item.name}</span>
                    <p className="text-[10px] text-gray-400">{item.email}</p>
                  </div>
                  <span className="text-red-400 font-bold">{item.risk} Risk</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsAllBreachesModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Window
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

      {/* USER SIDEBAR */}
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
            <Link href="/user-panel" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/dashboard" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔍</span> OSINT Search Workspace
            </Link>
            <Link href="/user-panel/scan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breach Scan
            </Link>
            <Link href="/user-panel/reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Breach Reports
            </Link>
            <Link href="/user-panel/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Dark Web Monitor
            </Link>
            <Link href="/user-panel/domains" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Domain Monitoring
            </Link>
            <Link href="/user-panel/emails" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>✉️</span> Email Monitoring
            </Link>
          </nav>
        </div>

        {/* BOTTOM PLAN & USER PROFILE */}
        <div className="space-y-4">
          <div className="bg-black/40 border border-gray-800 p-3 rounded-2xl flex items-center justify-between font-mono">
            <div>
              <p className="text-[10px] text-gray-500">Plan</p>
              <p className="text-xs font-bold text-white">Pro Plan</p>
            </div>
            <button 
              onClick={() => router.push('/user-panel/billing')}
              className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-3 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition"
            >
              View Plan
            </button>
          </div>

          <div className="flex items-center gap-3 pt-2 border-t border-gray-800/80">
            <div className="w-9 h-9 rounded-xl bg-lime-500 text-black font-extrabold flex items-center justify-center text-xs">
              {userData.initial}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{userData.name}</p>
              <p className="text-[10px] text-gray-400 font-mono truncate">{userData.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* USER MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Welcome back, {userData.name}! 👋
            </h2>
            <p className="text-xs text-gray-400">Stay ahead of threats. Monitor. Analyze. Protect.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-lime-400 transition cursor-pointer relative">
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-lime-500 animate-ping"></span>
            </button>
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-black font-extrabold flex items-center justify-center text-sm shadow-lg">
              {userData.initial}
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          
          {/* TOP 4 STAT CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Total Breaches", val: "24", sub: "Across all your assets", icon: "🛡️", color: "text-red-400" },
              { title: "Compromised Emails", val: "6", sub: "Email addresses found", icon: "✉️", color: "text-purple-400" },
              { title: "Exposed Passwords", val: "12", sub: "Across breaches", icon: "🔑", color: "text-amber-400" },
              { title: "Monitored Domains", val: "3", sub: "Active monitoring", icon: "🌐", color: "text-lime-400" },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-5 space-y-3 hover:border-lime-500/40 transition shadow-xl">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-gray-400 font-bold">{card.title}</span>
                  <span className="w-8 h-8 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-center">{card.icon}</span>
                </div>
                <div>
                  <h3 className={`text-3xl font-black tracking-tight ${card.color}`}>{card.val}</h3>
                  <p className="text-[10px] font-mono text-gray-500 mt-1">{card.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* BREACH OVERVIEW */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              <h3 className="text-sm font-bold text-white">Breach Overview</h3>
              <div className="flex items-center justify-center py-2">
                <div className="w-36 h-36 rounded-full border-8 border-gray-900 border-t-red-500 border-r-amber-500 border-b-lime-500 flex flex-col items-center justify-center shadow-2xl relative">
                  <span className="text-2xl font-black text-white">24</span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">TOTAL</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> High Risk</span>
                  <span className="text-red-400 font-bold">8</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Medium Risk</span>
                  <span className="text-amber-400 font-bold">10</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime-500"></span> Low Risk</span>
                  <span className="text-lime-400 font-bold">6</span>
                </div>
              </div>
            </div>

            {/* RECENT BREACHES */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent Breaches</h3>
                <button 
                  onClick={() => setIsAllBreachesModalOpen(true)}
                  className="text-xs font-mono text-lime-400 hover:underline cursor-pointer bg-transparent border-none"
                >
                  View All
                </button>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: "LinkedIn", email: userData.email, risk: "High", date: "May 26, 2025" },
                  { name: "Adobe", email: userData.email, risk: "High", date: "May 20, 2025" },
                  { name: "Dropbox", email: userData.email, risk: "Medium", date: "May 14, 2025" },
                  { name: "Canva", email: userData.email, risk: "Low", date: "May 10, 2025" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800 p-3 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-lime-950/60 border border-lime-500/30 text-lime-400 font-extrabold flex items-center justify-center text-[10px]">in</span>
                      <div>
                        <p className="text-white font-bold">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/30' : item.risk === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-lime-950 text-lime-400 border border-lime-500/30'}`}>
                        {item.risk}
                      </span>
                      <p className="text-[9px] text-gray-500 mt-1">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DARK WEB EXPOSURE */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between relative overflow-hidden">
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-sm font-bold text-white">Dark Web Exposure</h3>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="text-xs font-mono text-lime-400 hover:underline cursor-pointer bg-transparent border-none"
                >
                  View Report
                </button>
              </div>
              <p className="text-xs font-mono text-gray-400 relative z-10">We found 6 results matching your assets on the dark web.</p>
              
              <div className="relative z-10 text-center space-y-3 pt-4">
                <div>
                  <h4 className="text-3xl font-black text-red-400">6</h4>
                  <p className="text-[10px] font-mono text-gray-400 uppercase tracking-wider">EXPOSURES FOUND</p>
                </div>
                <button 
                  onClick={() => setIsReportModalOpen(true)}
                  className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-lime-500/20"
                >
                  VIEW FULL REPORT
                </button>
              </div>
            </div>

          </div>

          {/* LOWER ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* TOP EXPOSED ASSETS TABLE */}
            <div className="lg:col-span-2 bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <h3 className="text-sm font-bold text-white">Top Exposed Assets</h3>
              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 uppercase text-[9px]">
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Exposure Count</th>
                      <th className="pb-3 text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900/80">
                    {[
                      { asset: userData.email, type: "Email", count: "6", risk: "High" },
                      { asset: "example.com", type: "Domain", count: "4", risk: "Medium" },
                      { asset: "user123", type: "Username", count: "3", risk: "Medium" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-900/40 transition">
                        <td className="py-3.5 text-white font-bold">{row.asset}</td>
                        <td className="py-3.5 text-gray-400">{row.type}</td>
                        <td className="py-3.5 text-lime-400 font-bold">{row.count}</td>
                        <td className="py-3.5 text-right">
                          <span className={`px-2.5 py-1 rounded text-[10px] font-bold ${row.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'}`}>
                            {row.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* YOUR SECURITY SCORE */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              <h3 className="text-sm font-bold text-white">Your Security Score</h3>
              <div className="flex items-center gap-6">
                <div className="w-28 h-28 rounded-full border-8 border-gray-900 border-t-emerald-500 border-r-amber-500 flex flex-col items-center justify-center shadow-2xl shrink-0">
                  <span className="text-2xl font-black text-white">72</span>
                  <span className="text-[9px] font-mono text-gray-400">/100</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-emerald-400">Good</p>
                  <p className="text-[11px] font-mono text-gray-400 mt-1">Keep monitoring and take action on high-risk exposures.</p>
                </div>
              </div>
              <button 
                onClick={handleImproveScore}
                className="w-full bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                IMPROVE SCORE
              </button>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}