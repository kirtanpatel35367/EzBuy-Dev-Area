import React from "react";
import Address from "./Address";
import { MapPin, ShieldCheck } from "lucide-react";

/**
 * UserAddress sub-tab in the Account Dashboard.
 * Reuses the primary Address management system for consistency.
 */
const UserAddress = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Tab Context Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <MapPin className="text-primary" size={24} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Logistics Vault</h2>
        </div>
        <div className="flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest bg-white/5 px-4 py-2 rounded-xl">
           <ShieldCheck size={14} className="text-primary/40" />
           <span>Secure Address Encryption Active</span>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-6 md:p-10 border-white/5">
        <Address />
      </div>

      {/* Security Disclaimer */}
      <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
        <p className="text-[10px] text-white/20 font-bold uppercase leading-relaxed tracking-wider">
          NOTICE: All shipping coordinates are encrypted before storage. We do not share your physical logistics data with third-party vendors outside the encrypted delivery pipeline.
        </p>
      </div>
    </div>
  );
};

export default UserAddress;
