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

const Settings = () => {
  const dispatch = useDispatch();

  // CRITICAL FIX: Select only what you need, separately
  const notifications = useSelector((state) => state.auth.notifications);
  const notificationsLoading = useSelector(
    (state) => state.auth.notificationsLoading
  );
  const userId = useSelector((state) => state.auth.user?.id);
  const email = useSelector((state) => state.auth.user?.email);

  // Local state for notifications
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);

  // Critical: Track if we've already fetched to prevent refetch
  const hasFetchedForUserRef = useRef(null);
  // Track if we're in the middle of a 2FA toggle to prevent re-sync
  const isToggling2FARef = useRef(false);

  // STEP 1: Fetch notifications ONLY ONCE per userId
  useEffect(() => {
    // Only fetch if:
    // 1. We have a userId
    // 2. We haven't fetched for THIS specific userId yet
    if (userId && hasFetchedForUserRef.current !== userId) {
      console.log("✅ Fetching notifications for userId:", userId);
      hasFetchedForUserRef.current = userId;
      dispatch(GetUserNotifications({ userId }));
    }
  }, [userId, dispatch]);

  // STEP 2: Sync local state with Redux - only when actual values change
  // Skip syncing if we're in the middle of a toggle to prevent flash
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

    // Set flag to prevent useEffect from overriding our optimistic update
    isToggling2FARef.current = true;

    // Optimistically update UI immediately for smooth UX
    setIs2FAEnabled(newValue);

    try {
      const result = await dispatch(
        EnableDisable2FA({
          email,
          enable2FA: newValue,
        })
      );

      // If the API call failed, revert the optimistic update
      if (
        result.type === "auth/EnableDisable2FA/rejected" ||
        (result.payload && !result.payload.success)
      ) {
        setIs2FAEnabled(!newValue);
      }
    } catch (error) {
      // Revert on error
      setIs2FAEnabled(!newValue);
    } finally {
      // Reset flag after a short delay to allow Redux state to update
      setTimeout(() => {
        isToggling2FARef.current = false;
      }, 100);
    }
  };

  const handleToggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
    // TODO: Add API call to save email notification preference
  };

  const handleToggleSmsNotifications = () => {
    setSmsNotifications(!smsNotifications);
    // TODO: Add API call to save SMS notification preference
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account preferences</CardDescription>
      </CardHeader>
      <div className="space-y-4 p-4">
        <h3 className="text-lg font-semibold">Privacy</h3>
        <div className="flex align-center justify-center gap-3">
          <Button variant="outline" className="w-full justify-center">
            Change Password
          </Button>
          <Button variant="outline" className="w-full justify-center">
            Download My Data
          </Button>
          <Button variant="destructive" className="w-full justify-center">
            Delete Account
          </Button>
        </div>
      </div>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notifications</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Receive order updates via email
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={emailNotifications}
                aria-label={
                  emailNotifications
                    ? "Disable Email Notifications"
                    : "Enable Email Notifications"
                }
                onClick={handleToggleEmailNotifications}
                className={`
                  relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-2 focus:ring-[#682c0d] focus:ring-offset-2
                  ${emailNotifications ? "bg-[#682c0d]" : "bg-gray-300"}
                  ${emailNotifications ? "shadow-lg shadow-[#682c0d]/30" : ""}
                `}
              >
                <span
                  className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out
                    ${emailNotifications ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">
                  Get delivery alerts via SMS
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={smsNotifications}
                aria-label={
                  smsNotifications
                    ? "Disable SMS Notifications"
                    : "Enable SMS Notifications"
                }
                onClick={handleToggleSmsNotifications}
                className={`
                  relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-0 focus:ring-offset-2
                  ${smsNotifications ? "bg-[#682c0d]" : "bg-gray-300"}
                  ${smsNotifications ? "shadow-lg shadow-[#682c0d]/30" : ""}
                `}
              >
                <span
                  className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out
                    ${smsNotifications ? "translate-x-6" : "translate-x-1"}
                  `}
                />
              </button>
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="font-medium">2FA Authentication</p>
                <p className="text-sm text-muted-foreground">
                  Enable 2FA authentication for your account
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={is2FAEnabled}
                aria-label={
                  is2FAEnabled
                    ? "Disable 2FA Authentication"
                    : "Enable 2FA Authentication"
                }
                onClick={handleEnableDisable2FA}
                className={`
                  relative outline-none inline-flex h-7 w-12 items-center rounded-full transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-0  focus:ring-offset-2
                  disabled:opacity-50 disabled:cursor-not-allowed
                  ${is2FAEnabled ? "bg-[#682c0d]" : "bg-gray-300"}
                  ${is2FAEnabled ? "shadow-lg shadow-[#682c0d]/30" : ""}
                `}
              >
                <span
                  className={`
                    inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-all duration-300 ease-in-out
                    ${is2FAEnabled ? "translate-x-6" : "translate-x-1"}
                  `}
                >
                  {notificationsLoading && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <svg
                        className="h-3 w-3 animate-spin text-[#682c0d]"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>

        <Separator />
      </CardContent>
    </Card>
  );
};

export default Settings;
