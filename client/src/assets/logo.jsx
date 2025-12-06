import { ShoppingBag } from "lucide-react";

function Logo() {
  return (
    <div className="flex items-center gap-2 group cursor-pointer">
      <div className="relative flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-[#682c0d] group-hover:bg-[#682c0d]/90 transition-colors duration-300 shadow-sm">
          <ShoppingBag className="w-6 h-6 md:w-7 md:h-7 text-[#f4ddbe]" />
        </div>
        <div className="relative">
          <span className="text-2xl md:text-3xl font-bold text-[#682c0d] tracking-tight">
            Ez
          </span>
          <span className="text-2xl md:text-3xl font-bold text-[#937c6c] tracking-tight">
            Buy
          </span>
          <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-[#682c0d] to-[#937c6c] opacity-60 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Logo;
