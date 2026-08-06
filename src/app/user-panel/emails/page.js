"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserEmailsPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newEmail, setNewEmail] = useState("");

  const [isCheckModalOpen, setIsCheckModalOpen] = useState(false);
  const [selectedEmailObj, setSelectedEmailObj] = useState(null);

  const [emailsList, setEmailsList] = useState([
    { id: "EML-301", email: "user@domain.com", breachCount: "6 Found", spamScore: "Low (1.2%)", status: "Compromised" },
    { id: "EML-302", email: "admin@mycompany.io", breachCount: "0 Found", spamScore: "Zero (0.0%)", status: "Secure" },
    { id: "EML-303", email: "support@footpryx.com", breachCount: "2 Found", spamScore: "Medium (4.5%)", status: "Monitored" },
  ]);

  const handleAddEmailSubmit = (e) => {
    e.preventDefault();
    if (!newEmail.trim()) return;

    const entry = {
      id: "EML-" + Math.floor(310 + Math.random() * 100),
      email: newEmail,
      breachCount: "0 Found",
      spamScore: "Zero (0.0%)",
      status: "Secure"
    };

    setEmailsList([entry, ...emailsList]);
    setNewEmail("");
    setIsAddModalOpen(false);
    setSuccessMsg("Email successfully registered for live credential monitoring!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleInboxCheck = (item) => {
    setSelectedEmailObj(item);
    setIsCheckModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* ➕ ADD EMAIL MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">EMAIL RADAR</span>
                <h3 className="text-lg font-extrabold text-white">Add Email to Monitor</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEmailSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="e.g. name@domain.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Start Email Tracking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔍 INBOX CHECK MODAL */}
      {isCheckModalOpen && selectedEmailObj && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">{selectedEmailObj.id} // DEEP INBOX AUDIT</span>
                <h3 className="text-lg font-extrabold text-white">{selectedEmailObj.email}</h3>
              </div>
              <button 
                onClick={() => setIsCheckModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Credential Dumps:</span>
                <span className="text-red-400 font-bold">{selectedEmailObj.breachCount}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Spam / Phishing Score:</span>
                <span className="text-lime-400 font-bold">{selectedEmailObj.spamScore}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Active Protection:</span>
                <span className="text-emerald-400 font-bold">Enabled (Real-time Guard)</span>
              </div>
            </div>

            <button 
              onClick={() => setIsCheckModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Audit
            </button>
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
            <Link href="/user-panel/domains" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🌐</span> Domain Monitoring
            </Link>
            <Link href="/user-panel/emails" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>✉️</span> Email Monitoring
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Email Vault Active
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Email Monitoring Workspace</h2>
            <p className="text-xs text-gray-400">Track email exposure, password leaks, and spam confidence ratings.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Monitored Mailboxes ({emailsList.length} Active)</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Continuous credential inspection across global pastebins and dumps.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-lime-500/20"
              >
                <span>+</span> Add Email to Monitor
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Tracking ID</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Breaches Found</th>
                    <th className="pb-3">Spam Rating</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {emailsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.email}</td>
                      <td className="py-4 text-gray-300">{item.breachCount}</td>
                      <td className="py-4 text-gray-400">{item.spamScore}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.status === 'Compromised' ? 'bg-red-950 text-red-400 border border-red-500/40' : item.status === 'Monitored' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-lime-950 text-lime-400 border border-lime-500/30'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleInboxCheck(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Inbox Check →
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