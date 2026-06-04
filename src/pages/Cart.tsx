import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';

const Cart: React.FC = () => {
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
};

export default Cart;
