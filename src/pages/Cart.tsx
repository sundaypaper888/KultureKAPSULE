import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus, ShieldCheck, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCart();
  const [loading, setLoading] = React.useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create checkout session');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center">
        <div className="w-24 h-24 bg-muted-slate/5 rounded-full flex items-center justify-center mb-10 border border-muted-slate/10 shadow-premium">
          <ShoppingBag size={40} className="text-muted-slate/40" />
        </div>
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gallery-white">Your Cart is Empty</h1>
        <p className="text-muted-slate mb-12 max-w-xs text-center font-medium">
          Looks like you haven't added any Kapsules to your collection yet.
        </p>
        <Link 
          to="/shop" 
          className="inline-flex items-center space-x-4 bg-gallery-white text-deep-space px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-electric-cyan transition-all group"
        >
          <span>Start Shopping</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-5xl font-black uppercase tracking-tighter mb-12 text-gallery-white">Your Collection ({cartCount})</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-8">
          {cart.map((item) => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 pb-8 border-b border-muted-slate/10 group">
              <div className="w-40 h-40 bg-muted-slate/5 rounded-xl overflow-hidden border border-muted-slate/10 shrink-0 relative">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {item.price > 300 && (
                  <div className="absolute top-2 left-2 bg-electric-cyan text-deep-space text-[8px] font-black uppercase tracking-widest px-2 py-1 rounded shadow-lg">
                    Premium Tier
                  </div>
                )}
              </div>
              
              <div className="flex-grow text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-electric-cyan mb-2 block">{item.category}</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-gallery-white mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-slate font-medium uppercase tracking-tight mb-4">{item.artist || item.type}</p>
                  </div>
                  <p className="text-2xl font-mono text-gallery-white sm:ml-4">${item.price}</p>
                </div>
                
                <div className="flex items-center justify-center sm:justify-start space-x-6 mt-4">
                  <div className="flex items-center border border-muted-slate/20 rounded-full px-2 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 hover:text-electric-cyan transition-colors"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 hover:text-electric-cyan transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-muted-slate/40 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="pt-4">
            <Link to="/shop" className="text-xs font-bold uppercase tracking-widest text-electric-cyan hover:underline flex items-center">
              <Plus size={14} className="mr-2" />
              Add more to your collection
            </Link>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-muted-slate/5 rounded-3xl p-8 border border-muted-slate/10 sticky top-24">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-8 text-gallery-white">Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-sm uppercase tracking-widest">
                <span className="text-muted-slate">Subtotal</span>
                <span className="text-gallery-white font-mono">${cartTotal}</span>
              </div>
              <div className="flex justify-between text-sm uppercase tracking-widest items-center">
                <span className="text-muted-slate">Shipping</span>
                <span className="text-electric-cyan font-bold text-[10px] flex items-center">
                  <Truck size={12} className="mr-1" />
                  FREE FOR LIMITED TIME
                </span>
              </div>
              <div className="pt-4 border-t border-muted-slate/10 flex justify-between">
                <span className="text-lg font-black uppercase tracking-tighter text-gallery-white">Total</span>
                <span className="text-2xl font-mono text-gallery-white font-bold">${cartTotal}</span>
              </div>
            </div>
            
            <button 
              onClick={handleCheckout}
              disabled={loading}
              className="w-full bg-gallery-white text-deep-space py-5 rounded-full font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-electric-cyan transition-all mb-4 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{loading ? 'Processing...' : 'Checkout Now'}</span>
              {!loading && <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />}
            </button>
            
            <div className="flex flex-col space-y-4 mt-8 pt-8 border-t border-muted-slate/10">
              <div className="flex items-center space-x-3 text-muted-slate/60">
                <Lock size={14} className="text-electric-cyan" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Secure encrypted checkout</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-slate/60">
                <ShieldCheck size={14} className="text-electric-cyan" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Museum quality guarantee</span>
              </div>
            </div>

            <p className="mt-8 text-[10px] text-center text-muted-slate/60 uppercase tracking-widest leading-relaxed">
              Secure gallery shipping guaranteed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
