"use client";
import React from "react";
import Link from "next/link";

export default function PublicBodiesPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-lime-500 selection:text-black">
      
      {/* 🌐 NAVBAR */}
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

      {/* 🚀 MAIN CONTENT CONTAINER */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-20">
        
        {/* 1. HERO HEADER */}
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/40 border border-lime-500/30 text-lime-400 text-[10px] font-bold tracking-widest uppercase">
            INSTITUTIONAL PILOT
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight">
            OSINT for Public <br />
            <span className="text-white">Integrity & Fraud Prevention</span>
          </h1>

          <p className="text-gray-400 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            Supplier due diligence, verification of companies and representatives, connection mapping and exposure monitoring — with audit and compliance.
          </p>

          <div>
            <a href="#request-form">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs transition shadow-lg shadow-lime-500/20">
                Request institutional pilot
              </button>
            </a>
          </div>
        </div>

        {/* 2. WHO IT'S FOR */}
        <div className="space-y-6 border-t border-gray-900/80 pt-12">
          <div>
            <h3 className="text-lg font-bold text-white">Who it's for</h3>
            <p className="text-xs text-gray-400 mt-1">Control, procurement and integrity teams across public administration.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-gray-300">
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> City and state governments</li>
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Comptroller offices</li>
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Audit courts</li>
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Public agencies (autarchies)</li>
            </ul>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Regulatory agencies</li>
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Procurement and tender departments</li>
              <li className="flex items-center gap-2"><span className="text-lime-400">•</span> Integrity and fraud-prevention teams</li>
            </ul>
          </div>
        </div>

        {/* 3. WHAT YOU CAN DO */}
        <div className="space-y-6 border-t border-gray-900/80 pt-12">
          <h3 className="text-lg font-bold text-white">What you can do</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Supplier due diligence</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                CNPJ, ownership structure, domain and reputation before contracting.
              </p>
            </div>
            
            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Verify companies and representatives</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Cross-link the CNPJ with the CPFs of partners and representatives.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Connection mapping</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Links between people, companies and accounts of the same group.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Digital exposure monitoring</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Leaked credentials and data exposed for the institution and key people.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Cases and sourced reports</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Each case in its own space; PDF report with URL, source and timestamp.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-2 hover:border-gray-800 transition">
              <h4 className="text-xs font-bold text-white">Audit and compliance</h4>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                Every query logged with date and time, aligned with the LGPD.
              </p>
            </div>
          </div>
        </div>

        {/* 4. HOW IT WORKS */}
        <div className="space-y-6 border-t border-gray-900/80 pt-12">
          <h3 className="text-lg font-bold text-white">How it works</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-3">
              <span className="w-6 h-6 rounded-full bg-lime-950 border border-lime-500/40 text-lime-400 font-bold text-xs flex items-center justify-center">1</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                You request the institutional pilot through the form below.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-3">
              <span className="w-6 h-6 rounded-full bg-lime-950 border border-lime-500/40 text-lime-400 font-bold text-xs flex items-center justify-center">2</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                We verify the institution and the use case.
              </p>
            </div>

            <div className="bg-gray-950/80 border border-gray-900 p-5 rounded-2xl space-y-3">
              <span className="w-6 h-6 rounded-full bg-lime-950 border border-lime-500/40 text-lime-400 font-bold text-xs flex items-center justify-center">3</span>
              <p className="text-[11px] text-gray-400 leading-relaxed">
                We grant a short pilot, with a limited number of users and queries.
              </p>
            </div>
          </div>
        </div>

        {/* 5. TRUST & COMPLIANCE */}
        <div className="space-y-4 border-t border-gray-900/80 pt-12">
          <h3 className="text-lg font-bold text-white">Trust & compliance</h3>
          
          <ul className="space-y-2.5 text-xs text-gray-300">
            <li className="flex items-center gap-2">
              <span className="text-lime-400 font-bold">✓</span> Data on an encrypted server, with controlled retention (LGPD).
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-400 font-bold">✓</span> Sensitive data masked on the server.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-400 font-bold">✓</span> Audit log of every query.
            </li>
            <li className="flex items-center gap-2">
              <span className="text-lime-400 font-bold">✓</span> Access granted only after institutional verification.
            </li>
          </ul>
        </div>

        {/* 6. REQUEST FORM SECTION */}
        <div id="request-form" className="bg-gray-950 border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl relative">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Request institutional pilot</h3>
            <p className="text-xs text-gray-400">Short free pilot or institutional plan, with a limited number of users and queries.</p>
          </div>

          <form className="space-y-4 text-xs" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">First name</label>
                <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
              </div>
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">Last name</label>
                <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">Role / Position</label>
              <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">Agency / Institution</label>
              <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">Sphere</label>
                <select className="w-full bg-black border border-gray-800 p-3 rounded-xl text-gray-400 focus:outline-none focus:border-lime-500">
                  <option value="">Select...</option>
                  <option value="municipal">Municipal / City</option>
                  <option value="state">State</option>
                  <option value="federal">Federal</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">Area</label>
                <select className="w-full bg-black border border-gray-800 p-3 rounded-xl text-gray-400 focus:outline-none focus:border-lime-500">
                  <option value="">Select...</option>
                  <option value="audit">Audit & Control</option>
                  <option value="procurement">Procurement & Tenders</option>
                  <option value="integrity">Integrity / Compliance</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">Institutional email</label>
              <input type="email" placeholder="official@gov.in" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
              <p className="text-[10px] text-gray-500 mt-1">Use your agency email (.gov.in, .gov.br...) — it speeds up verification.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">Phone</label>
                <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
              </div>
              <div className="space-y-1">
                <label className="text-gray-400 font-medium">City / State <span className="text-gray-600">(optional)</span></label>
                <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">Estimated number of users <span className="text-gray-600">(optional)</span></label>
              <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">Use Case / message</label>
              <textarea rows={3} className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
            </div>

            <div className="space-y-1">
              <label className="text-gray-400 font-medium">How did you hear about footpryx? <span className="text-gray-600">(optional)</span></label>
              <input type="text" className="w-full bg-black border border-gray-800 p-3 rounded-xl text-white focus:outline-none focus:border-lime-500" />
            </div>

            {/* Mock Captcha Box */}
            <div className="p-3 bg-black border border-gray-800 rounded-xl flex items-center justify-between max-w-xs">
              <label className="flex items-center gap-3 text-xs text-gray-300 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-lime-500" defaultChecked />
                Verify you are human
              </label>
              <span className="text-[10px] text-gray-600 font-mono">Cloudflare</span>
            </div>

            {/* Checkbox Consent */}
            <label className="flex items-start gap-2 text-[11px] text-gray-400 cursor-pointer pt-2">
              <input type="checkbox" className="w-3.5 h-3.5 mt-0.5 rounded accent-lime-500" defaultChecked />
              <span>I have read and accept the Privacy Policy and authorize contact about this request.</span>
            </label>

            <button type="submit" className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3.5 rounded-xl transition text-xs shadow-lg shadow-lime-500/10">
              Request institutional pilot
            </button>
          </form>
        </div>

      </main>

      {/* 🌐 FOOTER */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-[10px] text-gray-600 space-y-2">
        <p>© 2026 footpryx. All rights reserved. · Privacy · Terms · contato@footpryx.com</p>
      </footer>

    </div>
  );
}