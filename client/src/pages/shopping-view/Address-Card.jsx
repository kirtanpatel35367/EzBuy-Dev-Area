import { Card } from "@/components/ui/card";
import { MapPin, Phone, Edit2, Trash2, CheckCircle2 } from "lucide-react";

function AddressCard({ 
  address, 
  handleEditAddress, 
  handleDeleteAddress, 
  setCurrentSelectedAddress, 
  currentSelectedAdddress 
}) {
  const isSelected = currentSelectedAdddress?._id === address._id;

  return (
    <Card 
      onClick={() => setCurrentSelectedAddress ? setCurrentSelectedAddress(address) : null} 
      className={`group relative overflow-hidden transition-all duration-500 cursor-pointer ${
        isSelected 
        ? "border-primary bg-primary/5 shadow-[0_0_20px_rgba(204,255,0,0.1)] scale-[1.02]" 
        : "border-white/5 bg-white/5 hover:border-white/20"
      }`}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header / Selection Indicator */}
        <div className="flex justify-between items-start mb-4">
          <div className={`p-2 rounded-xl border transition-colors ${isSelected ? "border-primary text-primary" : "border-white/10 text-white/40"}`}>
            <MapPin size={18} />
          </div>
          {isSelected && (
            <CheckCircle2 size={20} className="text-primary animate-in zoom-in duration-300" />
          )}
        </div>

        {/* Address Details */}
        <div className="flex-1 space-y-2">
          <p className="text-white font-black uppercase text-sm tracking-tight leading-tight">
            {address?.address}
          </p>
          <div className="flex flex-col gap-1">
             <span className="text-white/40 text-[10px] font-bold uppercase">{address?.city}, {address?.pincode}</span>
             <div className="flex items-center gap-2 text-white/60 text-xs">
                <Phone size={12} className="text-primary/60" />
                <span className="font-medium">{address?.phone}</span>
             </div>
          </div>
          {address?.notes && (
            <div className="mt-4 p-2 rounded-lg bg-black/40 border border-white/5">
               <p className="text-[10px] italic text-white/30 truncate">{address?.notes}</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-2 border-t border-white/5 pt-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 transition-transform">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEditAddress(address);
            }} 
            className="p-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 hover:text-white transition-all"
          >
            <Edit2 size={14} />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteAddress(address._id);
            }} 
            className="p-2 rounded-lg bg-white/5 text-white/20 hover:bg-red-500 hover:text-white transition-all"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default AddressCard;