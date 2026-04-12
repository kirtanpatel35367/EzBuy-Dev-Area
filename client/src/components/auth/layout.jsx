import { Outlet, Link } from "react-router-dom";
import Logo from '../../assets/logo';
import { ShieldCheck, Zap, Globe, ArrowRight } from "lucide-react";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full bg-background overflow-hidden relative">
      
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[150%] h-[1000px] bg-primary/5 rounded-full blur-[150px] pointer-events-none -z-10 animate-pulse"></div>
      <div className="fixed -bottom-40 -left-40 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse delay-700"></div>

      {/* LEFT SIDE: Brand Narrative (Hero) */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-16 border-r border-white/5 relative bg-white/[0.01]">
        {/* Header */}
        <div>
           <Logo />
        </div>

        {/* Narrative Content */}
        <div className="space-y-8 max-w-md animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <Zap size={12} className="text-primary fill-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Digital Frontier v2.0</span>
           </div>
           
           <h1 className="text-6xl font-black text-white leading-[0.9] tracking-tighter uppercase">
              EXPERIENCE <br /> 
              <span className="text-white/20">THE NEXT</span> <br /> 
              GENERATION.
           </h1>
           
           <p className="text-lg text-white/40 font-bold uppercase tracking-widest leading-relaxed">
              Engineering a higher standard of digital commerce through titanium-grade reliability.
           </p>

           <div className="flex flex-col gap-6 pt-8">
              {[
                { icon: ShieldCheck, title: "Secured Identity", desc: "Military-grade encryption for every session." },
                { icon: Globe, title: "Global Ecosystem", desc: "A unified platform for the digital elite." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4 group">
                   <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all">
                      <feature.icon size={18} />
                   </div>
                   <div className="space-y-1">
                      <h4 className="text-sm font-black text-white uppercase tracking-tight">{feature.title}</h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest leading-relaxed">{feature.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Footer info */}
        <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] flex items-center gap-2">
           <span>© 2024 EZBUY PROTOCOL</span>
           <span className="w-1 h-1 bg-primary rounded-full"></span>
           <span>SECURE ACCESS ONLY</span>
        </div>
      </div>

      {/* RIGHT SIDE: Auth Outlet (Form) */}
      <div className="flex-1 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-sm animate-in fade-in zoom-in-95 duration-500">
           {/* Mobile Header (Hidden on Desktop) */}
           <div className="lg:hidden flex justify-center mb-12">
              <Logo />
           </div>
           
           <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;