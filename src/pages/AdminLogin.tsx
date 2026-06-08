import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: (password: string) => void;
  error?: string;
  loading?: boolean;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin, error, loading }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-space text-gallery-white px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
            Gallery Access
          </h1>
          <p className="text-muted-slate uppercase text-[10px] tracking-[0.3em] font-bold">
            Authorized Personnel Only
          </p>
        </div>

        <form 
          onSubmit={handleSubmit} 
          className="bg-gallery-white/5 p-10 rounded-3xl border border-gallery-white/10 backdrop-blur-xl shadow-2xl"
        >
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold p-4 rounded-xl mb-6 text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-muted-slate mb-3 ml-1">
                Access Key
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-deep-space/50 border border-gallery-white/10 rounded-2xl p-5 focus:outline-none focus:border-electric-cyan transition-all font-mono placeholder:text-muted-slate/30"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gallery-white text-deep-space font-black py-5 rounded-2xl hover:bg-electric-cyan transition-all disabled:opacity-50 uppercase tracking-[0.2em] text-sm shadow-[0_10px_30px_rgba(255,255,255,0.1)]"
            >
              {loading ? 'Verifying...' : 'Initialize Access'}
            </button>
          </div>
        </form>

        <p className="mt-8 text-center text-[10px] text-muted-slate uppercase tracking-[0.2em] font-bold">
          Kulture Kapsule Back-Office
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
