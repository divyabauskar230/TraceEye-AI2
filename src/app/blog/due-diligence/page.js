"use client";
import React from "react";
import Link from "next/link";

export default function BlogDueDiligencePage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      
      {/* 🌐 NAVBAR */}
      <header className="px-6 py-6 max-w-7xl mx-auto flex items-center justify-between border-b border-gray-900/80">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Footpryx Logo" className="w-8 h-8 rounded-lg object-cover border border-gray-800" />
          <span className="text-xl font-extrabold tracking-wider text-white">footpryx</span>
        </Link>
        
        <Link href="/" className="text-xs text-gray-400 hover:text-white transition">
          ← Back to site
        </Link>
      </header>

      {/* 📖 BLOG CONTENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12 text-gray-300 text-sm leading-relaxed">
        
        {/* Header Badge & Title */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-lime-950/60 border border-lime-500/30 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
            INVESTIGATION
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            OSINT for Due Diligence: Complete Investigation Checklist
          </h1>
          <p className="text-xs text-gray-500 font-mono">Published in May 2026 · 15 min read</p>
        </div>

        {/* Intro */}
        <p className="text-base text-gray-300">
          Due Diligence analysis is fundamental to mitigating reputational, regulatory, and financial risks. Open Source Intelligence (OSINT) allows you to verify the truthfulness of corporate information, partner histories, and hidden connections.
        </p>

        {/* Highlight Box (KEY POINTS) */}
        <div className="bg-gray-950/90 border-l-4 border-lime-500 p-6 rounded-r-2xl space-y-3">
          <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">KEY POINTS</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>CNPJ/Business validation must extend to the corporate structure (QSA) and ultimate beneficial owners.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Cross-referencing executive tax IDs (CPFs) reveals conflicts of interest and hidden companies.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Using <strong>footpryx</strong> automates dossiers with link analysis maps and auditable reports.</span>
            </li>
          </ul>
        </div>

        {/* Section 1: Introduction to Due Diligence */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">Why Perform Due Diligence with OSINT?</h2>
          <p>
            Traditional due diligence processes rely only on public certificates and notary records. OSINT goes further, analyzing the complete digital footprint of the company and its executives across social networks, data leak repositories, domains, and global registries.
          </p>
        </div>

        {/* Horizontal Bar Chart Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-lime-400 uppercase tracking-widest text-center">
            RISK REDUCTION WITH OSINT COMPLIANCE
          </h3>
          
          <div className="space-y-3 pt-2 text-xs">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Corporate Frauds Detected</span>
                <span className="text-lime-400 font-mono">92%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[92%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Conflicts of Interest Revealed</span>
                <span className="text-lime-400 font-mono">78%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[78%]"></div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-gray-400">
                <span>Operational Time Saved</span>
                <span className="text-lime-400 font-mono">85%</span>
              </div>
              <div className="w-full bg-gray-900 rounded-full h-3 overflow-hidden">
                <div className="bg-lime-500 h-full rounded-full w-[85%]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Checklist Items */}
        <div className="space-y-6 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">12-Point Verification Checklist</h2>
          
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">01.</span> Corporate Registration & Cadastral Validation
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Verify active registration status, real fiscal address, and primary economic activity codes (CNAE).
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">02.</span> Corporate Structure Mapping (QSA)
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Cross-reference partners&apos; IDs to identify equity stakes in other companies within the same sector or shell companies.
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">03.</span> Domain & Web Infrastructure Audit
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Analyze Whois history, website creation dates, SSL certificates, and exposed subdomains.
              </p>
            </div>

            <div className="p-4 bg-gray-950 border border-gray-800/80 rounded-2xl space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-mono">04.</span> Corporate Email Leak Verification
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Identify if institutional passwords and emails have been exposed in known data breach dumps.
              </p>
            </div>
          </div>
        </div>

        {/* Circular Donut Graphic Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 text-center space-y-6">
          <h3 className="text-sm font-bold text-white">Corporate Risk Analysis Coverage</h3>
          
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="w-36 h-36 rounded-full border-8 border-lime-500 border-t-gray-800 flex items-center justify-center relative shadow-lg shadow-lime-500/10">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-lime-400 font-mono">100%</span>
                <p className="text-[9px] text-gray-400 uppercase">Auditable</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 max-w-sm">
              Every piece of evidence collected by footpryx includes a timestamp, source URL, and hash for integrity assurance in legal proceedings.
            </div>
          </div>
        </div>

        {/* Section 3: FAQ Block */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions (FAQ)</h2>
          
          <div className="space-y-3 text-xs">
            <details className="bg-gray-950 border border-gray-800 p-4 rounded-xl cursor-pointer">
              <summary className="font-bold text-white">Is it legal to use OSINT in Due Diligence investigations?</summary>
              <p className="mt-2 text-gray-400 leading-relaxed">
                Yes, OSINT exclusively utilizes public sources and open data, in full compliance with data protection laws and corporate compliance standards.
              </p>
            </details>

            <details className="bg-gray-950 border border-gray-800 p-4 rounded-xl cursor-pointer">
              <summary className="font-bold text-white">How do I export reports for presentations to directors?</summary>
              <p className="mt-2 text-gray-400 leading-relaxed">
                Footpryx allows you to export reports in PDF format featuring an executive summary, relationship graphs, and a detailed list of evidence.
              </p>
            </details>
          </div>
        </div>

        {/* Conclusion Callout */}
        <div className="bg-gradient-to-b from-gray-950 to-black border border-lime-500/40 rounded-3xl p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Ready to automate your Due Diligence reports?</h3>
            <p className="text-xs text-gray-400">
              Generate complete dossiers with timestamps and source linkages in seconds with <strong>footpryx</strong>.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/auth/register">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs transition shadow-lg shadow-lime-500/20">
                Start Investigation Now ➔
              </button>
            </Link>
          </div>
        </div>

      </main>

      {/* 🌐 FOOTER */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-[10px] text-gray-600">
        © 2026 footpryx. All rights reserved.
      </footer>

    </div>
  );
}