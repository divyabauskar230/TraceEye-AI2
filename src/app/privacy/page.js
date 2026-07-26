import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-16 max-w-4xl mx-auto space-y-12">
      
      {/* Header */}
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="text-gray-400 text-xs">Effective Date: July 2026. Footpryx is dedicated to maintaining the highest standards of data confidentiality and privacy.</p>
      </div>

      {/* Content Body */}
      <div className="bg-gray-950 border border-gray-800 p-8 md:p-10 rounded-3xl space-y-8 text-xs text-gray-300 leading-relaxed shadow-xl">
        
        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">1. Information Collection Architecture</h2>
          <p>
            To provide efficient OSINT cross-referencing, we collect minimal necessary data, which includes institutional email identifiers, encrypted authentication tokens, and query strings submitted strictly for verification procedures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">2. Zero-Logging & Data Security</h2>
          <p>
            We enforce strict security protocols and zero-knowledge principles for active searches. User search queries are processed securely in real-time and are not permanently cataloged or commoditized.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">3. Compliance Frameworks</h2>
          <p>
            Our infrastructure aligns with major international privacy frameworks, including GDPR and LGPD standards, ensuring user rights and institutional data protection are rigorously upheld.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">4. Contact & Data Inquiries</h2>
          <p>
            For privacy compliance questions or security disclosures, institutional partners may reach out directly via our secure contact portal or through <span className="text-lime-400 font-bold">support@footpryxint.com</span>.
          </p>
        </section>

      </div>

    </div>
  );
}