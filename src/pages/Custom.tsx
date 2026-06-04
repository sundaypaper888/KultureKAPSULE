import React from 'react';
import { Upload, MessageSquare, Send } from 'lucide-react';

const Custom: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter mb-6 text-gallery-white">
            Create Your Own <br /> <span className="text-electric-cyan">Kapsule.</span>
          </h1>
          <p className="text-xl text-muted-slate max-w-2xl mx-auto leading-relaxed font-medium">
            Have a personal photograph, a rare album cover, or a specific quote in mind? 
            Our custom studio can bring your vision to life in museum-quality acrylic.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Custom Inquiry Form */}
          <div className="bg-muted-slate/5 p-10 rounded-2xl border border-muted-slate/10 shadow-premium">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-10 flex items-center text-gallery-white">
              <MessageSquare className="mr-4 text-electric-cyan" size={28} />
              Inquiry Form
            </h2>
            <form className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate ml-1">Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-deep-space border border-muted-slate/20 rounded-lg px-5 py-4 text-sm text-gallery-white focus:outline-none focus:border-electric-cyan transition-colors"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate ml-1">Email</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full bg-deep-space border border-muted-slate/20 rounded-lg px-5 py-4 text-sm text-gallery-white focus:outline-none focus:border-electric-cyan transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate ml-1">Project Type</label>
                <div className="relative">
                  <select className="w-full bg-deep-space border border-muted-slate/20 rounded-lg px-5 py-4 text-sm text-gallery-white focus:outline-none focus:border-electric-cyan transition-colors appearance-none cursor-pointer">
                    <option>Single 12x12 Panel</option>
                    <option>Triptych (3 Panels)</option>
                    <option>Custom Dimension</option>
                  </select>
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-muted-slate">
                    ↓
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-slate ml-1">Tell us about your artifact</label>
                <textarea 
                  rows={5} 
                  placeholder="Describe what you want us to preserve..."
                  className="w-full bg-deep-space border border-muted-slate/20 rounded-lg px-5 py-4 text-sm text-gallery-white focus:outline-none focus:border-electric-cyan transition-colors resize-none"
                ></textarea>
              </div>

              <button className="w-full bg-gallery-white text-deep-space py-5 rounded-full font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-3 hover:bg-electric-cyan transition-all group">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span>Send Inquiry</span>
              </button>
            </form>
          </div>

          {/* Process / Info */}
          <div className="space-y-12 py-6">
            <div className="flex space-x-8">
              <div className="flex-shrink-0 w-14 h-14 bg-muted-slate/10 rounded-2xl flex items-center justify-center border border-muted-slate/20">
                <Upload size={28} className="text-electric-cyan" />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-tight text-xl mb-3 text-gallery-white">1. Upload & Review</h3>
                <p className="text-muted-slate leading-relaxed">
                  Once we receive your inquiry, our designers will reach out for your high-res files 
                  and check if they meet our museum print standards.
                </p>
              </div>
            </div>

            <div className="flex space-x-8">
              <div className="flex-shrink-0 w-14 h-14 bg-muted-slate/10 rounded-2xl flex items-center justify-center border border-muted-slate/20">
                <span className="font-black text-electric-cyan text-xl">PX</span>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-tight text-xl mb-3 text-gallery-white">2. Digital Proof</h3>
                <p className="text-muted-slate leading-relaxed">
                  We'll send you a digital mockup of how your artifact will look in acrylic, 
                  including the edges and signature floating effect.
                </p>
              </div>
            </div>

            <div className="flex space-x-8">
              <div className="flex-shrink-0 w-14 h-14 bg-muted-slate/10 rounded-2xl flex items-center justify-center border border-muted-slate/20">
                <span className="font-black text-electric-cyan text-xl">KK</span>
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-tight text-xl mb-3 text-gallery-white">3. Craft & Ship</h3>
                <p className="text-muted-slate leading-relaxed">
                  After approval, your custom Kapsule is handcrafted and shipped in 
                  specialized protective gallery packaging.
                </p>
              </div>
            </div>

            <div className="p-8 bg-electric-cyan/5 rounded-2xl border border-electric-cyan/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-cyan/10 blur-3xl -mr-16 -mt-16"></div>
              <p className="text-muted-slate italic relative z-10 leading-relaxed">
                "The Kulture Kapsule team took a low-res scan of my grandfather's jazz club 
                membership card and turned it into a stunning 12x12 piece. It's the 
                highlight of my office."
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] mt-6 text-electric-cyan relative z-10">
                — Marcus T. / Collector
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom;
