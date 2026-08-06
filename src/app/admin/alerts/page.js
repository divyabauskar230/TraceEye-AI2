"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminAlertsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  const [selectedAlert, setSelectedAlert] = useState(null);

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

  const alertsList = [
    { id: "ALT-101", title: "Critical Database Breach Detected", target: "Enterprise Global DB", severity: "Critical", time: "10 mins ago", status: "Broadcasted" },
    { id: "ALT-102", title: "Multiple Failed Admin Logins", target: "Auth Gateway", severity: "High", time: "25 mins ago", status: "Mitigated" },
    { id: "ALT-103", title: "Suspicious API Rate Limit Spike", target: "OSINT Telemetry", severity: "Medium", time: "1 hour ago", status: "Monitoring" },
    { id: "ALT-104", title: "SSL Certificate Expiry Warning", target: "auth-footpryx-login.com", severity: "High", time: "3 hours ago", status: "Pending Action" },
  ];

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* ALERT DETAILS MODAL */}
      {selectedAlert && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-red-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-red-400 font-bold">{selectedAlert.id} // SECURITY TELEMETRY</span>
                <h3 className="text-lg font-extrabold text-white">{selectedAlert.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Affected Target:</span>
                <span className="text-white font-bold">{selectedAlert.target}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Severity Level:</span>
                <span className="text-red-400 font-bold">{selectedAlert.severity}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Broadcast Time:</span>
                <span className="text-lime-400 font-bold">{selectedAlert.time}</span>
              </div>
            </div>

            <button 
              onClick={() => setSelectedAlert(null)}
              className="w-full bg-red-500 hover:bg-red-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Alert
            </button>
          </div>
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
            <Link href="/admin/alerts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🚨</span> Alerts & Broadcasts
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
            <h2 className="text-xl font-black text-white tracking-tight">Security Alerts & Broadcasts</h2>
            <p className="text-xs text-gray-400">Manage real-time system alerts, threat broadcasts and emergency notifications.</p>
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
              <h3 className="text-sm font-bold text-white">Active System Alerts Feed</h3>
              <button className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border border-red-500/30 font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer">
                + Broadcast Global Alert
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Alert ID</th>
                    <th className="pb-3">Alert Title</th>
                    <th className="pb-3">Target Entity</th>
                    <th className="pb-3">Severity</th>
                    <th className="pb-3">Timestamp</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {alertsList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-red-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.title}</td>
                      <td className="py-4 text-gray-300">{item.target}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.severity === 'Critical' ? 'bg-red-950 text-red-400 border border-red-500/40' : item.severity === 'High' ? 'bg-yellow-950 text-yellow-400 border border-yellow-500/40' : 'bg-blue-950 text-blue-400 border border-blue-500/30'}`}>
                          {item.severity}
                        </span>
                      </td>
                      <td className="py-4 text-gray-400">{item.time}</td>
                      <td className="py-4 text-emerald-400 font-bold">{item.status}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => setSelectedAlert(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          View
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