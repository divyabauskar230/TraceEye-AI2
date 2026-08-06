"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UserDomainsPage() {
  const router = useRouter();
  const [successMsg, setSuccessMsg] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newDomain, setNewDomain] = useState("");

  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState(null);

  const [domainsList, setDomainsList] = useState([
    { id: "DOM-101", domain: "example.com", sslStatus: "Valid (TLS 1.3)", subdomains: "12 Active", risk: "Low", status: "Secure" },
    { id: "DOM-102", domain: "company-secure.io", sslStatus: "Expiring Soon", subdomains: "28 Active", risk: "Medium", status: "Warning" },
    { id: "DOM-103", domain: "my-app-portal.net", sslStatus: "Valid (TLS 1.2)", subdomains: "5 Active", risk: "High", status: "Exposed" },
  ]);

  const handleAddDomainSubmit = (e) => {
    e.preventDefault();
    if (!newDomain.trim()) return;

    const entry = {
      id: "DOM-" + Math.floor(110 + Math.random() * 100),
      domain: newDomain,
      sslStatus: "Secured (TLS 1.3)",
      subdomains: "4 Active",
      risk: "Low",
      status: "Secure"
    };

    setDomainsList([entry, ...domainsList]);
    setNewDomain("");
    setIsAddModalOpen(false);
    setSuccessMsg("Domain successfully added to active monitoring!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleAudit = (dom) => {
    setSelectedDomain(dom);
    setIsAuditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* ➕ ADD DOMAIN MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">DOMAIN RADAR</span>
                <h3 className="text-lg font-extrabold text-white">Add Domain to Monitor</h3>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDomainSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Domain Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. mybusiness.com"
                  value={newDomain}
                  onChange={(e) => setNewDomain(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Start Domain Surveillance
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 🔍 AUDIT MODAL */}
      {isAuditModalOpen && selectedDomain && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">{selectedDomain.id} // DNS AUDIT</span>
                <h3 className="text-lg font-extrabold text-white">{selectedDomain.domain}</h3>
              </div>
              <button 
                onClick={() => setIsAuditModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">SSL Certificate:</span>
                <span className="text-lime-400 font-bold">{selectedDomain.sslStatus}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Subdomains Indexed:</span>
                <span className="text-white font-bold">{selectedDomain.subdomains}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Infrastructure Risk:</span>
                <span className="text-amber-400 font-bold">{selectedDomain.risk}</span>
              </div>
              <div className="flex justify-between bg-slate-900/50 p-3 rounded-xl border border-slate-800">
                <span className="text-slate-500">Firewall Status:</span>
                <span className="text-emerald-400 font-bold">WAF Active (Cloudflare)</span>
              </div>
            </div>

            <button 
              onClick={() => setIsAuditModalOpen(false)}
              className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
            >
              Close Audit Report
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
            <Link href="/user-panel/domains" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🌐</span> Domain Monitoring
            </Link>
          </nav>
        </div>

        <div className="mt-4 bg-black/60 border border-gray-800 p-3.5 rounded-2xl space-y-1.5 font-mono">
          <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            DNS Surveillance Active
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto">
        <header className="h-20 border-b border-gray-800/80 px-8 flex items-center justify-between bg-[#040812]/80 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-black text-white tracking-tight">Domain Monitoring Workspace</h2>
            <p className="text-xs text-gray-400">Track SSL validity, DNS changes, and subdomain vulnerability leaks.</p>
          </div>
          <Link href="/user-panel" className="bg-gray-900 hover:bg-gray-800 text-lime-400 border border-gray-800 px-4 py-2 rounded-xl text-xs font-bold transition">
            ← Back to Dashboard
          </Link>
        </header>

        <div className="p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          <div className="bg-[#060a17] border border-gray-800/80 rounded-3xl p-6 shadow-lg space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Monitored Assets ({domainsList.length} Active Domains)</h3>
                <p className="text-xs text-gray-400 font-mono mt-0.5">Real-time health checking across primary and secondary nameservers.</p>
              </div>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer flex items-center gap-2 shadow-lg shadow-lime-500/20"
              >
                <span>+</span> Add Domain to Monitor
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Domain ID</th>
                    <th className="pb-3">Domain Asset</th>
                    <th className="pb-3">SSL Certificate</th>
                    <th className="pb-3">Subdomains</th>
                    <th className="pb-3">Risk Level</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {domainsList.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{item.id}</td>
                      <td className="py-4 text-white font-bold">{item.domain}</td>
                      <td className="py-4 text-gray-300">{item.sslStatus}</td>
                      <td className="py-4 text-gray-400">{item.subdomains}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.risk === 'High' ? 'bg-red-950 text-red-400 border border-red-500/40' : item.risk === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-500/30' : 'bg-lime-950 text-lime-400 border border-lime-500/30'}`}>
                          {item.risk}
                        </span>
                      </td>
                      <td className="py-4 text-emerald-400 font-bold">{item.status}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleAudit(item)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          DNS Audit →
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