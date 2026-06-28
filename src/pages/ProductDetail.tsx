import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ShoppingBag, Truck, ShieldCheck, Zap, Check, Mail, Link as LinkIcon } from 'lucide-react';
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

  const shareOnReddit = () => {
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareText)}`, '_blank');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
    alert('Link copied to clipboard!');
  };

  // Generate a pseudo-random low stock number for urgency
  const stockCount = (parseInt(product.id) * 7) % 12 + 2; 
  const isLimited = parseInt(product.id) % 4 === 0;

  // JSON-LD for SEO
  const jsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": product.title,
    "image": product.imageUrl,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "Kulture Kapsule"
    },
    "offers": {
      "@type": "Offer",
      "url": shareUrl,
      "priceCurrency": "USD",
      "price": product.price,
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} 
      />
      
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
            {isLimited && (
              <div className="absolute top-6 right-6 bg-electric-cyan text-deep-space px-4 py-2 rounded-full shadow-lg">
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Limited Edition</span>
              </div>
            )}
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
          
          {/* Social Share under image */}
          <div className="flex items-center justify-center space-x-6 py-4 bg-muted-slate/5 rounded-xl border border-muted-slate/10">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate">Share:</span>
            <div className="flex items-center space-x-5">
              <button onClick={shareOnTwitter} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share on Twitter/X">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 7.719L22.902 21.75h-6.656l-5.203-6.802-5.966 6.802H1.767l7.745-8.274L1.226 2.25h6.827l4.697 6.148 5.494-6.148zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
                </svg>
              </button>
              <button onClick={shareOnFacebook} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share on Facebook">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>
              <button onClick={shareOnReddit} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share on Reddit">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.056 1.597.04.282.063.57.063.854 0 2.208-2.861 4-6.39 4-3.528 0-6.39-1.792-6.39-4 0-.284.023-.572.063-.854a1.754 1.754 0 0 1-1.056-1.597c0-.968.786-1.754 1.754-1.754.477 0 .899.182 1.207.491 1.194-.856 2.85-1.419 4.674-1.488l.867-4.049c.058-.273.312-.456.587-.399l2.492.525c.101-.252.348-.429.636-.429zm-7.65 8.163c-.687 0-1.25.561-1.25 1.249 0 .688.563 1.25 1.25 1.25.688 0 1.25-.562 1.25-1.25 0-.688-.562-1.249-1.25-1.249zm5.28 0c-.688 0-1.25.561-1.25 1.249 0 .688.562 1.25 1.25 1.25.687 0 1.25-.562 1.25-1.25 0-.688-.563-1.249-1.25-1.249zm-5.235 3.109c-.051 0-.102.006-.15.018-.007.001-.038.019-.143.1-.28.216-.514.351-.92.351-.483 0-.712-.132-.99-.333-.105-.077-.136-.095-.143-.096a.327.327 0 0 0-.15-.019c-.127 0-.227.076-.227.17 0 .041.019.071.042.096.001.001.138.153.466.349.313.188.727.316 1.142.316.414 0 .828-.128 1.141-.316.328-.196.465-.348.466-.349.023-.025.042-.055.042-.096 0-.094-.1-.17-.227-.17zm.938 1.86c-.163 0-.296.148-.296.33 0 .183.133.33.296.33.164 0 .296-.147.296-.33 0-.182-.132-.33-.296-.33z" />
                </svg>
              </button>
              <button onClick={copyToClipboard} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Copy Link">
                <LinkIcon size={18} />
              </button>
              <a href={`mailto:?subject=${encodeURIComponent(shareText)}&body=${encodeURIComponent(shareUrl)}`} className="text-muted-slate hover:text-electric-cyan transition-colors" title="Share via Email">
                <Mail size={18} />
              </a>
            </div>
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
