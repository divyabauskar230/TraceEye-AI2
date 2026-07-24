"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Search, Shield, Clock, Mail, Phone, User, Globe, FileText, Lock, 
  Link2, Bitcoin, Server, Landmark, ArrowRight, Target, Network, Layers, ArrowUpRight, History, Settings, LogOut, Loader2, Menu, X, Zap, Trash2, AlertCircle
} from "lucide-react";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("email");
  const [inputValue, setInputValue] = useState("");
  const [selectedCountryCode, setSelectedCountryCode] = useState("+91"); 
  const [isDeepSearch, setIsDeepSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  // 🚨 ERROR POPUP STATE
  const [errorMessage, setErrorMessage] = useState("");

  // 📱 Mobile Sidebar Toggle
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 👤 DYNAMIC USER & LIVE CREDITS STATE
  const [user, setUser] = useState(null);
  const [credits, setCredits] = useState(2);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // 🌍 जगातील सर्व मुख्य देशांचे कोड्स आणि झेंडे
  const countryCodes = [
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "United States", code: "+1", flag: "🇺🇸" },
    { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
    { name: "Brazil", code: "+55", flag: "🇧🇷" },
    { name: "United Arab Emirates", code: "+971", flag: "🇦🇪" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "Canada", code: "+1", flag: "🇨🇦" },
    { name: "Australia", code: "+61", flag: "🇦🇺" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Japan", code: "+81", flag: "🇯🇵" },
    { name: "China", code: "+86", flag: "🇨🇳" },
    { name: "Russia", code: "+7", flag: "🇷🇺" },
    { name: "Saudi Arabia", code: "+966", flag: "🇸🇦" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "Bangladesh", code: "+880", flag: "🇧🇩" },
    { name: "South Africa", code: "+27", flag: "🇿🇦" },
    { name: "Italy", code: "+39", flag: "🇮🇹" },
    { name: "Spain", code: "+34", flag: "🇪🇸" },
    { name: "Mexico", code: "+52", flag: "🇲🇽" },
    { name: "Argentina", code: "+54", flag: "🇦🇷" }
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const emailParam = urlParams.get("email");
      const nameParam = urlParams.get("name");

      if (emailParam) {
        const userData = { name: nameParam || emailParam.split("@")[0], email: emailParam };
        setUser(userData);
        localStorage.setItem("footpryx_user", JSON.stringify(userData));
        localStorage.setItem("footpryx_credits", "2");
        setCredits(2);
      } else {
        const savedUser = localStorage.getItem("footpryx_user");
        if (savedUser) {
          try {
            setUser(JSON.parse(savedUser));
          } catch (e) {
            console.error("User session parse error", e);
          }
        }
      }

      const savedCredits = localStorage.getItem("footpryx_credits");
      if (savedCredits !== null) {
        setCredits(parseInt(savedCredits, 10));
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("footpryx_user");
    localStorage.removeItem("footpryx_credits");
    setUser(null);
    window.location.href = "/auth/login";
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account?")) {
      localStorage.removeItem("footpryx_user");
      localStorage.removeItem("footpryx_credits");
      setUser(null);
      window.location.href = "/auth/register";
    }
  };

  const tabs = [
    { id: "email", label: "Email", icon: <Mail size={14} />, placeholder: "email@example.com" },
    { id: "phone", label: "Phone", icon: <Phone size={14} />, placeholder: "Area code + number — e.g., 91234-5678" },
    { id: "username", label: "Username", icon: <User size={14} />, placeholder: "e.g., admin_recon" },
    { id: "domain", label: "Domain", icon: <Globe size={14} />, placeholder: "example.com" },
    { id: "cpf", label: "CPF", icon: <FileText size={14} />, placeholder: "Enter CPF identifier" },
    { id: "password", label: "Password", icon: <Lock size={14} />, placeholder: "Enter password" },
    { id: "name", label: "Name", icon: <User size={14} />, placeholder: "Enter full name" },
    { id: "link", label: "Link", icon: <Link2 size={14} />, placeholder: "https://example.com" },
    { id: "blockchain", label: "Blockchain", icon: <Bitcoin size={14} />, placeholder: "Wallet address" },
    { id: "ip", label: "IP", icon: <Server size={14} />, placeholder: "e.g., 192.168.1.1" },
    { id: "cnpj", label: "CNPJ", icon: <Landmark size={14} />, placeholder: "Enter corporate registration number..." },
  ];

  const currentTab = tabs.find(t => t.id === activeTab);

  const validateInput = () => {
    const val = inputValue.trim();
    if (!val) return "Please enter a search target.";

    if (activeTab === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        return "Invalid format! Please enter a valid email address (e.g., name@example.com).";
      }
    } else if (activeTab === "phone") {
      const phoneRegex = /^[0-9]{7,15}$/;
      if (!phoneRegex.test(val)) {
        return "Invalid format! Please enter valid phone number digits (e.g., 9876543210).";
      }
    } else if (activeTab === "ip") {
      const ipRegex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (!ipRegex.test(val)) {
        return "Invalid format! Please enter a valid IPv4 address (e.g., 192.168.1.1).";
      }
    } else if (activeTab === "domain" || activeTab === "link") {
      if (val.length < 3 || !val.includes(".")) {
        return "Invalid format! Please enter a valid domain or URL (e.g., example.com).";
      }
    }
    return null;
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    
    const finalQuery = activeTab === "phone" ? `${selectedCountryCode} ${inputValue.trim()}` : inputValue.trim();

    const error = validateInput();
    if (error) {
      setErrorMessage(error);
      return;
    }

    if (credits <= 0) {
      setErrorMessage("You have 0 credits remaining! Please upgrade your plan to continue searching.");
      return;
    }

    setIsLoading(true);
    setResult(null);

    let foundCount = "0";
    let scanTypeLabel = currentTab ? currentTab.label : "Email";

    try {
      const scanRes = await fetch("https://footpryx-backend.onrender.com/api/osint/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scan_type: activeTab,
          scan_query: finalQuery
        })
      });
      const scanData = await scanRes.json();
      setResult(scanData);
      foundCount = scanData.accounts_found || "4";
    } catch (err) {
      console.error("API Call Error:", err);
      const fallbackResult = {
        scan_type: activeTab,
        scan_query: finalQuery,
        accounts_found: "4",
        sources_count: "183",
        risk_level: "MED"
      };
      setResult(fallbackResult);
      foundCount = "4";
    } finally {
      setIsLoading(false);

      const newCredits = Math.max(0, credits - 1);
      setCredits(newCredits);
      localStorage.setItem("footpryx_credits", newCredits.toString());

      const newLog = {
        type: scanTypeLabel,
        query: finalQuery,
        found: foundCount,
        time: "Just now"
      };

      const existingHistory = JSON.parse(localStorage.getItem("footpryx_history") || "[]");
      localStorage.setItem("footpryx_history", JSON.stringify([newLog, ...existingHistory]));
    }
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white flex font-sans selection:bg-[#a3e635] selection:text-black relative overflow-x-hidden">
      
      {/* MOBILE SIDEBAR BACKDROP */}
      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" />
      )}

      {/* 🚨 ERROR POPUP MODAL */}
      {errorMessage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0b0f19] border border-red-900/60 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl text-center relative">
            <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(239,68,68,0.2)]">
              <AlertCircle size={24} />
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-extrabold text-white">Notice</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {errorMessage}
              </p>
            </div>

            <button 
              onClick={() => setErrorMessage("")}
              className="w-full bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(163,230,53,0.3)] active:scale-95"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#0a0d1a] border-r border-slate-900/80 p-5 flex flex-col justify-between transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:relative shrink-0`}>
        <div>
          <div className="flex items-center justify-between mb-8 p-1">
         <div className="flex items-center gap-3">
  <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-xl object-cover border border-slate-800" />
  <div>
    <h1 className="text-sm font-bold tracking-wide text-white">footpryx</h1>
    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">FOOTPRINT INTELLIGENCE</p>
  </div>
</div>
            <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white p-1">
              <X size={18} />
            </button>
          </div>

          <p className="text-[10px] font-bold text-slate-600 tracking-wider uppercase mb-3 px-2">WORKSPACE</p>

          <nav className="space-y-1">
            <Link href="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold bg-[#141a2e] text-[#a3e635] border border-slate-800/80 shadow-sm">
              <Search size={16} /> Search
            </Link>
            <Link href="/investigations" className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900/50 transition-all">
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

        {/* 🟢 LIVE CREDITS & DYNAMIC USER PROFILE FOOTER */}
        <div className="space-y-3 pt-4 border-t border-slate-900/80 font-medium relative">
          
          {user && (
            <div className="flex items-center justify-between bg-slate-900/40 px-3 py-2 rounded-xl border border-slate-800/60 text-xs">
              <span className="flex items-center gap-1.5 text-[#a3e635] font-bold">
                <Zap size={14} /> {credits}/2
              </span>
              <span className="text-slate-400 text-[11px]">credits</span>
            </div>
          )}

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
                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
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

      {/* MAIN VIEWPORT */}
      <main className="flex-1 flex flex-col justify-between px-4 md:px-12 py-6 overflow-y-auto min-h-screen">
        
        {/* Top Header */}
        <div className="flex items-center justify-between w-full max-w-4xl mx-auto pt-2">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="md:hidden p-2.5 bg-[#0b0f19] border border-slate-800/80 rounded-xl text-slate-300 hover:text-white transition">
            <Menu size={18} />
          </button>
          <div className="md:hidden"></div>
          <button onClick={() => window.location.href = "/pricing"} className="bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wide transition-all shadow-[0_0_15px_rgba(163,230,53,0.2)] flex items-center gap-1.5 ml-auto">
            <Zap size={14} fill="black" /> Subscribe
          </button>
        </div>

        {/* Center Search Content */}
        <div className="w-full max-w-2xl mx-auto space-y-8 my-auto py-10">
          
          <div className="text-center space-y-2 flex flex-col items-center">
  <img src="/logo.png" alt="Footpryx Logo" className="w-12 h-12 rounded-2xl object-cover border border-slate-800 mb-2 shadow-lg" />
  <h2 className="text-3xl font-bold tracking-tight text-white">
    {user ? `Hello, ${user.name.split(" ")[0]}.` : "footpryx OSINT"}
  </h2>
  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
    Search by email, phone, username, domain, CPF, CNPJ or name across hundreds of open sources
  </p>
</div>

          <div className="bg-[#0b0f19] border border-slate-900 rounded-2xl p-3 shadow-xl overflow-x-auto">
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5 min-w-[320px]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => { setActiveTab(tab.id); setInputValue(""); setResult(null); }}
                  className={`flex items-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold transition-all ${activeTab === tab.id ? "bg-[#141a2e] border border-slate-800 text-[#a3e635]" : "text-slate-500 hover:text-slate-300"}`}
                >
                  {tab.icon} <span className="text-[11px] truncate">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSearch} className="space-y-4">
            <div className="relative flex items-center bg-[#0b0f19] border border-slate-900 rounded-2xl p-1 shadow-xl">
              <div className="pl-4 text-slate-500 flex items-center gap-2">
                <Search size={16} />

                {activeTab === "phone" && (
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="bg-transparent text-xs text-white focus:outline-none cursor-pointer border-r border-slate-800 pr-2 font-mono py-1"
                  >
                    {countryCodes.map((c, index) => (
                      <option key={index} value={c.code} className="bg-[#0b0f19] text-white">
                        {c.flag} {c.code} ({c.name})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <input
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={currentTab?.placeholder}
                className="w-full bg-transparent pl-3 pr-4 py-3.5 text-xs text-white placeholder-slate-600 focus:outline-none"
              />

              <button type="submit" disabled={isLoading} className="bg-[#a3e635] text-black p-3.5 rounded-xl flex items-center justify-center hover:bg-emerald-400 transition disabled:opacity-50 flex-shrink-0">
                {isLoading ? <Loader2 size={16} className="animate-spin" /> : <ArrowRight size={16} />}
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Search size={12} /> Deep search</span>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={isDeepSearch} onChange={() => setIsDeepSearch(!isDeepSearch)} className="sr-only peer" />
                <div className="relative w-8 h-4 bg-slate-800 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-slate-400 after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white"></div>
              </label>
            </div>
          </form>

          {!result && !isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1 shadow-lg">
                <Search size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">200+ Sources</h4><p className="text-[10px] text-slate-500">Databases and public records.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1 shadow-lg">
                <Clock size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">~8 seconds</h4><p className="text-[10px] text-slate-500">Average execution speed response.</p>
              </div>
              <div className="bg-[#0b0f19] border border-slate-900/60 rounded-xl p-4 space-y-1 shadow-lg">
                <Shield size={16} className="text-[#a3e635]" /><h4 className="text-xs font-bold text-slate-200">GDPR compliant</h4><p className="text-[10px] text-slate-500">All information curated ethically.</p>
              </div>
            </div>
          )}

          {result && (
            <div className="space-y-6 my-6">
              <div className="text-center space-y-2">
                <span className="bg-[#a3e635]/10 border border-[#a3e635]/30 text-[#a3e635] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase tracking-widest">
                  PREVIEW
                </span>
                <h3 className="text-lg md:text-xl font-extrabold text-white">
                  Possible exposed data for <span className="text-[#a3e635] font-mono">«{result.scan_query}»</span>
                </h3>
                <p className="text-[11px] text-slate-400">Unlock your plan to reveal names, profiles, photos and the full dossier.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "Adobe", category: "Account", logo: "🎨" },
                  { name: "Twitter / X", category: "Social Network", logo: "𝕏" },
                  { name: "Netflix", category: "Media", logo: "🎬" },
                  { name: "LinkedIn", category: "Professional", logo: "💼" },
                ].map((card, idx) => (
                  <div key={idx} className="relative border border-slate-800 bg-[#080b12] rounded-2xl p-5 overflow-hidden shadow-2xl flex flex-col justify-between h-36">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm">{card.logo}</div>
                      <div>
                        <h4 className="text-xs font-extrabold text-white">{card.name}</h4>
                        <p className="text-[10px] text-slate-500">{card.category}</p>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-[2px] z-10">
                      <div className="w-7 h-7 rounded-full bg-[#a3e635]/10 border border-[#a3e635]/30 flex items-center justify-center text-[#a3e635] mb-1">
                        <Lock size={12} />
                      </div>
                      <button onClick={() => window.location.href = "/pricing"} className="bg-[#a3e635] hover:bg-emerald-400 text-black px-3 py-1 rounded-lg text-[10px] font-extrabold uppercase tracking-wider transition-all">
                        Unlock
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => window.location.href = "/pricing"}
                  className="bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold px-10 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-[0_0_25px_rgba(163,230,53,0.35)] active:scale-95"
                >
                  Unlock results →
                </button>
              </div>
            </div>
          )}

        </div>

        <div></div>
      </main>
    </div>
  );
}