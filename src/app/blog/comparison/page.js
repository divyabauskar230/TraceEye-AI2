"use client";
import React from "react";
import Link from "next/link";

export default function BlogComparisonPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      
      {/* 🌐 Header */}
      <header className="px-6 py-6 max-w-7xl mx-auto flex items-center justify-between border-b border-gray-900/80">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center font-bold text-black text-lg">
            👻
          </div>
          <span className="text-xl font-extrabold tracking-wider text-white">footpryx</span>
        </Link>
        
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition">
          ← Back to site
        </Link>
      </header>

      {/* 📖 Blog Content Container */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-10 text-gray-300 text-sm leading-relaxed">
        
        {/* Category Badge & Title */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-lime-950/60 border border-lime-500/30 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
            COMPARISON
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            footpryx vs Alternatives: 2026 OSINT Platform Comparison
          </h1>
          <p className="text-xs text-gray-500 font-mono">Published in July 2026 · 8 min read</p>
        </div>

        {/* Intro */}
        <p className="text-base text-gray-300">
          Choosing the right Open Source Intelligence (OSINT) platform can determine the success of an investigation. In this detailed comparison, we analyze <strong className="text-white">footpryx</strong> against leading market alternatives like OSINT Industries, Epieos, SpiderFoot, and Maltego.
        </p>

        {/* Highlight Box */}
        <div className="bg-gray-950 border-l-4 border-lime-500 p-5 rounded-r-2xl space-y-2">
          <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">Key Takeaway</h4>
          <p className="text-xs text-gray-400">
            footpryx combines multi-identifier reverse lookups across 200+ public sources with automatic link analysis at a fraction of the competitor cost.
          </p>
        </div>

        {/* Section 1 */}
        <div className="space-y-4 pt-4 border-t border-gray-900">
          <h2 className="text-xl font-bold text-white">What is an OSINT Platform?</h2>
          <p>
            OSINT tools automate the collection and correlation of publicly available data. Instead of manually searching hundreds of social networks, breach databases, domain registries, and forums, an automated query correlates data points into a single timeline.
          </p>
        </div>

        {/* Section 2: Comparison Chart */}
        <div className="space-y-4 pt-4 border-t border-gray-900">
          <h2 className="text-xl font-bold text-white">Feature & Pricing Breakdown</h2>
          
          <div className="bg-gray-950 border border-gray-800 rounded-2xl p-4 overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b border-gray-800 text-xs text-gray-400">
                  <th className="py-3 px-3">Platform</th>
                  <th className="py-3 px-3">Starting Price</th>
                  <th className="py-3 px-3">Search Types</th>
                  <th className="py-3 px-3">Breach Data</th>
                </tr>
              </thead>
              <tbody className="text-xs">
                <tr className="border-b border-gray-900 font-bold text-lime-400 bg-lime-950/20">
                  <td className="py-3 px-3">footpryx</td>
                  <td className="py-3 px-3">$15 / mo</td>
                  <td className="py-3 px-3">11 Types</td>
                  <td className="py-3 px-3">✓ Included</td>
                </tr>
                <tr className="border-b border-gray-900">
                  <td className="py-3 px-3 text-white">Epieos</td>
                  <td className="py-3 px-3 text-gray-400">€29.99 / mo</td>
                  <td className="py-3 px-3 text-gray-400">2 Types</td>
                  <td className="py-3 px-3 text-gray-400">✓ Included</td>
                </tr>
                <tr className="border-b border-gray-900">
                  <td className="py-3 px-3 text-white">OSINT Industries</td>
                  <td className="py-3 px-3 text-gray-400">£19 / mo</td>
                  <td className="py-3 px-3 text-gray-400">3 Types</td>
                  <td className="py-3 px-3 text-gray-400">✓ Included</td>
                </tr>
                <tr>
                  <td className="py-3 px-3 text-white">SpiderFoot</td>
                  <td className="py-3 px-3 text-gray-400">$79 / mo</td>
                  <td className="py-3 px-3 text-gray-400">Domains & IP</td>
                  <td className="py-3 px-3 text-gray-400">Limited</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 3: Graphical Visual Block */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 text-center space-y-4">
          <h3 className="text-sm font-bold text-white">Source Coverage Index (%)</h3>
          
          <div className="flex items-end justify-center gap-6 h-40 pt-6">
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-lime-400 font-mono">98%</span>
              <div className="w-12 bg-lime-500 rounded-t-lg h-32"></div>
              <span className="text-[10px] text-gray-400">footpryx</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">75%</span>
              <div className="w-12 bg-gray-800 rounded-t-lg h-24"></div>
              <span className="text-[10px] text-gray-400">Epieos</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="text-[10px] text-gray-400 font-mono">60%</span>
              <div className="w-12 bg-gray-800 rounded-t-lg h-20"></div>
              <span className="text-[10px] text-gray-400">OSINT Ind.</span>
            </div>
          </div>
        </div>

        {/* Section 4: Deep Analysis */}
        <div className="space-y-4 pt-4 border-t border-gray-900">
          <h2 className="text-1xl font-bold text-white">Why Investigators Switch to footpryx</h2>
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">✓</span>
              <span><strong>Unified Workspace:</strong> No need to juggle 5 different subscriptions. Query email, phone, handle, IP, domain, and crypto in one place.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">✓</span>
              <span><strong>AI Narrative Dossier:</strong> Automatically converts raw JSON records into clear investigative reports ready for compliance and court presentation.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">✓</span>
              <span><strong>Zero Target Notification:</strong> 100% passive checks ensure the subject is never alerted.</span>
            </li>
          </ul>
        </div>

        {/* Conclusion CTA */}
        <div className="bg-gradient-to-b from-gray-950 to-black border border-lime-500/30 rounded-3xl p-8 text-center space-y-4 shadow-2xl">
          <h3 className="text-xl font-bold text-white">Ready to streamline your OSINT workflow?</h3>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Test footpryx today with full access to 200+ public intelligence sources.
          </p>
          <div>
            <Link href="/auth/register">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs transition">
                Start Free Investigation ➔
              </button>
            </Link>
          </div>
        </div>

      </main>

      {/* 🌐 Footer */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-[10px] text-gray-600">
        © 2026 footpryx. All rights reserved.
      </footer>

    </div>
  );
}