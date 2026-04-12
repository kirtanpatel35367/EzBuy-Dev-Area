import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, Zap, Globe } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>
      
      <div className="max-w-4xl w-full text-center relative z-10">
        {/* 404 Number with Neon Glow */}
        <div className="mb-12 relative group">
          <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full scale-150 group-hover:bg-primary/10 transition-all duration-1000"></div>
          <h1 className="text-[12rem] md:text-[20rem] font-black leading-none text-white tracking-tighter opacity-5 select-none drop-shadow-2xl">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full">
                   <Zap size={14} className="text-red-500 fill-red-500" />
                   <span className="text-xs font-black text-red-500 uppercase tracking-widest">Protocol Interrupted</span>
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter">
                   LOST IN THE <br /> <span className="text-primary italic">ECOSYSTEM.</span>
                </h2>
             </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-8 max-w-lg mx-auto">
          <p className="text-lg md:text-xl text-white/40 font-bold uppercase tracking-widest leading-relaxed">
            The coordinates you've requested do not exist in the current reality. 
            Security protocols have been initiated.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
            <Button
              onClick={() => navigate("/shop/home")}
              className="bg-primary text-black font-black h-16 px-10 rounded-2xl text-lg hover:scale-[1.05] transition-all shadow-[0_0_30px_rgba(204,255,0,0.2)] flex gap-3"
            >
              <Home size={20} /> INITIALIZE HOME
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-white/10 bg-white/5 text-white/60 hover:text-white h-16 px-10 rounded-2xl text-lg font-black flex gap-3"
            >
              <ArrowLeft size={20} /> REVERT PATH
            </Button>
          </div>

          <div className="flex items-center justify-center gap-12 pt-16 opacity-10">
             <Globe size={40} className="text-white" />
             <div className="w-px h-12 bg-white/20"></div>
             <div className="text-left font-black tracking-tighter leading-none">
                BUILD <br /> STATUS: <span className="text-primary">EZ-v2.0</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
