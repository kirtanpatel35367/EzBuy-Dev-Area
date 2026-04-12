import React from "react";
import { ShoppingCart, Star, Heart, ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const HomeProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();
  const discount = product?.salePrice > 0 ? Math.round(((product.price - product.salePrice) / product.price) * 100) : 0;

  return (
    <div className="group premium-card rounded-2xl p-3 flex flex-col h-full hover:scale-[1.02] transition-all duration-500">
      {/* Product Image Container */}
      <div 
        className="relative aspect-square rounded-xl overflow-hidden bg-white/5 cursor-pointer"
        onClick={() => navigate(`/shop/product/${product?._id}`)}
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {discount > 0 && (
            <Badge className="bg-primary text-black font-bold border-none px-2 rounded-sm text-[10px] animate-pulse">
              {discount}% OFF
            </Badge>
          )}
          {product?.totalStock < 10 && product?.totalStock > 0 && (
            <Badge className="bg-red-500 text-white font-bold border-none px-2 rounded-sm text-[10px]">
              LOW STOCK
            </Badge>
          )}
        </div>

        {/* Hover Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:text-primary transition-colors">
            <Heart size={16} />
          </button>
        </div>

        {/* View Details Button Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 text-white text-xs font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            View Details <ArrowUpRight size={14} />
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{product?.brand}</p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-primary text-primary" />
            <span className="text-[10px] text-white/50">4.9</span>
          </div>
        </div>

        <h3 
          className="text-sm font-bold text-white mb-3 line-clamp-1 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/shop/product/${product?._id}`)}
        >
          {product?.title}
        </h3>

        <div className="mt-auto flex items-center justify-between gap-3 pt-3 border-t border-white/5">
          <div className="flex flex-col">
            <span className={`text-lg font-bold ${product?.salePrice > 0 ? "text-primary" : "text-white"}`}>
              ₹{(product?.salePrice > 0 ? product.salePrice : product.price).toLocaleString()}
            </span>
            {product?.salePrice > 0 && (
              <span className="text-[10px] text-white/30 line-through">₹{product.price.toLocaleString()}</span>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(product?._id, product?.totalStock)}
            disabled={product?.totalStock === 0}
            className="p-3 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group/btn"
          >
            <ShoppingCart size={18} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeProductCard;
