import { useToast } from "@/hooks/use-toast";
import { VerifyOtpLogin, loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";

const VerifyOTP = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Get email from navigation state or location state
  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const [isResending, setIsResending] = useState(false);

  // If no email, redirect back to login
  React.useEffect(() => {
    if (!email) {
      toast({
        title: "Email required",
        description: "Please login again",
        variant: "destructive",
      });
      navigate("/auth/login");
    }
  }, [email, navigate, toast]);

  async function onSubmit(formData) {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please login again.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    const verifyData = {
      email: email,
      otp: formData.otp,
    };

    const result = await dispatch(VerifyOtpLogin(verifyData));
    if (result?.payload?.success) {
      toast({
        title: result.payload.message,
        variant: "success",
      });
      // Navigate to shop home page after successful login
      navigate("/shop/home");
    } else {
      toast({
        title: result?.payload?.message || "Invalid OTP",
        variant: "destructive",
      });
    }
  }

  const handleResendOTP = async () => {
    if (!email) {
      toast({
        title: "Error",
        description: "Email is missing. Please login again.",
        variant: "destructive",
      });
      navigate("/auth/login");
      return;
    }

    setIsResending(true);

    // Get password from location state if available
    const password = location.state?.password || "";

    if (!password) {
      toast({
        title: "Error",
        description: "Please login again to resend OTP",
        variant: "destructive",
      });
      navigate("/auth/login");
      setIsResending(false);
      return;
    }

    const loginData = {
      email: email,
      password: password,
    };

    const result = await dispatch(loginUser(loginData));
    if (result?.payload?.success && result.payload.is2FAEnabled) {
      toast({
        title: "OTP Resent!",
        description: "A new verification code has been sent to your email.",
        variant: "success",
      });
    } else {
      toast({
        title: "Failed to resend OTP",
        description: result?.payload?.message || "Please try again.",
        variant: "destructive",
      });
    }

    setIsResending(false);
  };

  const handleBackToLogin = () => {
    navigate("/auth/login");
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-10">
      <div className="text-center">
        <h1 className="font-bold text-3xl font-HeadFont">Verify OTP</h1>
        <p className="font-HeadFont text-sm mt-2">
          We've sent a verification code to <strong>{email}</strong>
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-8 border border-gray-200 rounded-xl shadow-sm bg-white"
      >
        <div className="flex flex-col gap-4 font-HeadFont">
          {/* Back Button */}
          <button
            type="button"
            onClick={handleBackToLogin}
            className="self-start text-sm text-[#682c0d] hover:underline flex items-center gap-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Login
          </button>

          {/* Info Message */}
          <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <p className="text-green-800 text-sm font-medium">
                Please check your email for the 6-digit verification code.
              </p>
            </div>
          </div>

          {/* OTP Input */}
          <div className="flex flex-col">
            <label
              htmlFor="otp"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Verification Code
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                placeholder="000000"
                type="text"
                maxLength="6"
                {...register("otp", {
                  required: { value: true, message: "OTP is Required" },
                  pattern: {
                    value: /^\d{6}$/,
                    message: "OTP must be 6 digits",
                  },
                })}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#682c0d] focus:border-transparent transition-all duration-200 text-center text-2xl font-bold tracking-[0.5em] text-gray-900 placeholder-gray-300 bg-gray-50"
                onInput={(e) => {
                  // Only allow numbers
                  e.target.value = e.target.value.replace(/[^0-9]/g, "");
                }}
              />
            </div>
            {errors.otp && (
              <span className="text-red-600 text-sm mt-1.5 flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.otp.message}
              </span>
            )}
          </div>

          {/* Resend OTP Button */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-sm text-[#682c0d] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isResending
                ? "Resending..."
                : "Didn't receive the code? Resend OTP"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-[#682c0d] text-white font-semibold rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#682b0dea] shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
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
                Verifying...
              </span>
            ) : (
              "Verify & Log In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VerifyOTP;
