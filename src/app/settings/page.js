"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, History, Settings, Layers, Shield, Zap, Lock, LogOut, Trash2, Menu, X, ArrowLeft, CheckCircle2 
} from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  // Password update states
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMessage, setPassMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("traceeye_user");
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
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("traceeye_user");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      localStorage.removeItem("traceeye_user");
      setUser(null);
      window.location.href = "/auth/register";
    }
  };

  const handleCopyRef = () => {
    navigator.clipboard.writeText("https://espectrosint.com/?ref=HLZJYVKB");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!newPass || !confirmPass) {
      setPassMessage("Please fill in the password fields.");
      return;
    }
    if (newPass !== confirmPass) {
      setPassMessage("New passwords do not match!");
      return;
    }
    setPassMessage("Password updated successfully!");
    setCurrentPass("");
    setNewPass("");
    setConfirmPass("");
    setTimeout(() => setPassMessage(""), 3000);
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
            <Link href="/investigations" className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <span className="flex items-center gap-3"><Layers size={16} /> Investigations</span>
              <span className="bg-[#a3e635] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">NEW</span>
            </Link>
            <Link href="/history" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
              <History size={16} /> History
            </Link>
            <Link href="/settings" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold bg-[#141a2e] text-[#a3e635] border border-slate-800/80 shadow-sm">
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

      {/* 💻 MAIN SETTINGS VIEWPORT */}
      <main className="flex-1 flex flex-col px-4 md:px-12 py-8 overflow-y-auto min-h-screen">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full pb-6 border-b border-slate-900 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2.5 bg-[#0b0f19] border border-slate-800 rounded-xl text-slate-300">
              <Menu size={18} />
            </button>
            <div>
              <h2 className="text-2xl font-extrabold text-white">Settings</h2>
              <p className="text-xs text-slate-400 mt-0.5">Manage your account, security, and preferences.</p>
            </div>
          </div>

          <Link 
            href="/dashboard"
            className="text-xs font-bold text-slate-400 hover:text-white bg-[#0b0f19] border border-slate-800 px-4 py-2 rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowLeft size={14} /> Back to dashboard
          </Link>
        </div>

        {/* Settings Form Container */}
        <div className="py-8 max-w-3xl w-full mx-auto space-y-6 text-xs">
          
          {/* Active Sessions */}
          <div className="bg-[#0b0f19]/60 border border-slate-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">ACTIVE SESSIONS</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Devices currently signed in to your account. Revoke any you don't recognize.</p>
            </div>
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-slate-800 rounded-lg text-[#a3e635]"><Shield size={16} /></div>
                <div>
                  <p className="font-bold text-white text-xs">Chrome on Windows ({user ? user.email : "Active"})</p>
                  <p className="text-[10px] text-slate-500">Last active: Just now • IP: 49.15.246.4</p>
                </div>
              </div>
              <span className="text-[10px] bg-emerald-500/10 text-[#a3e635] border border-emerald-900/40 px-2.5 py-1 rounded-lg font-bold">CURRENT</span>
            </div>
          </div>

          {/* Subscription */}
          <div className="bg-[#0b0f19]/60 border border-slate-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">SUBSCRIPTION</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Your plan, credits, and billing.</p>
            </div>
            <div className="flex items-center justify-between bg-slate-900/40 p-4 rounded-xl border border-slate-800/80">
              <div>
                <p className="font-extrabold text-white text-sm">Free <span className="text-[10px] text-slate-500 font-normal uppercase ml-2">FREE</span></p>
                <p className="text-[11px] text-slate-400 mt-0.5">1 credits available</p>
              </div>
              <button onClick={() => window.location.href = "/pricing"} className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-4 py-2 rounded-xl transition">
                View plans
              </button>
            </div>
          </div>

          {/* Refer a Friend */}
          <div className="bg-[#0b0f19]/60 border border-slate-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">REFER A FRIEND</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Give 30 credits, get 30 credits. When a friend signs up using your link, you both get bonus credits.</p>
            </div>
            <div className="flex gap-2">
              <input type="text" readOnly value="https://espectrosint.com/?ref=HLZJYVKB" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-300 font-mono text-[11px]" />
              <button onClick={handleCopyRef} className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-2.5 rounded-xl transition shrink-0 flex items-center gap-1.5">
                {copied ? <CheckCircle2 size={14} className="text-[#a3e635]" /> : null} {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          {/* Password Section */}
          <div className="bg-[#0b0f19]/60 border border-slate-900 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-white text-sm uppercase tracking-wide">PASSWORD</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Change the password you use to sign in.</p>
            </div>

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <input 
                type="password" 
                placeholder="Current password" 
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none" 
              />
              <input 
                type="password" 
                placeholder="New password" 
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none" 
              />
              <input 
                type="password" 
                placeholder="Confirm new password" 
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-600 focus:outline-none" 
              />
              {passMessage && <p className="text-xs text-[#a3e635] font-bold">{passMessage}</p>}
              <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-bold px-5 py-2.5 rounded-xl transition">
                Update password
              </button>
            </form>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#0b0f19]/60 border border-red-950/60 rounded-2xl p-6 space-y-4 shadow-xl">
            <div>
              <h3 className="font-bold text-red-400 text-sm uppercase tracking-wide">DANGER ZONE</h3>
              <p className="text-slate-400 text-[11px] mt-0.5">Permanently delete your account and all associated data. This cannot be undone.</p>
            </div>
            <button 
              onClick={handleDeleteAccount}
              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-900/40 font-bold px-4 py-2.5 rounded-xl transition"
            >
              Delete my account
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}