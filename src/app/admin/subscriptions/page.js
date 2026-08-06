"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSubscriptionsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for subscriptions list and modal popup
  const [subscriptionsList, setSubscriptionsList] = useState([
    { id: "SUB-901", user: "alex.rivera@enterprise.io", plan: "Advanced Plan", renewal: "Jun 26, 2026", status: "Active" },
    { id: "SUB-902", user: "mariana@compliance.com", plan: "Institutional Plan", renewal: "Jul 12, 2026", status: "Active" },
    { id: "SUB-903", user: "julian@investigator.net", plan: "Intermediate Plan", renewal: "May 30, 2026", status: "Expired" },
    { id: "SUB-904", user: "analyst@security.org", plan: "Starter Plan", renewal: "Aug 15, 2026", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("Advanced Plan");
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

  const handleAddSubscriptionSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    const randomId = "SUB-" + Math.floor(100 + Math.random() * 900);
    const futureDate = "Jul 30, 2026";

    const newEntry = {
      id: randomId,
      user: userEmail,
      plan: selectedPlan,
      renewal: futureDate,
      status: "Active"
    };

    setSubscriptionsList([newEntry, ...subscriptionsList]);
    setUserEmail("");
    setIsModalOpen(false);
    setSuccessMsg("Subscription assigned successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleManage = (id) => {
    setSuccessMsg(`Managing subscription record: ${id}`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 💳 ASSIGN NEW SUBSCRIPTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">BILLING LEDGER</span>
                <h3 className="text-lg font-extrabold text-white">Assign Plan to User</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubscriptionSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">User Email Address</label>
                <input 
                  type="email" 
                  placeholder="user@enterprise.io"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Select Subscription Tier</label>
                <select 
                  value={selectedPlan}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                >
                  <option value="Starter Plan">Starter Plan</option>
                  <option value="Intermediate Plan">Intermediate Plan</option>
                  <option value="Advanced Plan">Advanced Plan</option>
                  <option value="Institutional Plan">Institutional Plan</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Assign & Activate Subscription
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
            <Link href="/admin/subscriptions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>💳</span> Subscriptions
            </Link>
            <Link href="/admin/scans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔍</span> Scans & Reports
            </Link>
            <Link href="/admin/breaches" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🛡️</span> Data Breaches
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
            <h2 className="text-xl font-black text-white tracking-tight">Active Subscriptions</h2>
            <p className="text-xs text-gray-400">Monitor active user plans, membership tiers and renewal timelines.</p>
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
              <h3 className="text-sm font-bold text-white">Platform Subscriptions Ledger ({subscriptionsList.length})</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-3 py-1 rounded-lg border border-lime-500/30">Auto-Renewals On</span>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Add Subscription
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Sub ID</th>
                    <th className="pb-3">User Email</th>
                    <th className="pb-3">Plan Tier</th>
                    <th className="pb-3">Renewal Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {subscriptionsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.user}</td>
                      <td className="py-4 text-gray-300">{item.plan}</td>
                      <td className="py-4 text-gray-400">{item.renewal}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${item.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-red-950 text-red-400 border border-red-500/30'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleManage(item.id)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Manage
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