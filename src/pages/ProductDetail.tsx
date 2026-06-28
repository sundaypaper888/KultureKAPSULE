import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ShoppingBag, Truck, ShieldCheck, Zap, Check, Share2, Send, Mail, Link as LinkIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold mb-4 text-gallery-white uppercase tracking-tighter">Kapsule Not Found</h1>
        <Link to="/shop" className="text-electric-cyan underline font-bold uppercase tracking-widest text-xs">
          Return to Shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const shareUrl = window.location.href;
  const shareText = `Check out this ${product.title} Kulture Kapsule!`;

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  // Generate a pseudo-random low stock number for urgency
  const stockCount = (parseInt(product.id) * 7) % 12 + 2; 

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-electric-cyan mb-8 transition-colors">
        <ChevronLeft size={14} className="mr-1" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-muted-slate/5 rounded-2xl overflow-hidden border border-muted-slate/10 shadow-premium relative group">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
            {stockCount < 10 && (
              <div className="absolute top-6 left-6 bg-deep-space/80 backdrop-blur-md px-4 py-2 rounded-full border border-electric-cyan/50 animate-pulse">
                <span className="text-electric-cyan text-[10px] font-bold uppercase tracking-[0.2em]">Only {stockCount} Remaining</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-muted-slate/5 rounded-lg overflow-hidden border-2 border-electric-cyan cursor-pointer">
              <img src={product.imageUrl} alt="Thumbnail 1" className="w-full h-full object-cover" />
            </div>
            {/* Placeholders for more images */}
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square bg-muted-slate/5 rounded-lg overflow-hidden border border-muted-slate/10 opacity-30 cursor-pointer hover:opacity-100 transition-opacity">
                <img src={product.imageUrl} alt={`Thumbnail ${i+1}`} className="w-full h-full object-cover grayscale" />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-electric-cyan">
                <span>{product.category}</span>
                <span className="text-muted-slate/30">•</span>
                <span>{product.type}</span>
              </div>
              <div className="bg-muted-slate/10 px-3 py-1 rounded text-[8px] font-bold uppercase tracking-[0.2em] text-muted-slate border border-muted-slate/10">
                Museum Quality
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mt-6 mb-4 leading-none text-gallery-white">
              {product.title}
            </h1>
            {product.artist && (
              <p className="text-xl text-muted-slate font-medium uppercase tracking-tight">{product.artist}</p>
            )}
            <div className="flex items-baseline space-x-4 mt-8">
              <p className="text-4xl font-mono text-gallery-white">${product.price}</p>
              {product.price > 200 && (
                <span className="text-muted-slate/50 line-through font-mono text-xl">${Math.round(product.price * 1.25)}</span>
              )}
            </div>
          </div>

          <div className="space-y-8 mb-12">
            <p className="text-muted-slate leading-relaxed text-lg italic border-l-2 border-electric-cyan/30 pl-8 py-2">
              "{product.description}"
            </p>

            <div className="space-y-4">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate">Specifications</h3>
              <ul className="text-sm font-mono space-y-3">
                <li className="flex justify-between border-b border-muted-slate/10 pb-3">
                  <span className="text-muted-slate/60 uppercase">Dimensions</span>
                  <span className="text-gallery-white">{product.dimensions}</span>
                </li>
                <li className="flex justify-between border-b border-muted-slate/10 pb-3">
                  <span className="text-muted-slate/60 uppercase">Material</span>
                  <span className="text-gallery-white">1/4" Optically Clear Acrylic</span>
                </li>
                <li className="flex justify-between border-b border-muted-slate/10 pb-3">
                  <span className="text-muted-slate/60 uppercase">Mounting</span>
                  <span className="text-gallery-white">Signature French-Pleat (Floating)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mb-10">
            <button 
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full py-6 rounded-full font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 transition-all group ${
                isAdded ? 'bg-electric-cyan text-deep-space' : 'bg-gallery-white text-deep-space hover:bg-electric-cyan'
              }`}
            >
              {isAdded ? (
                <>
                  <Check size={20} />
                  <span>Added to Collection</span>
                </>
              ) : (
                <>
                  <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" />
                  <span>Add to Collection</span>
                </>
              )}
            </button>
            <button 
              onClick={() => { addToCart(product); navigate('/cart'); }}
              className="w-full py-4 border border-gallery-white/20 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] hover:border-electric-cyan transition-all text-gallery-white"
            >
              Express Checkout
            </button>
          </div>

          {/* Social Share */}
          <div className="flex items-center space-x-6 py-6 border-y border-muted-slate/10 mb-10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate">Share:</span>
            <div className="flex items-center space-x-4">
              <button onClick={shareOnTwitter} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share on Twitter">
                <Send size={18} />
              </button>
              <button onClick={shareOnFacebook} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share on Facebook">
                <Share2 size={18} />
              </button>
              <button onClick={copyToClipboard} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Copy Link">
                <LinkIcon size={18} />
              </button>
              <a href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share via Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10">
            <div className="flex flex-col items-center text-center space-y-2">
              <Truck size={20} className="text-electric-cyan" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-slate">Global Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <ShieldCheck size={20} className="text-electric-cyan" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-slate">Lifetime Quality</span>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <Zap size={20} className="text-electric-cyan" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-slate">Hand-Polished</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
