"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-16 max-w-5xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Get in <span className="text-lime-400">Touch</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-xl leading-relaxed">
          Have questions regarding enterprise institutional access, custom intelligence modules, or API integrations? Our team is available 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        
        {/* Contact Info Cards */}
        <div className="space-y-6">
          <div className="bg-gray-950 border border-gray-800 p-8 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Institutional Support</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Dedicated assistance for security analysts, law enforcement, and corporate compliance investigators.
            </p>
            <p className="text-lime-400 text-xs font-bold">support@footpryxint.com</p>
          </div>

          <div className="bg-gray-950 border border-gray-800 p-8 rounded-3xl space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Global Operations</h3>
            <p className="text-gray-400 text-xs leading-relaxed">
              Automated nodes running cross-border intelligence verification securely.
            </p>
            <p className="text-white text-xs font-bold">24/7 Active Monitoring</p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-950 border border-gray-800 p-8 rounded-3xl shadow-xl">
          {submitted ? (
            <div className="p-6 bg-lime-950/40 border border-lime-500/40 text-lime-400 text-xs rounded-2xl text-center space-y-2">
              <p className="font-extrabold text-sm">Message Dispatched Successfully</p>
              <p className="text-gray-300">Our enterprise team will get back to your registered email shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Your Full Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-lime-500 transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Work Email Address</label>
                <input 
                  type="email" 
                  required 
                  placeholder="john@organization.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-lime-500 transition" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-2">Investigation Query / Message</label>
                <textarea 
                  rows="4" 
                  required 
                  placeholder="Describe your institutional requirements..." 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full px-4 py-3 bg-black border border-gray-800 rounded-xl text-xs text-white placeholder-gray-600 focus:outline-none focus:border-lime-500 transition"
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-lime-400 hover:bg-lime-500 text-black font-extrabold py-3.5 rounded-xl text-xs transition cursor-pointer shadow-lg shadow-lime-400/10">
                Send Secure Inquiry
              </button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
}