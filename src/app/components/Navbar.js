"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Eye } from 'lucide-react'; //  Lucide-React चा Eye आयकॉन इंपोर्ट केला आहे

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-[#030712]/90 backdrop-blur-md border-b border-gray-800/60 px-6 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* १. ब्रँड लोगो + नेम (footpryx with Eye Icon) */}
   <Link href="/" className="flex items-center space-x-3 group">
  <img src="/logo.png" alt="Footpryx Logo" className="w-9 h-9 rounded-xl object-cover border border-emerald-500/30 group-hover:border-emerald-500/80 transition-all" />
  <div className="flex flex-col">
    <div className="flex items-center space-x-1.5">
      <span className="text-white font-bold text-base tracking-tight group-hover:text-emerald-400 transition-colors uppercase">
        footpryx
      </span>
      <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-1.5 py-0.5 rounded border border-emerald-500/20">
        AI
      </span>
    </div>
    <span className="text-[10px] text-gray-400 font-mono tracking-wider uppercase">
      Footprint Intelligence Engine
    </span>
  </div>
</Link>

        {/* २. नेव्हिगेशन लिंक्स */}
        <nav className="hidden md:flex items-center space-x-1 bg-gray-900/60 p-1.5 rounded-full border border-gray-800/80">
          <Link 
            href="/dashboard" 
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
              pathname === "/dashboard" 
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" 
                : "text-gray-300 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            Search
          </Link>

          <Link 
            href="/pricing" 
            className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
              pathname === "/pricing" 
                ? "text-emerald-400 bg-emerald-500/10 border border-emerald-500/20" 
                : "text-gray-300 hover:text-white hover:bg-gray-800/60"
            }`}
          >
            Pricing
          </Link>

          <Link 
            href="/pricing" 
            className="px-4 py-1.5 text-xs font-medium text-gray-300 hover:text-white hover:bg-gray-800/60 rounded-full transition-all"
          >
            Enterprise
          </Link>
        </nav>

        {/* ३. ॲक्शन बटन्स (Sign In + Launch Console) */}
        <div className="flex items-center space-x-3">
          <Link 
            href="/auth/login" 
            className="text-xs font-medium text-gray-300 hover:text-white px-3 py-2 transition-colors"
          >
            Sign In
          </Link>

          <Link 
            href="/dashboard" 
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-semibold rounded-lg group bg-gradient-to-br from-emerald-500 to-teal-600 text-white hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95"
          >
            <span className="px-4 py-2 bg-gray-950 rounded-[6px] transition-all duration-75 ease-in group-hover:bg-transparent font-mono tracking-wide">
              Launch Console →
            </span>
          </Link>
        </div>

      </div>
    </header>
  );
}