"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSupportPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for tickets list and modals
  const [ticketsList, setTicketsList] = useState([
    { id: "SUP-301", user: "alex.rivera@enterprise.io", subject: "API Rate Limit Extension", priority: "High", status: "Open", date: "2 hrs ago" },
    { id: "SUP-302", user: "mariana@compliance.com", subject: "Billing Invoice Correction", priority: "Medium", status: "In Progress", date: "5 hrs ago" },
    { id: "SUP-303", user: "julian@investigator.net", subject: "Custom OSINT Module Integration", priority: "Low", status: "Resolved", date: "1 day ago" },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState(null);
  
  const [userEmail, setUserEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [replyMessage, setReplyMessage] = useState("");
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

  const handleCreateTicketSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.trim() || !subject.trim()) return;

    const newTicketId = "SUP-" + Math.floor(310 + Math.random() * 700);

    const newEntry = {
      id: newTicketId,
      user: userEmail,
      subject: subject,
      priority: priority,
      status: "Open",
      date: "Just now"
    };

    setTicketsList([newEntry, ...ticketsList]);
    setUserEmail("");
    setSubject("");
    setIsCreateModalOpen(false);
    setSuccessMsg("Support ticket created successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  const handleOpenRespondModal = (ticket) => {
    setCurrentTicket(ticket);
    setIsRespondModalOpen(true);
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyMessage.trim()) return;

    setTicketsList(prev => prev.map(t => t.id === currentTicket.id ? { ...t, status: "In Progress" } : t));
    setReplyMessage("");
    setIsRespondModalOpen(false);
    setSuccessMsg(`Reply sent successfully to ${currentTicket.user}!`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 💬 RESPOND MODAL */}
      {isRespondModalOpen && currentTicket && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-lg w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">{currentTicket.id} // HELPDESK RESPOND</span>
                <h3 className="text-lg font-extrabold text-white">{currentTicket.subject}</h3>
              </div>
              <button 
                onClick={() => setIsRespondModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono text-slate-300">
              <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-800 space-y-1">
                <span className="text-slate-500 block">User Inquiry:</span>
                <p className="text-white font-sans">{currentTicket.user} reported an issue regarding &quot;{currentTicket.subject}&quot; with priority {currentTicket.priority}.</p>
              </div>

              <form onSubmit={handleSendReply} className="space-y-3">
                <label className="text-gray-400 block">Admin Response / Resolution</label>
                <textarea 
                  rows="4"
                  placeholder="Type your official response here..."
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
                <button 
                  type="submit"
                  className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Send Response to User
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* ➕ CREATE TICKET MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">HELPDESK DESK</span>
                <h3 className="text-lg font-extrabold text-white">Create Support Ticket</h3>
              </div>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} className="space-y-4 font-mono text-xs">
              <div className="space-y-2">
                <label className="text-gray-400 block">User Email Address</label>
                <input 
                  type="email" 
                  placeholder="client@enterprise.io"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Subject / Inquiry</label>
                <input 
                  type="text" 
                  placeholder="e.g. API Rate Limit Issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Priority</label>
                <select 
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Submit Ticket
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
            <Link href="/admin/support" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
              <span>💬</span> Support Tickets
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
            <h2 className="text-xl font-black text-white tracking-tight">Support Tickets Management</h2>
            <p className="text-xs text-gray-400">Resolve customer queries, inquiries and technical support requests.</p>
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
              <h3 className="text-sm font-bold text-white">Active Support Queue ({ticketsList.length})</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-lime-400 bg-lime-950/60 px-3 py-1 rounded-lg border border-lime-500/30">Helpdesk Online</span>
                <button 
                  onClick={() => setIsCreateModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Create Ticket
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Ticket ID</th>
                    <th className="pb-3">User Email</th>
                    <th className="pb-3">Subject</th>
                    <th className="pb-3">Priority</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Time</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {ticketsList.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{t.id}</td>
                      <td className="py-4 text-white">{t.user}</td>
                      <td className="py-4 text-gray-300 font-sans">{t.subject}</td>
                      <td className="py-4">
                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold ${t.priority === 'High' ? 'bg-red-950 text-red-400 border border-red-500/40' : 'bg-yellow-950 text-yellow-400 border border-yellow-500/40'}`}>
                          {t.priority}
                        </span>
                      </td>
                      <td className="py-4 text-emerald-400 font-bold">{t.status}</td>
                      <td className="py-4 text-gray-400">{t.date}</td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleOpenRespondModal(t)}
                          className="bg-gray-900 hover:bg-gray-800 text-lime-400 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Respond 💬
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