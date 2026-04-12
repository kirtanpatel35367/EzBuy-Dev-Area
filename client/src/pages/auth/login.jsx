import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight, Loader2 } from "lucide-react";

const Authlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(formData) {
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    const result = await dispatch(loginUser(loginData));

    if (result?.payload?.success) {
      const is2FAEnabled =
        result.payload.is2FAEnabled === true ||
        result.payload.is2FAEnabled === "true";

      if (is2FAEnabled) {
        toast({
          title: result.payload.message || "OTP Sent!",
          description: "Please check your email for the verification code.",
          variant: "success",
        });
        navigate("/auth/verify-otp", {
          state: {
             email: formData.email, 
             password: formData.password 
          },
        });
      } else {
        toast({
          title: result.payload.message || "Login Successful",
          variant: "success",
        });
        navigate("/shop/home");
      }
    } else {
      toast({
        title: result?.payload?.message || "Login Failed",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-primary">
            <ShieldCheck size={14} className="fill-primary/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized Access Only</span>
         </div>
         <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            SYNCHRONIZE <br /> <span className="text-white/20">IDENTITY.</span>
         </h2>
         <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">
            New Operator? <Link to="/auth/register" className="text-primary hover:underline transition-all">Register New Link</Link>
         </p>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
           {/* Email Input */}
           <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">E-Mail Coordinate</label>
              <div className="relative group/field">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors">
                    <Mail size={18} />
                 </div>
                 <input 
                    placeholder="operator@neural.net"
                    type="email"
                    {...register("email", {
                       required: "Coordinate required",
                       pattern: {
                         value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                         message: "Invalid coordinate format"
                       }
                    })}
                    className="w-full h-16 pl-14 pr-6 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:border-primary transition-all outline-none placeholder:text-white/10"
                 />
                 {errors.email && (
                   <span className="absolute -bottom-6 left-1 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.email.message}</span>
                 )}
              </div>
           </div>

           {/* Password Input */}
           <div className="space-y-2">
              <label className="text-[10px] font-black text-white/40 uppercase tracking-widest ml-1">Access Passcode</label>
              <div className="relative group/field">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within/field:text-primary transition-colors">
                    <Lock size={18} />
                 </div>
                 <input 
                    placeholder="Enter passcode"
                    type={showPassword ? "text" : "password"}
                    {...register("password", { required: "Passcode required" })}
                    className="w-full h-16 pl-14 pr-14 bg-white/5 border border-white/10 rounded-2xl text-white font-bold focus:border-primary transition-all outline-none placeholder:text-white/10"
                 />
                 <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                 >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                 </button>
                 {errors.password && (
                   <span className="absolute -bottom-6 left-1 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.password.message}</span>
                 )}
              </div>
           </div>
        </div>

        <div className="pt-10">
           <Button 
             disabled={isSubmitting}
             className="w-full h-20 bg-primary text-black font-black rounded-[1.5rem] text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(204,255,0,0.15)] flex gap-4"
           >
              {isSubmitting ? (
                 <span className="flex items-center gap-3">
                    <Loader2 className="animate-spin text-black" size={24} /> AUTHORIZING...
                 </span>
              ) : (
                 <span className="flex items-center gap-4">AUTHORIZE ACCESS <ArrowRight size={24} /></span>
              )}
           </Button>
        </div>
      </form>
    </div>
  );
};

export default Authlogin;
