import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard, Plus, ShieldCheck, Lock } from "lucide-react";

const Payment = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="text-primary" size={24} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Settlement Methods</h2>
        </div>
      </div>

      <div className="grid gap-6">
        {/* Active Card */}
        <Card className="glass border-primary/20 bg-primary/5 rounded-[2rem] overflow-hidden group hover:border-primary/40 transition-all duration-500">
          <CardContent className="p-8">
             <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                   <div className="h-16 w-24 bg-gradient-to-br from-black to-white/10 rounded-2xl flex items-center justify-center border border-white/10 shadow-xl group-hover:scale-110 transition-transform">
                      <CreditCard className="h-8 w-8 text-primary" />
                   </div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2">
                         <p className="text-xl font-black text-white tracking-widest uppercase">•••• •••• •••• 4242</p>
                         <Lock size={14} className="text-primary/40" />
                      </div>
                      <p className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Expires 12 / 2026</p>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                   <Badge className="bg-primary text-black font-black text-[10px] uppercase px-4 py-1.5 rounded-full border-none">
                      Primary Link
                   </Badge>
                   <Button variant="outline" className="h-12 border-white/10 bg-white/5 text-white/40 hover:text-white rounded-xl font-bold">
                      MANAGE
                   </Button>
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Add New Trigger */}
        <Button className="w-full h-24 border-2 border-dashed border-white/5 bg-transparent hover:bg-white/5 hover:border-white/20 rounded-[2rem] transition-all flex flex-col gap-2 group">
           <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 group-hover:text-primary group-hover:bg-primary/10 transition-all">
              <Plus size={20} />
           </div>
           <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-white transition-colors">Register New Settlement Protocol</span>
        </Button>
      </div>

      {/* Trust Signals */}
      <div className="p-8 rounded-[2rem] bg-black/40 border border-white/5 flex items-start gap-6">
         <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <ShieldCheck size={24} />
         </div>
         <div className="space-y-2">
            <h4 className="text-sm font-black text-white uppercase tracking-tight">PCI-DSS Compliant Infrastructure</h4>
            <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed tracking-wider">
               Your financial manifests are never stored locally. All settlement tokens are processed through encrypted gateways with bank-grade security protocols.
            </p>
         </div>
      </div>
    </div>
  );
};

export default Payment;
