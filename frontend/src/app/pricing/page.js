"use client";

import { Check, Shield, Lock, Zap, Star } from "lucide-react";
import ProfessionalNavbar from "../components/Navbar"; // पाथ बरोबर आहे

export default function Pricing() {
  const plans = [
    {
      name: "Starter",
      tagline: "For occasional checks",
      price: "$150",
      period: "/yr",
      credits: "30 Credits",
      features: [
        "12 search types: email, phone, username...",
        "Breach detection + reverse password search",
        "200+ open sources + social networks",
        "Investigations with link map and report",
        "AI investigative dossier (7/day)",
        "CSV, JSON & PDF export - no captcha",
      ],
      isPopular: false,
    },
    {
      name: "Intermediate",
      tagline: "For active investigators",
      price: "$370",
      period: "/yr",
      credits: "100 Credits",
      features: [
        "Everything in Starter",
        "100 credits/month for more searches",
        "10 AI narratives per day",
        "Priority support (<24h response)",
      ],
      isPopular: true,
    },
    {
      name: "Advanced",
      tagline: "For teams and agencies",
      price: "$1,100",
      period: "/yr",
      credits: "300 Credits",
      features: [
        "Everything in Intermediate",
        "300 credits/month (for more searches)",
        "50 AI narratives per day",
        "Dedicated email support",
      ],
      isPopular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#030508] text-white pt-24 pb-16 px-4 relative overflow-hidden font-sans selection:bg-[#a3e635] selection:text-black">
      <ProfessionalNavbar />

      <div className="max-w-5xl mx-auto mt-8 relative z-10">
        
        {/* Headings Block */}
        <div className="text-center mb-16 space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-white">
            Plans & Pricing
          </h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
            Choose the plan that fits your investigation workflow. All plans include 200+ open sources, CSV/JSON export, and cancel anytime.
          </p>
        </div>

        {/* Pricing Cards Grid System */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative rounded-[28px] bg-[#0b0e17]/80 border backdrop-blur-xl p-8 flex flex-col justify-between transition-all duration-300 ${
                plan.isPopular
                  ? "border-[#a3e635] shadow-[0_0_40px_rgba(163,230,53,0.05)] md:-translate-y-2"
                  : "border-slate-900/60 hover:border-slate-800"
              }`}
            >
              {plan.isPopular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#a3e635] text-black font-sans uppercase text-[9px] font-extrabold tracking-widest px-3 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              <div>
                {/* Header Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-white">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.tagline}</p>
                </div>

                {/* Price Matrix */}
                <div className="mb-4 flex items-baseline">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-xs text-slate-500 font-medium ml-1">{plan.period}</span>
                </div>
                
                {/* Credits Badge */}
                <div className="text-xs font-semibold text-[#a3e635] mb-6 bg-[#141a2e] border border-slate-800 rounded-lg py-1 px-2.5 inline-block">
                  {plan.credits}
                </div>

                {/* Features Streams */}
                <ul className="space-y-3.5 mb-8">
                  {plan.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3 text-xs text-slate-300 leading-relaxed font-medium">
                      <Check size={14} className="text-[#a3e635] shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button Vector */}
              <button
                type="button"
                onClick={() => window.location.href = "/auth/register"}
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all active:scale-[0.98] ${
                  plan.isPopular
                    ? "bg-[#a3e635] hover:bg-[#bef264] text-black shadow-md"
                    : "bg-[#111625] hover:bg-[#151c30] text-slate-300 border border-slate-900"
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Footer Badges Sub-System */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-[10px] font-medium text-slate-500 uppercase tracking-wider text-center border-t border-slate-900/60 pt-8">
          <div className="flex items-center gap-1.5"><Shield size={12} className="text-[#a3e635]" /> Secure payment • card or crypto</div>
          <div className="flex items-center gap-1.5"><Zap size={12} className="text-[#a3e635]" /> Instant token activation</div>
          <div className="flex items-center gap-1.5"><Lock size={12} className="text-[#a3e635]" /> Cancel pipeline anytime</div>
        </div>

      </div>
    </div>
  );
}