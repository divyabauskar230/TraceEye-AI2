"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        setMessage("Success! Redirecting...");
        setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
      } else {
        setMessage("Invalid credentials.");
      }
    } catch (error) {
      setMessage("Connection failure.");
    } finally {
      setLoading(false);
    }
  };

  const reviews = [
    {
      name: "Marina C.",
      role: "Private investigator",
      initials: "MC",
      color: "bg-teal-600/30 text-teal-400",
      text: "I cross-check email and phone in seconds. What took hours of Googling is now one report."
    },
    {
      name: "Rafael L.",
      role: "Investigative journalist",
      initials: "RL",
      color: "bg-blue-600/30 text-blue-400",
      text: "I confirm sources and spot fake profiles before publishing. Part of my workflow now."
    },
    {
      name: "Bianca M.",
      role: "Security analyst",
      initials: "BM",
      color: "bg-indigo-600/30 text-indigo-400",
      text: "I use it for threat intel and breach checks. The correlations save me hours."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-white flex flex-col justify-between font-sans selection:bg-[#a3e635] selection:text-black">
      
      {/* Main Container Split Grid Layout */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 max-w-7xl w-full mx-auto px-4 md:px-8 items-center gap-12 py-12">
        
        {/* 🔒 LEFT SIDE: Clean Premium Login Module Card */}
        <div className="w-full max-w-md mx-auto bg-[#0b0e17]/80 border border-slate-900 rounded-[28px] p-8 md:p-10 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-slate-800 before:to-transparent">
          
          {/* Logo Assembly */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="flex items-center gap-3 mb-2">
  <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-800" />
  <h2 className="text-xl font-bold tracking-tight text-white">Footpryx</h2>
</div>
<p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Cyber & OSINT Intelligence</p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Sign In</h3>
            <p className="text-xs text-slate-500 mt-1">Access your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
            </div>

            {/* Cloudflare Verification Display Widget Simulation */}
            <div className="bg-[#1c2333]/60 border border-slate-800 rounded-xl p-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">✓</div>
                <span className="text-xs text-slate-300 font-medium">Success!</span>
              </div>
              <div className="flex flex-col items-end text-right">
                <span className="text-[9px] font-bold text-orange-400 tracking-tight uppercase flex items-center gap-0.5">☁ CLOUDFLARE</span>
                <span className="text-[8px] text-slate-600 font-mono">Privacy • Help</span>
              </div>
            </div>

            {message && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-center">
                {message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#a3e635] hover:bg-[#bef264] text-black font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-[0.99] shadow-lg shadow-lime-500/5"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Symmetrical Decorator Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-900"></div></div>
            <span className="relative bg-[#0b0e17] px-3 text-[10px] text-slate-600 font-medium">OR</span>
          </div>

          {/* Google Single Sign-On Button Display */}
          <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 px-4 rounded-xl flex items-center justify-between transition-all text-xs shadow-sm hover:bg-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">D</div>
              <div className="text-left">
                <p className="font-semibold text-slate-800 text-[11px] leading-tight">Sign in as Divya</p>
                <p className="text-[9px] text-slate-500 leading-none">divyabauskar230@gmail.com</p>
              </div>
            </div>
            <svg className="w-4 h-4 text-slate-500" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </button>

          <div className="text-center mt-5 space-y-1.5 text-xs">
            <Link href="/auth/forgot" className="text-xs text-[#a3e635] font-semibold hover:underline block">
              Forgot your password?
            </Link>
            <p className="text-slate-500">
              Don't have an account? <Link href="/auth/register" className="text-[#a3e635] font-semibold hover:underline">Create account</Link>
            </p>
          </div>

          <div className="text-center mt-6 pt-2 border-t border-slate-900/60">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              ← Back to site
            </Link>
          </div>

        </div>

        {/* ⭐ RIGHT SIDE: Beautiful Modern Testimonials Feed */}
        <div className="w-full max-w-lg mx-auto space-y-6 hidden lg:block">
          
          {/* Main Top Review Meta */}
          <div className="space-y-2">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
              <span className="text-xs text-slate-300 font-bold ml-1.5">4.9 / 5</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
              Trusted by people who<br />really investigate
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm">
              Investigators, journalists and enthusiasts use espectrosint every day to find what matters.
            </p>
          </div>

          {/* Cards Stack Streams */}
          <div className="space-y-3.5">
            {reviews.map((rev, index) => (
              <div key={index} className="bg-[#0b0e17]/40 border border-slate-900/80 rounded-2xl p-5 space-y-3 shadow-sm hover:bg-[#0b0e17]/60 transition-all duration-300">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={11} fill="currentColor" />)}
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-medium">
                  "{rev.text}"
                </p>
                <div className="flex items-center gap-3 pt-1">
                  <div className={`w-8 h-8 rounded-full ${rev.color} flex items-center justify-center text-xs font-bold`}>
                    {rev.initials}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-white leading-tight">{rev.name}</h5>
                    <p className="text-[10px] text-slate-500 leading-none mt-0.5">{rev.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

      {/* Symmetrical Clean Footer System */}
      <footer className="w-full text-center py-6 border-t border-slate-900/60 bg-[#030508]">
        <p className="text-[11px] text-slate-600 tracking-wide">
          &copy; 2026 espectrosint. All rights reserved. • Blog • About • Privacy • Terms
        </p>
      </footer>
    </div>
  );
}