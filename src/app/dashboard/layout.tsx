export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-[var(--color-glass-border)] bg-[rgba(0,0,0,0.5)] backdrop-blur-xl flex flex-col p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-8 h-8 rounded bg-gradient-to-tr from-[var(--color-accent-primary)] to-[#a8b1ff] shadow-[0_0_15px_var(--color-accent-primary)]"></div>
          <span className="font-bold text-xl tracking-tight">VouchSync</span>
        </div>
        
        <nav className="flex flex-col gap-2">
          <a href="/dashboard" className="px-4 py-2.5 rounded-lg bg-[var(--color-glass-base)] border border-[var(--color-glass-border)] text-white font-medium shadow-[0_0_10px_var(--color-glass-glow)]">
            Overview
          </a>
          <a href="/dashboard/testimonials" className="px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[var(--color-glass-base)] transition-colors">
            Testimonials
          </a>
          <a href="/dashboard/widgets" className="px-4 py-2.5 rounded-lg text-gray-400 hover:text-white hover:bg-[var(--color-glass-base)] transition-colors">
            Embed Widgets
          </a>
        </nav>
        
        <div className="mt-auto">
          <div className="glass-panel p-4 mb-4">
            <p className="text-xs text-gray-400 mb-2">Free Plan</p>
            <div className="w-full bg-gray-800 rounded-full h-1.5 mb-2">
              <div className="bg-[var(--color-accent-primary)] h-1.5 rounded-full" style={{ width: '40%' }}></div>
            </div>
            <p className="text-xs text-white">2 / 5 Testimonials</p>
          </div>
          <button className="w-full btn-primary text-sm">Upgrade to Pro</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-10">
        {children}
      </main>
    </div>
  );
}
