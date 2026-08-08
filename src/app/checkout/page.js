"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, CreditCard, ShieldCheck } from "lucide-react";

function CheckoutContent() {
  const searchParams = useSearchParams();
  const planParam = searchParams.get("plan") || "intermediate";
  
  const [currency, setCurrency] = useState("INR");
  const [user, setUser] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form States
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = localStorage.getItem("footpryx_user");
      if (savedUser) {
        try {
          setUser(JSON.parse(savedUser));
        } catch (e) {
          console.error("Session parse error", e);
        }
      }

      // ⚡ Razorpay Script Load
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // 💰 Plan Prices in INR and BRL
  const plansData = {
    starter: {
      name: "Starter Footpryx",
      inr: "₹1,499.00",
      brl: "R$ 75.00",
      amountValue: 1499,
      credits: "30 credits/month",
      desc: "12 search types, breach detection, basic AI dossiers."
    },
    intermediate: {
      name: "Intermediary Footpryx",
      inr: "₹3,924.19",
      brl: "R$ 199.00",
      amountValue: 3924,
      credits: "100 credits/month",
      desc: "Everything in Starter plus webhooks, API integrations, and priority support."
    },
    advanced: {
      name: "Advanced Footpryx",
      inr: "₹8,999.00",
      brl: "R$ 450.00",
      amountValue: 8999,
      credits: "300 credits/month",
      desc: "Dedicated account support, 50 AI narratives/day & max speed."
    }
  };

  const selectedPlan = plansData[planParam.toLowerCase()] || plansData.intermediate;
  const currentPrice = currency === "INR" ? selectedPlan.inr : selectedPlan.brl;

  // 💳 Original Stripe / Mock Submit Handler (तसाच ठेवला आहे)
  const handleSubscribe = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      alert(`🎉 Payment Successful for ${selectedPlan.name} (${currentPrice})! Redirecting to Dashboard...`);
      window.location.href = "/dashboard";
    }, 2000);
  };

  // 🟢 Razorpay Handler (एरर काढण्यासाठी modal.ondismiss ॲड केले आहे)
  const handleRazorpayPayment = () => {
    const options = {
      key: "rzp_test_TNGFEDoqojeKic", 
      amount: selectedPlan.amountValue * 100, 
      currency: "INR",
      name: "Footpryx Cyber Intelligence",
      description: `Upgrade to ${selectedPlan.name}`,
      image: "/logo.png",
      handler: function (response) {
        alert(`🎉 Razorpay Test Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        window.location.href = "/dashboard";
      },
      // 🛡️ नवीन सेफ्टी फिचर: विंडो बंद केल्यावर फालतू 'Payment Failed' अलर्ट येणार नाही
      modal: {
        ondismiss: function () {
          console.log("Payment popup closed by user.");
        }
      },
      prefill: {
        name: user?.name || "Valued User",
        email: user?.email || "divyabauskar230@gmail.com",
        contact: "9999999999",
      },
      theme: {
        color: "#a3e635",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      
      {/* 🖤 LEFT SIDE: SUMMARY & CURRENCY TOGGLE */}
      <div className="w-full md:w-1/2 bg-[#030508] p-8 md:p-16 border-r border-slate-900 flex flex-col justify-between min-h-[50vh] md:min-h-screen">
        <div>
          {/* 🟢 OFFICIAL LOGO */}
          <Link href="/" className="flex items-center gap-3 mb-8 group">
            <img src="/logo.png" alt="Footpryx Logo" className="w-9 h-9 rounded-xl object-cover border border-emerald-500/30" />
            <span className="text-white font-bold text-base tracking-tight uppercase">footpryx</span>
          </Link>

          <Link href="/pricing" className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-xs mb-10 transition">
            <ArrowLeft size={16} /> Back to plans
          </Link>

          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-400">Subscribe to {selectedPlan.name}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl md:text-5xl font-extrabold text-white">{currentPrice}</span>
              <span className="text-xs text-slate-400">per month</span>
            </div>

            {/* Currency Switcher (INR / BRL) */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setCurrency("INR")}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  currency === "INR"
                    ? "bg-slate-900 border-slate-700 text-white shadow-lg"
                    : "bg-transparent border-slate-900 text-slate-500 hover:text-slate-300"
                }`}
              >
                🇮🇳 INR
              </button>
              <button
                type="button"
                onClick={() => setCurrency("BRL")}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 ${
                  currency === "BRL"
                    ? "bg-slate-900 border-slate-700 text-white shadow-lg"
                    : "bg-transparent border-slate-900 text-slate-500 hover:text-slate-300"
                }`}
              >
                🇧🇷 BRL
              </button>
            </div>
            <p className="text-[10px] text-slate-500 pt-1">
              Charges will vary based on live exchange rates and provider fees.
            </p>
          </div>

          <hr className="border-slate-900 my-8" />

          {/* Plan Breakdown */}
          <div className="space-y-4">
            <div className="flex justify-between items-start text-xs">
              <div>
                <p className="font-bold text-white">{selectedPlan.name}</p>
                <p className="text-[11px] text-slate-400 max-w-xs mt-0.5">{selectedPlan.credits}. {selectedPlan.desc}</p>
                <span className="text-[10px] text-slate-500 block mt-1">Billed monthly</span>
              </div>
              <span className="font-bold text-white">{currentPrice}</span>
            </div>

            <div className="flex justify-between text-xs text-slate-400 pt-2 border-t border-slate-900/60">
              <span>Subtotal</span>
              <span className="text-white font-semibold">{currentPrice}</span>
            </div>

            <div className="flex justify-between text-sm font-extrabold text-white pt-2 border-t border-slate-900">
              <span>Total due today</span>
              <span>{currentPrice}</span>
            </div>
          </div>
        </div>

        <div className="pt-8 text-[11px] text-slate-600 flex items-center gap-2">
          <ShieldCheck size={14} className="text-[#a3e635]" />
          <span>Encrypted 256-Bit SSL Payment Gateway</span>
        </div>
      </div>

      {/* 🤍 RIGHT SIDE: STRIPE CARD FORM + RAZORPAY BUTTON */}
      <div className="w-full md:w-1/2 bg-white text-black p-8 md:p-16 flex flex-col justify-center min-h-[50vh] md:min-h-screen">
        <div className="max-w-md w-full mx-auto space-y-6">
          
          {/* GPay / Apple Pay Button */}
          <button 
            type="button" 
            onClick={handleSubscribe}
            className="w-full bg-black hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition active:scale-[0.99]"
          >
            <span className="text-base">Pay</span> / GPay
          </button>

          {/* ⚡ RAZORPAY QUICK PAY BUTTON */}
          <button 
            type="button" 
            onClick={handleRazorpayPayment}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
          >
            ⚡ Pay with Razorpay (Test Mode)
          </button>

          <div className="flex items-center gap-3 text-slate-400 text-xs">
            <div className="flex-1 h-[1px] bg-slate-200"></div>
            <span>OR PAY WITH CARD</span>
            <div className="flex-1 h-[1px] bg-slate-200"></div>
          </div>

          {/* Original Payment Form (सुरक्षित) */}
          <form onSubmit={handleSubscribe} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Contact information</label>
              <input
                type="email"
                required
                defaultValue={user?.email || "divyabauskar230@gmail.com"}
                placeholder="Email address"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
              />
            </div>

            <div className="space-y-3 pt-2">
              <label className="block text-xs font-bold text-slate-700">Payment method</label>

              <div className="border border-slate-300 rounded-2xl p-4 bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800 pb-1">
                  <span className="flex items-center gap-2"><CreditCard size={16} /> Card</span>
                  <span className="text-[10px] text-slate-400 font-normal">VISA • MasterCard</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    required
                    maxLength={19}
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 1234 1234 1234"
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                  />

                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      required
                      placeholder="MM / YY"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                    />
                    <input
                      type="text"
                      required
                      maxLength={4}
                      placeholder="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black font-mono"
                    />
                  </div>

                  <input
                    type="text"
                    required
                    placeholder="Full name on card"
                    value={cardHolder}
                    onChange={(e) => setCardHolder(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-black focus:outline-none focus:border-black"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Country or region</label>
                  <select className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2 text-xs text-black focus:outline-none">
                    <option value="IN">India 🇮🇳</option>
                    <option value="BR">Brazil 🇧🇷</option>
                    <option value="US">United States 🇺🇸</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-black hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-wider transition active:scale-[0.98] mt-4"
            >
              {isProcessing ? "Processing Payment..." : `Subscribe (${currentPrice})`}
            </button>
          </form>

          <p className="text-[10px] text-slate-500 text-center leading-relaxed">
            By subscribing, you authorize footpryx.com to charge you in {currency} at the displayed exchange rate until you cancel.
          </p>

          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 border-t border-slate-200 pt-3">
            <Lock size={12} /> Powered by Stripe & Razorpay • Terms • Privacy
          </div>

        </div>
      </div>

    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading checkout...</div>}>
      <CheckoutContent />
    </Suspense>
  );
}