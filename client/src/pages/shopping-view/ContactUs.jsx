import React from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="mb-20 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-700 text-center md:text-left">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
              <MessageSquare size={12} className="text-primary" />
              <span className="text-[10px] font-black text-primary uppercase tracking-widest">Comm-Link Portal</span>
           </div>
           <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter">
             ESTABLISH <br /> <span className="text-white/20">CONTACT.</span>
           </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-20 items-start">
           
           {/* LEFT: INFO CARDS (5 Columns) */}
           <div className="lg:col-span-5 space-y-12">
              <div className="space-y-8">
                 <p className="text-lg text-white/40 font-bold uppercase tracking-widest leading-relaxed">
                    Our technical support agents are standing by to assist with your acquisition manifests and ecosystem diagnostics.
                 </p>
                 
                 <div className="grid gap-6">
                    {[
                      { icon: Mail, label: "Neural Link", val: "support@easybuy.tech" },
                      { icon: Phone, label: "Priority Line", val: "+1 (888) 555-TECH" },
                      { icon: MapPin, label: "Command Center", val: "Silicon Precinct, Sector 7G" }
                    ].map((item, i) => (
                       <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/5 group hover:border-primary/20 transition-all duration-500">
                          <div className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                             <item.icon size={20} />
                          </div>
                          <div>
                             <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">{item.label}</p>
                             <p className="text-lg font-black text-white uppercase tracking-tight">{item.val}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Trust Badge */}
              <div className="p-8 rounded-[2.5rem] bg-primary/5 border border-primary/10 flex items-start gap-6">
                 <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <ShieldCheck size={24} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-sm font-black text-white uppercase tracking-tight">Verified Secure Channel</h4>
                    <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed tracking-wider">
                       All inbound transmissions are routed through encrypted gateways to maintain manifest integrity. Response time 2-4 hours.
                    </p>
                 </div>
              </div>
           </div>

           {/* RIGHT: CONTACT FORM (7 Columns) */}
           <div className="lg:col-span-7">
              <div className="glass rounded-[3rem] p-8 md:p-12 border-white/5 relative overflow-hidden">
                 {/* Decorative Glow */}
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                 
                 <form className="space-y-8 relative z-10">
                    <div className="grid md:grid-cols-2 gap-8">
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Operator Name</label>
                          <input 
                            placeholder="John Doe"
                            className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-white/10"
                          />
                       </div>
                       <div className="space-y-2">
                          <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Secure Email</label>
                          <input 
                            type="email"
                            placeholder="operator@neural.net"
                            className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-white/10"
                          />
                       </div>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Manifest Inquiries</label>
                       <select className="w-full h-14 bg-black/40 border border-white/10 rounded-2xl px-6 text-white focus:border-primary transition-all outline-none font-bold appearance-none">
                          <option className="bg-background">Account Diagnostics</option>
                          <option className="bg-background">Order Logistics</option>
                          <option className="bg-background">Technical Support</option>
                          <option className="bg-background">Ecosystem Inquiry</option>
                       </select>
                    </div>

                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Message Transmission</label>
                       <textarea 
                         rows="6"
                         placeholder="Enter your transmission coordinates here..."
                         className="w-full bg-black/40 border border-white/10 rounded-3xl p-6 text-white focus:border-primary transition-all outline-none font-bold placeholder:text-white/10 resize-none"
                       />
                    </div>

                    <Button className="w-full h-20 bg-primary text-black font-black rounded-[1.5rem] text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(204,255,0,0.15)] flex gap-4">
                       ESTABLISH LINK <Send size={24} />
                    </Button>

                    <div className="flex items-center justify-center gap-2 pt-4 opacity-20">
                       <Zap size={14} className="text-primary fill-primary" />
                       <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Neural Bridge Active</span>
                    </div>
                 </form>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
