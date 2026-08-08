"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import emailjs from '@emailjs/browser'; // 🌟 EmailJS इम्पोर्ट केला आहे

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  
  // 🟢 Render सर्व्हर लोडिंग स्क्रीन दाखवण्यासाठी
  const [isWakingUp, setIsWakingUp] = useState(false);

  // 🌟 Google login करून परत आल्यावर जर URL मध्ये डेटा असेल तर मेल पाठवणे किंवा हँडल करणे
  useEffect(() => {
    // समजा युजर Google Login वरून यशस्वी परत आला, तर localStorage तपासून ईमेल ट्रिगर करू शकतो
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setIsWakingUp(true); // लोडिंग पॉपअप ऑन करा

    try {
      // 🟢 लाईव्ह सर्व्हरसाठी relative API path वापरला आहे जेणेकरून 127.0.0.1 चा एरर येणार नाही
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userName = email.split("@")[0];
        localStorage.setItem(
          "footpryx_user",
          JSON.stringify({ name: userName, email: email })
        );
        setMessage("Success! Sending security email & Redirecting...");

        // 🌟 EmailJS द्वारे युजरला यशस्वी लॉगिनचा मेल पाठवण्यासाठी कोड
       try {
  const templateParams = {
    to_name: userName,
    user_email: email,
  };

  await emailjs.send(
    'service_d18o81o',       // Service ID
    'template_xuhayhy',      // Template ID
    templateParams,
    '55DybHZcEegoxVNCS'      // Public Key
  );
  console.log("EmailJS Success!");
} catch (mailErr) {
  console.log("Mail trigger error:", mailErr);
}

        // 🟢 यशस्वी लॉगिन झाल्यावर थेट युजर पॅनलवर जाईल
        setTimeout(() => { window.location.href = "/user-panel"; }, 1200);
      } else {
        setIsWakingUp(false); // एरर आल्यास पॉपअप बंद करा
        setMessage("Invalid credentials. Please check email/password.");
      }
    } catch (error) {
      setIsWakingUp(false); // एरर आल्यास पॉपअप बंद करा
      setMessage("Connection failure. Ensure backend server is running.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setIsWakingUp(true); // Google लॉगिन करताना लोडिंग पॉपअप ऑन करा
    
    // 🟢 थेट सरळ आणि पक्की लाईव्ह बॅकएंडची लिंक सेट केली आहे जेणेकरून एरर जाणार नाही
    const backendUrl = "https://footpryx-backend.onrender.com/api/auth/google/login"; 

    window.location.href = backendUrl;
  };

  return (
    <div className="min-h-screen bg-[#030508] text-white flex flex-col justify-between font-sans selection:bg-[#a3e635] selection:text-black relative">
      
      {/* 🚀 🟢 WAKING UP / LOADING POPUP MODAL */}
      {isWakingUp && (
        <div className="fixed inset-0 bg-black/85 z-50 flex flex-col items-center justify-center p-6 text-center space-y-4 backdrop-blur-md animate-fadeIn">
          <div className="w-12 h-12 border-4 border-[#a3e635] border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(163,230,53,0.3)]"></div>
          <div className="space-y-1.5 max-w-sm">
            <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Connecting to OSINT Matrix...</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Server is waking up from sleep mode. Please wait ~30 seconds for initial connection.
            </p>
          </div>
        </div>
      )}

      {/* 🎯 Middle Centered Form Layout */}
      <div className="flex-grow flex items-center justify-center px-4 py-12">
        
        {/* 🔒 Clean Premium Login Card */}
        <div className="w-full max-w-md bg-[#0b0e17]/80 border border-slate-900 rounded-[28px] p-8 md:p-10 shadow-2xl relative overflow-hidden before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-gradient-to-r before:from-transparent before:via-slate-800 before:to-transparent">
          
          {/* Logo Assembly */}
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="flex items-center gap-2.5 text-white mb-2">
              <img src="/logo.png" alt="Footpryx Logo" className="w-9 h-9 rounded-xl object-cover border border-slate-800" />
              <h2 className="text-xl font-bold tracking-tight">footpryx</h2>
            </div>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">FOOTPRINT INTELLIGENCE PLATFORM</p>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-white">Sign In</h3>
            <p className="text-xs text-slate-500 mt-1">Access your account to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
                className="w-full px-4 py-3 bg-[#111625] border border-slate-900 rounded-xl text-xs text-white placeholder-slate-700 focus:outline-none focus:border-slate-800 focus:bg-[#131a2e] transition-all"
              />
            </div>

            {message && (
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 text-center">
                {message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#a3e635] hover:bg-[#bef264] text-black font-bold py-3 px-4 rounded-xl text-xs transition-all active:scale-[0.99] shadow-lg shadow-lime-500/5 cursor-pointer"
              >
                {loading ? "Signing In..." : "Sign In"}
              </button>
            </div>
          </form>

          {/* Symmetrical Decorator Divider */}
          <div className="relative my-5 text-center">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-900"></div></div>
            <span className="relative bg-[#0b0e17] px-3 text-[10px] text-slate-600 font-medium">OR</span>
          </div>

          {/* Professional Dark Google Sign-In Button */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-transparent border border-slate-850 hover:bg-slate-900/50 text-white py-2.5 px-4 rounded-xl flex items-center justify-between transition-all text-xs shadow-sm hover:border-slate-800 group cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-lime-500/10 text-lime-400 flex items-center justify-center text-[10px] font-bold border border-lime-500/20">
                G
              </div>
              <div className="text-left">
                <p className="font-semibold text-slate-200 text-[11px] leading-tight group-hover:text-white">Sign in with Google</p>
                <p className="text-[9px] text-slate-500 leading-none mt-0.5">Fast one-click login</p>
              </div>
            </div>
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path fill="#EA4335" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#4285F4" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#34A853" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          </button>

          <div className="text-center mt-5 space-y-1.5 text-xs">
            <Link href="/auth/forgot" className="text-xs text-[#a3e635] font-semibold hover:underline block">
              Forgot your password?
            </Link>
            <p className="text-slate-500">
              Don't have an account? <Link href="/auth/register" className="text-[#a3e635] font-semibold hover:underline">Create account</Link>
            </p>
          </div>

          <div className="text-center mt-6 pt-2 border-t border-slate-900/60">
            <Link href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              ← Back to site
            </Link>
          </div>

        </div>

      </div>

      {/* Footer */}
      <footer className="w-full text-center py-6 border-t border-slate-900/60 bg-[#030508]">
        <p className="text-[11px] text-slate-600 tracking-wide">
          &copy; 2026 footpryx.com. All rights reserved. • Blog • About • Privacy • Terms
        </p>
      </footer>
    </div>
  );
}