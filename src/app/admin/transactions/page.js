"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminTransactionsPage() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState({ name: "Admin", role: "Super Admin", initial: "A" });
  
  // State for transactions list and modal popup
  const [transactionsList, setTransactionsList] = useState([
    { id: "#TXN-78462", user: "alex.rivera@enterprise.io", plan: "Pro Plan - 1 Month", amount: "$49.00", date: "May 26, 2025", status: "Success" },
    { id: "#TXN-78461", user: "mariana@compliance.com", plan: "Premium Plan - 1 Month", amount: "$79.00", date: "May 26, 2025", status: "Success" },
    { id: "#TXN-78460", user: "julian@investigator.net", plan: "Pro Plan - 1 Month", amount: "$49.00", date: "May 25, 2025", status: "Success" },
    { id: "#TXN-78459", user: "analyst@security.org", plan: "Basic Plan - 1 Month", amount: "$19.00", date: "May 25, 2025", status: "Success" },
    { id: "#TXN-78458", user: "enterprise@sec.io", plan: "Premium Plan - 1 Month", amount: "$79.00", date: "May 24, 2025", status: "Success" },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [planName, setPlanName] = useState("Pro Plan - 1 Month");
  const [amount, setAmount] = useState("$49.00");
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

  const handleAddTransactionSubmit = (e) => {
    e.preventDefault();
    if (!userEmail.trim()) return;

    const randomTxnId = "#TXN-" + Math.floor(10000 + Math.random() * 90000);
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const newEntry = {
      id: randomTxnId,
      user: userEmail,
      plan: planName,
      amount: amount.startsWith('$') ? amount : `$${amount}`,
      date: currentDate,
      status: "Success"
    };

    setTransactionsList([newEntry, ...transactionsList]);
    setUserEmail("");
    setIsModalOpen(false);
    setSuccessMsg("New payment transaction recorded successfully!");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  // REAL FILE DOWNLOAD FUNCTION
  const handleDownloadInvoice = (tx) => {
    const invoiceContent = 
`========================================
       FOOTPRYX CYBER INTELLIGENCE      
          OFFICIAL INVOICE/RECEIPT      
========================================
Transaction ID : ${tx.id}
User Email     : ${tx.user}
Package / Plan : ${tx.plan}
Amount Paid    : ${tx.amount}
Date           : ${tx.date}
Status         : ${tx.status}
----------------------------------------
Thank you for using Footpryx Intelligence!
========================================`;

    const blob = new Blob([invoiceContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${tx.id.replace('#', '')}-invoice.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSuccessMsg(`Invoice ${tx.id} downloaded successfully!`);
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex font-sans selection:bg-lime-500 selection:text-black relative">
      
      {/* 📄 RECORD NEW TRANSACTION MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0b0f19] border border-lime-500/40 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6 shadow-2xl relative">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono text-lime-400 font-bold">FINANCIAL GATEWAY</span>
                <h3 className="text-lg font-extrabold text-white">Record New Transaction</h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTransactionSubmit} className="space-y-4 font-mono text-xs">
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
                <label className="text-gray-400 block">Package / Plan</label>
                <input 
                  type="text" 
                  placeholder="Pro Plan - 1 Month"
                  value={planName}
                  onChange={(e) => setPlanName(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 block">Amount</label>
                <input 
                  type="text" 
                  placeholder="$49.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-black/50 border border-gray-800 rounded-xl p-3 text-white focus:outline-none focus:border-lime-500 font-sans"
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer"
              >
                Save & Record Transaction
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
            <Link href="/admin/plans" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-gray-900/60 transition">
              <span>💳</span> Plans & Billing
            </Link>
            <Link href="/admin/transactions" className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-lime-500/10 text-lime-400 border border-lime-500/20 font-bold transition">
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
            <h2 className="text-xl font-black text-white tracking-tight">Payment Transactions</h2>
            <p className="text-xs text-gray-400">Review all financial receipts, billing invoices and payment statuses.</p>
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
              <h3 className="text-sm font-bold text-white">Recent Transactions Ledger ({transactionsList.length})</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/30">Gateway Secure</span>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-lime-500 hover:bg-lime-400 text-black font-extrabold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                >
                  + Record Transaction
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-gray-800 text-gray-500 uppercase text-[10px]">
                    <th className="pb-3">Transaction ID</th>
                    <th className="pb-3">User Email</th>
                    <th className="pb-3">Package / Plan</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/80">
                  {transactionsList.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-900/40 transition">
                      <td className="py-4 text-lime-400 font-bold">{tx.id}</td>
                      <td className="py-4 text-white">{tx.user}</td>
                      <td className="py-4 text-gray-300">{tx.plan}</td>
                      <td className="py-4 text-emerald-400 font-bold">{tx.amount}</td>
                      <td className="py-4 text-gray-400">{tx.date}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold">
                          {tx.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <button 
                          onClick={() => handleDownloadInvoice(tx)}
                          className="bg-gray-900 hover:bg-gray-800 text-gray-300 px-3 py-1 rounded-lg border border-gray-800 cursor-pointer text-xs"
                        >
                          Download 📄
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