"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserBillingPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  
  // Modals state
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [isAutoRenewModalOpen, setIsAutoRenewModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  
  const [autoRenewStatus, setAutoRenewStatus] = useState(true);
  const [currentPlan, setCurrentPlan] = useState({ name: "Pro Plan", price: "$49.00" });
  const [cardNumber, setCardNumber] = useState("•••• •••• •••• 4892");

  // Form states
  const [newCard, setNewCard] = useState({ number: "", expiry: "", cvc: "" });

  const handleUpgradeSelect = (planName, price) => {
    setCurrentPlan({ name: planName, price: price });
    setIsUpgradeModalOpen(false);
    setSuccessMsg(`Successfully migrated to ${planName} (${price}/mo)!`);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleCardUpdateSubmit = (e) => {
    e.preventDefault();
    if (!newCard.number) return;
    const last4 = newCard.number.slice(-4);
    setCardNumber(`•••• •••• •••• ${last4}`);
    setIsCardModalOpen(false);
    setNewCard({ number: "", expiry: "", cvc: "" });
    setSuccessMsg("Payment method successfully updated & secured!");
    setTimeout(() => setSuccessMsg("3000"));
  };

  const handleDownloadInvoice = (invId) => {
    const invoiceContent = 
`========================================
         FOOTPRYX CYBER INTELLIGENCE    
            OFFICIAL INVOICE            
========================================
Invoice ID   : ${invId}
Plan Tier    : ${currentPlan.name}
Amount Paid  : ${currentPlan.price}
Status       : PAID VIA STRIPE
Date         : May 26, 2026
----------------------------------------
Thank you for your enterprise security subscription.
========================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invId}-receipt.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMsg(`Invoice ${invId} downloaded successfully!`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative overflow-x-hidden">
      
      {/* 🚀 UPGRADE / CHANGE PLAN MODAL */}
      {isUpgradeModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-xl w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">ENTERPRISE MATRIX</span>
                <h3 className="text-lg font-extrabold text-white">Select Security Tier</h3>
              </div>
              <button 
                onClick={() => setIsUpgradeModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-black/55 border border-gray-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition">
                <div>
                  <span className="text-lime-400 font-bold">Pro Plan</span>
                  <h4 className="text-xl font-black text-white mt-1">$49.00<span className="text-[10px] text-gray-400">/mo</span></h4>
                  <p className="text-[10px] text-gray-400 mt-2">1,000 Scans, 10 Monitored Domains, Dark Web Radar.</p>
                </div>
                <button 
                  onClick={() => handleUpgradeSelect("Pro Plan", "$49.00")}
                  className={`w-full py-2.5 rounded-xl font-bold cursor-pointer transition ${currentPlan.name === 'Pro Plan' ? 'bg-lime-500 text-black' : 'bg-gray-900 text-lime-400 border border-lime-500/30'}`}
                >
                  {currentPlan.name === 'Pro Plan' ? 'Active Tier' : 'Select Pro'}
                </button>
              </div>

              <div className="bg-black/55 border border-gray-800 p-4 rounded-2xl space-y-3 flex flex-col justify-between hover:border-lime-500/40 transition">
                <div>
                  <span className="text-purple-400 font-bold">Elite Enterprise</span>
                  <h4 className="text-xl font-black text-white mt-1">$199.00<span className="text-[10px] text-gray-400">/mo</span></h4>
                  <p className="text-[10px] text-gray-400 mt-2">Unlimited Scans, Dedicated IP, 24/7 Priority Support.</p>
                </div>
                <button 
                  onClick={() => handleUpgradeSelect("Elite Enterprise", "$199.00")}
                  className={`w-full py-2.5 rounded-xl font-bold cursor-pointer transition ${currentPlan.name === 'Elite Enterprise' ? 'bg-lime-500 text-black' : 'bg-lime-500 hover:bg-lime-400 text-black font-extrabold'}`}
                >
                  {currentPlan.name === 'Elite Enterprise' ? 'Active Tier' : 'Upgrade to Elite'}
                </button>
              </div>
            </div>

            <button 
              onClick={() => setIsUpgradeModalOpen(false)}
              className="w-full bg-gray-900 hover:bg-gray-800 text-gray-400 py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer font-mono"
            >
              Close Window
            </button>
          </div>
        </div>
      )}

      {/* ⚙️ MANAGE AUTO-RENEWAL MODAL */}
      {isAutoRenewModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">BILLING PREFERENCES</span>
                <h3 className="text-lg font-extrabold text-white">Auto-Renewal Settings</h3>
              </div>
              <button 
                onClick={() => setIsAutoRenewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="bg-black/50 p-4 rounded-2xl border border-gray-800 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold">Automatic Subscription Renewal</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Billed automatically at the end of each cycle.</p>
                </div>
                <button 
                  onClick={() => setAutoRenewStatus(!autoRenewStatus)}
                  className={`w-12 h-6 rounded-full transition relative p-1 cursor-pointer ${autoRenewStatus ? 'bg-lime-500' : 'bg-gray-700'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-black transition transform ${autoRenewStatus ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>
            </div>

            <button 
              onClick={() => {
                setIsAutoRenewModalOpen(false);
                setSuccessMsg(`Auto-renewal is now ${autoRenewStatus ? 'Enabled' : 'Disabled'}`);
                setTimeout(() => setSuccessMsg(""), 2500);
              }}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer font-mono"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}

      {/* 💳 UPDATE CARD DETAILS MODAL */}
      {isCardModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">SECURE STRIPE VAULT</span>
                <h3 className="text-lg font-extrabold text-white">Update Payment Card</h3>
              </div>
              <button 
                onClick={() => setIsCardModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCardUpdateSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-1">
                <label className="text-gray-400">Card Number</label>
                <input 
                  type="text" 
                  placeholder="4532 •••• •••• 4892"
                  value={newCard.number}
                  onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-gray-400">Expiry Date</label>
                  <input 
                    type="text" 
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-gray-400">CVC Code</label>
                  <input 
                    type="password" 
                    placeholder="CVC"
                    maxLength={4}
                    value={newCard.cvc}
                    onChange={(e) => setNewCard({...newCard, cvc: e.target.value})}
                    className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                    required
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Save & Secure Card
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
            <Link href="/user-panel" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📊</span> Dashboard
            </Link>
            <Link href="/user-panel/scan" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breach Scan
            </Link>
            <Link href="/user-panel/reports" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Breach Reports
            </Link>
            <Link href="/user-panel/darkweb" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Dark Web Monitor
            </Link>
            <Link href="/user-panel/billing" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>💳</span> Subscription & Billing
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Billing Gateway Secure
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Subscription & Billing Center</h2>
            <p className="text-xs text-gray-400">Manage your active membership tier, credits, and payment invoices.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          
          {/* CURRENT PLAN & PAYMENT METHOD ROW */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CURRENT MEMBERSHIP CARD */}
            <div className="lg:col-span-2 bg-[#060a17] border border-lime-500/30 rounded-3xl p-8 shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <span className="text-xs font-mono text-lime-400 font-bold">CURRENT MEMBERSHIP</span>
                  <h3 className="text-3xl font-black text-white mt-1">{currentPlan.name}</h3>
                  <p className="text-xs text-gray-400 font-mono mt-1">Billed Monthly • Renews on June 26, 2026</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-lime-950 text-lime-400 border border-lime-500/40 text-xs font-mono font-bold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-400 animate-pulse"></span> Active
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs relative z-10">
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">Monthly Scans</span>
                  <span className="text-xl font-black text-lime-400 mt-1 block">642 / 1000</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">Monitored Assets</span>
                  <span className="text-xl font-black text-white mt-1 block">10 / 10 Active</span>
                </div>
                <div className="bg-black/50 p-4 rounded-2xl border border-gray-800">
                  <span className="text-gray-500 block">API Rate Limit</span>
                  <span className="text-xl font-black text-purple-400 mt-1 block">500 req/min</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 relative z-10">
                <button 
                  onClick={() => setIsUpgradeModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-lime-500/20"
                >
                  UPGRADE / CHANGE PLAN 
                </button>
                <button 
                  onClick={() => setIsAutoRenewModalOpen(true)}
                  className="bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  MANAGE AUTO-RENEWAL
                </button>
              </div>
            </div>

            {/* PAYMENT METHOD CARD */}
            <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-2xl flex flex-col justify-between space-y-6">
              <div>
                <h3 className="text-sm font-bold text-white">Payment Method</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Securely processed via Stripe.</p>
              </div>

              <div className="bg-black/50 border border-gray-800 p-4 rounded-2xl flex items-center justify-between font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💳</span>
                  <div>
                    <p className="text-white font-bold text-xs">Mastercard {cardNumber}</p>
                    <p className="text-[10px] text-gray-400">Expires 09/28</p>
                  </div>
                </div>
                <span className="text-[10px] bg-lime-950 text-lime-400 border border-lime-500/30 px-2 py-0.5 rounded font-bold">Default</span>
              </div>

              <button 
                onClick={() => setIsCardModalOpen(true)}
                className="w-full bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer font-mono shadow-md"
              >
                UPDATE CARD DETAILS
              </button>
            </div>

          </div>

          {/* BILLING HISTORY & INVOICES TABLE */}
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <h3 className="text-sm font-bold text-white">Billing History & Invoices</h3>
            <div className="overflow-x-auto font-mono text-xs">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">INVOICE ID</th>
                    <th className="pb-3">PLAN DESCRIPTION</th>
                    <th className="pb-3">AMOUNT</th>
                    <th className="pb-3">STATUS</th>
                    <th className="pb-3">DATE</th>
                    <th className="pb-3 text-right">RECEIPT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {[
                    { id: "INV-2026-05", plan: `${currentPlan.name} Subscription`, amount: currentPlan.price, status: "Paid", date: "May 26, 2026" },
                    { id: "INV-2026-04", plan: "Pro Plan Subscription", amount: "$49.00", status: "Paid", date: "Apr 26, 2026" },
                    { id: "INV-2026-03", plan: "Pro Plan Subscription", amount: "$49.00", status: "Paid", date: "Mar 26, 2026" },
                  ].map((inv, idx) => (
                    <tr key={idx} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{inv.id}</td>
                      <td className="py-4 text-white">{inv.plan}</td>
                      <td className="py-4 text-gray-300 font-bold">{inv.amount}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded bg-lime-950 text-lime-400 border border-lime-500/30 text-[10px] font-bold">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{inv.date}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDownloadInvoice(inv.id)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1.5 rounded-lg border border-gray-800 cursor-pointer text-xs transition flex items-center gap-1.5 ml-auto"
                        >
                          Download PDF 📥
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