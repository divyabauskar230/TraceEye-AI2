"use client";
import React from "react";
import Link from "next/link";

export default function BlogListingPage() {
  // 📚 सर्व ब्लॉग आर्टिकल्सची लिस्ट
  const articles = [
    {
      id: 1,
      category: "COMPARISON",
      title: "footpryx vs Alternatives: 2026 OSINT Platform Comparison",
      desc: "footpryx vs OSINT Industries, Maltego and SpiderFoot. Complete comparison table with prices, sources and features.",
      slug: "/blog/comparison",
      date: "Jul 2026",
      readTime: "8 min read"
    },
    {
      id: 2,
      category: "TOOLS",
      title: "12 Free OSINT Tools for Investigations in 2026",
      desc: "From Sherlock to Shodan: the best free tools for email, username, domain and breaches.",
      slug: "/blog/free-tools",
      date: "Jun 2026",
      readTime: "12 min read"
    },
    {
      id: 3,
      category: "INVESTIGATION",
      title: "OSINT for Due Diligence: Complete Investigator Checklist",
      desc: "12 verification points, KYC/AML, and how to build due diligence reports with open source intelligence.",
      slug: "/blog/due-diligence",
      date: "May 2026",
      readTime: "15 min read"
    },
    {
      id: 4,
      category: "GUIDE",
      title: "What is OSINT and How Open Source Intelligence Works?",
      desc: "A beginner-to-advanced guide on methodology, data privacy, and active vs passive intelligence gathering.",
      slug: "/blog/comparison",
      date: "May 2026",
      readTime: "10 min read"
    },
    {
      id: 5,
      category: "LOOKUP",
      title: "How to Investigate Email Addresses Across 200+ Platforms",
      desc: "Discover social profiles, hidden gravatars, and domain registrations attached to any email ID.",
      slug: "/blog/free-tools",
      date: "Apr 2026",
      readTime: "7 min read"
    },
    {
      id: 6,
      category: "BREACHES",
      title: "Detecting Credentials Exposure in Data Dumps",
      desc: "How infostealer malware and database leaks compromise enterprise security and how to monitor them.",
      slug: "/blog/due-diligence",
      date: "Apr 2026",
      readTime: "9 min read"
    },
    {
      id: 7,
      category: "SOCIAL MEDIA",
      title: "Cross-Platform Handle Tracking: Username OSINT",
      desc: "Correlating digital footprints across Telegram, Discord, Steam, Instagram, and Reddit.",
      slug: "/blog/free-tools",
      date: "Mar 2026",
      readTime: "6 min read"
    },
    {
      id: 8,
      category: "COMPLIANCE",
      title: "LGPD & GDPR Compliance for Digital Investigators",
      desc: "Legal frameworks for handling public data, data masking, and maintaining chain of custody.",
      slug: "/blog/due-diligence",
      date: "Mar 2026",
      readTime: "11 min read"
    },
    {
      id: 9,
      category: "CRYPTO",
      title: "Blockchain Forensics: Tracking Bitcoin & Ethereum Wallets",
      desc: "Mapping crypto transactions, identifying wallet clusters, and tracing public ledger activity.",
      slug: "/blog/comparison",
      date: "Feb 2026",
      readTime: "14 min read"
    }
  ];

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

      {/* 🚀 MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        
        {/* Page Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-950/40 border border-lime-500/30 text-lime-400 text-xs font-semibold tracking-wider uppercase">
            ARTICLES & GUIDES
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
            OSINT Intelligence Blog
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed">
            Explorations, comparison guides, and practical checklists for digital investigators, security teams, and researchers.
          </p>
        </div>

        {/* 📰 Articles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((item) => (
            <Link key={item.id} href={item.slug} className="block group">
              <div className="bg-gray-950/80 border border-gray-800/80 rounded-3xl p-6 h-full flex flex-col justify-between hover:border-lime-500/50 transition duration-300 shadow-xl">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-lime-400 uppercase tracking-widest bg-lime-950/40 px-2.5 py-1 rounded-md border border-lime-500/20">
                      {item.category}
                    </span>
                    <span className="text-[10px] text-gray-500 font-mono">
                      {item.date}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white group-hover:text-lime-400 transition leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-gray-900/80 flex items-center justify-between text-xs">
                  <span className="text-gray-500 text-[10px] font-mono">{item.readTime}</span>
                  <span className="text-lime-400 font-semibold group-hover:translate-x-1 transition">
                    Read ➔
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* 🌐 FOOTER */}
      <footer className="border-t border-gray-900/80 py-8 text-center text-[10px] text-gray-600">
        © 2026 footpryx. All rights reserved.
      </footer>

    </div>
  );
}