import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { registerUser, loginUser, verifyOTP } from "@/store/auth-slice";
import { Button } from "@/components/ui/button";
import { ShieldAlert, Zap, Lock, ArrowRight, Loader2, RefreshCw } from "lucide-react";

/**
 * Tactical OTP Verification Page.
 * Styled with high-fidelity security protocols.
 */
const VerifyOTP = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(60);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { email, password, username, isRegistering } = location.state || {};

  // Redirect if no state is present (security measure)
  useEffect(() => {
    if (!email) {
      navigate("/auth/login");
    }
  }, [email, navigate]);

  // Countdown timer for resend
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input automatically
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && e.target.previousSibling) {
      e.target.previousSibling.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      toast({
        title: "Incomplete Protocol",
        description: "Please enter the full 6-digit sequence.",
        variant: "destructive",
      });
      return;
    }

    setIsVerifying(true);
    try {
      const result = await dispatch(verifyOTP({ email, otp: otpCode }));
      
      if (result?.payload?.success) {
        toast({
          title: "Access Granted",
          description: "Tactical verification complete.",
          variant: "success",
        });
        navigate("/shop/home");
      } else {
        toast({
          title: "Verification Failed",
          description: result?.payload?.message || "Invalid sequence provided.",
          variant: "destructive",
        });
      }
    } catch (error) {
       console.error("OTP Error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0) return;
    
    setTimer(60);
    toast({
      title: "Resending Sequence",
      description: "A new code has been dispatched to your port.",
      variant: "success",
    });

    if (isRegistering) {
        await dispatch(registerUser({ username, email, password }));
    } else {
        await dispatch(loginUser({ email, password }));
    }
  };

  return (
    <div className="space-y-12">
      {/* Header Info */}
      <div className="space-y-2">
         <div className="flex items-center gap-2 text-primary">
            <ShieldAlert size={14} className="fill-primary/20" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">High-Priority Verification</span>
         </div>
         <h2 className="text-4xl font-black text-white uppercase tracking-tighter">
            TACTICAL <br /> <span className="text-white/20">VERIFICATION.</span>
         </h2>
         <p className="text-xs font-bold text-white/40 uppercase tracking-widest leading-relaxed">
            Identity sequence sent to <span className="text-white">{email}</span>
         </p>
      </div>

      {/* OTP Grid */}
      <form onSubmit={handleVerify} className="space-y-12">
        <div className="flex justify-between gap-3">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-full h-16 bg-white/5 border border-white/10 rounded-2xl text-center text-3xl font-black text-primary focus:border-primary focus:ring-4 focus:ring-primary/20 transition-all outline-none"
            />
          ))}
        </div>

        <div className="space-y-6">
           <Button 
             disabled={isVerifying}
             className="w-full h-20 bg-primary text-black font-black rounded-[1.5rem] text-xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_40px_rgba(204,255,0,0.15)] flex gap-4"
           >
              {isVerifying ? (
                 <span className="flex items-center gap-3">
                    <Loader2 className="animate-spin text-black" size={24} /> VERIFYING...
                 </span>
              ) : (
                 <span className="flex items-center gap-4">VERIFY SEQUENCE <ArrowRight size={24} /></span>
              )}
           </Button>

           <div className="flex flex-col items-center gap-4">
              <button
                type="button"
                onClick={handleResend}
                disabled={timer > 0}
                className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${timer > 0 ? 'text-white/10 cursor-not-allowed' : 'text-white/40 hover:text-primary cursor-pointer'}`}
              >
                  <RefreshCw size={12} className={timer > 0 ? "" : "animate-spin-slow"} /> 
                  RESEND SEQUENCE {timer > 0 && `IN ${timer}S`}
              </button>
              
              <div className="flex items-center gap-2 opacity-10">
                 <Zap size={14} className="text-white fill-white" />
                 <span className="text-[8px] font-bold uppercase tracking-[0.4em]">End-to-End Encrypted Tunnel</span>
              </div>
           </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
