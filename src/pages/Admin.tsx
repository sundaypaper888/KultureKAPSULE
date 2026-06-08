import React, { useState, useEffect } from 'react';

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customer: string;
  email: string;
  created: number;
  shipping: any;
}

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(password);
  };

  const fetchOrders = async (pwd: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/get-orders', {
        headers: {
          'x-admin-password': pwd,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setIsAuthenticated(true);
        localStorage.setItem('admin_password', pwd);
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.error || 'Invalid password or unauthorized');
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPassword = localStorage.getItem('admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchOrders(savedPassword);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-4">
        <form onSubmit={handleLogin} className="max-w-md w-full space-y-6 bg-zinc-900 p-8 rounded-lg border border-zinc-800">
          <h1 className="text-2xl font-bold text-center tracking-tighter">KAPSULE ADMIN</h1>
          {error && (
            <div className="bg-red-900/20 border border-red-900 text-red-500 text-sm p-3 rounded text-center">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Access Key</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-black border border-zinc-700 rounded p-3 focus:outline-none focus:border-white transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold py-3 rounded hover:bg-zinc-200 transition-colors disabled:opacity-50"
          >
            {loading ? 'VERIFYING...' : 'ACCESS DASHBOARD'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12 border-b border-zinc-800 pb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tighter mb-2">ORDER TRACKING</h1>
            <p className="text-zinc-500 font-medium">Monitoring all Stripe Checkout sessions</p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => fetchOrders(password)}
              className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded hover:bg-zinc-800 transition-colors text-sm font-bold"
            >
              REFRESH
            </button>
            <button 
              onClick={() => {
                localStorage.removeItem('admin_password');
                setIsAuthenticated(false);
                setPassword('');
              }}
              className="px-4 py-2 border border-zinc-800 rounded hover:bg-red-950 hover:border-red-900 hover:text-red-500 transition-all text-sm font-bold"
            >
              LOGOUT
            </button>
          </div>
        </div>

        {loading && orders.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 animate-pulse font-bold tracking-widest">FETCHING LATEST DATA...</div>
        ) : (
          <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-900/50 text-zinc-500 text-[10px] uppercase tracking-[0.2em] font-black">
                    <th className="py-5 px-6">Date</th>
                    <th className="py-5 px-6">Customer</th>
                    <th className="py-5 px-6">Email</th>
                    <th className="py-5 px-6 text-right">Amount</th>
                    <th className="py-5 px-6">Status</th>
                    <th className="py-5 px-6">Stripe Session</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center text-zinc-600">No orders found in Stripe.</td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-800/50 hover:bg-white/[0.02] transition-colors group">
                        <td className="py-5 px-6 whitespace-nowrap text-zinc-400 text-sm">
                          {new Date(order.created * 1000).toLocaleDateString()}
                        </td>
                        <td className="py-5 px-6 font-bold">{order.customer || '—'}</td>
                        <td className="py-5 px-6 text-zinc-400 text-sm">{order.email || '—'}</td>
                        <td className="py-5 px-6 text-right font-mono font-bold">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: order.currency.toUpperCase() }).format(order.amount)}
                        </td>
                        <td className="py-5 px-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                            order.status === 'paid' 
                              ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                              : 'bg-zinc-800 text-zinc-500'
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-5 px-6 text-[10px] font-mono text-zinc-600">
                          <a 
                            href={`https://dashboard.stripe.com/checkout-sessions/${order.id}`} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="hover:text-white transition-colors flex items-center gap-2"
                          >
                            {order.id}
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <p className="mt-8 text-zinc-600 text-[10px] uppercase tracking-widest text-center">
          Kulture Kapsule Dashboard • Secure Admin Access
        </p>
      </div>
    </div>
  );
};

export default Admin;
