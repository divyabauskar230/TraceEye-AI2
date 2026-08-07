"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();
    
    // ॲडमिन युजरनेम आणि पासवर्ड
    if (username === "admin" && password === "Footpryx@2026") {
      localStorage.setItem("footpryx_admin", "authenticated");
      router.push("/admin"); 
    } else {
      setError("Invalid Admin Credentials! Access Denied.");
    }
  };

  return (
    <div className="min-h-screen bg-[#02060f] text-white flex items-center justify-center font-sans selection:bg-lime-500 selection:text-black p-4 relative overflow-hidden">
      
      {/* Background Glow Effect matching website */}
      <div className="absolute w-[500px] h-[500px] bg-lime-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="bg-[#0b0f19] border border-lime-500/30 rounded-3xl p-8 max-w-md w-full space-y-6 shadow-2xl relative z-10 backdrop-blur-xl">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono text-lime-400 font-bold tracking-widest uppercase">RESTRICTED ZONE // SECURE</span>
          <h2 className="text-2xl font-black text-white tracking-tight">Admin Portal Login</h2>
          <p className="text-xs text-gray-400 font-mono">Authorized personnel only. All attempts are logged.</p>
        </div>

        {error && (
          <div className="bg-red-950/60 border border-red-500/40 text-red-400 text-xs font-mono p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminLogin} className="space-y-4 font-mono text-xs">
          <div className="space-y-1">
            <label className="text-gray-400">Admin Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter admin username"
              className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-gray-400">Admin Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              className="w-full bg-black/50 border border-gray-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-lime-500 transition"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-400 text-black font-extrabold py-3 rounded-xl uppercase tracking-wider transition cursor-pointer shadow-lg shadow-lime-500/20"
          >
            Authenticate & Enter
          </button>
        </form>
      </div>
    </div>
  );
}