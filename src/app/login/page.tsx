export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--color-accent-primary)] opacity-[0.07] rounded-full blur-[100px]"></div>
      
      <div className="glass-panel p-8 w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-tr from-[var(--color-accent-primary)] to-[#a8b1ff] shadow-[0_0_20px_var(--color-accent-primary)] flex items-center justify-center">
             <span className="text-white font-bold text-xl">V</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Welcome to VouchSync</h1>
          <p className="text-gray-400 text-sm">Sign in to access your dashboard</p>
        </div>

        <div className="flex flex-col gap-4">
          <button className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg border border-[var(--color-glass-border)] bg-[rgba(255,255,255,0.03)] hover:bg-[rgba(255,255,255,0.08)] transition-all">
            <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Continue with Google
          </button>
          
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[var(--color-glass-border)]"></div>
            <span className="flex-shrink-0 mx-4 text-gray-500 text-xs uppercase tracking-wider">Or</span>
            <div className="flex-grow border-t border-[var(--color-glass-border)]"></div>
          </div>

          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="name@company.com" 
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[var(--color-accent-primary)] focus:ring-1 focus:ring-[var(--color-accent-primary)] transition-all"
              required
            />
            <button type="submit" className="w-full btn-primary py-3">
              Send Magic Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
