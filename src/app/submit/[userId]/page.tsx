"use client";
import { useState } from "react";

export default function SubmissionPage({ params }: { params: { userId: string } }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const companyName = "Acme Corp"; 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text) return;
    
    setIsSubmitting(true);
    // In a real app we'd POST to /api/upload here
    // For demo purposes, we just simulate the wait
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-black -z-10"></div>
        <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
        <h1 className="text-3xl font-bold mb-2">Thank You!</h1>
        <p className="text-gray-400 max-w-sm">Your feedback has been submitted successfully to {companyName}.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] to-black -z-10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-64 bg-[var(--color-accent-primary)] opacity-[0.05] blur-[100px] rounded-full"></div>

      <div className="w-full max-w-lg flex flex-col items-center">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gray-800 to-gray-700 shadow-xl mb-6 flex items-center justify-center border border-gray-700">
           <span className="text-xl font-bold text-white">{companyName.charAt(0)}</span>
        </div>
        
        <h1 className="text-2xl font-bold text-center mb-2">How was your experience with {companyName}?</h1>
        <p className="text-gray-400 text-center mb-10">Your feedback helps us improve and helps others make great decisions.</p>

        <form onSubmit={handleSubmit} className="w-full glass-panel p-6 flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Name</label>
            <input type="text" placeholder="John Doe" className="w-full bg-[rgba(0,0,0,0.3)] border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:border-[var(--color-accent-primary)] outline-none" required />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Company (Optional)</label>
            <input type="text" placeholder="Startup Inc." className="w-full bg-[rgba(0,0,0,0.3)] border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:border-[var(--color-accent-primary)] outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Your Review</label>
            <textarea 
              rows={5}
              placeholder="Tell us what problem we solved for you..." 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full bg-[rgba(0,0,0,0.3)] border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:border-[var(--color-accent-primary)] outline-none resize-none" 
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting || !text}
            className="w-full btn-primary py-4 text-lg rounded-xl mt-4 flex items-center justify-center gap-2 shadow-[0_0_20px_var(--color-accent-primary)] disabled:opacity-50"
          >
            {isSubmitting ? 'Processing...' : 'Submit Feedback'}
          </button>
        </form>
        
        <div className="mt-8 opacity-50 flex items-center justify-center gap-1">
          <span className="text-xs text-gray-500">Powered securely by</span>
          <span className="text-xs font-bold text-gray-400">VouchSync</span>
        </div>
      </div>
    </div>
  );
}
