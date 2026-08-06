"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSettingsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  const [savedMsg, setSavedMsg] = useState(false);

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

  const handleSave = (e) => {
    e.preventDefault();
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* SAVED NOTIFICATION TOAST */}
      {savedMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-lime-500 text-black font-extrabold px-6 py-3 rounded-2xl shadow-2xl text-xs uppercase tracking-wider animate-bounce">
          Settings updated successfully!
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
            <Link href="/admin/plans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>💳</span> Plans & Billing
            </Link>
            <Link href="/admin/transactions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>📄</span> Transactions
            </Link>
            <Link href="/admin/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>💬</span> Support Tickets
            </Link>
            <Link href="/admin/logs" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🪵</span> System Logs
            </Link>
            <Link href="/admin/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>⚙️</span> Settings
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
            <h2 className="text-xl font-black text-white tracking-tight">Platform Settings</h2>
            <p className="text-xs text-gray-400">Configure global parameters, security restrictions and maintenance flags.</p>
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

        <div className="p-8 space-y-6 max-w-4xl mx-auto w-full">
          <form onSubmit={handleSave} className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-8 shadow-lg space-y-6">
            <h3 className="text-sm font-bold text-white border-b border-gray-800 pb-3">General Configuration</h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="space-y-2">
                <label className="text-gray-400 block">Platform Name</label>
                <input 
                  type="text" 
                  defaultValue="Footpryx Cyber Intelligence" 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Admin Support Email</label>
                <input 
                  type="email" 
                  defaultValue="admin@footpryx.com" 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Max Free Scans Per User</label>
                <input 
                  type="number" 
                  defaultValue="2" 
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500"
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-gray-800">
                <div>
                  <p className="font-bold text-white">Maintenance Mode</p>
                  <p className="text-[10px] text-gray-500">Temporarily disable public searches for system updates.</p>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-lime-500 cursor-pointer" />
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-lg shadow-lime-500/10"
            >
              Save Changes
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}