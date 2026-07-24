"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        setMessage("Account created successfully! Redirecting...");
        setTimeout(() => { window.location.href = "/dashboard"; }, 1500);
      } else {
        setMessage("Registration failed. Try again.");
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
        
        {/* 📝 LEFT SIDE: Clean Premium Register Card */}
        <div className="w-full max-w-md mx-auto bg-[#0b0e17]/80 border border-slate-900 rounded-[28px] p-8 md:p-10 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-slate-800 before:to-transparent">
          
          {/* Logo Assembly */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="flex items-center gap-2.5 text-white mb-2">
              <span className="text-2xl">👻</span>
              <h2 className="text-xl font-bold tracking-tight">espectrosint</h2>
            </div>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">OSINT Intelligence Platform</p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Create Account</h3>
            <p className="text-xs text-slate-500 mt-1">Get started with your intelligence workspace</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
            </div>

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
                placeholder="Create password"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
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
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </div>
          </form>

          <div className="text-center mt-6 space-y-2 text-xs">
            <p className="text-slate-500">
              Already have an active key? <Link href="/auth/login" className="text-[#a3e635] font-semibold hover:underline">Sign In</Link>
            </p>
          </div>

          <div className="text-center mt-6 pt-3 border-t border-slate-900/60">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              ← Back to site
            </Link>
          </div>

        </div>

        {/* ⭐ RIGHT SIDE: Beautiful Modern Testimonials Feed */}
        <div className="w-full max-w-lg mx-auto space-y-6 hidden lg:block">
          
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

          {/* Cards Stack */}
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