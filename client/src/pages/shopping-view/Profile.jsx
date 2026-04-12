import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Mail, Phone, User, ShieldCheck } from "lucide-react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3">
        <User className="text-primary" size={24} />
        <h2 className="text-2xl font-black text-white uppercase tracking-tight">Identity Profile</h2>
      </div>

      <Card className="bg-transparent border-none shadow-none">
        <CardHeader className="px-0">
          <CardTitle className="text-sm font-black text-white/60 uppercase tracking-widest">Personal Coordinates</CardTitle>
          <CardDescription className="text-white/40 text-xs">Manage your primary account identity and contact protocols.</CardDescription>
        </CardHeader>
        <CardContent className="px-0 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Assigned Username</Label>
              <div className="relative">
                <Input 
                  disabled
                  value={user?.username || "Guest Operator"} 
                  className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 text-white/60 font-bold disabled:opacity-50"
                />
                <ShieldCheck className="absolute right-4 top-1/2 -translate-y-1/2 text-primary/40" size={18} />
              </div>
            </div>
            <div className="space-y-3">
              <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Account Tier</Label>
              <Input 
                disabled
                value="PREMIUM LEVEL 01" 
                className="h-14 bg-white/5 border-white/10 rounded-2xl px-6 text-primary font-black uppercase tracking-widest disabled:opacity-100"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Electronic Mail Port</Label>
            <div className="relative group">
              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors" />
              <Input
                defaultValue={user?.email || "john.doe@example.com"}
                className="h-14 pl-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Secure Mobile Link</Label>
            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40 group-focus-within:text-primary transition-colors" />
              <Input
                defaultValue="+91 98765 43210"
                className="h-14 pl-14 bg-white/5 border-white/10 rounded-2xl text-white font-bold focus:border-primary transition-all outline-none"
              />
            </div>
          </div>

          <Separator className="bg-white/5" />

          <div className="flex flex-col sm:flex-row gap-4">
             <Button className="h-14 px-10 bg-primary text-black font-black rounded-2xl hover:scale-[1.02] transition-all hover:bg-white active:scale-95 shadow-[0_0_20px_rgba(204,255,0,0.1)]">
               SYNCHRONIZE CHANGES
             </Button>
             <Button variant="outline" className="h-14 px-10 border-white/10 bg-white/5 text-white/40 hover:text-white rounded-2xl font-bold">
               RESET PROTOCOL
             </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
