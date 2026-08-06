"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPlansPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for plans list and modal popup
  const [plansList, setPlansList] = useState([
    { id: 1, name: "Starter Plan", priceMonthly: "$15", priceYearly: "$12", credits: "50 Credits/mo", status: "Active" },
    { id: "SUB-902", user: "mariana@compliance.com", plan: "Institutional Plan", renewal: "Jul 12, 2026", status: "Active" },
    { id: 2, name: "Intermediate Plan", priceMonthly: "$37", priceYearly: "$29", credits: "150 Credits/mo", status: "Active" },
    { id: 3, name: "Advanced Plan", priceMonthly: "$110", priceYearly: "$88", credits: "500 Credits/mo", status: "Active" },
    { id: 4, name: "Institutional Plan", priceMonthly: "Custom", priceYearly: "Custom", credits: "Unlimited", status: "Enterprise" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState("");
  const [credits, setCredits] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (savedUser) {
        try {
          const parsed = JSON.parse(savedUser);
          setAdminUser({
            name: parsed.name || "Admin",
            role: "Super Admin",
            initial: parsed.name ? parsed.name.charAt(0).toUpperCase() : "A"
          });
        } catch (e) {
          console.error(e);
        }
      }
    }
  }, []);

  const handleCreatePlanSubmit = (e) => {
    e.preventDefault();
    if (!planName.trim() || !monthlyPrice.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: planName,
      priceMonthly: monthlyPrice.startsWith('$') ? monthlyPrice : `$${monthlyPrice}`,
      priceYearly: yearlyPrice.startsWith('$') ? yearlyPrice : `$${yearlyPrice}`,
      credits: credits || "100 Credits/mo",
      status: "Active"
    };

    setPlansList([newEntry, ...plansList]);
    setPlanName("");
    setMonthlyPrice("");
    setYearlyPrice("");
    setCredits("");
    setIsModalOpen(false);
    setSuccessMsg("New subscription tier created successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleConfigure = (name) => {
    setSuccessMsg(`Configuring parameters for ${name}...`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 💳 CREATE NEW PLAN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">BILLING ENGINE</span>
                <h3 className="text-lg font-extrabold text-white">Create New Subscription Tier</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePlanSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Plan Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Enterprise Pro"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <label className="text-gray-400 block">Monthly Price</label>
                  <input 
                    type="text" 
                    placeholder="$49"
                    value={monthlyPrice}
                    onChange={(e) => setMonthlyPrice(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-gray-400 block">Yearly Price</label>
                  <input 
                    type="text" 
                    placeholder="$39"
                    value={yearlyPrice}
                    onChange={(e) => setYearlyPrice(e.target.value)}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Credit Allocation</label>
                <input 
                  type="text" 
                  placeholder="e.g. 300 Credits/mo"
                  value={credits}
                  onChange={(e) => setCredits(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Save & Publish Tier
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS TOAST */}
      {successMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-lime-500 text-black font-extrabold px-6 py-3 rounded-2xl shadow-2xl text-xs uppercase tracking-wider animate-bounce">
          {successMsg}
        </div>
      )}

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#050914] border-r border-gray-800/80 flex flex-col justify-between p-5 select-none hidden lg:flex shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2 pt-1">
            <img src="/logo.png" alt="Logo" className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
            <div>
              <h1 className="text-sm font-extrabold tracking-wider text-white uppercase">footpryx</h1>
              <p className="text-[9px] text-gray-400 font-mono tracking-widest">CYBER INTELLIGENCE</p>
            </div>
          </div>

          <nav className="space-y-1 text-xs font-medium">
            <Link href="/admin" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/admin/users" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>👥</span> Users
            </Link>
            <Link href="/admin/scans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔍</span> Scans & Reports
            </Link>
            <Link href="/admin/breaches" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breaches
            </Link>
            <Link href="/admin/threats" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>⚡</span> Threat Intelligence
            </Link>
            <Link href="/admin/plans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>💳</span> Plans & Billing
            </Link>
            <Link href="/admin/transactions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Transactions
            </Link>
            <Link href="/admin/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>💬</span> Support Tickets
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Admin Secured
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Plans & Billing Management</h2>
            <p className="text-xs text-gray-400">Configure subscription tiers, credits allocation and pricing structures.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-lime-500 text-black font-extrabold flex items-center justify-center text-sm">
              {adminUser.initial}
            </div>
            <div className="text-left">
              <p className="text-xs font-bold text-white leading-none">{adminUser.name}</p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">Super Admin</p>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-white">Active Subscription Tiers ({plansList.length})</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                + Create New Plan
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Plan Name</th>
                    <th className="pb-3">Monthly Price</th>
                    <th className="pb-3">Yearly Price</th>
                    <th className="pb-3">Credit Allocation</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {plansList.map((p) => (
                    <tr key={p.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-white font-bold">{p.name}</td>
                      <td className="py-4 text-lime-400">{p.priceMonthly}</td>
                      <td className="py-4 text-lime-400">{p.priceYearly}</td>
                      <td className="py-4 text-gray-300">{p.credits}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleConfigure(p.name)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Configure
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}