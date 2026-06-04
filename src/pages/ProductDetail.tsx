import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { ChevronLeft, ShoppingBag, Truck, ShieldCheck, Zap } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/shop" className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-muted-slate hover:text-electric-cyan mb-8 transition-colors">
        <ChevronLeft size={14} className="mr-1" />
        Back to Shop
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
        {/* Image Gallery */}
        <div className="space-y-6">
          <div className="aspect-square bg-muted-slate/5 rounded-2xl overflow-hidden border border-muted-slate/10 shadow-premium">
            <img 
              src={product.imageUrl} 
              alt={product.title} 
              className="w-full h-full object-cover"
            />
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
            <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.3em] text-electric-cyan mb-4">
              <span>{product.category}</span>
              <span className="text-muted-slate/30">•</span>
              <span>{product.type}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-4 leading-none text-gallery-white">
              {product.title}
            </h1>
            {product.artist && (
              <p className="text-xl text-muted-slate font-medium uppercase tracking-tight">{product.artist}</p>
            )}
            <p className="text-4xl font-mono mt-8 text-gallery-white">${product.price}</p>
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

          <button className="w-full bg-gallery-white text-deep-space py-6 rounded-full font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-electric-cyan transition-all mb-10 group">
            <ShoppingBag size={20} className="group-hover:-translate-y-0.5 transition-transform" />
            <span>Add to Collection</span>
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-muted-slate/10">
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
