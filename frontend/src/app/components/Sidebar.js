"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Search, Shield, Cpu, History, Settings, LogOut, Layers, Target, Network, CreditCard, Eye
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-emerald-950/60 bg-black flex flex-col justify-between flex-shrink-0 h-full font-sans antialiased text-emerald-500">
      <div className="space-y-6">
        
   {/* Logo Section */}
<div className="p-6 border-b border-emerald-950/60 flex flex-col gap-1">
  <div className="flex items-center gap-2.5">
    <img src="/logo.png" alt="Footpryx Logo" className="w-7 h-7 rounded-lg object-cover border border-emerald-800/60" />
    <span className="text-white font-extrabold text-sm tracking-wide uppercase">
      FOOTPRYX <span className="text-emerald-500">//</span> <span className="text-[#a3e635]">CORE</span>
    </span>
  </div>
  <span className="text-[9px] text-emerald-800 font-medium uppercase tracking-wide">
    FOOTPRINT_ENGINE:V4
  </span>
</div>

        {/* Workspace Node Label */}
        <div className="px-6 text-[9px] font-bold text-emerald-900 uppercase tracking-wider">
          // WORKSPACE_NODES
        </div>

        {/* Navigation Vectors - Linked to Separate Pages */}
        <nav className="px-4 space-y-2">
          <Link 
            href="/dashboard"
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-xs font-bold uppercase transition-all text-left ${
              pathname === "/dashboard" 
                ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/40 shadow-[0_0_15px_rgba(163,230,53,0.05)]" 
                : "text-emerald-600 border-transparent hover:text-emerald-400"
            }`}
          >
            <Cpu size={14} /> 
            <div>
              <p className="leading-none">CONSOLE SEARCH</p>
              <p className="text-[8px] text-emerald-800 font-normal normal-case mt-0.5">Deploy live target queries</p>
            </div>
          </Link>

          <Link 
            href="/investigations"
            className={`w-full flex items-center justify-between px-4 py-2.5 rounded border text-xs font-bold uppercase transition-all text-left ${
              pathname === "/investigations" 
                ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/40" 
                : "text-emerald-600 border-transparent hover:text-emerald-400"
            }`}
          >
            <span className="flex items-center gap-3"><Target size={14} /> INVESTIGATIONS</span>
            <span className="bg-emerald-950 text-emerald-400 border border-emerald-800/60 text-[8px] font-extrabold px-1.5 py-0.5 rounded">STABLE</span>
          </Link>

          <Link 
            href="/history"
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded border text-xs font-bold uppercase transition-all text-left ${
              pathname === "/history" 
                ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/40" 
                : "text-emerald-600 border-transparent hover:text-emerald-400"
            }`}
          >
            <History size={14} /> SYSTEM LOGS
          </Link>

          <Link 
            href="/settings"
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded border text-xs font-bold uppercase transition-all text-left ${
              pathname === "/settings" 
                ? "bg-emerald-950/20 text-[#a3e635] border-emerald-800/40" 
                : "text-emerald-600 border-transparent hover:text-emerald-400"
            }`}
          >
            <Settings size={14} /> NODE CONFIG
          </Link>
        </nav>

        {/* Bottom Core Monitor Box */}
        <div className="px-4">
          <div className="border border-emerald-950/80 bg-emerald-950/5 rounded-xl p-4 space-y-1">
            <div className="text-[9px] text-[#a3e635] font-bold uppercase tracking-wider flex items-center gap-1">
              [ <span className="animate-pulse">●</span> CORE_MONITOR ]
            </div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wide">HIGH VELOCITY STREAMS</h4>
            <p className="text-[9px] text-emerald-800 leading-normal font-medium">
              Dedicated operational matrix optimized for due diligence and forensic packet analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Footer System Session Actions */}
      <div className="p-4 border-t border-emerald-950/60 space-y-3">
        <button 
          onClick={() => window.location.href = '/auth/login'} 
          className="w-full flex items-center gap-2 px-4 py-1 text-xs font-bold uppercase tracking-wide text-emerald-500 hover:text-emerald-400 transition-colors"
        >
          <LogOut size={12} className="rotate-180" /> SIGN IN
        </button>

        <Link 
          href="/pricing"
          className="w-full bg-[#a3e635] hover:bg-[#bef264] text-black text-xs font-extrabold py-2.5 px-4 rounded-xl transition active:scale-[0.98] uppercase tracking-wide shadow-md flex items-center justify-center gap-2"
        >
          <CreditCard size={14} /> GENERATE TOKEN
        </Link>
      </div>
    </aside>
  );
}