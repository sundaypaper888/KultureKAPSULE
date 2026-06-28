import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <section className="py-32 bg-muted-slate/5 border-b border-muted-slate/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 text-gallery-white">
            Artifacts for the <br /> <span className="text-electric-cyan">Culture-Obsessed.</span>
          </h1>
          <p className="text-xl text-muted-slate max-w-3xl mx-auto leading-relaxed font-medium">
            Kulture Kapsule was born from a simple desire: to treat modern cultural artifacts 
            with the same reverence as classical art. We believe a classic album cover or a 
            defining movie scene deserves to be more than just a digital file or a flimsy poster.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div className="relative group">
            <div className="absolute -inset-4 bg-electric-cyan/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
              src="/images/tiktok/about-kapsule.png" 
              alt="The Kulture Kapsule Process" 
              className="relative rounded-2xl shadow-premium grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          <div className="space-y-10">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-gallery-white">The Process</h2>
            <div className="space-y-8 text-muted-slate leading-relaxed text-lg">
              <p>
                Each Kapsule is handcrafted using premium 1/4" thick, optically clear acrylic. 
                Our team uses high-resolution digital masters to ensure every detail of the 
                original artifact is preserved with stunning clarity.
              </p>
              <p>
                The edges are diamond-polished to a glass-like finish, creating an internal 
                reflection that gives the artwork a deep, three-dimensional look.
              </p>
              <p>
                Finally, we apply our signature French-pleat mounting system. This allows the 
                piece to float one inch off your wall, creating a dramatic shadow line that 
                completes the "museum" aesthetic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gallery-white text-deep-space py-32">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-16">The Manifesto</h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-deep-space pb-2 inline-block">No More Posters</h3>
              <p className="text-deep-space/70 leading-relaxed pt-2">
                Posters wrinkle, tear, and fade. They belong in dorm rooms. Your space has 
                evolved; your art should too.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-deep-space pb-2 inline-block">Physicality Matters</h3>
              <p className="text-deep-space/70 leading-relaxed pt-2">
                In an era of streaming and fleeting digital content, we believe in the 
                permanence of physical snapshots.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-deep-space pb-2 inline-block">Museum Standards</h3>
              <p className="text-deep-space/70 leading-relaxed pt-2">
                We use the same materials and mounting techniques used by top-tier 
                galleries and museums around the world.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold uppercase tracking-widest border-b-2 border-deep-space pb-2 inline-block">Community First</h3>
              <p className="text-deep-space/70 leading-relaxed pt-2">
                We are fans first. Everything we create is a tribute to the artists and 
                creators who shaped our culture.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
