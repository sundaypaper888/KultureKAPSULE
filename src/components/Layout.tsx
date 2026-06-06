import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Layout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { cartCount } = useCart();

  return (
    <div className="min-h-screen bg-deep-space text-gallery-white flex flex-col">
      <header className="sticky top-0 z-50 bg-deep-space/80 backdrop-blur-md border-b border-muted-slate/20">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="text-xl font-bold tracking-tighter uppercase text-gallery-white">
            Kulture Kapsule
          </Link>

          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-gallery-white">
            <Link to="/shop" className="hover:text-electric-cyan transition-colors">Shop</Link>
            <Link to="/about" className="hover:text-electric-cyan transition-colors">About</Link>
            <Link to="/custom" className="hover:text-electric-cyan transition-colors">Custom</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="p-2 hover:bg-muted-slate/10 rounded-full transition-colors relative">
              <ShoppingCart size={20} className="text-gallery-white" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-electric-cyan text-deep-space text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[1.25rem] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 hover:bg-muted-slate/10 rounded-full transition-colors text-gallery-white"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-deep-space pt-20 px-4 md:hidden">
          <nav className="flex flex-col space-y-6 text-2xl font-bold uppercase tracking-tighter text-gallery-white">
            <Link to="/shop" onClick={() => setIsMenuOpen(false)}>Shop</Link>
            <Link to="/about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/custom" onClick={() => setIsMenuOpen(false)}>Custom</Link>
          </nav>
        </div>
      )}

      <main className="flex-grow">
        <Outlet />
      </main>

      <footer className="bg-deep-space border-t border-muted-slate/20 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h2 className="text-xl font-bold tracking-tighter uppercase mb-4 text-gallery-white">Kulture Kapsule</h2>
              <p className="text-muted-slate max-w-xs text-sm leading-relaxed">
                Museum-quality acrylic wall art for the culture-obsessed. 
                Snapshotting moments, genres, and moods.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gallery-white">Shop</h3>
              <ul className="space-y-2 text-sm text-muted-slate">
                <li><Link to="/shop?category=Hip-Hop" className="hover:text-electric-cyan transition-colors">Hip-Hop</Link></li>
                <li><Link to="/shop?category=Rock" className="hover:text-electric-cyan transition-colors">Rock</Link></li>
                <li><Link to="/shop?category=Movie Scenes" className="hover:text-electric-cyan transition-colors">Movie Scenes</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 text-gallery-white">Company</h3>
              <ul className="space-y-2 text-sm text-muted-slate">
                <li><Link to="/about" className="hover:text-electric-cyan transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-electric-cyan transition-colors">Contact</Link></li>
                <li><Link to="/custom" className="hover:text-electric-cyan transition-colors">Custom Orders</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-muted-slate/10 text-xs text-muted-slate/60 text-center">
            &copy; {new Date().getFullYear()} Kulture Kapsule. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
