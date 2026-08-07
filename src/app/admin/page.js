"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotifications, setShowNotifications] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [stats, setStats] = useState({
    users: "1,248",
    scans: "3,654",
    reports: "2,318",
    subscriptions: "842",
    highRisk: "232"
  });

  // --- ADMIN AUTHENTICATION CHECK (ADDED WITHOUT TOUCHING YOUR UI CODE) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedAdmin = localStorage.getItem("footpryx_admin");
      if (!savedAdmin) {
        router.push("/admin/login");
        return;
      }
      setAdminUser({
        name: "Super Admin",
        role: "Super Admin",
        initial: "A"
      });
    }
  }, [router]);
  // ------------------------------------------------------------------------

  const handleRefreshTelemetry = () => {
    setSuccessMsg("Telemetry streams re-calibrated successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative overflow-x-hidden">
      
      {/* NOTIFICATIONS MODAL */}
      {showNotifications && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">SYSTEM BROADCASTS</span>
                <h3 className="text-lg font-extrabold text-white">Security Alerts Center</h3>
              </div>
              <button 
                onClick={() => setShowNotifications(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 font-mono text-xs">
              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-red-400 font-bold">
                  <span>[CRITICAL] DB Breach Detected</span>
                  <span>10m ago</span>
                </div>
                <p className="text-slate-300 font-sans">Enterprise Global DB encountered credential dump anomaly.</p>
              </div>
              <div className="bg-slate-900/60 p-3.5 rounded-2xl border border-slate-800 space-y-1">
                <div className="flex justify-between text-yellow-400 font-bold">
                  <span>[WARNING] Auth Gateway Spike</span>
                  <span>25m ago</span>
                </div>
                <p className="text-slate-300 font-sans">Multiple failed admin login attempts recorded from ASN 4912.</p>
              </div>
            </div>

            <button 
              onClick={() => setShowNotifications(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Mark All Read & Close
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

      {/* EXACT SIDEBAR FROM SCREENSHOT */}
      <aside className="w-64 bg-[#050914] border-r border-gray-800/80 flex flex-col justify-between p-5 select-none hidden lg:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
            <div>
              <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">footpryx</h1>
              <p className="text-[9px] text-gray-400 font-mono tracking-widest">CYBER INTELLIGENCE</p>
            </div>
          </div>

          <div className="space-y-6 text-xs">
            {/* MAIN SECTION */}
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider px-3 mb-2 font-bold">Main</p>
              <Link href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500 text-black font-extrabold transition shadow-lg shadow-lime-500/20">
                <span>📊</span> Dashboard
              </Link>
              <Link href="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>👥</span> Users
              </Link>
              <Link href="/admin/scans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🔍</span> Scans & Reports
              </Link>
              <Link href="/admin/breaches" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🛡️</span> Data Breaches
              </Link>
              <Link href="/admin/threats" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>⚡</span> Threat Intelligence
              </Link>
              <Link href="/admin/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🌐</span> Dark Web Monitoring
              </Link>
              <Link href="/admin/domains" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🌐</span> Domain Monitoring
              </Link>
              <Link href="/admin/emails" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>✉️</span> Email Monitoring
              </Link>
            </div>

            {/* MANAGEMENT SECTION */}
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider px-3 mb-2 font-bold">Management</p>
              <Link href="/admin/plans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>💳</span> Plans & Billing
              </Link>
              <Link href="/admin/subscriptions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>📦</span> Subscriptions
              </Link>
              <Link href="/admin/transactions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>📄</span> Transactions
              </Link>
              <Link href="/admin/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>💬</span> Support Tickets
              </Link>
            </div>

            {/* SYSTEM SECTION */}
            <div className="space-y-1">
              <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider px-3 mb-2 font-bold">System</p>
              <Link href="/admin/logs" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🪵</span> System Logs
              </Link>
              <Link href="/admin/alerts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🚨</span> Alerts
              </Link>
              <Link href="/admin/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>⚙️</span> Settings
              </Link>
              <Link href="/admin/integrations" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🔗</span> Integrations
              </Link>
              <Link href="/admin/api" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🔌</span> API Management
              </Link>
              <Link href="/admin/accounts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
                <span>🔐</span> Admin Accounts
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            You are protected
          </div>
          <p className="text-[9px] text-gray-500">All systems are running.</p>
        </div>
      </aside>

      {/* RIGHT SIDE ORIGINAL CONTENT WITH GRAPHS & TABLES */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-2">
              Welcome back, Admin <span className="text-amber-400">👑</span>
            </h2>
            <p className="text-xs text-gray-400">Monitor platform activity, users, threats and system health.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <input 
                type="text" 
                placeholder="Search (Ctrl + /)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 bg-black/50 border border-gray-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-lime-500 font-mono"
              />
            </div>
            <button 
              onClick={() => setShowNotifications(true)}
              className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-300 hover:text-lime-400 hover:border-lime-500/40 transition cursor-pointer relative"
            >
              🔔
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
            </button>
            <div className="flex items-center gap-3 pl-2 border-l border-gray-800">
              <div className="w-10 h-10 rounded-xl bg-lime-500 text-black font-extrabold flex items-center justify-center text-sm shadow-lg">
                {adminUser.initial}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-none">{adminUser.name}</p>
                <p className="text-[10px] text-gray-400 font-mono mt-0.5">Super Admin</p>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          
          {/* TOP STATS CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { title: "TOTAL USERS", val: stats.users, change: "12.5% vs last 7 days", icon: "👥", color: "text-lime-400" },
              { title: "TOTAL SCANS", val: stats.scans, change: "18.7% vs last 7 days", icon: "🔍", color: "text-emerald-400" },
              { title: "REPORTS GENERATED", val: stats.reports, change: "14.3% vs last 7 days", icon: "📄", color: "text-purple-400" },
              { title: "ACTIVE SUBSCRIPTIONS", val: stats.subscriptions, change: "9.8% vs last 7 days", icon: "💳", color: "text-amber-400" },
              { title: "HIGH RISK DETECTIONS", val: stats.highRisk, change: "22.1% vs last 7 days", icon: "🛡️", color: "text-red-400" },
            ].map((card, idx) => (
              <div key={idx} className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-5 space-y-4 hover:border-lime-500/40 transition-all duration-300 shadow-xl group">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-gray-400 tracking-wider font-bold">{card.title}</span>
                  <span className="w-8 h-8 rounded-xl bg-black/60 border border-gray-800 flex items-center justify-center">{card.icon}</span>
                </div>
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${card.color}`}>{card.val}</h3>
                  <p className="text-[10px] font-mono text-emerald-400 mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    {card.change}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* MIDDLE ROW: GRAPH, DONUT, RECENT BREACHES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ACTIVITY OVERVIEW WITH SVG GRAPHS */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Activity Overview</h3>
                <span className="text-xs font-mono text-gray-400 bg-black/40 px-3 py-1 rounded-xl border border-gray-800 flex items-center gap-2">
                  Last 7 Days ▾
                </span>
              </div>
              
              {/* SVG MULTI-LINE GRAPH */}
              <div className="h-52 w-full relative flex items-end justify-between px-2 pt-6 pb-2">
                <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-20 px-2 py-4">
                  <div className="border-b border-gray-700 w-full text-[9px] font-mono text-gray-500">1K</div>
                  <div className="border-b border-gray-700 w-full text-[9px] font-mono text-gray-500">750</div>
                  <div className="border-b border-gray-700 w-full text-[9px] font-mono text-gray-500">500</div>
                  <div className="border-b border-gray-700 w-full text-[9px] font-mono text-gray-500">250</div>
                  <div className="border-b border-gray-700 w-full text-[9px] font-mono text-gray-500">0</div>
                </div>

                <svg className="absolute inset-x-4 inset-y-8 h-36 w-[calc(100%-2rem)] overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 150">
                  <path d="M 0 40 Q 80 20, 160 60 T 320 50 T 480 30" fill="none" stroke="#84cc16" strokeWidth="2.5" />
                  <path d="M 0 90 Q 80 60, 160 80 T 320 70 T 480 50" fill="none" stroke="#10b981" strokeWidth="2.5" />
                  <path d="M 0 120 Q 80 100, 160 110 T 320 95 T 480 85" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                </svg>

                <div className="w-full flex justify-between text-[10px] font-mono text-gray-500 pt-36 z-10">
                  <span>May 20</span>
                  <span>May 21</span>
                  <span>May 22</span>
                  <span>May 23</span>
                  <span>May 24</span>
                  <span>May 25</span>
                  <span>May 26</span>
                </div>
              </div>

              <div className="flex justify-center gap-6 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-lime-400"></span> Scans</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Reports</span>
                <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Users</span>
              </div>
            </div>

            {/* BREACH OVERVIEW DONUT */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              <h3 className="text-sm font-bold text-white">Breach Overview</h3>
              <div className="flex items-center justify-center py-4">
                <div className="w-36 h-36 rounded-full border-8 border-gray-900 border-t-red-500 border-r-amber-500 border-b-lime-500 flex flex-col items-center justify-center shadow-2xl relative">
                  <span className="text-2xl font-black text-white">232</span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">TOTAL</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500"></span> High Risk</span>
                  <span className="text-red-400 font-bold">72 (31%)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Medium Risk</span>
                  <span className="text-amber-400 font-bold">98 (42%)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime-500"></span> Low Risk</span>
                  <span className="text-lime-400 font-bold">62 (27%)</span>
                </div>
              </div>
            </div>

            {/* RECENT HIGH RISK BREACHES */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent High Risk Breaches</h3>
                <Link href="/admin/breaches" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { name: "Adobe", email: "user@example.com", time: "2h ago" },
                  { name: "LinkedIn", email: "user@domain.com", time: "5h ago" },
                  { name: "Dropbox", email: "user@domain.com", time: "1d ago" },
                  { name: "Twitter", email: "user@domain.com", time: "2d ago" },
                  { name: "MySpace", email: "user@domain.com", time: "3d ago" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800 p-3 rounded-2xl flex items-center justify-between hover:border-red-500/40 transition">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 font-extrabold flex items-center justify-center text-[10px]">Ad</span>
                      <div>
                        <p className="text-white font-bold">{item.name}</p>
                        <p className="text-[10px] text-gray-400">{item.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/30 text-[10px] font-bold">High</span>
                      <p className="text-[9px] text-gray-500 mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* LOWER ROW: TARGETED ASSETS, USERS BY PLAN, SYSTEM HEALTH */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* TOP TARGETED ASSETS TABLE */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Top Targeted Assets</h3>
                <Link href="/admin/domains" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="overflow-x-auto font-mono text-xs">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-500 uppercase text-[9px]">
                      <th className="pb-3">Asset</th>
                      <th className="pb-3">Type</th>
                      <th className="pb-3">Breach Count</th>
                      <th className="pb-3 text-right">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-900/80">
                    {[
                      { asset: "email@example.com", type: "Email", count: "12", risk: "High" },
                      { asset: "example.com", type: "Domain", count: "8", risk: "Medium" },
                      { asset: "user123", type: "Username", count: "6", risk: "Medium" },
                      { asset: "+1 987 654 3210", type: "Phone", count: "4", risk: "Low" },
                      { asset: "company.com", type: "Domain", count: "3", risk: "Low" },
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-900/40 transition">
                        <td className="py-2.5 text-white font-bold">{row.asset}</td>
                        <td className="py-2.5 text-gray-400">{row.type}</td>
                        <td className="py-2.5 text-lime-400 font-bold">{row.count}</td>
                        <td className="py-2.5 text-right">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/40' : row.risk === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-lime-950 text-lime-400 border border-lime-500/30'}`}>
                            {row.risk}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* USERS BY PLAN DONUT */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Users by Plan</h3>
                <Link href="/admin/plans" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="flex items-center justify-center py-2">
                <div className="w-32 h-32 rounded-full border-8 border-gray-900 border-t-lime-500 border-r-emerald-500 border-b-purple-500 flex flex-col items-center justify-center shadow-2xl">
                  <span className="text-xl font-black text-white">1,248</span>
                  <span className="text-[9px] font-mono text-gray-400 uppercase tracking-widest">TOTAL</span>
                </div>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-lime-400"></span> Pro Plan</span>
                  <span className="text-lime-400 font-bold">642 (51%)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Premium Plan</span>
                  <span className="text-emerald-400 font-bold">436 (35%)</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-500"></span> Basic Plan</span>
                  <span className="text-purple-400 font-bold">170 (14%)</span>
                </div>
              </div>
            </div>

            {/* SYSTEM HEALTH WITH SHIELD GRAPHIC */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-sm font-bold text-white">System Health</h3>
                <Link href="/admin/logs" className="text-xs font-mono text-lime-400 hover:underline">View Logs</Link>
              </div>

              <div className="absolute right-4 bottom-4 opacity-15 pointer-events-none">
                <svg className="w-36 h-36 text-lime-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
                </svg>
              </div>

              <div className="space-y-3 font-mono text-xs relative z-10">
                {[
                  { label: "Server Status", val: "Online", color: "text-emerald-400" },
                  { label: "Database", val: "Healthy", color: "text-emerald-400" },
                  { label: "API Services", val: "Operational", color: "text-emerald-400" },
                  { label: "Cron Jobs", val: "Running", color: "text-emerald-400" },
                  { label: "Backup Status", val: "Up to date", color: "text-emerald-400" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800 p-2.5 rounded-xl flex justify-between items-center">
                    <span className="text-gray-400">{item.label}</span>
                    <span className={`font-bold flex items-center gap-1.5 ${item.color}`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {item.val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* BOTTOM ROW: RECENT SYSTEM ALERTS, SUBSCRIPTION OVERVIEW, RECENT TRANSACTIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* RECENT SYSTEM ALERTS */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent System Alerts</h3>
                <Link href="/admin/alerts" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { title: "Multiple failed login attempts detected", ip: "IP: 203.0.113.45", time: "10 min ago", risk: "High" },
                  { title: "Suspicious scan activity detected", user: "User: user@example.com", time: "35 min ago", risk: "Medium" },
                  { title: "New user registered", user: "User: newuser@example.com", time: "2 hrs ago", risk: "Low" },
                  { title: "API rate limit exceeded", ip: "IP: 198.51.100.23", time: "5 hrs ago", risk: "Low" },
                ].map((alert, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800 p-3 rounded-2xl space-y-1">
                    <div className="flex justify-between items-start">
                      <p className="text-white font-bold">{alert.title}</p>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${alert.risk === 'High' ? 'bg-red-950 text-red-400' : alert.risk === 'Medium' ? 'bg-amber-950 text-amber-400' : 'bg-lime-950 text-lime-400'}`}>{alert.risk}</span>
                    </div>
                    <p className="text-[10px] text-gray-400">{alert.ip || alert.user}</p>
                    <div className="flex justify-between items-center text-[9px] text-gray-500 pt-1">
                      <span>{alert.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBSCRIPTION OVERVIEW (PROGRESS BARS) */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Subscription Overview</h3>
                <Link href="/admin/subscriptions" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="space-y-4 font-mono text-xs">
                {[
                  { plan: "Pro Plan", count: "642 / 1000", pct: "64%", color: "bg-lime-500" },
                  { plan: "Premium Plan", count: "436 / 700", pct: "62%", color: "bg-emerald-500" },
                  { plan: "Basic Plan", count: "170 / 500", pct: "34%", color: "bg-purple-500" },
                  { plan: "Free Plan", count: "80 / ∞", pct: "10%", color: "bg-gray-500" },
                ].map((sub, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-gray-300">
                      <span>{sub.plan}</span>
                      <span className="text-gray-400">{sub.count}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-900 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${sub.color}`} style={{ width: sub.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENT TRANSACTIONS */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 space-y-6 shadow-xl">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-white">Recent Transactions</h3>
                <Link href="/admin/transactions" className="text-xs font-mono text-lime-400 hover:underline">View All</Link>
              </div>
              <div className="space-y-3 font-mono text-xs">
                {[
                  { id: "#TXN-78462", plan: "Pro Plan - 1 Month", amount: "$49.00", date: "May 26, 2025" },
                  { id: "#TXN-78461", plan: "Premium Plan - 1 Month", amount: "$79.00", date: "May 26, 2025" },
                  { id: "#TXN-78460", plan: "Pro Plan - 1 Month", amount: "$49.00", date: "May 25, 2025" },
                  { id: "#TXN-78459", plan: "Basic Plan - 1 Month", amount: "$19.00", date: "May 25, 2025" },
                  { id: "#TXN-78458", plan: "Premium Plan - 1 Month", amount: "$79.00", date: "May 24, 2025" },
                ].map((tx, idx) => (
                  <div key={idx} className="bg-black/50 border border-gray-800 p-2.5 rounded-2xl flex justify-between items-center">
                    <div>
                      <p className="text-emerald-400 font-bold">{tx.id}</p>
                      <p className="text-[10px] text-gray-400">{tx.plan}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">{tx.amount}</p>
                      <p className="text-[9px] text-gray-500">{tx.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}