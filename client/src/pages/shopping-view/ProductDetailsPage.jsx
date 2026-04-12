import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getproductDetails } from "@/store/product-slice";
import { addtoCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { 
  ShoppingCart, 
  Star, 
  ArrowLeft, 
  ShieldCheck, 
  Truck, 
  Zap,
  Globe,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import ReviewList from "@/components/shopping-view/reviews/ReviewList";
import { BrandOptionMap, CategoryOptionMap } from "@/config";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { productDetails, isLoading } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);

  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getproductDetails(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (productDetails) {
      setMainImage(productDetails.image);
    }
  }, [productDetails]);

  const handleAddToCart = () => {
    if (productDetails?.totalStock === 0) {
      toast({ title: "Out of Stock", variant: "destructive" });
      return;
    }
    dispatch(addtoCart({ userId: user?.id, productId: productDetails?._id, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Added to cart" });
        }
      });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!productDetails) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-black text-white mb-4 uppercase">Product Not Found</h2>
        <Button onClick={() => navigate("/shop/home")} className="bg-primary text-black font-bold rounded-full h-12 px-8">
           BACK TO STORE
        </Button>
      </div>
    );
  }

  const discount = productDetails?.salePrice > 0 ? Math.round(((productDetails.price - productDetails.salePrice) / productDetails.price) * 100) : 0;

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Navigation / Breadcrumb Area */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white/40 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to collection</span>
        </button>

        <div className="grid lg:grid-cols-2 gap-12 xl:gap-24">
          
          {/* 1. LEFT: MEDIA AREA */}
          <div className="space-y-6">
            <div className="aspect-square rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 relative group">
               {discount > 0 && (
                 <Badge className="absolute top-8 left-8 bg-primary text-black font-black px-4 py-1.5 rounded-full z-10 animate-pulse">
                   SAVE {discount}%
                 </Badge>
               )}
               <div className="absolute top-8 right-8 z-10">
                 <button className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
                    <Share2 size={16} />
                 </button>
               </div>

               <img 
                 src={mainImage} 
                 alt={productDetails.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
               />

               {/* Mesh Glow Background */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 rounded-full blur-[150px] pointer-events-none opacity-30"></div>
            </div>

            {/* Thumbnail Selection (Placeholder if more images exist) */}
            <div className="flex gap-4">
               {[...Array(4)].map((_, i) => (
                 <button 
                   key={i} 
                   className={`w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all ${i === 0 ? 'border-primary' : 'border-white/5 opacity-50 hover:opacity-100'}`}
                 >
                   <img src={productDetails.image} className="w-full h-full object-cover" alt="Thumb" />
                 </button>
               ))}
            </div>
          </div>

          {/* 2. RIGHT: PRODUCT INFO */}
          <div className="flex flex-col">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 uppercase font-bold tracking-widest text-[10px]">
                     {BrandOptionMap[productDetails.brand]}
                   </Badge>
                   <span className="text-white/20 text-[10px] uppercase font-bold tracking-widest">
                     ID: {productDetails._id.slice(-8)}
                   </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tighter">
                  {productDetails.title}
                </h1>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < 4 ? "fill-primary text-primary" : "text-white/20"} />
                  ))}
                </div>
                <span className="text-white/40 text-xs font-bold uppercase tracking-widest">(128 Authentic Reviews)</span>
              </div>

              <div className="flex items-baseline gap-4">
                <span className={`text-4xl font-black ${productDetails.salePrice > 0 ? "text-primary" : "text-white"}`}>
                   ₹{(productDetails.salePrice > 0 ? productDetails.salePrice : productDetails.price).toLocaleString()}
                </span>
                {productDetails.salePrice > 0 && (
                  <span className="text-xl text-white/30 line-through font-bold">₹{productDetails.price.toLocaleString()}</span>
                )}
              </div>

              <p className="text-white/60 leading-relaxed text-lg max-w-xl">
                {productDetails.description}
              </p>

              <div className="pt-6 space-y-8">
                 <div className="flex flex-col sm:flex-row gap-4">
                   <Button 
                    onClick={handleAddToCart}
                    disabled={productDetails.totalStock === 0}
                    className="flex-1 bg-primary text-black hover:bg-white text-lg font-black h-16 rounded-2xl transition-all duration-300 transform active:scale-95 disabled:grayscale"
                   >
                     <ShoppingCart className="mr-2" /> 
                     {productDetails.totalStock > 0 ? "ADD TO ENCRYPTED CART" : "OUT OF STOCK"}
                   </Button>
                   <Button 
                    variant="outline"
                    className="aspect-square h-16 rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 transition-all text-white"
                   >
                      <Zap size={24} className="fill-primary text-primary" />
                   </Button>
                 </div>

                 {/* Trust Badges */}
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Truck, label: "Fast Shipping" },
                      { icon: ShieldCheck, label: "1Y Warranty" },
                      { icon: Globe, label: "Global Auth" },
                      { icon: Zap, label: "Hypersync" }
                    ].map((badge, i) => (
                      <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 border border-white/5">
                        <badge.icon size={20} className="text-primary" />
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-tighter">{badge.label}</span>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <Separator className="my-12 bg-white/10" />

            {/* 3. REVIEWS SECTION */}
            <div className="space-y-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Community Feedback</h2>
                  <Button variant="link" className="text-primary font-bold">WRITE A REVIEW</Button>
               </div>
               
               <div className="glass rounded-[2rem] p-8">
                  <ReviewList
                    productId={productDetails?._id}
                    currentUser={user}
                    showWriteReview={true}
                    maxReviews={10}
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
