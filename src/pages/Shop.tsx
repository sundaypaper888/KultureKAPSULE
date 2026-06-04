import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import type { Category } from '../types';

const categories: Category[] = [
  'Hip-Hop', 
  'Rock', 
  'Classical', 
  'Movie Scenes', 
  'Quotes', 
  'Psychedelic/Original Art', 
  'Top 40s'
];

const Shop: React.FC = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);

  const filteredProducts = selectedCategory 
    ? products.filter(p => p.category === selectedCategory)
    : products;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 space-y-8">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-muted-slate">Categories</h2>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`text-sm uppercase tracking-widest transition-colors ${!selectedCategory ? 'text-electric-cyan font-bold' : 'text-gallery-white hover:text-electric-cyan'}`}
                >
                  All Kapsules
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat}>
                  <button 
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-sm uppercase tracking-widest transition-colors text-left ${selectedCategory === cat ? 'text-electric-cyan font-bold' : 'text-gallery-white hover:text-electric-cyan'}`}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-muted-slate/10">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-muted-slate">Filter By Type</h2>
            <ul className="space-y-4">
              <li className="text-sm text-muted-slate/40 uppercase tracking-widest cursor-not-allowed">Single Panel</li>
              <li className="text-sm text-muted-slate/40 uppercase tracking-widest cursor-not-allowed">Triptych</li>
            </ul>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-12 border-b border-muted-slate/10 pb-6">
            <h1 className="text-3xl font-black uppercase tracking-tighter text-gallery-white">
              {selectedCategory || 'All Kapsules'}
              <span className="ml-4 text-xs font-mono font-normal text-muted-slate lowercase tracking-normal">
                [{filteredProducts.length} items]
              </span>
            </h1>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group">
                  <div className="aspect-square overflow-hidden bg-muted-slate/5 rounded-lg mb-6 relative border border-muted-slate/10 group-hover:border-electric-cyan/30 transition-colors">
                    <img 
                      src={product.imageUrl} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-deep-space/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gallery-white/10 text-gallery-white">
                      {product.type}
                    </div>
                  </div>
                  <h3 className="font-bold uppercase tracking-tight text-lg text-gallery-white group-hover:text-electric-cyan transition-colors">{product.title}</h3>
                  <p className="text-muted-slate text-xs font-mono mb-3 uppercase tracking-wide">{product.artist || product.category}</p>
                  <p className="font-mono text-gallery-white text-lg">${product.price}</p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-32 text-center border border-dashed border-muted-slate/20 rounded-xl">
              <p className="text-muted-slate italic font-mono uppercase text-xs tracking-widest">No products found in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
