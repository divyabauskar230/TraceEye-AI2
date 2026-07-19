"use client";

import { useState } from "react";
import { 
  Search, Shield, Clock, Mail, Phone, User, Globe, FileText, Lock, 
  Link2, Bitcoin, Server, Landmark, ArrowRight, Target, Network, Layers, ArrowUpRight, History, Settings
} from "lucide-react";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("search");
  const [activeTab, setActiveTab] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const tabs = [
    { id: "email", label: "Email", icon: <Mail size={14} />, placeholder: "email@example.com" },
    { id: "phone", label: "Phone", icon: <Phone size={14} />, placeholder: "e.g., +1234567890" },
    { id: "username", label: "Username", icon: <User size={14} />, placeholder: "e.g., admin_recon" },
    { id: "domain", label: "Domain", icon: <Globe size={14} />, placeholder: "example.com" },
    { id: "cpf", label: "CPF", icon: <FileText size={14} />, placeholder: "Enter CPF identifier" },
    { id: "password", label: "Password", icon: <Lock size={14} />, placeholder: "Enter password" },
    { id: "name", label: "Name", icon: <User size={14} />, placeholder: "Enter full name" },
    { id: "link", label: "Link", icon: <Link2 size={14} />, placeholder: "https://example.com" },
    { id: "blockchain", label: "Blockchain", icon: <Bitcoin size={14} />, placeholder: "Wallet address" },
    { id: "ip", label: "IP", icon: <Server size={14} />, placeholder: "e.g., 192.168.1.1" },
    { id: "cnpj", label: "CNPJ", icon: <Landmark size={14} />, placeholder: "Enter CNPJ identifier" },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  const handleQuickTry = (tabId, value) => {
    setActiveTab(tabId);
    setInputValue(value);
    setResult(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      setResult({
        vector: activeTab,
        query: inputValue,
        accounts_found: "12",
        sources_count: "240",
        intel: [{ source: "Database Leak Array", status: "ENCRYPTED" }]
      });
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white flex font-sans selection:bg-[#a3e635] selection:text-black">
      
      {/* 💾 LEFT SIDEBAR PANEL */}
      <aside className="w-64 bg-[#0a0d1a] border-r border-slate-900 p-5 flex flex-col justify-between hidden md:flex shrink-0">
        <div>
          <div className="flex items-center gap-3 mb-8 p-1">
            <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white">👻</div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-white">espectrosint</h1>
              <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">INTELLIGENCE OSINT</p>
            </div>
          </div>

          <p className="text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-3 px-2">WORKSPACE</p>

          <nav className="space-y-1">
            <button 
              onClick={() => setActiveMenu("search")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${activeMenu === "search" ? "bg-[#141a2e] text-[#a3e635] border border-slate-800" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Search size={16} /> Search
            </button>
            <button 
              onClick={() => setActiveMenu("investigations")}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${activeMenu === "investigations" ? "bg-[#141a2e] text-[#a3e635] border border-slate-800" : "text-slate-400 hover:text-slate-200"}`}
            >
              <span className="flex items-center gap-3"><Layers size={16} /> Investigations</span>
              <span className="bg-[#a3e635] text-black text-[8px] font-extrabold px-1.5 py-0.5 rounded">NEW</span>
            </button>
            <button 
              onClick={() => setActiveMenu("history")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${activeMenu === "history" ? "bg-[#141a2e] text-[#a3e635] border border-slate-800" : "text-slate-400 hover:text-slate-200"}`}
            >
              <History size={16} /> History
            </button>
            <button 
              onClick={() => setActiveMenu("settings")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left ${activeMenu === "settings" ? "bg-[#141a2e] text-[#a3e635] border border-slate-800" : "text-slate-400 hover:text-slate-200"}`}
            >
              <Settings size={16} /> Settings
            </button>
          </nav>
        </div>

        <div className="space-y-2 pt-4 border-t border-slate-900 font-medium">
          <button onClick={() => window.location.href='/auth/login'} className="w-full text-center py-2 text-xs text-slate-400 hover:text-white transition">Sign in</button>
          <button onClick={() => window.location.href='/auth/register'} className="w-full bg-[#a3e635] text-black text-xs font-bold py-2.5 px-4 rounded-xl transition active:scale-[0.98]">Create account</button>
        </div>
      </aside>

      {/* 💻 MAIN WORKSPACE VIEWPORT */}
      <main className="flex-1 flex flex-col justify-center px-4 md:px-12 py-12 overflow-y-auto">
        <div className={`w-full mx-auto ${activeMenu === "investigations" ? "max-w-5xl" : "max-w-2xl"} space-y-8`}>
          
          {/* SCREEN 1: Search Console Display */}
          {activeMenu === "search" && (
            <>
              <div className="text-center space-y-2">
                <div className="flex justify-center text-4xl mb-2">👻</div>
                <h2 className="text-3xl font-bold tracking-tight text-white">OSINT Search</h2>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  Search by email, phone, username, domain, CPF, CNPJ or name across hundreds of open sources
                </p>
              </div>

              <div className="bg-[#0b0f19] border border-slate-900 rounded-2xl p-3">
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => { setActiveTab(tab.id); setInputValue(""); setResult(null); }}
                      className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? "bg-[#141a2e] border border-slate-800 text-[#a3e635]" : "text-slate-500 hover:text-slate-300"}`}
                    >
                      {tab.icon} <span className="text-[11px]">{tab.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSearch} className="space-y-4">
                <div className="relative flex items-center bg-[#0b0f19] border border-slate-900 rounded-2xl p-1">
                  <div className="pl-4 text-slate-500"><Search size={16} /></div>
                  <input
                    type="text"
                    required
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={currentTab?.placeholder}
                    className="w-full bg-transparent pl-3 pr-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none font-mono"
                  />
                  <button type="submit" className="bg-white text-black p-3.5 rounded-xl flex items-center justify-center hover:bg-slate-200 transition active:scale-[0.97]"><ArrowRight size={16} /></button>
                </div>
                <div className="flex items-center justify-center gap-2 pt-1">
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Search size={12} /> Deep search</span>
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={isDeepSearch} onChange={() => setIsDeepSearch(!isDeepSearch)} className="sr-only peer" />
                    <div className="relative w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white"></div>
                  </label>
                </div>
              </form>

              {!result && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1">
                    <Search size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">200+ Sources</h4><p className="text-[10px] text-slate-500">Databases and public records.</p>
                  </div>
                  <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1">
                    <Clock size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">~8 seconds</h4><p className="text-[10px] text-slate-500">Average execution speed response.</p>
                  </div>
                  <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1">
                    <Shield size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">GDPR compliant</h4><p className="text-[10px] text-slate-500">All information curated ethically.</p>
                  </div>
                </div>
              )}

              {result && (
                <div className="border border-slate-900 bg-[#0b0f19] rounded-2xl p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between font-bold text-xs pb-3 border-b border-slate-900 text-slate-400"><span>INTELLIGENCE REPORT</span><span className="text-[9px] bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">PREVIEW</span></div>
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center p-4">
                    <div className="bg-[#070913] border border-slate-900 p-5 rounded-2xl max-w-xs text-center shadow-xl">
                      <Lock size={18} className="mx-auto text-[#a3e635] mb-2" />
                      <h4 className="text-xs font-bold text-white mb-1">Data Payload Encrypted</h4>
                      <p className="text-[10px] text-slate-500 mb-4 leading-relaxed">Upgrade your tier plan access to decrypt full records.</p>
                      <button type="button" onClick={() => window.location.href='/pricing'} className="w-full bg-[#a3e635] text-black font-bold py-2 rounded-xl text-xs uppercase tracking-wide transition active:scale-[0.98]">Upgrade Plan</button>
                    </div>
                  </div>
                  <div className="space-y-2 opacity-10 pointer-events-none mt-4">
                    <div className="flex justify-between p-3 bg-slate-900/40 rounded-xl border border-slate-900 text-xs"><span>Leaked Database Logs</span><span>[LOCKED]</span></div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* SCREEN 2: Investigations Profile Display */}
          {activeMenu === "investigations" && (
            <div className="space-y-6 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0b0f19] border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-[#a3e635]"><Target size={18} /></div>
                  <div><p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Active Targets</p><h4 className="text-xl font-extrabold text-white">1,248</h4></div>
                </div>
                <div className="bg-[#0b0f19] border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400"><Network size={18} /></div>
                  <div><p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Mapped Nodes</p><h4 className="text-xl font-extrabold text-white">14,892</h4></div>
                </div>
                <div className="bg-[#0b0f19] border border-slate-900 p-5 rounded-2xl flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-blue-400"><Layers size={18} /></div>
                  <div><p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">Security Rating</p><h4 className="text-xl font-extrabold text-[#a3e635]">A+ Secure</h4></div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-[#0b0f19] border border-slate-900 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 pb-2 border-b border-slate-900">
                    <div><h3 className="text-sm font-bold text-white">Recent Investigations</h3><p className="text-[11px] text-slate-500 mt-0.5">Track and manage active analytic profiles.</p></div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="border-b border-slate-900 text-slate-500 font-bold uppercase text-[10px] tracking-wider"><th className="pb-3 pl-2">Case ID</th><th className="pb-3">Target Endpoint</th><th className="pb-3">Type</th><th className="pb-3">Risk</th><th className="pb-3 text-right pr-2">Status</th></tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900/60 text-slate-300">
                        <tr className="hover:bg-slate-900/20"><td className="py-3.5 pl-2 font-mono text-slate-500 font-bold">CASE-9082</td><td className="py-3.5 text-white font-semibold">Target_Intel_01</td><td className="py-3.5 text-slate-400">Email Scan</td><td className="py-3.5"><span className="bg-red-950 text-red-400 border border-red-900/40 text-[9px] px-2 py-0.5 rounded font-bold">High</span></td><td className="py-3.5 text-right pr-2 text-emerald-400 font-medium">Completed</td></tr>
                        <tr className="hover:bg-slate-900/20"><td className="py-3.5 pl-2 font-mono text-slate-500 font-bold">CASE-8911</td><td className="py-3.5 text-white font-semibold">+1 (555) 019-2831</td><td className="py-3.5 text-slate-400">Phone Lookup</td><td className="py-3.5"><span className="bg-amber-950 text-amber-400 border border-amber-900/40 text-[9px] px-2 py-0.5 rounded font-bold">Medium</span></td><td className="py-3.5 text-right pr-2 text-blue-400 font-medium animate-pulse">In Progress</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="bg-[#0b0f19] border border-slate-900 rounded-2xl p-6 flex flex-col justify-between">
                  <div><h3 className="text-sm font-bold text-white">Link Node Map</h3><p className="text-[11px] text-slate-500 mt-2 leading-relaxed">Visualize structure connectivity across layers of public registries.</p><div className="mt-5 border border-slate-900 bg-[#070913] rounded-xl p-8 text-center text-slate-600 text-[10px] font-mono tracking-widest uppercase">[ Map Locked ]</div></div>
                  <button onClick={() => window.location.href = "/pricing"} className="w-full mt-6 bg-[#a3e635] text-black font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5 transition active:scale-[0.98]">Upgrade Stack <ArrowUpRight size={14} /></button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 3: History Module Panel */}
          {activeMenu === "history" && (
            <div className="bg-[#0b0f19] border border-slate-900 rounded-2xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between pb-3 border-b border-slate-900">
                <div className="flex items-center gap-2 text-slate-300"><History size={16} /><h3 className="text-sm font-bold text-white">Scan Activity Logs</h3></div>
                <span className="text-[10px] font-medium bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-400">Cache Stream: Bound</span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-3 bg-slate-900/30 border border-slate-900 rounded-xl">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#a3e635]" /><span className="text-slate-200 font-semibold">target_recon@gmail.com</span></div>
                  <span className="text-slate-500 text-[11px]">2026-07-18 20:45:12</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-900/30 border border-slate-900 rounded-xl">
                  <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-[#a3e635]" /><span className="text-slate-200 font-semibold">+91 98765 43210</span></div>
                  <span className="text-slate-500 text-[11px]">2026-07-18 18:22:05</span>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: Settings Engine Config */}
          {activeMenu === "settings" && (
            <div className="bg-[#0b0f19] border border-slate-900 rounded-2xl p-6 space-y-4 animate-fadeIn">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-900 text-slate-300"><Settings size={16} /><h3 className="text-sm font-bold text-white">Account Settings</h3></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl"><span className="text-slate-500 block text-[10px] uppercase font-bold">Operator Callsign</span><span className="text-white font-bold text-sm mt-0.5 block">DIVYA</span></div>
                <div className="bg-slate-900/30 border border-slate-900 p-3 rounded-xl"><span className="text-slate-500 block text-[10px] uppercase font-bold">Access Node Status</span><span className="text-[#a3e635] font-bold text-sm mt-0.5 block">Free Active Node</span></div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}