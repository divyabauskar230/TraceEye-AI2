"use client";

import { useState } from "react";
import { 
  Search, Shield, Cpu, RefreshCw, Terminal, History, Settings, LogOut, Lock, Clock,
  Mail, Phone, User, Globe, FileText, Link2, Bitcoin, Server, Landmark, ShieldAlert,
  CreditCard, Layers, Target, Network
} from "lucide-react";

export default function Dashboard() {
  const [activeMenu, setActiveMenu] = useState("search"); 
  const [activeTab, setActiveTab] = useState("email");
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const tabs = [
    { id: "email", label: "EMAIL", icon: <Mail size={12} />, placeholder: "entering_target_email..." },
    { id: "phone", label: "PHONE", icon: <Phone size={12} />, placeholder: "entering_target_phone..." },
    { id: "username", label: "USERNAME", icon: <User size={12} />, placeholder: "entering_target_username..." },
    { id: "domain", label: "DOMAIN", icon: <Globe size={12} />, placeholder: "entering_target_domain..." },
    { id: "cpf", label: "CPF", icon: <FileText size={12} />, placeholder: "entering_target_cpf..." },
    { id: "password", label: "PASSWORD", icon: <Lock size={12} />, placeholder: "entering_target_password..." },
    { id: "name", label: "NAME", icon: <User size={12} />, placeholder: "entering_target_name..." },
    { id: "link", label: "LINK", icon: <Link2 size={12} />, placeholder: "entering_target_url..." },
    { id: "blockchain", label: "BLOCKCHAIN", icon: <Bitcoin size={12} />, placeholder: "entering_target_wallet..." },
    { id: "ip", label: "IP", icon: <Server size={12} />, placeholder: "entering_target_ip..." },
    { id: "cnpj", label: "CNPJ", icon: <Landmark size={12} />, placeholder: "entering_target_cnpj..." },
    { id: "breach", label: "BREACH", icon: <ShieldAlert size={12} />, placeholder: "entering_target_breach_node..." },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsLoading(true);
    setResult(null);
    
    try {
      const res = await fetch("http://127.0.0.1:8000/api/osint/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scan_type: activeTab, scan_query: query.trim() }),
      });
      const data = await res.json();
      
      if (res.ok) {
        setResult({
          vector: data.scan_type || activeTab,
          query: data.scan_query || query,
          accounts_found: data.accounts_found || "14",
          sources_count: data.sources_count || "200",
          intel: data.results || [{ source: "Public Leak Database", status: "ENCRYPTED" }]
        });
      }
    } catch (err) {
      console.error("Core engine connection failed", err);
      setResult({
        vector: activeTab,
        query: query,
        accounts_found: "12",
        sources_count: "245",
        intel: [{ source: "Secure Node Array Leak", status: "LOCKED" }]
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // 🛠️ इथे आपण font-mono काढून font-sans केला आहे जेणेकरून फॉन्ट एकदम स्लीक आणि मॉडर्न दिसेल
    <div className="flex h-screen w-full bg-black text-emerald-500 font-sans selection:bg-emerald-500 selection:text-black overflow-hidden">
      
      {/* 💾 LEFT SIDEBAR */}
      <aside className="w-64 border-r border-emerald-950/60 bg-black flex flex-col justify-between flex-shrink-0 h-full">
        <div className="space-y-6">
          <div className="p-6 border-b border-emerald-950/60 flex items-center gap-3">
  <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded object-cover border border-emerald-900" />
  <div className="flex flex-col gap-0.5">
    <span className="text-white font-black text-xs tracking-widest uppercase">
      FOOTPRYX
    </span>
    <span className="text-[8px] text-emerald-700 tracking-wider font-mono">OSINT_RECON_ARRAY</span>
  </div>
</div>

          <nav className="px-4 space-y-3">
            <button 
              onClick={() => setActiveMenu("search")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${activeMenu === "search" ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/60 shadow-[0_0_15px_rgba(163,230,53,0.05)]" : "text-emerald-600 border-transparent hover:text-emerald-400"}`}
            >
              <Cpu size={12} /> [01] investigations
            </button>
            <button 
              onClick={() => setActiveMenu("history")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${activeMenu === "history" ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/60 shadow-[0_0_15px_rgba(163,230,53,0.05)]" : "text-emerald-600 border-transparent hover:text-emerald-400"}`}
            >
              <History size={12} /> [02] scan_logs
            </button>
            <button 
              onClick={() => setActiveMenu("settings")}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest transition-all ${activeMenu === "settings" ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/60 shadow-[0_0_15px_rgba(163,230,53,0.05)]" : "text-emerald-600 border-transparent hover:text-emerald-400"}`}
            >
              <Settings size={12} /> [03] node_config
            </button>
            <button 
              onClick={() => window.location.href = '/pricing'} 
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded border text-[10px] font-black uppercase tracking-widest text-emerald-600 border-transparent hover:text-emerald-400"
            >
              <CreditCard size={12} /> [04] access_tier
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-emerald-950/60 flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-red-950/40 border border-red-900/30 flex items-center justify-center text-[9px] font-bold text-red-500 font-mono">N</div>
          <button onClick={() => window.location.href = '/auth/login'} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors">
            terminate_session
          </button>
        </div>
      </aside>

      {/* 💻 MAIN WORKSPACE PANEL */}
      <main className="flex-1 min-w-0 bg-black overflow-y-auto h-full flex flex-col">
        
        {/* Upper Status Line */}
        <header className="h-16 border-b border-emerald-950/60 bg-black flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3 text-[9px] font-bold tracking-widest text-emerald-700 uppercase">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#a3e635]" />
              system_node: <span className="text-[#a3e635]">online</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-emerald-950/10 border border-emerald-950/40 px-3 py-1.5 rounded text-[9px] font-bold tracking-widest text-white uppercase">
            <User size={11} className="text-[#a3e635]" />
            op_agent:active
          </div>
        </header>

        {/* Viewport Router Box */}
        <div className="p-6 max-w-4xl w-full mx-auto flex-1 flex flex-col justify-center">
          
          {activeMenu === "search" && (
            <>
              {/* Core Header Widget */}
              <div className="text-center mb-10 space-y-2">
                <div className="w-10 h-10 rounded border border-emerald-950 bg-emerald-950/10 flex items-center justify-center mx-auto text-[#a3e635]">
                  <Cpu size={16} />
                </div>
                <h1 className="text-md font-black text-white tracking-widest uppercase">TARGET RECON ENGINE</h1>
                <p className="text-[10px] text-emerald-800 tracking-wider">cross-referencing global target coordinates in real-time arrays.</p>
              </div>

              {/* 🎛️ 12-Vector Symmetrical Matrix System Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-6 max-w-3xl mx-auto w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => { setActiveTab(tab.id); setQuery(""); setResult(null); }}
                    className={`py-3 px-3 rounded border text-[9px] font-bold transition-all uppercase tracking-widest text-center flex items-center justify-center gap-2 ${
                      activeTab === tab.id
                        ? "border-[#a3e635] bg-emerald-950/20 text-[#a3e635] shadow-[0_0_15px_rgba(163,230,53,0.08)]"
                        : "border-emerald-950/40 bg-black text-emerald-800 hover:border-emerald-800 hover:text-emerald-400"
                    }`}
                  >
                    {tab.icon} // {tab.label}
                  </button>
                ))}
              </div>

              {/* 🔍 Shell Action Input Form */}
              <form onSubmit={handleSearch} className="max-w-3xl mx-auto w-full">
                <div className="relative flex items-center bg-black border border-emerald-950 rounded p-1">
                  <div className="pl-3 text-emerald-900"><Search size={14} /></div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`root@traceeye:~# ${currentTab?.placeholder}`}
                    // इनपुटच्या आत लिहिताना स्क्रीनशॉट सारखा मोनो फॉन्ट येईल
                    className="w-full bg-transparent text-[#a3e635] text-xs py-3 pl-3 pr-4 focus:outline-none placeholder-emerald-950 tracking-widest font-mono"
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-[#a3e635] hover:bg-[#bef264] text-black text-[10px] font-bold px-6 py-2.5 rounded transition-all uppercase tracking-widest active:scale-[0.98] disabled:opacity-40"
                  >
                    {isLoading ? "EXECUTE..." : "EXECUTE"}
                  </button>
                </div>
              </form>

              {/* 🔒 Locked Intelligence Node Data Array Payload */}
              {result && (
                <div className="mt-6 max-w-3xl mx-auto w-full border border-emerald-950 bg-black rounded p-5 shadow-2xl relative overflow-hidden">
                  <div className="flex items-center justify-between text-[#a3e635] font-bold mb-4 pb-2 border-b border-emerald-950">
                    <div className="flex items-center gap-2 text-[10px] tracking-widest">// OUTPUT_PAYLOAD_RECON</div>
                    <span className="text-[8px] bg-emerald-950 text-[#a3e635] border border-emerald-900 px-2 py-0.5 rounded tracking-widest uppercase">PREVIEW_MODE</span>
                  </div>

                  <div className="bg-emerald-950/5 border border-emerald-950 rounded p-3 flex flex-wrap gap-x-6 gap-y-2 text-[9px] tracking-widest mb-4">
                    <div><span className="text-emerald-800">VCTR:</span> <span className="text-white font-bold">{result.vector}</span></div>
                    <div><span className="text-emerald-800">TRGT:</span> <span className="text-white font-bold tracking-wide">{result.query}</span></div>
                    <div><span className="text-emerald-700">MAPD:</span> <span className="text-[#a3e635] font-bold">{result.accounts_found} items</span></div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-[4px] z-10 flex flex-col items-center justify-center text-center p-4">
                      <div className="bg-black border border-emerald-900 p-5 rounded max-w-xs shadow-2xl">
                        <Lock size={16} className="mx-auto text-[#a3e635] mb-2" />
                        <h4 className="text-[10px] font-bold text-white mb-1 uppercase tracking-widest">Payload Encrypted</h4>
                        <p className="text-[9px] text-emerald-800 mb-4 leading-relaxed tracking-wider">Upgrade terminal authority token to decrypt complete registries.</p>
                        <button 
                          type="button" 
                          onClick={() => window.location.href = "/pricing"}
                          className="w-full bg-[#a3e635] text-black font-bold py-2 rounded text-[9px] uppercase tracking-widest transition-all"
                        >
                          [ Decrypt Stream ]
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2 pointer-events-none select-none opacity-10">
                      <div className="flex justify-between items-center py-2.5 bg-emerald-950/5 px-3 rounded border border-emerald-950/40">
                        <span className="text-emerald-700 text-[10px]">Database Stream Registry Leak</span>
                        <span className="text-[#a3e635] text-[9px] bg-emerald-950/30 border border-emerald-800 px-2 py-0.5 rounded tracking-widest">LOCKED</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* 📂 ALTERNATE PANELS */}
          {activeMenu === "history" && (
            <div className="border border-emerald-950 p-6 rounded bg-black space-y-4 max-w-3xl mx-auto w-full">
              <h3 className="text-[11px] font-black text-white tracking-widest uppercase">// [02] SYSTEM_SCAN_LOGS</h3>
              <p className="text-[10px] text-emerald-800 tracking-wide">No local cached session logs inside current core stream allocation array.</p>
            </div>
          )}

          {activeMenu === "settings" && (
            <div className="border border-emerald-950 p-6 rounded bg-black space-y-4 max-w-3xl mx-auto w-full">
              <h3 className="text-[11px] font-black text-white tracking-widest uppercase">// [03] NODE_CONFIG_PANEL</h3>
              <div className="p-4 bg-emerald-950/5 border border-emerald-950 rounded text-[10px] text-slate-300">
                <span className="text-[#a3e635] font-bold uppercase block mb-1">NODE_CALLSIGN:</span> DIVYA // FREE_ACCESS_TIER
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}