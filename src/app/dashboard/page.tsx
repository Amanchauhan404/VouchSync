export default function DashboardPage() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
        <p className="text-gray-400">Here's what's happening with your testimonials today.</p>
      </header>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">Total Collected</h3>
            <span className="p-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-[var(--color-accent-primary)]">
              {/* Icon placeholder */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </span>
          </div>
          <p className="text-4xl font-bold">12</p>
          <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            +3 this week
          </p>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">Widget Views</h3>
            <span className="p-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-blue-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
            </span>
          </div>
          <p className="text-4xl font-bold">1,402</p>
          <p className="text-sm text-green-400 mt-2 flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>
            +18% this month
          </p>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 font-medium">AI Processing Status</h3>
            <span className="p-2 bg-[rgba(255,255,255,0.05)] rounded-lg text-purple-400">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
            </span>
          </div>
          <p className="text-4xl font-bold">0</p>
          <p className="text-sm text-gray-400 mt-2">in queue</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-panel p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Decorative background glow */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-[var(--color-accent-primary)] opacity-10 rounded-full blur-3xl"></div>
        
        <div>
          <h2 className="text-xl font-bold mb-2">Collect a new testimonial</h2>
          <p className="text-gray-400 max-w-md">Copy your unique collection link and send it to your satisfied clients. Our AI will handle the rest.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-6 py-3 rounded-lg border border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.1)] transition-colors flex items-center justify-center gap-2 font-medium">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            Copy Link
          </button>
          <button className="flex-1 md:flex-none btn-primary flex items-center justify-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}
