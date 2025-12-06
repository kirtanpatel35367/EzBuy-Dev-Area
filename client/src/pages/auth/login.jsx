import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

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
    // First step: Send email and password to check if 2FA is enabled
    const loginData = {
      email: formData.email,
      password: formData.password,
    };

    const result = await dispatch(loginUser(loginData));

    if (result?.payload?.success) {
      // Check if 2FA is enabled - handle both boolean true and string "true"
      const is2FAEnabled =
        result.payload.is2FAEnabled === true ||
        result.payload.is2FAEnabled === "true";

      if (is2FAEnabled) {
        // 2FA is enabled - navigate to OTP verification page
        toast({
          title: result.payload.message || "OTP Sent!",
          description: "Please check your email for the verification code.",
          variant: "success",
        });
        // Navigate to OTP page with email and password in state
        navigate("/auth/verify-otp", {
          state: {
            email: formData.email,
            password: formData.password,
          },
        });
      } else {
        // 2FA is not enabled - user is already logged in (token in cookie)
        toast({
          title: result.payload.message || "Login Successful",
          variant: "success",
        });
        // Navigate to shop home page
        navigate("/shop/home");
      }
    } else {
      // Login failed
      toast({
        title: result?.payload?.message || "Login Failed",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-10">
      <div className="text-center">
        <h1 className="font-bold text-3xl font-HeadFont">Welcome, User</h1>
        <p className="font-HeadFont text-sm">
          New User? <Link to={"/auth/register"}>Create Your Account</Link>
        </p>
      </div>

      <form
        action=""
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto p-8 border border-gray-200 rounded-xl shadow-sm bg-white"
      >
        <div className="flex flex-col gap-5 font-HeadFont">
          {/* Email Input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: { value: true, message: "Email is Required" },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid Email",
                  },
                })}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682c0d] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
            </div>
            {errors.email && (
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
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Input with Eye Icon */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-gray-700 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                })}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#682c0d] focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                )}
              </button>
            </div>
            {errors.password && (
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
                {errors.password.message}
              </span>
            )}
          </div>

          <button
            className="w-full bg-[#c06e39] text-white font-semibold rounded-lg px-4 py-3 cursor-pointer transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#c48256] shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
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
                Logging In...
              </span>
            ) : (
              "Log In"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Authlogin;
