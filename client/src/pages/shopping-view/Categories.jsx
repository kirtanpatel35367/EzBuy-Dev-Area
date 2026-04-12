import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Box, Smartphone, Laptop, Watch, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: "men",
    label: "Men's Collection",
    image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800",
    desc: "Titanium-level durability meet contemporary fashion.",
    icon: Box,
    count: "120+ Items"
  },
  {
    id: "women",
    label: "Women's Collection",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
    desc: "Elegant design engineered for high performance.",
    icon: ShoppingBag,
    count: "85+ Items"
  },
  {
    id: "mobiles",
    label: "Premium Mobiles",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800",
    desc: "The pinnacle of mobile engineering and speed.",
    icon: Smartphone,
    count: "45+ Items"
  },
  {
    id: "laptops",
    label: "Pro Laptops",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800",
    desc: "Unleash extreme power for the modern creator.",
    icon: Laptop,
    count: "30+ Items"
  },
  {
    id: "accessories",
    label: "Tech Ecosystem",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
    desc: "The essential components for your digital lifestyle.",
    icon: Watch,
    count: "200+ Items"
  }
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    sessionStorage.removeItem("filters");
    const currentfilter = { Category: [categoryId] };
    sessionStorage.setItem("filters", JSON.stringify(currentfilter));
    navigate("/shop/productList");
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
           <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                 <Box size={12} className="text-primary fill-primary" />
                 <span className="text-[10px] font-black text-primary uppercase tracking-widest">Global Library</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter">
                Explore <br /> <span className="text-white/20">The Collections</span>
              </h1>
           </div>
           <p className="max-w-xs text-white/40 font-bold uppercase tracking-widest text-xs leading-relaxed border-l-2 border-primary/20 pl-6">
              Curated gear engineered for the next generation of digital pioneers.
           </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {categories.map((cat, i) => (
             <div 
               key={cat.id}
               onClick={() => handleCategoryClick(cat.id)}
               className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer animate-in fade-in slide-in-from-bottom-12 duration-1000"
               style={{ animationDelay: `${i * 100}ms` }}
             >
                <img 
                  src={cat.image} 
                  alt={cat.label} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-40 group-hover:opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                
                <div className="absolute inset-0 p-10 flex flex-col justify-between">
                   <div className="flex justify-between items-start">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-primary group-hover:text-black transition-all">
                         <cat.icon size={20} />
                      </div>
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{cat.count}</span>
                   </div>

                   <div className="space-y-4">
                      <h3 className="text-3xl font-black text-white uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors">
                        {cat.label}
                      </h3>
                      <p className="text-sm text-white/40 font-medium max-w-xs opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 transition-transform">
                        {cat.desc}
                      </p>
                      <div className="pt-4 flex items-center gap-2 text-primary font-black uppercase text-xs tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                         VIEW COLLECTION <ArrowRight size={14} />
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
