import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#000000] text-[#EDEDED] font-sans selection:bg-[#333333] selection:text-white flex flex-col items-center justify-center relative overflow-hidden">
      
      {/* Subtle Grain Overlay for texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] mix-blend-overlay z-0"></div>

      {/* Grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0"></div>

      <nav className="fixed top-0 w-full border-b border-white/[0.05] bg-black/50 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="font-medium tracking-tight text-white flex items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            VouchSync
          </div>
          <div className="flex items-center gap-6 text-[#888888]">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/login" className="text-white hover:opacity-80 transition-opacity">Sign In</Link>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] text-xs text-[#888888] mb-8 tracking-wide">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>
          VouchSync 1.0 is live
        </div>

        <h1 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-6 leading-[1.1]">
          Customer evidence,<br className="hidden md:block"/> engineered.
        </h1>
        
        <p className="text-lg md:text-xl text-[#888888] mb-12 max-w-2xl font-light tracking-wide leading-relaxed">
          Transform scattered testimonials into high-converting case studies. Pure signal. Zero noise. Powered by Google Gemini.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href="/login" className="h-11 px-8 rounded-md bg-white text-black text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#EAEAEA] transition-colors">
            Start Building <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="#demo" className="h-11 px-8 rounded-md border border-white/[0.1] bg-transparent text-white text-sm font-medium flex items-center justify-center hover:bg-white/[0.02] transition-colors">
            View Live Demo
          </Link>
        </div>

        {/* Abstract App Preview */}
        <div className="mt-24 w-full aspect-[16/9] max-w-5xl rounded-lg border border-white/[0.08] bg-black/40 backdrop-blur-xl relative flex flex-col overflow-hidden shadow-[0_0_100px_rgba(255,255,255,0.02)]">
           <div className="h-10 border-b border-white/[0.05] flex items-center px-4 gap-2 bg-white/[0.01]">
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.2]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.2]"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-white/[0.2]"></div>
           </div>
           <div className="flex-1 flex p-6 gap-6 text-left">
              <div className="hidden md:flex w-64 border border-white/[0.05] rounded bg-white/[0.01] p-4 flex-col gap-3">
                 <div className="h-3 w-1/2 bg-white/[0.08] rounded"></div>
                 <div className="h-3 w-full bg-white/[0.04] rounded mt-4"></div>
                 <div className="h-3 w-3/4 bg-white/[0.04] rounded"></div>
              </div>
              <div className="flex-1 border border-white/[0.05] rounded bg-white/[0.02] p-8 flex flex-col gap-6 relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-64 h-64 bg-white/[0.02] blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
                 <div className="h-6 w-1/3 bg-white/[0.1] rounded"></div>
                 <div className="space-y-3">
                    <div className="h-3 w-full bg-white/[0.05] rounded"></div>
                    <div className="h-3 w-full bg-white/[0.05] rounded"></div>
                    <div className="h-3 w-4/5 bg-white/[0.05] rounded"></div>
                 </div>
                 <div className="mt-auto flex gap-4">
                    <div className="h-24 flex-1 border border-white/[0.05] rounded bg-white/[0.01]"></div>
                    <div className="h-24 flex-1 border border-white/[0.05] rounded bg-white/[0.01]"></div>
                 </div>
              </div>
           </div>
        </div>
      </main>

      <footer className="w-full relative z-10 py-8 px-6 border-t border-white/[0.05] text-center mt-12">
        <p className="text-[#666666] text-xs tracking-wide">
          © {new Date().getFullYear()} VouchSync. Built for modern SaaS.
        </p>
      </footer>
    </div>
  );
}
