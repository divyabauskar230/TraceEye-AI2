"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, History, Settings, Layers, Mail, Phone, Globe, User, FileText, Lock, ArrowLeft, Trash2, LogOut, Zap, Menu, X, Server, Landmark, Bitcoin, Link2, Eye } from "lucide-react";

export default function HistoryPage() {
  const [user, setUser] = useState(null);
  const [scanHistory, setScanHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (!savedUser) {
        // 🔒 जर युजर लॉगिन नसेल तर थेट साइन-अप/लॉगिन पेजवर पाठवा
        window.location.href = "/auth/register";
        return;
      }
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("User parse error", e);
      }

      // 📥 localStorage मधून सेव्ह झालेले सर्च लॉग्ज आणा
      const savedLogs = localStorage.getItem("footpryx_history");
      if (savedLogs) {
        try {
          setScanHistory(JSON.parse(savedLogs));
        } catch (e) {
          console.error("History parse error", e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("footpryx_user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("footpryx_user");
      setUser(null);
      window.location.href = "/auth/register";
    }
  };

  // 🧹 Clear History
  const handleClearHistory = () => {
    localStorage.removeItem("footpryx_history");
    setScanHistory([]);
  };

  // 🔍 Helper to get dynamic icon based on search type
  const getTypeIcon = (type) => {
    const t = type ? type.toLowerCase() : "";
    if (t.includes("phone")) return <Phone size={12} className="text-[#a3e635]" />;
    if (t.includes("user")) return <User size={12} className="text-[#a3e635]" />;
    if (t.includes("domain")) return <Globe size={12} className="text-[#a3e635]" />;
    if (t.includes("cpf") || t.includes("id")) return <FileText size={12} className="text-[#a3e635]" />;
    if (t.includes("password")) return <Lock size={12} className="text-[#a3e635]" />;
    if (t.includes("link") || t.includes("url")) return <Link2 size={12} className="text-[#a3e635]" />;
    if (t.includes("crypto") || t.includes("blockchain")) return <Bitcoin size={12} className="text-[#a3e635]" />;
    if (t.includes("ip")) return <Server size={12} className="text-[#a3e635]" />;
    if (t.includes("cnpj") || t.includes("company")) return <Landmark size={12} className="text-[#a3e635]" />;
    return <Mail size={12} className="text-[#a3e635]" />;
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white flex font-sans selection:bg-[#a3e635] selection:text-black relative overflow-x-hidden">
      
      {/* 📱 MOBILE BACKDROP */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" />
      )}

      {/* 📂 SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0d1a] border-r border-slate-900/85 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative shrink-0`}>
        <div>
          <div className="flex items-center justify-between mb-8 p-1">
           <div className="flex items-center gap-3">
  <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-xl object-cover border border-slate-800" />
  <div>
    <h1 className="text-sm font-bold tracking-wide text-white uppercase">footpryx</h1>
    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">FOOTPRINT INTELLIGENCE</p>
  </div>
</div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <p className="text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-3 px-2">WORKSPACE</p>

          <nav className="space-y-1">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <Search size={16} /> Search
            </Link>
            <Link href="/investigations" className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <span className="flex items-center gap-3"><Layers size={16} /> Investigations</span>
              <span className="bg-[#a3e635] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">NEW</span>
            </Link>
            <Link href="/history" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold bg-[#141a2e] text-[#a3e635] border border-slate-800/80 shadow-sm">
              <History size={16} /> History
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <Settings size={16} /> Settings
            </Link>
          </nav>
        </div>

        {/* 🟢 USER PROFILE FOOTER */}
        <div className="space-y-4 pt-4 border-t border-slate-900/80 font-medium">
          <div className="flex items-center justify-between bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-800/60 text-xs">
            <span className="flex items-center gap-1.5 text-[#a3e635] font-bold">
              <Zap size={14} /> 1/2
            </span>
            <span className="text-slate-400 text-[11px]">credits</span>
          </div>

          {user && (
            <div className="relative">
              {showProfileMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-[#131927] border border-slate-800 rounded-xl p-1.5 shadow-2xl space-y-1 z-50">
                  <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-red-500/10 rounded-lg transition">
                    <LogOut size={14} className="text-red-400" /> Log out
                  </button>
                  <button onClick={handleDeleteAccount} className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-lg transition">
                    <Trash2 size={14} /> Delete Account
                  </button>
                </div>
              )}

              <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="w-full flex items-center justify-between bg-slate-900/80 hover:bg-slate-900 p-2.5 rounded-xl border border-slate-800 transition">
                <div className="flex items-center gap-2.5 truncate max-w-[160px]">
                  <div className="w-8 h-8 rounded-full bg-[#a3e635] text-black font-extrabold flex items-center justify-center text-xs flex-shrink-0 shadow-md">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="truncate text-left">
                    <p className="text-xs font-bold text-white truncate leading-tight">{user.name}</p>
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">▲</span>
              </button>
            </div>
          )}
        </div>
      </aside>

      {/* 💻 MAIN HISTORY VIEWPORT */}
      <main className="flex-1 flex flex-col px-4 md:px-12 py-8 overflow-y-auto min-h-screen">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl text-slate-300">
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Search History</h2>
              <p className="text-xs text-slate-400 mt-0.5">Your recent searches across all modules</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {scanHistory.length > 0 && (
              <button 
                onClick={handleClearHistory}
                className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-900/40 px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
              >
                <Trash2 size={14} /> Clear History
              </button>
            )}
            <Link 
              href="/dashboard"
              className="text-xs font-bold text-slate-400 hover:text-white bg-[#0b0f19] border border-slate-800 px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <ArrowLeft size={14} /> Back to dashboard
            </Link>
          </div>
        </div>

        {/* History Table Container */}
        <div className="py-8 max-w-4xl w-full mx-auto space-y-4">
          {scanHistory.length === 0 ? (
            <div className="text-center py-20 space-y-3 bg-[#0b0f19]/40 border border-slate-900 rounded-2xl">
              <History size={36} className="mx-auto text-slate-600" />
              <p className="text-sm font-bold text-slate-300">No search history found</p>
              <p className="text-xs text-slate-500">Run searches from the dashboard to see them appear here live.</p>
            </div>
          ) : (
            <div className="bg-[#0b0f19]/60 border border-slate-900 rounded-2xl overflow-hidden shadow-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-900 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <th className="py-3.5 px-6">Type</th>
                    <th className="py-3.5 px-6">Query / Target</th>
                    <th className="py-3.5 px-6">Results</th>
                    <th className="py-3.5 px-6">Credits</th>
                    <th className="py-3.5 px-6 text-right whitespace-nowrap">When</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900/60 text-slate-300 font-mono">
                  {scanHistory.map((item, index) => (
                    <tr key={index} className="hover:bg-slate-900/25 transition">
                      <td className="py-4 px-6 font-sans">
                        <span className="inline-flex items-center gap-1.5 bg-slate-900 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-lg text-[11px] font-bold">
                          {getTypeIcon(item.type)} {item.type}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-white font-semibold truncate max-w-xs">{item.query}</td>
                      <td className="py-4 px-6 text-[#a3e635] font-bold">{item.found || "0"}</td>
                      <td className="py-4 px-6 text-slate-400">1</td>
                      <td className="py-4 px-6 text-right text-slate-500 text-[11px] whitespace-nowrap">{item.time || "Just now"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}