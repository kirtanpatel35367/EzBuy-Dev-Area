import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchShopProducts } from "@/store/product-slice";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, 
  ChevronRight, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Headphones,
  Star, 
  ArrowUpRight,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import HomeProductCard from "@/components/shopping-view/HomeProductCard";
import { addtoCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

// Premium Banners (Imported from assets for proper Vite bundling)
import smartwatchImg from "../../assets/smartwatch.png";
import earbudsImg from "../../assets/earbuds.png";
import ecosystemImg from "../../assets/ecosystem.png";

const CAT_SMARTWATCH = "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=800";
const CAT_AUDIO = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800";
const CAT_ACCESSORIES = "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&q=80&w=800";
const BRAND_STORY_IMG = "https://images.unsplash.com/photo-1622345532581-22442475472d?auto=format&fit=crop&q=80&w=1200";

const HomePage = () => {
  const { productList } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      title: "LIMITLESS",
      accent: "POSSIBILITY.",
      desc: "Engineered for the extraordinary. Experience the fusion of titanium-grade durability and hyper-responsive technology.",
      badge: "Titanium Forge Edition",
      color: "primary",
      image: smartwatchImg
    },
    {
      title: "SONIC",
      accent: "SUPREMACY.",
      desc: "Hyper-responsive audio for the digital elite. 48-hour battery. Pure titanium drivers.",
      badge: "Acoustic Pro Series",
      color: "secondary",
      image: earbudsImg
    },
    {
      title: "PERFECTLY",
      accent: "PURE.",
      desc: "Minimalist aesthetics. Maximum performance. The new standard in ecosystem-integrated technology.",
      badge: "Industrial Series 01",
      color: "white",
      image: ecosystemImg
    }
  ];

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(handleNextSlide, 5000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, handleNextSlide]);

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(fetchShopProducts({ filterParams: {}, sortParams: {} }));
  }, [dispatch]);

  const handleNavigateListingPage = (getCurrentItem, section) => {
    sessionStorage.removeItem("filters");
    const currentfilter = { [section]: [getCurrentItem] };
    sessionStorage.setItem("filters", JSON.stringify(currentfilter));
    navigate("/shop/productList");
  };

  const handleAddToCart = (getCurrentProductId, getTotalStock) => {
    if (getTotalStock === 0) {
      toast({ title: "Out of Stock", variant: "destructive" });
      return;
    }
    dispatch(addtoCart({ userId: user?.id, productId: getCurrentProductId, quantity: 1 }))
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          toast({ title: "Added to cart" });
        }
      });
  };

  return (
    <div className="flex flex-col w-full bg-background overflow-x-hidden">
      
      {/* 1. HERO CAROUSEL SECTION */}
      <section 
        className="relative min-h-[95vh] flex items-center pt-20 overflow-hidden mesh-gradient group/hero"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 absolute inset-x-0 mx-auto w-full px-4 md:px-6 ${
                currentSlide === index ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-12 pointer-events-none"
              }`}
              style={{ position: currentSlide === index ? "relative" : "absolute" }}
            >
              {/* Text Content */}
              <div className="space-y-8 max-w-2xl">
                <div 
                  className={`inline-flex items-center gap-2 px-3 py-1 bg-${slide.color}/10 border border-${slide.color}/20 rounded-full transition-all duration-700 delay-300 ${
                    currentSlide === index ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                  }`}
                >
                  <Zap size={14} className={`text-${slide.color} fill-${slide.color}`} />
                  <span className={`text-[10px] uppercase tracking-widest font-bold text-${slide.color}`}>{slide.badge}</span>
                </div>
                
                <h1 className={`text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter text-white transition-all duration-700 delay-500 ${
                  currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  {slide.title} <br /> 
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r from-${slide.color} to-secondary`}>
                    {slide.accent}
                  </span>
                </h1>
                
                <p className={`text-lg text-white/60 leading-relaxed max-w-md transition-all duration-700 delay-700 ${
                  currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  {slide.desc}
                </p>

                <div className={`flex flex-col sm:flex-row gap-4 pt-4 transition-all duration-700 delay-[900ms] ${
                  currentSlide === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}>
                  <Button 
                    onClick={() => navigate("/shop/productList")}
                    className={`bg-${slide.color === 'white' ? 'white' : 'primary'} text-black hover:bg-white/90 rounded-full h-14 px-10 text-base font-bold transition-all hover:scale-105 active:scale-95`}
                  >
                    SHOP NOW
                  </Button>
                  <Button 
                    variant="outline"
                    className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-full h-14 px-10 text-base font-bold flex gap-2"
                  >
                    LEARN MORE <ArrowUpRight size={18} />
                  </Button>
                </div>
              </div>

              {/* Image Content */}
              <div className={`relative transition-all duration-1000 delay-500 ${
                currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}>
                 <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] bg-${slide.color}/20 rounded-full blur-[120px] pointer-events-none opacity-50`}></div>
                 <img 
                   src={slide.image} 
                   alt={slide.title} 
                   className="relative z-10 w-full h-auto transform hover:rotate-1 transition-transform duration-1000 drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
                 />
              </div>
            </div>
          ))}

          {/* Manual Controls */}
          <div className="absolute left-0 right-0 bottom-12 flex justify-between items-center pointer-events-none">
             <div className="flex gap-4 pointer-events-auto">
                <button 
                  onClick={handlePrevSlide}
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={handleNextSlide}
                  className="w-12 h-12 rounded-full border border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all"
                >
                  <ChevronRight size={20} />
                </button>
             </div>

             {/* Progress Indicators */}
             <div className="flex items-center gap-3 pointer-events-auto">
                {slides.map((_, i) => (
                  <button 
                    key={i}
                    onClick={() => setCurrentSlide(i)}
                    className="group relative h-1 w-12 bg-white/10 rounded-full overflow-hidden"
                  >
                    <div 
                      className={`absolute inset-0 bg-primary transition-all duration-[5000ms] linear ${
                        currentSlide === i ? "translate-x-0" : "-translate-x-full"
                      }`}
                    />
                  </button>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 2. PROOF STRIP */}
      <section className="bg-black py-8 border-y border-white/5 overflow-hidden">
        <div className="flex whitespace-nowrap animate-infinite-scroll">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="flex items-center gap-12 px-12">
                <span className="text-4xl font-black text-white/10 uppercase tracking-tighter">Hyper-Fast Delivery</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-4xl font-black text-white/10 uppercase tracking-tighter">Premium Audio Tech</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-4xl font-black text-white/10 uppercase tracking-tighter">Titanium Build</span>
                <span className="w-2 h-2 rounded-full bg-primary"></span>
             </div>
           ))}
        </div>
      </section>

      {/* 3. CATEGORY SHOWCASE */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-end mb-12">
           <div className="space-y-2">
              <h2 className="text-4xl font-black text-white">EXPLORE ECOSYSTEM</h2>
              <p className="text-white/40 max-w-xs">Curated gear for every lifestyle.</p>
           </div>
           <Button variant="link" className="text-primary font-bold group">
             VIEW ALL CATEGORIES <ChevronRight className="group-hover:translate-x-1 transition-transform" />
           </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {[
             { title: "Smartwatches", img: CAT_SMARTWATCH, id: "accessories", count: "12+ Products" },
             { title: "Audio Gear", img: CAT_AUDIO, id: "accessories", count: "8+ Products" },
             { title: "Pro Accessories", img: CAT_ACCESSORIES, id: "accessories", count: "24+ Products" }
           ].map((cat, i) => (
             <div 
               key={i}
               onClick={() => handleNavigateListingPage(cat.id, "Category")}
               className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer"
             >
                <img src={cat.img} alt={cat.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 space-y-2">
                   <div className="text-[10px] font-bold text-primary uppercase tracking-widest">{cat.count}</div>
                   <h3 className="text-2xl font-black text-white">{cat.title}</h3>
                   <div className="flex items-center gap-2 text-white/60 text-xs font-bold transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                     EXPLORE COLLECTION <ArrowUpRight size={14} />
                   </div>
                </div>
             </div>
           ))}
        </div>
      </section>

      {/* 4. BEST SELLERS */}
      <section className="py-24 bg-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
             <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full">
                  <Star size={12} className="text-red-500 fill-red-500" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-red-500">Fastest Selling</span>
                </div>
                <h2 className="text-5xl font-black text-white">THE HALL OF FAME</h2>
             </div>
             <div className="flex gap-2">
               <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors">
                 <ArrowRight size={20} className="rotate-180" />
               </button>
               <button className="w-12 h-12 rounded-full bg-primary text-black flex items-center justify-center hover:scale-105 transition-all">
                 <ArrowRight size={20} />
               </button>
             </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.slice(0, 4).map((productItem) => (
                  <HomeProductCard
                    key={productItem._id}
                    product={productItem}
                    handleAddToCart={handleAddToCart}
                  />
                ))
              : null}
          </div>
        </div>
      </section>

      {/* 5. BRAND STORY */}
      <section className="py-24 container mx-auto px-4 md:px-6">
         <div className="relative rounded-[40px] overflow-hidden bg-black aspect-[21/9]">
            <img src={BRAND_STORY_IMG} alt="Story" className="w-full h-full object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent flex items-center">
               <div className="px-12 md:px-24 max-w-xl space-y-6">
                  <h2 className="text-5xl font-black text-white leading-tight">WE DON'T FOLLOW. <br /> WE DEFINE.</h2>
                  <p className="text-white/60">Our philosophy is simple: obsess over quality, challenge the status quo, and empower the individual.</p>
                  <Button className="rounded-full bg-white text-black hover:bg-white/90 font-bold px-8">LEARN OUR STORY</Button>
               </div>
            </div>
         </div>
      </section>

      {/* 6. URGENCY DROPS */}
      <section className="py-24 bg-primary">
         <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
               <div className="space-y-6 text-black flex-1">
                  <h2 className="text-6xl font-black leading-none tracking-tighter">FLASH DROP <br /> IN PROGRESS.</h2>
                  <p className="font-bold max-w-md">Limited edition gear at insane prices. This drop will not be restocked. Ever.</p>
               </div>

               <div className="flex gap-4">
                  {[
                    { val: timeLeft.hours, label: "Hours" },
                    { val: timeLeft.minutes, label: "Mins" },
                    { val: timeLeft.seconds, label: "Secs" }
                  ].map((unit, i) => (
                    <div key={i} className="flex flex-col items-center">
                       <div className="w-24 h-24 bg-black rounded-3xl flex items-center justify-center text-5xl font-black text-primary shadow-2xl">
                          {String(unit.val).padStart(2, '0')}
                       </div>
                       <span className="text-[10px] uppercase font-bold text-black mt-2 tracking-widest">{unit.label}</span>
                    </div>
                  ))}
               </div>

               <Button 
                onClick={() => navigate("/shop/productList")}
                className="bg-black text-white hover:bg-black/90 rounded-full h-16 px-12 text-lg font-black transition-all hover:scale-105"
               >
                 ENTER DROP
               </Button>
            </div>
         </div>
      </section>

      {/* 7. WHY US */}
      <section className="py-24 border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
             {[
               { icon: Truck, title: "Hyper Delivery", desc: "Same day dispatch on orders placed before 2PM." },
               { icon: ShieldCheck, title: "1 Yr Warranty", desc: "No-questions-asked replacement for all premium gear." },
               { icon: Headphones, title: "Expert Support", desc: "Human-first support via WhatsApp and Email 24/7." },
               { icon: Star, title: "Quality First", desc: "Each unit undergoes 48+ stress tests before boxing." }
             ].map((feature, i) => (
                <div key={i} className="space-y-4 group">
                   <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all duration-500">
                      {React.createElement(feature.icon, { size: 24 })}
                   </div>
                   <h4 className="text-lg font-bold text-white uppercase tracking-tight">{feature.title}</h4>
                   <p className="text-sm text-white/40 leading-relaxed">{feature.desc}</p>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
