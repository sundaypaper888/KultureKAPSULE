import React, { useState, useEffect } from 'react';
import AdminLogin from './AdminLogin';
import { Package, Mail, Calendar, CreditCard, MapPin, RefreshCw, LogOut, ChevronDown, ChevronUp } from 'lucide-react';

interface OrderItem {
  title: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  amount: number;
  currency: string;
  status: string;
  customer: string;
  email: string;
  created: number;
  shipping: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  } | null;
  items: OrderItem[];
}

const Admin: React.FC = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set());

  const fetchOrders = async (pwd: string) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/admin/orders', {
        headers: {
          'x-admin-password': pwd,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
        setIsAuthenticated(true);
        sessionStorage.setItem('admin_password', pwd);
      } else {
        const errData = await response.json().catch(() => ({}));
        setError(errData.error || 'Invalid access key or unauthorized');
      }
    } catch (err) {
      setError('Failed to reach command center');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('admin_password');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchOrders(savedPassword);
    }
  }, []);

  const handleLogin = (pwd: string) => {
    setPassword(pwd);
    fetchOrders(pwd);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('admin_password');
    setIsAuthenticated(false);
    setPassword('');
    setOrders([]);
  };

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders);
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId);
    } else {
      newExpanded.add(orderId);
    }
    setExpandedOrders(newExpanded);
  };

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} error={error} loading={loading} />;
  }

  return (
    <div className="min-h-screen bg-deep-space text-gallery-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 space-y-6 md:space-y-0 border-b border-gallery-white/10 pb-8">
          <div>
            <h1 className="text-5xl font-black tracking-tighter mb-2 italic">Back Office</h1>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-electric-cyan rounded-full animate-pulse shadow-[0_0_10px_rgba(0,240,255,0.8)]" />
              <p className="text-muted-slate font-black uppercase text-[10px] tracking-[0.4em]">Stripe Operations: Online</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => fetchOrders(password)}
              className="flex items-center space-x-2 px-6 py-3 bg-gallery-white/5 border border-gallery-white/10 rounded-2xl hover:bg-gallery-white/10 transition-all text-[10px] font-black uppercase tracking-widest group"
            >
              <RefreshCw size={14} className={`group-hover:rotate-180 transition-transform duration-700 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Pulse</span>
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 px-6 py-3 border border-red-500/20 text-red-400 rounded-2xl hover:bg-red-500/10 transition-all text-[10px] font-black uppercase tracking-widest"
            >
              <LogOut size={14} />
              <span>Terminate</span>
            </button>
          </div>
        </header>

        <div className="space-y-6">
          {orders.length === 0 && !loading ? (
            <div className="bg-gallery-white/5 border border-gallery-white/10 rounded-3xl py-32 text-center">
              <Package size={48} className="mx-auto text-muted-slate mb-6 opacity-20" />
              <p className="text-muted-slate font-black uppercase tracking-[0.3em] text-xs">No transaction records found</p>
            </div>
          ) : (
            <div className="overflow-hidden bg-gallery-white/5 rounded-3xl border border-gallery-white/10 backdrop-blur-md shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gallery-white/5 text-muted-slate text-[10px] uppercase tracking-[0.25em] font-black border-b border-gallery-white/10">
                      <th className="py-6 px-8">Pulse Date</th>
                      <th className="py-6 px-8">Client Entity</th>
                      <th className="py-6 px-8 text-right">Volume</th>
                      <th className="py-6 px-8">Status</th>
                      <th className="py-6 px-8 w-20"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gallery-white/5">
                    {orders.map((order) => (
                      <React.Fragment key={order.id}>
                        <tr 
                          onClick={() => toggleOrderExpansion(order.id)}
                          className={`hover:bg-gallery-white/[0.03] transition-colors cursor-pointer group ${expandedOrders.has(order.id) ? 'bg-gallery-white/[0.03]' : ''}`}
                        >
                          <td className="py-8 px-8 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <Calendar size={14} className="text-muted-slate" />
                              <span className="font-mono text-sm">{new Date(order.created * 1000).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-8 px-8">
                            <div className="flex flex-col">
                              <span className="font-black tracking-tight text-lg uppercase italic">{order.customer || 'Unknown Entity'}</span>
                              <div className="flex items-center space-x-2 text-muted-slate">
                                <Mail size={12} />
                                <span className="text-xs font-medium">{order.email || '—'}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-8 px-8 text-right">
                            <div className="flex flex-col items-end">
                              <span className="font-mono text-xl font-black text-electric-cyan">
                                {new Intl.NumberFormat('en-US', { style: 'currency', currency: order.currency.toUpperCase() }).format(order.amount)}
                              </span>
                              <span className="text-[10px] uppercase font-black tracking-widest text-muted-slate mt-1">{order.items.length} {order.items.length === 1 ? 'Kapsule' : 'Kapsules'}</span>
                            </div>
                          </td>
                          <td className="py-8 px-8">
                            <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.15em] border ${
                              order.status === 'paid' 
                                ? 'bg-green-500/10 text-green-400 border-green-500/20' 
                                : 'bg-orange-500/10 text-orange-400 border-orange-500/20'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="py-8 px-8">
                            {expandedOrders.has(order.id) ? <ChevronUp size={20} className="text-muted-slate" /> : <ChevronDown size={20} className="text-muted-slate group-hover:text-electric-cyan transition-colors" />}
                          </td>
                        </tr>
                        {expandedOrders.has(order.id) && (
                          <tr className="bg-gallery-white/[0.01]">
                            <td colSpan={5} className="py-10 px-12 border-b border-gallery-white/10">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                                <div className="space-y-8">
                                  <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-slate mb-6 flex items-center">
                                      <Package size={14} className="mr-3" />
                                      Inventory Breakdown
                                    </h4>
                                    <div className="space-y-4">
                                      {order.items.map((item, idx) => (
                                        <div key={idx} className="flex justify-between items-center bg-gallery-white/5 p-4 rounded-2xl border border-gallery-white/5">
                                          <div className="flex items-center space-x-4">
                                            <div className="w-10 h-10 bg-electric-cyan/10 rounded-lg flex items-center justify-center font-black text-electric-cyan">
                                              {item.quantity}
                                            </div>
                                            <span className="font-black uppercase tracking-tight italic">{item.title}</span>
                                          </div>
                                          <span className="font-mono text-sm text-muted-slate">${item.price.toFixed(2)}</span>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="p-6 bg-deep-space/50 border border-gallery-white/10 rounded-2xl font-mono text-[10px] text-muted-slate break-all">
                                    <div className="flex items-center mb-2">
                                      <CreditCard size={12} className="mr-2" />
                                      <span>STRIPE_SESSION_ID</span>
                                    </div>
                                    <a 
                                      href={`https://dashboard.stripe.com/checkout-sessions/${order.id}`} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-electric-cyan hover:underline transition-all"
                                    >
                                      {order.id}
                                    </a>
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-slate mb-6 flex items-center">
                                    <MapPin size={14} className="mr-3" />
                                    Deployment Coordinates
                                  </h4>
                                  {order.shipping ? (
                                    <div className="bg-gallery-white/5 p-8 rounded-3xl border border-gallery-white/10 relative overflow-hidden group">
                                      <MapPin size={120} className="absolute -right-8 -bottom-8 text-gallery-white/5 group-hover:text-electric-cyan/5 transition-colors duration-1000" />
                                      <div className="relative z-10 space-y-2">
                                        <p className="text-xl font-black italic uppercase tracking-tight">{order.customer}</p>
                                        <p className="text-muted-slate text-sm font-medium">{order.shipping.line1}</p>
                                        {order.shipping.line2 && <p className="text-muted-slate text-sm font-medium">{order.shipping.line2}</p>}
                                        <p className="text-muted-slate text-sm font-medium">
                                          {order.shipping.city}, {order.shipping.state} {order.shipping.postal_code}
                                        </p>
                                        <p className="text-gallery-white font-black uppercase tracking-widest text-xs mt-4 pt-4 border-t border-gallery-white/10 inline-block">
                                          {order.shipping.country}
                                        </p>
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="bg-gallery-white/5 p-8 rounded-3xl border border-gallery-white/10 text-center py-16">
                                      <p className="text-muted-slate text-[10px] font-black uppercase tracking-widest">No shipping metadata available</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        
        <footer className="mt-20 text-center border-t border-gallery-white/10 pt-12">
          <p className="text-muted-slate text-[10px] uppercase tracking-[0.4em] font-black italic">
            &copy; {new Date().getFullYear()} Kulture Kapsule Dashboard &bull; Access Protocol V.4.2
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Admin;
