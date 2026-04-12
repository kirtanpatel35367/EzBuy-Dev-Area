import React from "react";
import { ShieldCheck, Zap, Globe, Cpu, Users, Award } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="container mx-auto px-4 md:px-6 mb-32 relative">
         {/* Background Glow */}
         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
         
         <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
               <Globe size={14} className="text-primary" />
               <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Operations</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">
              WE DON'T FOLLOW. <br /> <span className="text-white/20">WE DEFINE.</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/40 font-bold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              Engineering the next generation of digital commerce through titanium-grade reliability and high-velocity design.
            </p>
         </div>
      </section>

      {/* 2. CORE IDENTITY GRID */}
      <section className="container mx-auto px-4 md:px-6 mb-32">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden glass">
            {[
              { 
                icon: Cpu, 
                title: "Tech Obsidian", 
                desc: "Every item in our ecosystem undergoes a rigorous 48-point stress test before registration." 
              },
              { 
                icon: ShieldCheck, 
                title: "Maximum Security", 
                desc: "Our platform is built on fully encrypted architecture, ensuring your financial manifests are invincible." 
              },
              { 
                icon: Zap, 
                title: "Hyper Velocity", 
                desc: "From checkout to your delivery destination, we optimize every millisecond of the transit pipeline." 
              }
            ].map((feature, i) => (
               <div key={i} className="p-12 space-y-6 hover:bg-white/[0.02] transition-colors group">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                     <feature.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">{feature.title}</h3>
                  <p className="text-sm text-white/40 leading-relaxed font-medium">{feature.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* 3. STORY SECTION */}
      <section className="py-32 bg-white/[0.02] border-y border-white/5">
         <div className="container mx-auto px-4 md:px-6">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
                    BUILT FOR THE <br /> <span className="text-primary italic">DIGITAL ELITE.</span>
                  </h2>
                  <div className="space-y-6 text-white/60 text-lg leading-relaxed">
                     <p>Founded in 2024, easyBuy was established with a singular mission: to eliminate the friction between discovery and acquisition. We don't just sell products; we verify and curate the essential gear for those who demand more from their tech.</p>
                     <p>Our philosophy is rooted in industrial minimalism. We believe that professional design should be invisible, yet powerful—enabling you to operate at peak efficiency without distraction.</p>
                  </div>
                  
                  <div className="pt-8 grid grid-cols-2 gap-8">
                     <div>
                        <p className="text-4xl font-black text-white">500k+</p>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-2">Active Operators</p>
                     </div>
                     <div>
                        <p className="text-4xl font-black text-white">99.9%</p>
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mt-2">Success Rate</p>
                     </div>
                  </div>
               </div>

               <div className="relative rounded-[3rem] overflow-hidden aspect-square group">
                  <img 
                    src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1200" 
                    alt="Core Lab" 
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-0 bg-primary/20 mix-blend-color opacity-20 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
                        <Award size={32} className="text-primary" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 4. TEAM CALLOUT */}
      <section className="container mx-auto px-4 md:px-6 py-32 text-center">
         <div className="max-w-2xl mx-auto space-y-12">
            <Users className="mx-auto text-primary opacity-40" size={48} />
            <h2 className="text-4xl font-black text-white uppercase tracking-tight">JOIN THE ECOSYSTEM</h2>
            <p className="text-white/40 font-bold uppercase tracking-widest text-xs leading-relaxed">
               We are constantly expanding our global reach. Join thousands of pioneers who have already optimized their lifestyle with easyBuy gear.
            </p>
         </div>
      </section>
    </div>
  );
};

export default AboutUs;
