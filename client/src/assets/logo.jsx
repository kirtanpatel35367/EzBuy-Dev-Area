import { ShoppingBag } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer transition-transform duration-300 hover:scale-105">
      <div className="relative flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-primary group-hover:bg-primary/90 transition-all duration-300 shadow-[0_0_15px_rgba(204,255,0,0.4)]">
          <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-black" />
        </div>
        <div className="relative">
          <span className="text-2xl md:text-3xl font-black text-white tracking-tighter">
            EZ
          </span>
          <span className="text-2xl md:text-3xl font-black text-white/40 tracking-tighter">
            BUY
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-[3px] bg-primary opacity-60 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
        </div>
      </div>
    </div>
  );
}

export default Logo;
