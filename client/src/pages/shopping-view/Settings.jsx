import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { EnableDisable2FA, GetUserNotifications } from "@/store/auth-slice";
import { ShieldAlert, Bell, Fingerprint, Download, Trash2, KeyRound } from "lucide-react";

const Settings = () => {
  const dispatch = useDispatch();

  const notifications = useSelector((state) => state.auth.notifications);
  const notificationsLoading = useSelector(
    (state) => state.auth.notificationsLoading
  );
  const userId = useSelector((state) => state.auth.user?.id);
  const email = useSelector((state) => state.auth.user?.email);

  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  const hasFetchedForUserRef = useRef(null);
  const isToggling2FARef = useRef(false);

  useEffect(() => {
    if (userId && hasFetchedForUserRef.current !== userId) {
      hasFetchedForUserRef.current = userId;
      dispatch(GetUserNotifications({ userId }));
    }
  }, [userId, dispatch]);

  useEffect(() => {
    if (notifications && !isToggling2FARef.current) {
      setEmailNotifications(notifications.emailNotifications2FA ?? false);
      setSmsNotifications(notifications.smsNotifications2FA ?? false);
      setIs2FAEnabled(notifications.is2FAEnabled ?? false);
    }
  }, [
    notifications?.emailNotifications2FA,
    notifications?.smsNotifications2FA,
    notifications?.is2FAEnabled,
  ]);

  const handleEnableDisable2FA = async () => {
    const newValue = !is2FAEnabled;
    isToggling2FARef.current = true;
    setIs2FAEnabled(newValue);

    try {
      const result = await dispatch(
        EnableDisable2FA({
          email,
          enable2FA: newValue,
        })
      );

      if (
        result.type === "auth/EnableDisable2FA/rejected" ||
        (result.payload && !result.payload.success)
      ) {
        setIs2FAEnabled(!newValue);
      }
    } catch (error) {
      setIs2FAEnabled(!newValue);
    } finally {
      setTimeout(() => {
        isToggling2FARef.current = false;
      }, 100);
    }
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handleToggleSmsNotifications = () => {
    setSmsNotifications(!smsNotifications);
  };

  const Toggle = ({ active, onClick, loading }) => (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${active ? "bg-primary" : "bg-white/10"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${active ? "translate-x-6" : "translate-x-1"} ${active ? "bg-black" : "bg-white"}`}
      >
        {loading && (
           <span className="absolute inset-0 flex items-center justify-center">
             <div className="w-2 h-2 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
           </span>
        )}
      </span>
    </button>
  );

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. SECURITY CONTROLS */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <KeyRound className="text-primary" size={20} />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Access Protocols</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
           <Button variant="outline" className="h-16 justify-between gap-4 px-6 border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl group transition-all">
              <div className="flex items-center gap-4">
                 <ShieldAlert size={18} className="text-white/40 group-hover:text-primary transition-colors" />
                 <span className="text-xs font-black uppercase tracking-widest">Update Password</span>
              </div>
              <ChevronRight size={14} className="text-white/20" />
           </Button>
           <Button variant="outline" className="h-16 justify-between gap-4 px-6 border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl group transition-all text-red-500 hover:text-red-400">
              <div className="flex items-center gap-4">
                 <Trash2 size={18} className="opacity-40" />
                 <span className="text-xs font-black uppercase tracking-widest">Deactivate Identity</span>
              </div>
           </Button>
        </div>
      </section>

      {/* 2. PREFERENCES (TOGGLES) */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <Bell className="text-primary" size={20} />
          <h2 className="text-xl font-black text-white uppercase tracking-tight">Comm-Link Preferences</h2>
        </div>

        <div className="glass border-white/5 rounded-3xl overflow-hidden divide-y divide-white/5">
           {[
             { title: "Email Manifests", desc: "Receive automated order manifests via linked SMTP", active: emailNotifications, onClick: handleToggleEmailNotifications },
             { title: "SMS Alerts", desc: "Real-time delivery triangulation pings", active: smsNotifications, onClick: handleToggleSmsNotifications },
             { title: "2FA Authentication", desc: "Secure multi-factor identity verification", active: is2FAEnabled, onClick: handleEnableDisable2FA, loading: notificationsLoading }
           ].map((pref, i) => (
             <div key={i} className="p-6 flex items-center justify-between hover:bg-white/[0.02] transition-colors">
               <div className="space-y-1">
                 <p className="text-sm font-black text-white uppercase tracking-tight">{pref.title}</p>
                 <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{pref.desc}</p>
               </div>
               <Toggle active={pref.active} onClick={pref.onClick} loading={pref.loading} />
             </div>
           ))}
        </div>
      </section>

      {/* 3. DATA VAULT */}
      <section className="space-y-6">
         <div className="flex items-center gap-3">
            <Fingerprint className="text-primary" size={20} />
            <h2 className="text-xl font-black text-white uppercase tracking-tight">Data Vault</h2>
         </div>
         <Button variant="outline" className="w-full h-16 justify-between gap-4 px-8 border-white/5 bg-white/5 hover:bg-white/10 rounded-2xl group transition-all">
            <div className="flex items-center gap-4">
               <Download size={18} className="text-primary" />
               <div className="text-left">
                  <span className="block text-xs font-black uppercase tracking-widest">Export Biological Data</span>
                  <span className="block text-[8px] font-bold text-white/20 uppercase tracking-[0.2em] mt-1">Generate a comprehensive PII manifest</span>
               </div>
            </div>
            <ChevronRight size={14} className="text-white/20" />
         </Button>
      </section>
    </div>
  );
};

// Internal icon for consistency
const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default Settings;
