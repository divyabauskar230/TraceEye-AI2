import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans px-6 py-16 max-w-5xl mx-auto space-y-12">
      
      {/* Top Navigation & Header */}
      <div className="space-y-4">
        <Link href="/" className="inline-flex items-center gap-2 text-lime-400 text-xs font-bold hover:underline">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">
          About <span className="text-lime-400">Footpryx</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base max-w-2xl leading-relaxed">
          Empowering security analysts, investigators, and compliance teams with cutting-edge AI-driven automated open-source intelligence.
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl text-center space-y-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-lime-400">200+</h3>
          <p className="text-gray-400 text-[11px] uppercase tracking-wider">Public Sources</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl text-center space-y-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">&lt; 3s</h3>
          <p className="text-gray-400 text-[11px] uppercase tracking-wider">Search Speed</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl text-center space-y-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-lime-400">99.9%</h3>
          <p className="text-gray-400 text-[11px] uppercase tracking-wider">Uptime</p>
        </div>
        <div className="bg-gray-950 border border-gray-800 p-6 rounded-3xl text-center space-y-1">
          <h3 className="text-2xl md:text-3xl font-extrabold text-white">24/7</h3>
          <p className="text-gray-400 text-[11px] uppercase tracking-wider">Intelligence</p>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-gray-950 border border-gray-800 p-8 rounded-3xl space-y-4">
          <div className="w-8 h-8 rounded-xl bg-lime-400/10 border border-lime-500/30 flex items-center justify-center text-lime-400 font-bold text-xs">01</div>
          <h2 className="text-lg font-bold text-white">Our Mission</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            To bring clarity and speed to digital investigations. We aggregate public data securely, transforming complex digital footprints into clear, actionable intelligence graphs.
          </p>
        </div>

        <div className="bg-gray-950 border border-gray-800 p-8 rounded-3xl space-y-4">
          <div className="w-8 h-8 rounded-xl bg-lime-400/10 border border-lime-500/30 flex items-center justify-center text-lime-400 font-bold text-xs">02</div>
          <h2 className="text-lg font-bold text-white">Investigation Methodology</h2>
          <p className="text-gray-400 text-xs leading-relaxed">
            Our automated modules cross-reference public registries, breach intelligence, and web footprints with absolute adherence to privacy frameworks and security standards.
          </p>
        </div>

      </div>

    </div>
  );
}