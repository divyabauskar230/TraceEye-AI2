"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Check, ShieldCheck, Zap, Lock, ArrowRight, Star, ChevronDown, X, Info, User, LogOut 
} from "lucide-react";

export default function PricingPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("pricing");
  const [billingCycle, setBillingCycle] = useState("monthly"); // 'monthly' | 'annual'
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedGuide, setSelectedGuide] = useState(null); // Modal State
  const [user, setUser] = useState(null);

  // 🔑 LocalStorage मधून Login User तपासणे
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Session parse error", e);
        }
      }
    }
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 🚀 Action Handler for Get Started Button
  const handleGetStarted = (planName) => {
    router.push(`/checkout?plan=${planName.toLowerCase()}`);
  };

  // 💡 GUIDE MODAL DATA
  const guideDetails = {
    "Email Search": {
      title: "Email Search Intelligence",
      description: "Search across 200+ public indexes to identify exposed email addresses, linked profiles, registered services (like Google, Spotify, LinkedIn), and mapped domain MX records."
    },
    "Phone Search": {
      title: "Phone Number Recon",
      description: "Extract carrier location data, messenger API tokens (WhatsApp photo extraction), spam/telemarketing reputation scores, and associated social media aliases."
    },
    "Username Search": {
      title: "Username & Alias Mapping",
      description: "Trace handle footprints across 100+ platforms including Instagram, X (Twitter), GitHub, Discord, Steam, and dark web forums."
    },
    "Breach Detection": {
      title: "Data Breach Analysis",
      description: "Check if passwords, usernames, or PII have appeared in historical data dumps, plaintext leaks, or credential stuffing databases."
    },
    "CPF/CNPJ Search": {
      title: "Corporate & Tax Identifier Search",
      description: "Map Brazilian government identifiers to verify active corporate entity statuses, directorship filings, and public compliance records."
    },
    "Domain Search": {
      title: "Domain & DNS Reconnaissance",
      description: "Enumerate active subdomains, WHOIS registrar details, mail server security flags (SPF/DMARC), and historical Wayback Machine archives."
    },
    "Review a source-linked result": {
      title: "Source Verification Pipeline",
      description: "Inspect raw source origins, verified dates, and network route evidence for all correlated OSINT findings."
    },
    "OSINT due diligence": {
      title: "Enterprise Due Diligence",
      description: "Comprehensive target risk evaluation designed for fraud investigations, corporate background checks, and legal compliance teams."
    },
    "OSINT contra fraude": {
      title: "Anti-Fraud Intelligence",
      description: "Automated risk-scoring matrix to detect synthetic identities, credential reuse patterns, and malicious actor networks."
    },
    "footpryx vs alternatives": {
      title: "Platform Comparison",
      description: "footpryx integrates real-time AI analysis, multi-vector searches, and instant PDF reporting at a fraction of enterprise OSINT software costs."
    }
  };

  const faqs = [
    {
      q: "Is footpryx legal?",
      a: "Yes, footpryx strictly queries publicly available open sources, public records, and breach indexes within global data protection laws."
    },
    {
      q: "What happens to my data?",
      a: "Your searches are completely private. We do not sell or store search inputs beyond your personal workspace session cache."
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time directly from your account settings with a single click."
    },
    {
      q: "Is there a refund?",
      a: "We offer a 7-day money-back guarantee if you encounter technical issues or aren't satisfied with the platform."
    },
    {
      q: "Where do results come from?",
      a: "Data is aggregated in real-time from over 200+ public sources, dark web breach dumps, social registries, and domain records."
    }
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-white font-sans selection:bg-[#a3e635] selection:text-black flex flex-col justify-between relative">
      
      {/* 🌐 1. TOP NAVBAR */}
      <header className="w-full border-b border-slate-900/80 bg-[#030508]/80 backdrop-blur-md px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center text-[#a3e635] font-extrabold text-sm">
            👻
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-sm font-bold tracking-wider text-white uppercase">footpryx</h1>
              <span className="bg-emerald-500/10 border border-emerald-500/30 text-[#a3e635] text-[9px] font-mono px-1 py-0.2 rounded font-bold">
                AI
              </span>
            </div>
            <p className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
              FOOTPRINT INTELLIGENCE
            </p>
          </div>
        </Link>

        {/* Center Nav Pills */}
        <div className="bg-[#0b0f19] border border-slate-800/80 p-1 rounded-xl hidden sm:flex items-center gap-1">
          <button
            onClick={() => router.push('/')}
            className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition"
          >
            Search
          </button>
          <button
            className="px-4 py-1.5 text-xs font-semibold bg-[#141a2e] text-[#a3e635] border border-slate-700/60 rounded-lg shadow-sm"
          >
            Pricing
          </button>
          <button
            onClick={() => setActiveTab("enterprise")}
            className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-white rounded-lg transition"
          >
            Enterprise
          </button>
        </div>

        {/* Right CTA Actions / Profile */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-2 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
              <div className="w-6 h-6 rounded-full bg-[#a3e635] text-black font-extrabold flex items-center justify-center text-[10px]">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="text-xs font-bold text-white hidden sm:inline">{user.name}</span>
            </div>
          ) : (
            <button 
              onClick={() => router.push('/auth/login')} 
              className="text-xs font-semibold text-slate-300 hover:text-white transition"
            >
              Sign In
            </button>
          )}

          <button 
            onClick={() => router.push('/')} 
            className="bg-transparent border border-emerald-500/40 text-white hover:bg-emerald-500/10 px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition active:scale-95"
          >
            Launch Console <ArrowRight size={13} className="text-[#a3e635]" />
          </button>
        </div>

      </header>

      {/* 🚀 2. MAIN CONTENT AREA */}
      <main className="max-w-6xl mx-auto px-4 py-12 flex-1 w-full">
        
        {/* Title Header & Toggle */}
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Plans & Pricing
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Choose the plan that fits your investigation workflow. All plans include 200+ open sources, CSV/JSON export, and cancel anytime.
          </p>

          {/* Monthly / Annual Toggle Switch */}
          <div className="flex items-center justify-center gap-3 pt-4">
            <div className="bg-[#0b0f19] border border-slate-800 p-1 rounded-xl flex items-center">
              <button
                type="button"
                onClick={() => setBillingCycle("monthly")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  billingCycle === "monthly" 
                    ? "bg-[#a3e635] text-black shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle("annual")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  billingCycle === "annual" 
                    ? "bg-[#a3e635] text-black shadow-md" 
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Annual <span className="text-[9px] bg-slate-900 border border-slate-800 text-[#a3e635] px-1.5 py-0.5 rounded font-extrabold">2 months free</span>
              </button>
            </div>
          </div>
        </div>

        {/* 💳 PRICING CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* CARD 1: STARTER */}
          <div className="border border-slate-800/80 bg-[#070a12] rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white">Starter</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">For occasional checks</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "$15" : "$150"}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <span className="inline-block mt-3 bg-slate-900 border border-slate-800 text-[#a3e635] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  30 Credits
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>12 search types: email, phone, username, name, CPF, CNPJ, domain, link, IP, Bitcoin and password</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>Breach detection + reverse password search</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>200+ open sources + social networks</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>Investigations with link map and report</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>AI investigative dossier (1/day)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>CSV, JSON & PDF export - no captcha</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleGetStarted("starter")}
              className="w-full mt-8 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>

          {/* CARD 2: INTERMEDIATE (MOST POPULAR) */}
          <div className="relative border-2 border-[#a3e635] bg-[#080d17] rounded-2xl p-6 flex flex-col justify-between shadow-[0_0_25px_rgba(163,230,53,0.15)]">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#a3e635] text-black text-[9px] font-extrabold uppercase px-3 py-0.5 rounded-full tracking-wider">
              Most Popular
            </div>

            <div>
              <h3 className="text-base font-bold text-white">Intermediate</h3>
              <p className="text-[11px] text-slate-400 mt-0.5">For active investigators</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "$37" : "$370"}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <span className="inline-block mt-3 bg-slate-900 border border-slate-800 text-[#a3e635] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  100 Credits
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span className="font-semibold text-white">Everything in Starter</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>100 credits/month for more searches</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>10 AI narratives per day</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>Priority support (&lt;24h response)</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleGetStarted("intermediate")}
              className="w-full mt-8 bg-[#a3e635] hover:bg-emerald-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-md active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>

          {/* CARD 3: ADVANCED */}
          <div className="border border-slate-800/80 bg-[#070a12] rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl">
            <div>
              <h3 className="text-base font-bold text-white">Advanced</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">For teams and agencies</p>
              
              <div className="my-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-white">
                    {billingCycle === "monthly" ? "$110" : "$1,100"}
                  </span>
                  <span className="text-xs font-mono text-slate-500">
                    /{billingCycle === "monthly" ? "mo" : "yr"}
                  </span>
                </div>
                <span className="inline-block mt-3 bg-slate-900 border border-slate-800 text-[#a3e635] text-[10px] font-mono font-bold px-2.5 py-1 rounded-full">
                  300 Credits
                </span>
              </div>

              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span className="font-semibold text-white">Everything in Intermediate</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>300 credits/month (for more searches)</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>50 AI narratives per day</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                  <span>Dedicated email support</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => handleGetStarted("advanced")}
              className="w-full mt-8 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-200 font-bold py-2.5 rounded-xl text-xs transition active:scale-[0.98]"
            >
              Get Started
            </button>
          </div>

        </div>

        {/* 🔒 TRUST BADGES BAR */}
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 mt-10 text-[10px] font-mono tracking-wider uppercase text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#a3e635]" /> SECURE PAYMENT • CARD OR CRYPTO
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={13} className="text-[#a3e635]" /> INSTANT TOKEN ACTIVATION
          </span>
          <span className="flex items-center gap-1.5">
            <Lock size={13} className="text-[#a3e635]" /> CANCEL PIPELINE ANYTIME
          </span>
        </div>

        {/* ⭐ TESTIMONIALS SECTION */}
        <div className="max-w-5xl mx-auto mt-24 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">
              Trusted by people who really investigate
            </h2>
            <p className="text-xs text-slate-500">
              Investigators, journalists and enthusiasts use footpryx every day to find what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-slate-800/80 bg-[#070a12] p-5 rounded-2xl space-y-3">
              <div className="flex text-amber-400 gap-1"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <p className="text-xs text-slate-300 italic">"I cross-check email and phone in seconds. What took hours of Googling is now one report."</p>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center text-[#a3e635]">M</div>
                <div><p className="text-[11px] font-bold text-white">Marina C.</p><p className="text-[9px] text-slate-500">Private Investigator</p></div>
              </div>
            </div>

            <div className="border border-slate-800/80 bg-[#070a12] p-5 rounded-2xl space-y-3">
              <div className="flex text-amber-400 gap-1"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <p className="text-xs text-slate-300 italic">"People and domain recon in one place. And the AI narrates the dossier beautifully."</p>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center text-[#a3e635]">L</div>
                <div><p className="text-[11px] font-bold text-white">Lucas R.</p><p className="text-[9px] text-slate-500">Pentester / Red Team</p></div>
              </div>
            </div>

            <div className="border border-slate-800/80 bg-[#070a12] p-5 rounded-2xl space-y-3">
              <div className="flex text-amber-400 gap-1"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
              <p className="text-xs text-slate-300 italic">"I found out who was behind a number harassing me. It gave me peace of mind."</p>
              <div className="flex items-center gap-2 pt-2">
                <div className="w-6 h-6 rounded-full bg-slate-800 text-xs font-bold flex items-center justify-center text-[#a3e635]">J</div>
                <div><p className="text-[11px] font-bold text-white">Juliana P.</p><p className="text-[9px] text-slate-500">Personal Safety</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* 📊 EVERYTHING INCLUDED SECTION */}
        <div className="max-w-5xl mx-auto mt-24 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-xl md:text-2xl font-extrabold text-white">Everything included in every plan</h2>
            <p className="text-xs text-slate-500">Plans differ only in credits. AI dossiers per day and support — every capability below is in all three.</p>
          </div>

          <div className="flex items-center justify-center flex-wrap gap-2 py-3 px-4 bg-[#070a12] border border-slate-800/80 rounded-xl text-[10px] font-mono">
            <span className="text-[#a3e635] font-bold uppercase mr-2">SEARCH 11 TYPES:</span>
            {['Email', 'Phone', 'Username', 'Name', 'CPF', 'CNPJ', 'Domain', 'Link / URL', 'IP', 'Bitcoin', 'Password reverse'].map((item, idx) => (
              <span key={idx} className="bg-slate-900 border border-slate-800 px-2 py-0.5 rounded text-slate-300">
                {item}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#070a12] border border-slate-800/80 rounded-2xl p-6 text-xs">
            <div className="space-y-2">
              <h4 className="font-bold text-white border-b border-slate-800 pb-2">Breaches and credentials</h4>
              <p className="text-slate-400">• Breach detection: where it leaked and what was compromised</p>
              <p className="text-slate-400">• Reverse password search: where it leaked and which accounts use it</p>
              <p className="text-slate-400">• Credentials and emails exposed in public datasets</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white border-b border-slate-800 pb-2">Correlation and social</h4>
              <p className="text-slate-400">• 200+ public open sources</p>
              <p className="text-slate-400">• Profiles on Google, Discord, Spotify, Strava, TikTok, X and more</p>
              <p className="text-slate-400">• WhatsApp profile photo from a phone number</p>
              <p className="text-slate-400">• Correlated identities and linked accounts</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-white border-b border-slate-800 pb-2">AI Intelligence</h4>
              <p className="text-slate-400">• Automatic investigative dossier</p>
              <p className="text-slate-400">• Risk score with explanation</p>
              <p className="text-slate-400">• Suggested next investigative steps</p>
            </div>
          </div>
        </div>

        {/* ❓ FAQ ACCORDION SECTION */}
        <div className="max-w-3xl mx-auto mt-24 space-y-6">
          <h2 className="text-xl md:text-2xl font-extrabold text-center text-white">Frequently asked questions</h2>
          
          <div className="space-y-2.5">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-800/80 bg-[#070a12] rounded-xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-4 text-xs font-bold text-white text-left hover:bg-slate-900/40 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={14} className={`transition-transform duration-200 ${openFaq === idx ? "rotate-180 text-[#a3e635]" : "text-slate-500"}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-slate-400 border-t border-slate-900/80 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 💡 GUIDES FOOTER BOXES */}
        <div className="max-w-5xl mx-auto mt-24 space-y-4">
          <div className="text-center space-y-1">
            <h4 className="text-sm font-bold text-white">Before choosing a plan, learn what each search delivers</h4>
            <p className="text-[11px] text-slate-500">All plans query the same open sources — the difference is the credit volume and search types enabled.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            
            <div className="border border-slate-800/80 bg-[#070a12] p-4 rounded-xl space-y-1.5">
              <h5 className="font-bold text-white mb-2">For the Starter plan</h5>
              {["Email Search", "Phone Search", "Username Search", "Breach Detection"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGuide(item)}
                  className="block text-[#a3e635] hover:underline font-mono text-[11px] text-left transition"
                >
                  • {item}
                </button>
              ))}
            </div>

            <div className="border border-slate-800/80 bg-[#070a12] p-4 rounded-xl space-y-1.5">
              <h5 className="font-bold text-white mb-2">For the Intermediate plan</h5>
              {["CPF/CNPJ Search", "Domain Search", "Review a source-linked result"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGuide(item)}
                  className="block text-[#a3e635] hover:underline font-mono text-[11px] text-left transition"
                >
                  • {item}
                </button>
              ))}
            </div>

            <div className="border border-slate-800/80 bg-[#070a12] p-4 rounded-xl space-y-1.5">
              <h5 className="font-bold text-white mb-2">For the Advanced plan & teams</h5>
              {["OSINT due diligence", "OSINT contra fraude", "footpryx vs alternatives"].map((item) => (
                <button
                  key={item}
                  onClick={() => setSelectedGuide(item)}
                  className="block text-[#a3e635] hover:underline font-mono text-[11px] text-left transition"
                >
                  • {item}
                </button>
              ))}
            </div>

          </div>
        </div>

      </main>

      {/* 🔒 BOTTOM GUARANTEE BAR */}
      <footer className="w-full border-t border-slate-900/80 py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-8 text-[10px] font-mono tracking-wider uppercase text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck size={13} className="text-[#a3e635]" /> SECURE PAYMENT • CARD OR CRYPTO
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={13} className="text-[#a3e635]" /> INSTANT TOKEN ACTIVATION
          </span>
          <span className="flex items-center gap-1.5">
            <Lock size={13} className="text-[#a3e635]" /> CANCEL PIPELINE ANYTIME
          </span>
        </div>
      </footer>

      {/* 📄 PAGE FOOTER */}
      <footer className="w-full border-t border-slate-900/80 py-8 px-4 text-center text-[10px] text-slate-600 font-mono">
        © 2026 footpryx.com. All rights reserved. • Blog • About • Privacy • Terms
      </footer>

      {/* 🪟 DYNAMIC MODAL POPUP FOR GUIDES */}
      {selectedGuide && guideDetails[selectedGuide] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#0b0f19] border border-slate-800 rounded-2xl p-6 max-w-md w-full shadow-2xl relative space-y-4">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-[#a3e635]">
                <Info size={16} />
                <h3 className="text-sm font-bold text-white">
                  {guideDetails[selectedGuide].title}
                </h3>
              </div>
              <button 
                onClick={() => setSelectedGuide(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {guideDetails[selectedGuide].description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedGuide(null)}
                className="bg-[#a3e635] text-black text-xs font-bold px-4 py-2 rounded-xl hover:bg-emerald-400 transition"
              >
                Got it
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}