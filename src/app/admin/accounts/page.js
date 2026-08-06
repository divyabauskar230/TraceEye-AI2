"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminAccountsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for accounts list and modal popup
  const [accountsList, setAccountsList] = useState([
    { id: 1, name: "Admin", email: "admin@footpryx.com", role: "Super Admin", access: "Full Control", status: "Active" },
    { id: 2, name: "Security Lead", email: "security@footpryx.com", role: "Threat Analyst", access: "Read / Isolate", status: "Active" },
    { id: 3, name: "Billing Manager", email: "billing@footpryx.com", role: "Finance Admin", access: "Billing & Plans", status: "Active" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState("Threat Analyst");
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

  const handleRevoke = (id) => {
    setAccountsList(prev => prev.filter(item => item.id !== id));
    setSuccessMsg("Admin account revoked successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleAddAdminSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
      access: newRole === 'Super Admin' ? 'Full Control' : 'Standard Access',
      status: 'Active'
    };

    setAccountsList([newEntry, ...accountsList]);
    setNewName("");
    setNewEmail("");
    setIsModalOpen(false);
    setSuccessMsg("New admin account created successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 🔐 ADD NEW ADMIN MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">ACCESS CONTROL</span>
                <h3 className="text-lg font-extrabold text-white">Add New Admin / Moderator</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddAdminSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">Personnel Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Alex Rivera"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="alex@footpryx.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Assigned Role</label>
                <select 
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                >
                  <option value="Threat Analyst">Threat Analyst</option>
                  <option value="Finance Admin">Finance Admin</option>
                  <option value="Super Admin">Super Admin</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Authorize & Save Admin
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
            <Link href="/admin/settings" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>⚙️</span> Settings
            </Link>
            <Link href="/admin/integrations" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔗</span> Integrations
            </Link>
            <Link href="/admin/api" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>🔌</span> API Management
            </Link>
            <Link href="/admin/accounts" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>🔐</span> Admin Accounts
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
            <h2 className="text-xl font-black text-white tracking-tight">Admin & Moderator Accounts</h2>
            <p className="text-xs text-gray-400">Manage administrative privileges, security roles and access control.</p>
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
              <h3 className="text-sm font-bold text-white">Authorized Personnel ({accountsList.length} Active)</h3>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
              >
                + Add New Admin
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Name</th>
                    <th className="pb-3">Email Address</th>
                    <th className="pb-3">Assigned Role</th>
                    <th className="pb-3">Access Level</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {accountsList.map((acc) => (
                    <tr key={acc.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-white font-bold">{acc.name}</td>
                      <td className="py-4 text-gray-300">{acc.email}</td>
                      <td className="py-4 text-lime-400">{acc.role}</td>
                      <td className="py-4 text-gray-400">{acc.access}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          {acc.status}
                        </span>
                      </td>
                      <td className="py-4 text-right space-x-2">
                        <button className="bg-gray-900 hover:bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs">
                          Edit
                        </button>
                        <button 
                          onClick={() => handleRevoke(acc.id)}
                          className="bg-red-950/40 hover:bg-red-950/60 text-red-400 px-3 py-1 rounded-lg border border-red-900/50 cursor-pointer text-xs"
                        >
                          Revoke
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