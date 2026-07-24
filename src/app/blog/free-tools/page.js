"use client";
import React from "react";
import Link from "next/link";

export default function BlogFreeToolsPage() {
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

      {/* 📖 BLOG CONTENT CONTAINER */}
      <main className="max-w-3xl mx-auto px-6 py-12 space-y-12 text-gray-300 text-sm leading-relaxed">
        
        {/* Header Badge & Title */}
        <div className="space-y-4">
          <div className="inline-block px-3 py-1 rounded-md bg-lime-950/60 border border-lime-500/30 text-lime-400 text-[10px] font-bold uppercase tracking-widest">
            TOOLS
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            12 Ferramentas OSINT Gratuitas para Investigações em 2026
          </h1>
          <p className="text-xs text-gray-500 font-mono">Published in June 2026 · 12 min read</p>
        </div>

        {/* Intro */}
        <p className="text-base text-gray-300">
          Open Source Intelligence (OSINT) relies on collecting publicly available data to build accurate investigative pictures. Whether you are conducting corporate due diligence, cyber threat analysis, or identity verification, having the right toolkit is critical.
        </p>

        {/* Highlight Box (PONTOS CHAVE) */}
        <div className="bg-gray-950/90 border-l-4 border-lime-500 p-6 rounded-r-2xl space-y-3">
          <h4 className="text-xs font-bold text-lime-400 uppercase tracking-wider">PONTOS CHAVE</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Command-line tools offer speed, but require technical knowledge and setup time.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Web services like Shodan and VirusTotal provide instant infrastructure mapping.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lime-400 font-bold">•</span>
              <span>Combining multiple free modules into automated workflows like <strong>footpryx</strong> saves hours of manual searching.</span>
            </li>
          </ul>
        </div>

        {/* Tools Summary Grid Box */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-6 space-y-4">
          <h3 className="text-xs font-bold text-lime-400 uppercase tracking-widest text-center">
            FERRAMENTAS OSINT DESTAQUE (2026)
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-center text-xs">
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-lime-400">Sherlock</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">Maigret</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">Shodan</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">Censys</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">VirusTotal</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">SecurityTrails</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">HaveIBeenPwned</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">Holehe</div>
            <div className="p-3 bg-gray-900/80 rounded-xl border border-gray-800 font-bold text-white">GHunt</div>
          </div>
        </div>

        {/* Section 1: Usernames */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">1. Ferramentas de Nome de Usuário e Username</h2>
          <p>
            Usernames are often reused across platforms. Tracking handles allows investigators to link forum posts, developer code, and social profiles to a single individual.
          </p>

          <div className="space-y-4 pt-2">
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">Sherlock</span> — Verification across 400+ sites
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Python CLI tool that queries hundreds of social networks simultaneously to see if a handle exists.
              </p>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">Maigret</span> — Deep social profiling
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                A fork of Sherlock that goes further by parsing metadata, avatars, and profile IDs from pages.
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Infrastructure */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">2. Ferramentas de Infraestrutura e IP</h2>
          <p>
            Map server locations, exposed ports, active SSL certificates, and subdomains connected to target servers.
          </p>

          <div className="space-y-4 pt-2">
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">Shodan</span> — Search engine for connected devices
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Identifies open ports, running banners, and active services across any public IP address worldwide.
              </p>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">Censys</span> — Certificate & Host search
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Monitors domain certificates and host footprints to expose hidden staging environments.
              </p>
            </div>
          </div>
        </div>

        {/* Circular Visual Graphic Section */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl p-8 text-center space-y-6">
          <h3 className="text-sm font-bold text-white">Eficiência de Coleta Automática vs Manual</h3>
          
          <div className="flex flex-col items-center justify-center gap-4">
            {/* Donut Circle */}
            <div className="w-36 h-36 rounded-full border-8 border-lime-500 border-t-gray-800 flex items-center justify-center relative shadow-lg shadow-lime-500/10">
              <div className="text-center">
                <span className="text-2xl font-extrabold text-lime-400 font-mono">85%</span>
                <p className="text-[9px] text-gray-400 uppercase">Tempo Salvo</p>
              </div>
            </div>

            <div className="text-xs text-gray-400 max-w-sm">
              Plataformas automatizadas correlacionam dados de múltiplas fontes simultaneamente, eliminando testes manuais.
            </div>
          </div>
        </div>

        {/* Section 3: Email & Breach Data */}
        <div className="space-y-4 pt-6 border-t border-gray-900">
          <h2 className="text-2xl font-bold text-white">3. Investigação de Email e Vazamentos</h2>
          
          <div className="space-y-4">
            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">HaveIBeenPwned</span> — Database breach lookup
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Checks if an email address or password has been involved in known historical data dumps.
              </p>
            </div>

            <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800/80">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <span className="text-lime-400 font-bold">Holehe</span> — Account registration finder
              </h3>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                Checks if an email address is registered on 120+ sites without sending emails to the target.
              </p>
            </div>
          </div>
        </div>

        {/* Conclusion Callout (Bottom Green Box) */}
        <div className="bg-gradient-to-b from-gray-950 to-black border border-lime-500/40 rounded-3xl p-8 space-y-4 shadow-2xl relative overflow-hidden">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Quer automatizar todas essas consultas em uma única busca?</h3>
            <p className="text-xs text-gray-400">
              O <strong>footpryx</strong> cruza mais de 200 fontes abertas, dados de vazamentos, nomes, e-mails e telefones instantaneamente.
            </p>
          </div>

          <div className="pt-2">
            <Link href="/auth/register">
              <button className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-8 py-3.5 rounded-xl text-xs transition shadow-lg shadow-lime-500/20">
                Iniciar Investigação Grátis ➔
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