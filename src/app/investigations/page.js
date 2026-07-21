"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, History, Settings, Layers, Target, Network, Activity, ArrowUpRight, LogOut, Trash2, Zap, Menu, X, Plus, Lock
} from "lucide-react";

export default function InvestigationsPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  
  // 🪟 POPUP STATE FOR START INVESTIGATION (Paid Plan Alert)
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("traceeye_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Session parse error", e);
        }
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("traceeye_user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("traceeye_user");
      setUser(null);
      window.location.href = "/auth/register";
    }
  };

  // 🚨 START INVESTIGATION CLICK HANDLER
  const handleStartInvestigationClick = () => {
    if (!user) {
      // जर युजर लॉगिन नसेल तर Sign in / Register पेजवर पाठवा
      window.location.href = "/auth/login";
    } else {
      // जर लॉगिन असेल पण फ्री प्लॅनवर असेल तर पॉपअप दाखवा
      setShowUpgradeModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white flex font-sans selection:bg-[#a3e635] selection:text-black relative overflow-x-hidden">
      
      {/* 📱 MOBILE BACKDROP */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" />
      )}

      {/* 📂 RESPONSIVE SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0d1a] border-r border-slate-900/85 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative shrink-0`}>
        <div>
          <div className="flex items-center justify-between mb-8 p-1">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">👻</div>
              <div>
                <h1 className="text-sm font-bold tracking-wide text-white">espectrosint</h1>
                <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">INTELLIGENCE OSINT</p>
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
            <Link href="/investigations" className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold bg-[#141a2e] text-[#a3e635] border border-slate-800/80 shadow-sm">
              <span className="flex items-center gap-3"><Layers size={16} /> Investigations</span>
              <span className="bg-[#a3e635] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">NEW</span>
            </Link>
            <Link href="/history" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <History size={16} /> History
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <Settings size={16} /> Settings
            </Link>
          </nav>
        </div>

        {/* 🟢 CONTROL CENTER & USER PROFILE */}
        <div className="space-y-4 pt-4 border-t border-slate-900/80 font-medium">
          
          <div className="bg-[#0e131f] border border-slate-800/80 rounded-2xl p-4 space-y-2.5">
            <p className="text-xs font-bold text-white">Run, correlate, and export faster</p>
            <p className="text-[11px] text-slate-400 leading-relaxed">A focused workspace for due diligence, identity resolution, and footprint analysis.</p>
            {user && (
              <div className="flex items-center gap-1.5 text-xs text-[#a3e635] font-bold pt-1">
                <Zap size={14} /> 0/2 credits
              </div>
            )}
          </div>

          {user ? (
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
                    <p className="text-[10px] text-slate-400 truncate">Free Plan</p>
                  </div>
                </div>
                <span className="text-slate-400 text-xs">▲</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <button onClick={() => window.location.href='/auth/login'} className="w-full text-center py-2 text-xs text-slate-400 hover:text-white transition">Sign in</button>
              <button onClick={() => window.location.href='/auth/register'} className="w-full bg-[#a3e635] text-black text-xs font-bold py-2.5 px-4 rounded-xl transition active:scale-[0.98] shadow-lg shadow-lime-500/10">Create account</button>
            </div>
          )}
        </div>
      </aside>

      {/* 💻 MAIN INVESTIGATIONS VIEWPORT */}
      <main className="flex-1 flex flex-col px-4 md:px-10 py-8 overflow-y-auto min-h-screen">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full pb-6 border-b border-slate-900">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl text-slate-300">
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Investigations</h2>
              <p className="text-xs text-slate-400 mt-0.5">Organize your searches into investigations</p>
            </div>
          </div>

          <button 
            onClick={handleStartInvestigationClick}
            className="bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(163,230,53,0.2)] flex items-center gap-1.5 active:scale-95"
          >
            <Plus size={16} strokeWidth={3} /> Start investigation
          </button>
        </div>

        {/* Center Content UI */}
        <div className="my-auto py-12 max-w-xl mx-auto text-center space-y-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-950/40 border border-emerald-900/50 text-[#a3e635] flex items-center justify-center mx-auto shadow-inner">
            <Layers size={22} />
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-white">Investigations</h3>
            <p className="text-xs text-slate-400">Organize your searches into investigations</p>
          </div>

          {/* 3 Step Guide */}
          <div className="space-y-4 text-left bg-[#0b0f19]/60 border border-slate-900/80 p-6 rounded-2xl text-xs text-slate-300 shadow-xl">
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-[#a3e635] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-800/40">1</span>
              <div>
                <p className="font-bold text-white">Search a target</p>
                <p className="text-[11px] text-slate-500">Email, phone, username, CPF, domain — any starting lead.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-[#a3e635] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-800/40">2</span>
              <div>
                <p className="font-bold text-white">Save to the investigation</p>
                <p className="text-[11px] text-slate-500">Each search becomes an immutable card (snapshot) inside the case.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-emerald-950 text-[#a3e635] font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5 border border-emerald-800/40">3</span>
              <div>
                <p className="font-bold text-white">Connect and conclude</p>
                <p className="text-[11px] text-slate-500">Link the cards, see the graph and timeline, generate the AI dossier and export the report.</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-500">
            Investigations are available on paid plans.{" "}
            <Link href="/pricing" className="text-[#a3e635] font-bold underline hover:text-emerald-400">
              See plans
            </Link>
          </p>
        </div>
      </main>

      {/* 🚨 UPGRADE MODAL POPUP (जब यूजर फ्री प्लान पर हो और Start Investigation दबाये) */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(163,230,53,0.2)]">
              <Lock size={22} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Upgrade to Paid Plan</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Investigations, graph mapping, and deep correlation features are exclusively available on Enterprise & Pro plans.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button 
                onClick={() => window.location.href = "/pricing"}
                className="w-full bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95"
              >
                See plans & Upgrade →
              </button>
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="w-full bg-slate-900 hover:bg-slate-800 text-slate-300 font-bold py-3 rounded-xl text-xs transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}