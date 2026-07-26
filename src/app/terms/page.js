import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-16 max-w-4xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Terms of Service</h1>
        <p className="text-gray-400 text-xs">Effective Date: July 2026. Please read these terms carefully before accessing or utilizing the Footpryx platform.</p>
      </div>

      {/* Content Body */}
      <div className="bg-gray-950 border border-gray-800 p-8 md:p-10 rounded-3xl space-y-8 text-xs text-gray-300 leading-relaxed shadow-xl">
        
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Agreement to Terms</h2>
          <p>
            By accessing, registering, or using Footpryx (the &quot;Platform&quot;), you agree to be bound by these Terms of Service and all applicable international security compliance laws. If you disagree with any part of these terms, you may not access our automated intelligence network.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Authorized OSINT & Acceptable Use</h2>
          <p>
            Footpryx provides automated open-source intelligence (OSINT) and digital footprint cross-referencing for authorized security analysts, corporate compliance teams, and investigators. You agree strictly not to utilize the platform for harassment, stalking, unauthorized profiling, or any illegal activities.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Enterprise Accounts & Security</h2>
          <p>
            Users are responsible for safeguarding their institutional credentials. Any unauthorized activity originating from your account remains your sole accountability. We reserve the right to suspend or terminate accounts that breach platform security standards.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Limitation of Liability</h2>
          <p>
            Intelligence reports are compiled automatically from public repositories and breach databases as-is. Footpryx makes no absolute guarantees regarding real-time accuracy and assumes no liability for operational or legal decisions made based on aggregated data insights.
          </p>
        </section>

      </div>

    </div>
  );
}