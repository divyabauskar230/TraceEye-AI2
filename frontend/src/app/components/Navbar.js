"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  Shield, Menu, X, Grid, Search, 
  History, Settings, ShieldAlert, LogIn, UserPlus, Terminal 
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-40 bg-black/80 backdrop-blur-md border-b border-emerald-950 h-20 flex items-center font-mono">
        <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
          
          {/* Logo Group */}
       <Link href="/" className="flex items-center gap-3 group">
  <img src="/logo.png" alt="Footpryx Logo" className="w-10 h-10 rounded-lg object-cover border border-emerald-900/60 shadow-[0_0_15px_rgba(163,230,53,0.1)]" />
  <div>
    <h1 className="text-sm font-black text-white tracking-widest uppercase">
      Footpryx // <span className="text-[#a3e635]">OSINT</span>
    </h1>
    <p className="text-[9px] text-emerald-700 tracking-widest uppercase font-bold">CYBER INTELLIGENCE</p>
  </div>
</Link>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-[11px] font-bold text-emerald-600 hover:text-[#a3e635] uppercase tracking-widest transition-all">// search_console</Link>
            <Link href="/auth/login" className="text-[11px] font-bold text-emerald-600 hover:text-[#a3e635] uppercase tracking-widest transition-all">// sign_in</Link>
          </nav>

          {/* Desktop Right Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Link href="/dashboard" className="text-[11px] font-black bg-[#a3e635] hover:bg-[#bef264] text-black px-4 py-2 rounded-md transition-all uppercase tracking-widest active:scale-[0.98]">
              [ LAUNCH_CONSOLE ]
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsOpen(true)}
            className="md:hidden w-10 h-10 rounded-lg border border-emerald-950 bg-black flex items-center justify-center text-emerald-500 hover:text-[#a3e635] transition-all"
          >
            <Menu size={18} />
          </button>
        </div>
      </header>

      {/* --- REAL OSINT SIDEBAR DRAWER --- */}
      <div className={`fixed inset-0 z-50 transition-all duration-300 font-mono ${isOpen ? "visible pointer-events-auto" : "invisible pointer-events-none"}`}>
        
        {/* Dark Backdrop Background */}
        <div 
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"}`}
        />

        {/* Sidebar Panel */}
        <div className={`absolute top-0 left-0 h-full w-[280px] bg-black border-r border-emerald-950 p-5 flex flex-col justify-between transition-transform duration-300 shadow-2xl ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          
          <div>
            {/* Top Header Group */}
            <div className="flex items-center justify-between border-b border-emerald-950 pb-4 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-md bg-emerald-950/30 border border-emerald-900/60 flex items-center justify-center text-[#a3e635]">
                  <Shield size={14} />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white tracking-widest uppercase">TraceEye</h4>
                  <p className="text-[9px] text-emerald-700 font-bold">CORE_LAYER:V4</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-md border border-emerald-950 bg-black flex items-center justify-center text-emerald-500 hover:text-[#a3e635] transition-all"
              >
                <X size={14} />
              </button>
            </div>

            {/* Workspace Label */}
            <p className="text-[9px] font-bold tracking-widest text-emerald-800 uppercase mb-3">// WORKSPACE_NODES</p>

            {/* Links Stack */}
            <div className="space-y-2">
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center gap-3 p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-[#a3e635] transition-all">
                <Grid size={14} />
                <div className="text-left">
                  <p className="text-[11px] font-bold uppercase tracking-wider leading-none">Console Search</p>
                  <span className="text-[9px] text-emerald-700 font-normal">Deploy live target queries</span>
                </div>
              </Link>

              <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-emerald-950/10 text-emerald-600 hover:text-[#a3e635] border border-transparent hover:border-emerald-950/40 transition-all group">
                <div className="flex items-center gap-3">
                  <Search size={14} />
                  <p className="text-[11px] font-bold text-left uppercase tracking-wider">Investigations</p>
                </div>
                <span className="text-[8px] bg-emerald-950 text-[#a3e635] border border-emerald-900 px-1 rounded font-bold">STABLE</span>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-950/10 text-emerald-600 hover:text-[#a3e635] border border-transparent hover:border-emerald-950/40 transition-all">
                <History size={14} />
                <p className="text-[11px] font-bold text-left uppercase tracking-wider">System Logs</p>
              </button>

              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-950/10 text-emerald-600 hover:text-[#a3e635] border border-transparent hover:border-emerald-950/40 transition-all">
                <Settings size={14} />
                <p className="text-[11px] font-bold text-left uppercase tracking-wider">Node Config</p>
              </button>
            </div>

            {/* Control Center Banner Box */}
            <div className="mt-6 border border-emerald-950 bg-emerald-950/5 rounded-lg p-4">
              <div className="flex items-center gap-1.5 text-[#a3e635] font-bold text-[9px] mb-1.5 tracking-widest">
                <ShieldAlert size={12} />
                <span>[ CORE_MONITOR ]</span>
              </div>
              <h5 className="text-[11px] font-bold text-white mb-1 uppercase tracking-wider">High Velocity Streams</h5>
              <p className="text-[9px] text-emerald-700 leading-relaxed tracking-wide">
                Dedicated operational matrix optimized for due diligence and forensic packet analysis.
              </p>
            </div>
          </div>

          {/* Bottom Auth Buttons */}
          <div className="border-t border-emerald-950 pt-4 space-y-2">
            <Link 
              href="/auth/login" 
              onClick={() => setIsOpen(false)}
              className="w-full py-2 flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-600 hover:text-white uppercase tracking-widest transition-all"
            >
              <LogIn size={12} />
              Sign in
            </Link>
            <Link 
              href="/auth/register" 
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 bg-[#a3e635] hover:bg-[#bef264] text-black font-black text-[11px] rounded-md flex items-center justify-center gap-2 uppercase tracking-widest transition-all"
            >
              <UserPlus size={12} />
              Generate Token
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}