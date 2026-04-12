import React, { useCallback } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Profile from "./Profile";
import Payment from "./Payment";
import SettingsPage from "./Settings";
import UserOrdersList from "./UserOrdersList";
import UserAddress from "./UserAddress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  User,
  MapPin,
  Package,
  Settings,
  CreditCard,
  Edit3,
  ChevronRight,
  ShieldCheck,
  Zap
} from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Accountpage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";
  const { user } = useSelector((state) => state.auth);

  const handleTabChange = useCallback(
    (value) => {
      setSearchParams({ tab: value });
    },
    [setSearchParams]
  );

  const navigationItems = [
    { value: "profile", label: "Identity", icon: User },
    { value: "address", label: "Logistics", icon: MapPin },
    { value: "orders", label: "Manifests", icon: Package },
    { value: "payment", label: "Settlement", icon: CreditCard },
    { value: "settings", label: "Protocols", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background pt-24 pb-20 overflow-x-hidden">
      {/* Background Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[120%] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>

      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        
        {/* 1. HERO HEADER SECTION */}
        <div className="relative mb-12 rounded-[2.5rem] overflow-hidden glass border-white/5 p-8 md:p-12">
           {/* Decorative Mesh */}
           <div className="absolute top-0 right-0 w-2/3 h-full mesh-gradient opacity-30 pointer-events-none skew-x-12 transform translate-x-1/4"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-10">
              {/* Avatar Unit */}
              <div className="relative group">
                 <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                 <Avatar className="h-32 w-32 border-4 border-white/5 p-1 bg-black/40">
                    <AvatarFallback className="bg-primary text-black text-4xl font-black">
                       {user?.username?.slice(0, 2).toUpperCase() || "EZ"}
                    </AvatarFallback>
                 </Avatar>
                 <button className="absolute bottom-1 right-1 p-2 bg-primary text-black rounded-xl hover:scale-110 transition-transform shadow-lg">
                    <Edit3 size={16} />
                 </button>
              </div>

              {/* Identity Details */}
              <div className="flex-1 text-center md:text-left space-y-4">
                 <div className="space-y-1">
                    <div className="flex items-center justify-center md:justify-start gap-2 text-primary">
                       <ShieldCheck size={14} />
                       <span className="text-[10px] font-black uppercase tracking-[0.2em]">Verified Secure Account</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter">
                       {user?.username || "Guest Operator"}
                    </h1>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-xs">
                       {user?.email || "No email linked"}
                    </p>
                 </div>

                 <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge className="bg-primary/10 text-primary border-primary/20 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                       Premium Member
                    </Badge>
                    <Badge variant="outline" className="border-white/10 text-white/40 px-4 py-1.5 rounded-full text-[10px] font-black uppercase">
                       Active Session
                    </Badge>
                 </div>
              </div>

              {/* Quick Stats/Actions */}
              <div className="hidden lg:flex flex-col items-end gap-4">
                 <div className="flex gap-4">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Total Orders</p>
                       <p className="text-3xl font-black text-white">08</p>
                    </div>
                    <Separator orientation="vertical" className="h-10 bg-white/10" />
                    <div className="text-right">
                       <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Active Credits</p>
                       <p className="text-3xl font-black text-primary">₹0.00</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* 2. NAVIGATION & CONTENT */}
        <div className="grid lg:grid-cols-12 gap-12">
           
           {/* Tabs Logic */}
           <Tabs
             value={activeTab}
             onValueChange={handleTabChange}
             className="w-full lg:col-span-12"
           >
             <div className="flex flex-col md:flex-row gap-8">
                
                {/* Custom Sidebar/TabList */}
                <div className="md:w-64 shrink-0">
                   <TabsList className="flex flex-col h-auto bg-transparent border-none p-0 gap-2">
                      {navigationItems.map((item) => (
                        <TabsTrigger
                          key={item.value}
                          value={item.value}
                          className="w-full h-14 justify-start gap-4 px-6 rounded-2xl border border-transparent transition-all data-[state=active]:bg-primary data-[state=active]:text-black data-[state=active]:shadow-[0_0_20px_rgba(204,255,0,0.1)] hover:bg-white/5 hover:text-white text-white/40"
                        >
                           <item.icon size={18} />
                           <span className="font-black uppercase text-xs tracking-widest">{item.label}</span>
                           <ChevronRight size={14} className="ml-auto opacity-0 data-[state=active]:opacity-100 transition-opacity" />
                        </TabsTrigger>
                      ))}
                   </TabsList>
                   
                   {/* Info Card */}
                   <div className="mt-8 p-6 rounded-3xl bg-primary/5 border border-primary/10 space-y-4">
                      <div className="flex items-center gap-2 text-primary">
                         <Zap size={14} className="fill-primary" />
                         <span className="text-[10px] font-black uppercase tracking-tighter">System Status</span>
                      </div>
                      <p className="text-[10px] text-white/40 font-bold uppercase leading-relaxed">
                         All operational sub-systems are running at peak performance. Security protocols are fully active.
                      </p>
                   </div>
                </div>

                {/* Content Panel */}
                <div className="flex-1 min-h-[500px]">
                   <Card className="glass border-white/5 rounded-[2.5rem] overflow-hidden min-h-full">
                      <CardContent className="p-8 md:p-12">
                         <TabsContent value="profile" className="mt-0 focus:outline-none">
                            <Profile />
                         </TabsContent>

                         <TabsContent value="address" className="mt-0 focus:outline-none">
                            <UserAddress />
                         </TabsContent>

                         <TabsContent value="orders" className="mt-0 focus:outline-none">
                            <UserOrdersList />
                         </TabsContent>

                         <TabsContent value="payment" className="mt-0 focus:outline-none">
                            <Payment />
                         </TabsContent>

                         <TabsContent value="settings" className="mt-0 focus:outline-none">
                            <SettingsPage />
                         </TabsContent>
                      </CardContent>
                   </Card>
                </div>
             </div>
           </Tabs>
        </div>
      </div>
    </div>
  );
};

// Simple Separator Mock (if @/components/ui/separator is missing or needs exact style)
const Separator = ({ className, orientation = "horizontal" }) => (
  <div className={`${className} ${orientation === "vertical" ? "w-[1px]" : "h-[1px]"}`}></div>
);

export default Accountpage;
