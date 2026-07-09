import Link from "next/link";
import { ArrowRight, Star, Zap, Shield, BarChart } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100 font-sans selection:bg-zinc-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-100 to-zinc-400 flex items-center justify-center">
              <Star className="w-5 h-5 text-black" fill="currentColor" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">VouchSync</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Abstract Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.03] rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 pt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium tracking-wide uppercase text-zinc-300">VouchSync 1.0 is Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">
            Turn customer love into <br className="hidden md:block" />
            high-converting case studies.
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop begging for reviews. VouchSync uses AI to automatically collect, analyze, and transform customer feedback into stunning case studies that close deals.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/login"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold hover:bg-zinc-200 transition-all hover:scale-105 active:scale-95"
            >
              Start Collecting Free
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="#features"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/5 text-white border border-white/10 px-8 py-4 rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              How it works
            </Link>
          </div>
        </div>
      </main>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">AI-Powered Extraction</h3>
              <p className="text-zinc-400 leading-relaxed">
                Our Gemini AI engine automatically identifies the core problem and extracts hard ROI metrics from raw customer text.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Frictionless Collection</h3>
              <p className="text-zinc-400 leading-relaxed">
                Send customers a sleek, zero-login submission link. We handle the formatting, you get the social proof.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="p-8 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Beautiful Widgets</h3>
              <p className="text-zinc-400 leading-relaxed">
                Embed your approved case studies directly onto your landing page with a single line of code.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10 text-center">
        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} VouchSync. Built for modern SaaS teams.
        </p>
      </footer>
    </div>
  );
}
