
import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Success: React.FC = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useCart();

  useEffect(() => {
    if (sessionId) {
      // In a real app, you might verify the session with the backend here
      clearCart();
    }
  }, [sessionId, clearCart]);

  return (
    <div className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center">
      <div className="w-24 h-24 bg-electric-cyan/10 rounded-full flex items-center justify-center mb-10 border border-electric-cyan/20 shadow-[0_0_30px_rgba(0,240,255,0.2)]">
        <CheckCircle size={40} className="text-electric-cyan" />
      </div>
      
      <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 text-gallery-white text-center">
        Collection Secured
      </h1>
      
      <p className="text-muted-slate mb-12 max-w-md text-center font-medium">
        Thank you for your acquisition. Your Kulture Kapsules are being prepared for gallery-grade shipping. 
        A confirmation email has been sent to your inbox.
      </p>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Link 
          to="/shop" 
          className="inline-flex items-center space-x-4 bg-gallery-white text-deep-space px-10 py-5 rounded-full font-bold uppercase tracking-[0.2em] hover:bg-electric-cyan transition-all group"
        >
          <span>Continue Collecting</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
        
        <Link 
          to="/" 
          className="text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-gallery-white transition-colors flex items-center"
        >
          <ShoppingBag size={14} className="mr-2" />
          Back to Gallery
        </Link>
      </div>
    </div>
  );
};

export default Success;
