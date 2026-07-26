"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // 🟢 नवीन ॲड केलेले: जर युजर आधीच लॉग्ड इन असेल तर थेट डॅशबोर्डवर पाठवा
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (savedUser) {
        router.push("/dashboard");
      }
    }
  }, [router]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/auth/register?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push("/auth/register");
    }
  };
  const words = ["any target", "any email", "any phone", "any username"];
  const [index, setIndex] = useState(0);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000); // दर २ सेकंदांनी शब्द बदलेल
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      
      {/* 🌐 NAVBAR SECTION (Fixed at top) */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-900 px-6 py-4 flex items-center justify-between">
       {/* Logo */}
<div className="flex items-center gap-3">
  <img src="/logo.png" alt="Footpryx Logo" className="w-10 h-10 rounded-xl object-cover border border-emerald-900/60 shadow-[0_0_15px_rgba(163,230,53,0.1)]" />
  <span className="text-xl font-extrabold tracking-wider text-white">
    footpryx
  </span>
</div>

        {/* Center Menu Links */}
        <nav className="hidden md:flex items-center gap-6 bg-gray-950/90 border border-gray-800 px-6 py-2 rounded-full text-xs font-medium text-gray-400">
          <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
          <a href="#modules" className="hover:text-white transition">Modules</a>
          <a href="#results" className="hover:text-white transition">Results</a>
          <a href="#plans" className="hover:text-white transition">Plans</a>
          <a href="#faq" className="hover:text-white transition">FAQ</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/auth/login" className="text-sm font-semibold text-gray-300 hover:text-white transition">
            Sign In
          </Link>
          <Link 
            href="/auth/register" 
            className="bg-white text-black hover:bg-lime-400 font-bold text-xs px-5 py-2.5 rounded-xl transition-all duration-200"
          >
            Create Account
          </Link>
        </div>
      </header>

      {/* 🚀 1. HERO SECTION (Full Dashboard Background Mockup Layout) */}
      <section className="relative pt-28 pb-20 px-4 md:px-8 max-w-[1400px] mx-auto overflow-hidden">
        
        {/* Background Grid Lines & Glowing Elements */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        
        {/* Frame Bracket Corners (Left-Top & Right-Top Bracket Lines) */}
        <div className="hidden lg:block absolute top-28 left-6 w-4 h-4 border-l-2 border-t-2 border-gray-700"></div>
        <div className="hidden lg:block absolute top-28 right-6 w-4 h-4 border-r-2 border-t-2 border-gray-700"></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[580px]">
          
          {/* 👈 LEFT OVERLAY CARD (Main Hero Card) */}
          <div className="lg:col-span-5 z-20 bg-black/90 backdrop-blur-xl border border-gray-800/90 rounded-3xl p-6 md:p-8 space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/50 border border-lime-500/30 text-lime-400 text-[10px] font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span>
              OSINT INTELLIGENCE
            </div>

            {/* Main Dynamic Animated Heading */}
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight text-white">
              Discover what the internet knows about{" "}
              <span className="text-lime-400 underline decoration-lime-500/50 transition-all duration-500 ease-in-out">
                {words[index]}
              </span>
            </h1>

            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Footpryx cross-references over 200 public sources and shows who's behind an email, phone, or username.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link href="/auth/register">
                <button type="button" className="bg-white hover:bg-lime-400 text-black font-extrabold px-5 py-3 rounded-xl transition text-xs flex items-center gap-2 shadow-lg cursor-pointer">
                  Get started free ➔
                </button>
              </Link>
              <a href="#how-it-works">
                <button type="button" className="bg-gray-900 border border-gray-800 hover:border-gray-700 text-gray-300 font-semibold px-5 py-3 rounded-xl transition text-xs cursor-pointer">
                  See How It Works
                </button>
              </a>
            </div>

            {/* Search Bar Input Form (Working) */}
            <div className="pt-2">
              <form onSubmit={handleSearch} className="bg-black border border-lime-500/40 p-2 rounded-2xl flex items-center gap-2 shadow-inner focus-within:border-lime-500 transition">
                <span className="text-gray-500 pl-2 text-xs">🔍</span>
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Name, email, phone or @username..." 
                  className="bg-transparent border-none text-xs text-white placeholder-gray-500 focus:outline-none w-full"
                />
                <button type="submit" className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition flex items-center gap-1 shrink-0 cursor-pointer">
                  Search ➔
                </button>
              </form>
              <p className="text-[10px] text-gray-500 mt-2 pl-2">
                ⓘ Run a test search, no signup needed
              </p>
            </div>

          </div>

          {/* 👉 RIGHT & BACKGROUND DASHBOARD MOCKUP */}
          <div className="lg:col-span-7 z-10 relative opacity-90 lg:-ml-12">
            <div className="bg-gray-950/90 border border-gray-800/80 rounded-3xl p-5 md:p-6 space-y-5 shadow-2xl backdrop-blur-sm">
              
              <div className="flex items-center justify-between border-b border-gray-800/80 pb-3 text-xs text-gray-400">
                <div className="flex items-center gap-6">
                  <span className="text-lime-400 font-bold font-mono">200+ <span className="text-gray-500 font-normal">Sources</span></span>
                  <span className="text-white font-bold font-mono">18.7K <span className="text-gray-500 font-normal">Data Points</span></span>
                  <span className="text-white font-bold font-mono">25 <span className="text-gray-500 font-normal">OSINT Modules</span></span>
                </div>
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-[10px] text-gray-500">Risk Score:</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 text-emerald-400 text-[10px] font-bold">Low Risk (23/100)</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                
                <div className="bg-black/60 border border-gray-900 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Data Sources</span>
                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-2">🔒 Public Records</span><span className="text-gray-300 font-mono">45</span></div>
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-2">📱 Social Media</span><span className="text-gray-300 font-mono">28</span></div>
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-2">🌐 Web Intelligence</span><span className="text-gray-300 font-mono">32</span></div>
                    <div className="flex justify-between text-gray-400"><span className="flex items-center gap-2">🛡️ Breaches & Leaks</span><span className="text-gray-300 font-mono">28</span></div>
                  </div>
                </div>

                <div className="bg-black/60 border border-gray-900 p-4 rounded-2xl space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-2">Recent Activity</span>
                  <div className="space-y-2 text-[11px]">
                    <div className="p-2 bg-gray-900/40 rounded-xl border border-gray-800/50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-[11px]">Phone number found</p>
                        <p className="text-[10px] text-gray-500">+55 11 98765-4321</p>
                      </div>
                      <span className="text-[9px] text-gray-600">2m ago</span>
                    </div>

                    <div className="p-2 bg-gray-900/40 rounded-xl border border-gray-800/50 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-[11px]">Email discovered</p>
                        <p className="text-[10px] text-gray-500">john.doe@company.com</p>
                      </div>
                      <span className="text-[9px] text-gray-600">5m ago</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
                <div className="md:col-span-2 bg-black/60 border border-gray-900 p-3 rounded-2xl relative overflow-hidden h-32 flex flex-col justify-between">
                  <div className="flex justify-between text-[10px] text-gray-400 z-10">
                    <span className="text-lime-400 font-bold">Strava Activity</span>
                    <span>Active Routes</span>
                  </div>

                  <svg className="absolute inset-0 w-full h-full stroke-lime-500/60 fill-none" viewBox="0 0 300 120">
                    <path d="M 20 80 Q 80 10, 140 70 T 260 30" strokeWidth="2.5" strokeDasharray="4 2" />
                    <circle cx="260" cy="30" r="4" className="fill-lime-400 animate-ping" />
                  </svg>

                  <div className="flex gap-4 text-[9px] text-gray-500 z-10 pt-8">
                    <span>Activities: <strong className="text-white">367</strong></span>
                    <span>Routes: <strong className="text-white">6</strong></span>
                    <span>Following: <strong className="text-white">12</strong></span>
                  </div>
                </div>

                <div className="bg-black/60 border border-gray-900 p-3 rounded-2xl text-[10px] space-y-1.5 flex flex-col justify-center">
                  <span className="font-bold text-gray-500 uppercase tracking-wider block">Key Identifiers</span>
                  <div className="flex justify-between text-gray-400"><span>CPF:</span><span className="text-gray-200 font-mono">123.456.789-09</span></div>
                  <div className="flex justify-between text-gray-400"><span>ID:</span><span className="text-gray-200 font-mono">MG-12.345.678</span></div>
                  <div className="flex justify-between text-gray-400"><span>Phone:</span><span className="text-gray-200 font-mono">+55 11 98765</span></div>
                </div>

              </div>

            </div>
          </div>

        </div>

      </section>

      {/* 📊 2. STATS BAR STRIP */}
      <section className="py-8 border-y border-gray-900/80 bg-gray-950/40">
        <div className="max-w-4xl mx-auto px-6 flex flex-wrap items-center justify-center gap-8 md:gap-16 text-sm text-gray-400 font-medium">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🗄️</span>
            <span><strong className="text-white font-bold">200+</strong> open sources</span>
          </div>
          <span className="hidden md:inline text-gray-800">|</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🔲</span>
            <span><strong className="text-white font-bold">11</strong> search types</span>
          </div>
          <span className="hidden md:inline text-gray-800">|</span>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">🌐</span>
            <span><strong className="text-white font-bold">35+</strong> platforms</span>
          </div>
        </div>
      </section>

      {/* 🎯 3. MODULES & PLATFORMS SECTION (Infinite Auto Scroll) */}
      <section id="modules" className="py-20 px-6 max-w-6xl mx-auto text-center space-y-8 overflow-hidden">
        
        {/* Section Tag & Heading */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> MODULES <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Every angle, one search
          </h2>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Telegram, Instagram, YouTube, Discord, Steam, Twitch and 30+ more platforms, cross-referenced in a single query.
          </p>
        </div>

        {/* 🔄 Infinite Scrolling Slider Container */}
        <div className="relative w-full overflow-hidden pt-6">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

          <div className="flex w-max gap-4 animate-marquee hover:[animation-play-state:paused]">
            {[
              { name: "GitHub", icon: "🐙", color: "text-white" },
              { name: "YouTube", icon: "▶", color: "text-red-500" },
              { name: "Twitch", icon: "👾", color: "text-purple-400" },
              { name: "Steam", icon: "🎮", color: "text-blue-400" },
              { name: "GitLab", icon: "🦊", color: "text-orange-500" },
              { name: "SoundCloud", icon: "☁️", color: "text-orange-400" },
              { name: "Pinterest", icon: "📌", color: "text-red-500" },
              { name: "Snapchat", icon: "👻", color: "text-yellow-400" },
              { name: "Gravatar", icon: "👤", color: "text-blue-400" },
              { name: "Truecaller", icon: "📞", color: "text-blue-500" },
              { name: "IP / Domain", icon: "🌐", color: "text-blue-300" },
              { name: "GitHub", icon: "🐙", color: "text-white" },
              { name: "YouTube", icon: "▶", color: "text-red-500" },
              { name: "Twitch", icon: "👾", color: "text-purple-400" },
              { name: "Steam", icon: "🎮", color: "text-blue-400" },
              { name: "GitLab", icon: "🦊", color: "text-orange-500" },
              { name: "SoundCloud", icon: "☁️", color: "text-orange-400" },
              { name: "Pinterest", icon: "📌", color: "text-red-500" },
              { name: "Snapchat", icon: "👻", color: "text-yellow-400" },
              { name: "Gravatar", icon: "👤", color: "text-blue-400" },
              { name: "Truecaller", icon: "📞", color: "text-blue-500" },
              { name: "IP / Domain", icon: "🌐", color: "text-blue-300" },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center gap-2 bg-gray-950 hover:bg-gray-900 border border-gray-800 hover:border-gray-700 px-5 py-3 rounded-2xl text-xs font-semibold transition shrink-0 cursor-pointer"
              >
                <span className={item.color}>{item.icon} {item.name}</span>
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ⚙️ 4. HOW THE PLATFORM WORKS SECTION */}
      <section id="how-it-works" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> HOW THE PLATFORM WORKS <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            From a single identifier to a verified investigation.
          </h2>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Start with an email, phone, name, username, IP or domain. Footpryx returns a structured, source-linked result your team can review.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-8 rounded-3xl space-y-6 transition duration-300 group">
            <span className="text-lime-400 font-mono text-xs font-bold tracking-widest block">01</span>
            <div className="w-12 h-12 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">
              🔍
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Enter an identifier</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Search by email, phone, name, username, IP or domain.
              </p>
            </div>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-8 rounded-3xl space-y-6 transition duration-300 group">
            <span className="text-lime-400 font-mono text-xs font-bold tracking-widest block">02</span>
            <div className="w-12 h-12 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">
              🕸️
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Map the available evidence</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Connect public records, profiles, companies, domains and breach signals relevant to the investigation.
              </p>
            </div>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-8 rounded-3xl space-y-6 transition duration-300 group">
            <span className="text-lime-400 font-mono text-xs font-bold tracking-widest block">03</span>
            <div className="w-12 h-12 rounded-2xl bg-gray-900/90 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">
              📋
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">Review a source-linked result</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                See each finding, its source, linked entities and risk signals in one investigation workspace.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 📦 5. ONE TOOL, ALL SOURCES (MODULE CARDS) */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> MODULES <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            One tool, all sources
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Each module specializes in a data type, ensuring depth and accuracy in results.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">✉️</div>
            <h3 className="text-lg font-bold text-white">Email Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Find profiles, accounts and breaches associated with any address.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">📞</div>
            <h3 className="text-lg font-bold text-white">Phone Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Identify owner, carrier and accounts linked to the number.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">👤</div>
            <h3 className="text-lg font-bold text-white">Username Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Track presence across 500+ platforms with a single identifier.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🌐</div>
            <h3 className="text-lg font-bold text-white">Domain Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Whois, DNS, technologies used and exposed subdomains.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🏠</div>
            <h3 className="text-lg font-bold text-white">Name Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Name investigation. Track online presence across multiple platforms.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🪙</div>
            <h3 className="text-lg font-bold text-white">Blockchain Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Blockchain investigation. Track crypto wallets and transactions.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🔑</div>
            <h3 className="text-lg font-bold text-white">Password Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Find which breaches a password appeared in and which accounts it exposes.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🔗</div>
            <h3 className="text-lg font-bold text-white">Link Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Link and URL analysis. Identify connections and online relationships.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🌱</div>
            <h3 className="text-lg font-bold text-white">Social Media Analysis</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Cross-reference between platforms and connection analysis.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">🛡️</div>
            <h3 className="text-lg font-bold text-white">Breach Detection</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Exposed credentials in known data breaches and dumps.</p>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 hover:border-lime-500/40 p-6 rounded-3xl space-y-4 transition duration-300 group">
            <div className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 group-hover:scale-110 transition duration-300">💻</div>
            <h3 className="text-lg font-bold text-white">IP Search</h3>
            <p className="text-gray-400 text-xs leading-relaxed">Geolocation, ISP, reputation and open ports of the address.</p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button className="bg-gray-900/90 border border-gray-800 hover:border-gray-700 text-gray-300 hover:text-white font-medium px-6 py-2.5 rounded-xl text-xs transition">
            View all modules
          </button>
        </div>
      </section>

      {/* 📊 6. RESULT EXAMPLE SECTION */}
      <section id="results" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-lime-400">🕸️</div>
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> RESULT EXAMPLE <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            See what a single search reveals
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            A single input generates dozens of connections, profiles and qualified data — all cross-referenced automatically.
          </p>
        </div>

        <ResultExampleComponent />
      </section>

      {/* 💳 7. PRICING PLANS SECTION */}
      <section id="plans" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-lime-400">📚</div>
          </div>
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> PLANS <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Choose your plan</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">Start today. No contract, cancel anytime.</p>

          {/* 🎯 Monthly / Yearly Toggle */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <span className={`text-xs font-bold ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              type="button"
              className="w-12 h-6 bg-gray-900 border border-gray-700 rounded-full p-1 relative transition cursor-pointer"
            >
              <div className={`w-4 h-4 bg-lime-400 rounded-full transition-transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-xs font-bold ${isYearly ? 'text-white' : 'text-gray-500'}`}>
              Yearly <span className="text-lime-400 text-[10px] bg-lime-950 px-2 py-0.5 rounded-full border border-lime-500/30">Save 20%</span>
            </span>

          </div>
        </div>

        {/* 💳 Plans Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch text-left max-w-6xl mx-auto">
          {/* Starter Plan */}
          <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-8 hover:border-gray-700 transition">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Starter</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white">{isYearly ? "$12" : "$15"}</span>
                  <span className="text-xs text-gray-400 font-medium">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>11 search types: email, phone, username, name, CPF, CNPJ, domain, link, IP, Bitcoin and password</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>Breach detection + reverse password search</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>200+ open sources + social networks</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>Investigations with link map and report</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>AI investigative dossier (1/day)</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>CSV, JSON & PDF export · no captcha</span></li>
              </ul>
            </div>
            <Link href="/auth/register" className="w-full">
              <button className="w-full bg-gray-900 border border-gray-800 hover:border-gray-700 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer">Get Started</button>
            </Link>
          </div>

          {/* Intermediate Plan (Most Popular) */}
          <div className="bg-gray-950 border-2 border-lime-500 rounded-3xl p-8 flex flex-col justify-between space-y-8 relative shadow-2xl shadow-lime-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-lime-500 text-black text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">MOST POPULAR</div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Intermediate</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-lime-400">{isYearly ? "$29" : "$37"}</span>
                  <span className="text-xs text-gray-400 font-medium">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2 font-semibold text-white"><span className="text-lime-400 shrink-0">✓</span><span>Everything in Starter</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>100 credits/month (3× more searches)</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>10 AI narratives per day</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>Priority support (≤24h response)</span></li>
              </ul>
            </div>
            <Link href="/auth/register" className="w-full">
              <button className="w-full bg-white hover:bg-lime-400 text-black font-extrabold py-3.5 rounded-xl text-xs transition shadow-lg cursor-pointer">Get Started</button>
            </Link>
          </div>

          {/* Advanced Plan */}
          <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-8 hover:border-gray-700 transition">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white">Advanced</h3>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-extrabold text-white">{isYearly ? "$88" : "$110"}</span>
                  <span className="text-xs text-gray-400 font-medium">/mo</span>
                </div>
              </div>
              <ul className="space-y-3 text-xs text-gray-300">
                <li className="flex items-start gap-2 font-semibold text-white"><span className="text-lime-400 shrink-0">✓</span><span>Everything in Intermediate</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>300 credits/month (10× more searches)</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>50 AI narratives per day</span></li>
                <li className="flex items-start gap-2"><span className="text-lime-400 shrink-0">✓</span><span>Dedicated email support</span></li>
              </ul>
            </div>
            <Link href="/auth/register" className="w-full">
              <button className="w-full bg-gray-900 border border-gray-800 hover:border-gray-700 text-white font-bold py-3 rounded-xl text-xs transition cursor-pointer">Get Started</button>
            </Link>
          </div>
        </div>

        <p className="text-xs text-gray-400 pt-4">
          Every plan includes all 11 search types and breach detection.
        </p>
      </section>

      {/* 🏛️ 8. FOR INSTITUTIONS SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/40 border border-lime-500/30 text-lime-400 text-xs font-semibold tracking-wider uppercase">
            FOR INSTITUTIONS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Institutional access for those who investigate responsibly
          </h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Public safety, integrity bodies and the press get dedicated access to footpryx — with audit, masking and compliance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-lime-500/40 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 text-xl group-hover:scale-110 transition duration-300">
                ⚖️
              </div>
              <h3 className="text-xl font-bold text-white">Public Safety & Justice</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Police, public prosecutors, internal affairs, judiciary and intelligence.
              </p>
            </div>
            <Link href="/institutions/public-safety" className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:underline pt-2">
              Request institutional access ➔
            </Link>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-lime-500/40 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 text-xl group-hover:scale-110 transition duration-300">
                🏛️
              </div>
              <h3 className="text-xl font-bold text-white">Public Bodies & Integrity</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Comptrollers, audit courts, procurement and integrity teams.
              </p>
            </div>
            <Link href="/institutions/public-bodies" className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:underline pt-2">
              Request institutional pilot ➔
            </Link>
          </div>

          <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-8 flex flex-col justify-between space-y-6 hover:border-lime-500/40 transition group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-center text-lime-400 text-xl group-hover:scale-110 transition duration-300">
                📰
              </div>
              <h3 className="text-xl font-bold text-white">Journalism & Fact-Checking</h3>
              <p className="text-gray-400 text-xs leading-relaxed">
                Investigative journalists, newsrooms and fact-checking agencies.
              </p>
            </div>
            <Link href="/institutions/journalism" className="inline-flex items-center gap-2 text-xs font-bold text-lime-400 hover:underline pt-2">
              Request press access ➔
            </Link>
          </div>
        </div>
      </section>

      {/* 📰 9. BLOG SECTION (With Images & Working Links) */}
      <section id="blog" className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-16">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-lime-400">
              📖
            </div>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Latest from the Blog</h2>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Start with the guide <span className="text-lime-400 font-semibold cursor-pointer hover:underline">what is OSINT and how open source intelligence works</span>, or explore practical cases: <span className="text-lime-400 font-semibold cursor-pointer hover:underline">CPF and CNPJ lookup</span>, <span className="text-lime-400 font-semibold cursor-pointer hover:underline">email investigation</span> & <span className="text-lime-400 font-semibold cursor-pointer hover:underline">OSINT for investigators in Brazil</span>.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-6xl mx-auto">
          <Link href="/blog/comparison" className="block group">
            <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl overflow-hidden group-hover:border-lime-500/50 transition duration-300 flex flex-col h-full shadow-xl">
              <div className="h-48 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
                  alt="OSINT Comparison"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">COMPARISON</span>
                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition leading-snug">
                    footpryx vs Alternatives: 2026 OSINT Platform Comparison
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    footpryx vs OSINT Industries, Maltego and SpiderFoot. Complete comparison table with prices, sources and features.
                  </p>
                </div>
                <span className="text-xs text-lime-400 font-semibold pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Article ➔
                </span>
              </div>
            </div>
          </Link>

          <Link href="/blog/free-tools" className="block group">
            <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl overflow-hidden group-hover:border-lime-500/50 transition duration-300 flex flex-col h-full shadow-xl">
              <div className="h-48 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop"
                  alt="OSINT Tools"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">TOOLS</span>
                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition leading-snug">
                    12 Free OSINT Tools for Investigations in 2026
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    From Sherlock to Shodan: the best free tools for email, username, domain and breaches.
                  </p>
                </div>
                <span className="text-xs text-lime-400 font-semibold pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Article ➔
                </span>
              </div>
            </div>
          </Link>

          <Link href="/blog/due-diligence" className="block group">
            <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl overflow-hidden group-hover:border-lime-500/50 transition duration-300 flex flex-col h-full shadow-xl">
              <div className="h-48 w-full relative overflow-hidden bg-gray-900">
                <img
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop"
                  alt="Due Diligence Checklist"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-80 group-hover:opacity-100"
                />
              </div>
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-lime-400 uppercase tracking-wider">INVESTIGATION</span>
                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition leading-snug">
                    OSINT for Due Diligence: Complete Investigator Checklist
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed">
                    12 verification points, KYC/AML, and how to build due diligence reports with open source intelligence.
                  </p>
                </div>
                <span className="text-xs text-lime-400 font-semibold pt-2 inline-flex items-center gap-1 group-hover:translate-x-1 transition">
                  Read Article ➔
                </span>
              </div>
            </div>
          </Link>
        </div>

        <div className="pt-4">
          <Link href="/blog" className="text-xs text-lime-400 font-bold hover:underline">
            See all articles ➔
          </Link>
        </div>
      </section>

      {/* 🌟 10. REVIEWS / TESTIMONIALS SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-widest">
            <span className="w-4 h-[2px] bg-lime-500"></span> REVIEWS <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">Trusted by Security Professionals</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-6xl mx-auto">
          <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl space-y-4">
            <div className="flex text-lime-400 text-sm">★★★★★</div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "Footpryx reduces our initial investigation time by 70%. Cross-referencing handles across platforms is seamless."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs">A</div>
              <div>
                <h4 className="text-xs font-bold text-white">Alex Rivera</h4>
                <p className="text-[10px] text-gray-500">Threat Intelligence Analyst</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl space-y-4">
            <div className="flex text-lime-400 text-sm">★★★★★</div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "The automated graph visualization and leak detection make due diligence reporting extremely clear."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs">M</div>
              <div>
                <h4 className="text-xs font-bold text-white">Mariana Silva</h4>
                <p className="text-[10px] text-gray-500">Corporate Compliance Auditor</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl space-y-4">
            <div className="flex text-lime-400 text-sm">★★★★★</div>
            <p className="text-xs text-gray-300 leading-relaxed">
              "An essential toolkit for OSINT research. Fast, structured, and very clean UI layout."
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-8 h-8 rounded-full bg-lime-500/20 text-lime-400 flex items-center justify-center font-bold text-xs">J</div>
              <div>
                <h4 className="text-xs font-bold text-white">Julian Vance</h4>
                <p className="text-[10px] text-gray-500">Investigative Journalist</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ❓ 11. FREQUENTLY ASKED QUESTIONS (FAQ) SECTION */}
      <section id="faq" className="py-24 px-6 max-w-4xl mx-auto border-t border-gray-900/80 text-center space-y-12">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-xl bg-gray-950 border border-gray-800 flex items-center justify-center text-lime-400">💬</div>
          </div>
          <div className="inline-flex items-center gap-2 text-lime-400 text-xs font-semibold tracking-widest uppercase">
            <span className="w-4 h-[2px] bg-lime-500"></span> FAQ <span className="w-4 h-[2px] bg-lime-500"></span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">Frequently asked questions</h2>
        </div>

        <div className="text-left space-y-3">
          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>What is OSINT?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">OSINT stands for Open Source Intelligence. It is the practice of collecting and analyzing publicly available information from various online sources.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>Is it legal to use this tool?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">Yes, Footpryx uses publicly available data from public sources and complies with data protection regulations.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>Is my search data stored?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">No, search queries are executed in real-time and we prioritize strict privacy standards for all users.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>Which sources are queried?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">Footpryx queries over 200 public sources including social networks, public domain records, breach databases, and IP registries.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>How long does a search take?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">Most automated searches complete within 10 to 30 seconds depending on the number of active modules selected.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>Can I use it for personal purposes?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">Yes, individuals can use Footpryx for personal identity verification and self-footprint checks.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>How is data protected?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">We use end-to-end encryption for request data, zero-logging policies for searches, and offer instant account data deletion.</p>
          </details>

          <details className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 group cursor-pointer">
            <summary className="flex items-center justify-between text-sm font-bold text-white list-none">
              <span>What's the difference between plans?</span>
              <span className="text-lime-400 text-xs transition group-open:rotate-180">▼</span>
            </summary>
            <p className="mt-3 text-xs text-gray-400 leading-relaxed pt-3 border-t border-gray-900/80">Higher plans offer more monthly search credits, advanced AI investigative dossiers, priority support, and team features.</p>
          </details>
        </div>
      </section>

      {/* 🚀 12. READY TO DISCOVER CTA SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto border-t border-gray-900/80 text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-950 border border-gray-800 flex items-center justify-center text-lime-400 text-xl shadow-lg shadow-lime-500/10">🎯</div>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight max-w-3xl mx-auto leading-tight">Ready to discover what the internet knows?</h2>
        <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto">Start free, then pick the plan that fits your investigation.</p>
        <div className="pt-4">
          <a href="#plans">
            <button type="button" className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-8 py-3.5 rounded-2xl text-sm transition flex items-center gap-2 mx-auto shadow-xl shadow-lime-500/20 cursor-pointer">
              View Plans ➔
            </button>
          </a>
        </div>
      </section>

      {/* 🌐 13. FOOTER SECTION */}
      <footer className="border-t border-gray-900/80 bg-black pt-16 pb-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-12 text-xs">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-lg object-cover border border-gray-800" />
              <span className="text-lg font-extrabold tracking-wider text-white">footpryx</span>
            </div>
            <p className="text-gray-400 leading-relaxed max-w-sm">AI-powered automated OSINT intelligence. Open source data cross-referenced in seconds for investigations and digital protection.</p>
            <div className="flex items-center gap-4 text-gray-400 text-base">
              <a href="#" className="hover:text-white transition">𝕏</a>
              <a href="#" className="hover:text-white transition">in</a>
              <a href="#" className="hover:text-white transition">📷</a>
            </div>
            <div className="space-y-2 pt-2">
              <p className="text-gray-400 font-medium">Get the newsletter</p>
              <div className="flex items-center gap-2 max-w-sm">
                <input type="email" placeholder="you@email.com" className="bg-gray-950 border border-gray-800 text-white placeholder-gray-600 px-3.5 py-2 rounded-xl focus:outline-none w-full text-xs"/>
                <button type="button" className="bg-lime-500 hover:bg-lime-400 text-black font-bold px-4 py-2 rounded-xl transition text-xs shrink-0 cursor-pointer">Subscribe</button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">PRODUCT</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><a href="#modules" className="hover:text-white transition">Modules</a></li>
              <li><a href="#plans" className="hover:text-white transition">Pricing</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
              <li><Link href="/about" className="hover:text-white transition">For Institutions</Link></li>
              <li><a href="#faq" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">COMPANY</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Methodology</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              <li><Link href="/auth/register" className="hover:text-white transition">Create Account</Link></li>
              <li><Link href="/auth/login" className="hover:text-white transition">Sign In</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">LEGAL</h4>
            <ul className="space-y-2.5 text-gray-400">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">LGPD</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition">Cookie preferences</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-gray-900/80 mt-12 pt-8 flex flex-wrap items-center justify-between gap-4 text-gray-500 text-[11px]">
          <p>© 2026 footpryxint. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-gray-400 transition">Privacy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-gray-400 transition">Terms</Link>
          </div>
        </div>
      </footer>

      {/* ⬆️ FLOATING BACK TO TOP BUTTON */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        type="button"
        className="fixed bottom-6 right-6 z-50 bg-gray-900/90 border border-lime-500/40 text-lime-400 p-3 rounded-full shadow-2xl hover:bg-lime-500 hover:text-black transition cursor-pointer"
      >
        ↑
      </button>

    </div>
  );
}

// 🕸️ Interactive Result View Component
function ResultExampleComponent() {
  const [viewMode, setViewMode] = useState("graph");

  const profiles = [
    { name: "Pinterest", handle: "@ferschmidt", icon: "📌", color: "border-red-500/40 text-red-400", pos: "top-[4%] left-1/2 -translate-x-[120%]" },
    { name: "Instagram", handle: "@fernanda.schmidt", icon: "📸", color: "border-pink-500/40 text-pink-400", pos: "top-[4%] left-1/2 translate-x-[20%]" },
    { name: "LinkedIn", handle: "@fernandaschmidt", icon: "💼", color: "border-blue-500/40 text-blue-400", pos: "top-[22%] right-[8%]" },
    { name: "GitHub", handle: "@fernanda-schmidt", icon: "🐙", color: "border-gray-500/40 text-gray-300", pos: "top-[45%] right-[2%]" },
    { name: "Facebook", handle: "@fernanda.schmidt", icon: "🌐", color: "border-blue-600/40 text-blue-500", pos: "bottom-[22%] right-[8%]" },
    { name: "X / Twitter", handle: "@ferschmidt", icon: "𝕏", color: "border-gray-600/40 text-gray-300", pos: "bottom-[5%] left-1/2 translate-x-[40%]" },
    { name: "TikTok", handle: "@fer.schmidt", icon: "🎵", color: "border-teal-500/40 text-teal-300", pos: "bottom-[5%] left-1/2 -translate-x-[140%]" },
    { name: "Spotify", handle: "@fernanda_schmidt", icon: "🎧", color: "border-emerald-500/40 text-emerald-400", pos: "bottom-[22%] left-[8%]" },
  ];

  return (
    <div className="mt-8 max-w-5xl mx-auto space-y-4">
      <div className="flex justify-center items-center gap-3">
        <button
          onClick={() => setViewMode("graph")}
          type="button"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
            viewMode === "graph" ? "bg-lime-500 text-black border-lime-400" : "bg-gray-950 text-gray-400 border-gray-800"
          }`}
        >
          🕸️ Network Graph Map
        </button>
        <button
          onClick={() => setViewMode("grid")}
          type="button"
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 border cursor-pointer ${
            viewMode === "grid" ? "bg-lime-500 text-black border-lime-400" : "bg-gray-950 text-gray-400 border-gray-800"
          }`}
        >
          📋 Profiles Grid
        </button>
      </div>

      <div className="bg-gray-950/90 border border-gray-800/90 rounded-3xl p-6 md:p-8 text-left space-y-6 shadow-2xl relative overflow-hidden min-h-[520px]">
        {viewMode === "graph" ? (
          <div className="relative w-full h-[420px] flex items-center justify-center overflow-hidden bg-black/40 rounded-2xl border border-gray-900/80">
            <div className="z-10 relative flex flex-col items-center justify-center bg-gray-900/90 border-2 border-lime-400 px-6 py-4 rounded-2xl shadow-[0_0_25px_rgba(132,204,22,0.3)]">
              <span className="text-xs font-bold text-white">fernanda.schmidt</span>
              <span className="text-[9px] text-lime-400 font-mono mt-0.5">11 VÍNCULOS CONFIRMADOS</span>
            </div>
            {profiles.map((p, i) => (
              <div key={i} className={`absolute ${p.pos} bg-gray-950/90 border ${p.color} px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-lg z-10`}>
                <span className="text-xs">{p.icon}</span>
                <div>
                  <p className="text-[10px] font-bold text-white leading-none">{p.name}</p>
                  <p className="text-[9px] text-gray-400 font-mono">{p.handle}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-900/60 border border-gray-800/80 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <h5 className="text-sm font-bold text-white">Fernanda Schmidt</h5>
                <p className="text-xs text-gray-400">@fernanda.schmidt</p>
              </div>
              <span className="text-[10px] text-lime-400 font-mono">96%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}