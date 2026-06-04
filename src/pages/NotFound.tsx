import React from 'react';
import { Link } from 'react-router-dom';

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-32 min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-[12rem] font-black uppercase tracking-tighter mb-4 text-muted-slate/10 leading-none">404</h1>
      <h2 className="text-3xl font-bold uppercase tracking-widest mb-12 text-gallery-white">Kapsule Not Found</h2>
      <Link 
        to="/" 
        className="text-electric-cyan border-b-2 border-electric-cyan pb-2 font-bold uppercase tracking-[0.3em] text-xs hover:text-gallery-white hover:border-gallery-white transition-all"
      >
        Return to Safety
      </Link>
    </div>
  );
};

export default NotFound;
