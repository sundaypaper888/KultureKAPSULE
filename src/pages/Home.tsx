import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';

const Home: React.FC = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero.png" 
            alt="Concert crowd" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-space/50 to-deep-space"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-none text-gallery-white">
            Your Culture.<br />Preserved in Acrylic.
          </h1>
          <p className="text-lg md:text-xl text-muted-slate max-w-2xl mx-auto mb-10 font-medium">
            Iconic vinyl art, movie scenes, and legendary quotes turned into museum-quality 
            acrylic wall art with a signature floating mount.
          </p>
          <Link 
            to="/shop" 
            className="inline-flex items-center space-x-3 bg-gallery-white text-deep-space px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-electric-cyan transition-all group"
          >
            <span>Shop the Collection</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold uppercase tracking-tighter text-gallery-white">Featured Kapsules</h2>
            <p className="text-muted-slate mt-2 font-mono text-sm uppercase tracking-widest">Latest additions to the gallery</p>
          </div>
          <Link to="/shop" className="text-xs font-bold uppercase tracking-widest border-b-2 border-electric-cyan pb-1 text-gallery-white hover:text-electric-cyan transition-all">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gallery-white">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`} className="group">
              <div className="aspect-square overflow-hidden bg-muted-slate/10 rounded-lg mb-4 relative">
                <img 
                  src={product.imageUrl} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-deep-space/60 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-gallery-white/10">
                  {product.type}
                </div>
              </div>
              <h3 className="font-bold uppercase tracking-tight text-lg group-hover:text-electric-cyan transition-colors">{product.title}</h3>
              <p className="text-muted-slate text-xs font-mono mb-2 uppercase tracking-wide">{product.artist || product.category}</p>
              <p className="font-mono text-gallery-white">${product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* TikTok Section */}
      <section className="bg-electric-cyan/5 py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gallery-white mb-4">
                  Witness the <br /> <span className="text-electric-cyan">Craft.</span>
                </h2>
                <p className="text-lg text-muted-slate max-w-xl leading-relaxed">
                  Go behind the scenes and see how we preserve culture in museum-quality acrylic. 
                  Follow us on TikTok and Instagram for new drops, artist highlights, and a closer look at the Kulture Kapsule process.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="https://www.tiktok.com/@KULTUREKAPSULE" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-electric-cyan text-deep-space px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-gallery-white transition-all group"
                >
                  <span>Follow @KULTUREKAPSULE</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="https://www.instagram.com/kulturekapsule/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-3 bg-gallery-white text-deep-space px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-electric-cyan transition-all group"
                >
                  <span>Follow on Instagram</span>
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <img src="/images/tiktok/cat-hiphop.png" alt="Hip-Hop Kapsule" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                  <img src="/images/tiktok/cat-movies.png" alt="Movie Scene Kapsule" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="space-y-4">
                  <img src="/images/tiktok/promo-vinyl.png" alt="Vinyl Kapsule Promo" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                  <img src="/images/tiktok/cat-art.png" alt="Original Art Kapsule" className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section className="bg-muted-slate/5 py-20 border-y border-muted-slate/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gallery-white text-deep-space rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-black text-xl">12</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter text-gallery-white">Museum Quality</h3>
              <p className="text-muted-slate text-sm leading-relaxed">
                Premium 1/4" thick acrylic with diamond-polished edges for unmatched depth and clarity.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-electric-cyan text-deep-space rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-black text-xl">FP</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter text-gallery-white">French Pleat Back</h3>
              <p className="text-muted-slate text-sm leading-relaxed">
                Our signature mounting system gives your art a premium floating look, 1" off the wall.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gallery-white text-deep-space rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="font-black text-xl">KK</span>
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tighter text-gallery-white">Kulture Snapshots</h3>
              <p className="text-muted-slate text-sm leading-relaxed">
                From 12x12 vinyl covers to expansive triptychs, we preserve the artifacts that define you.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
