import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f1ebe7] via-[#f4ddbe] to-[#f1ebe7] flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Number with Animation */}
        <div className="mb-8">
          <h1 className="text-9xl md:text-[12rem] font-bold text-[#682c0d] opacity-20 select-none">
            404
          </h1>
        </div>

        {/* Main Content */}
        <div className="relative -mt-32 md:-mt-40">
          {/* Icon/Illustration */}
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 bg-[#f4ddbe] rounded-full flex items-center justify-center shadow-lg border-4 border-[#682c0d]/20">
                <Search className="w-16 h-16 md:w-20 md:h-20 text-[#682c0d]" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#682c0d] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-bold text-[#682c0d] mb-4">
            Oops! Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg md:text-xl text-[#937c6c] mb-8 max-w-md mx-auto">
            The page you're looking for seems to have wandered off. Don't worry,
            let's get you back on track!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate("/shop/home")}
              className="bg-[#682c0d] hover:bg-[#682c0d]/90 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="mr-2 w-5 h-5" />
              Go to Home
            </Button>
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              className="border-2 border-[#682c0d] text-[#682c0d] hover:bg-[#682c0d] hover:text-white px-8 py-6 text-lg transition-all duration-300"
            >
              <ArrowLeft className="mr-2 w-5 h-5" />
              Go Back
            </Button>
          </div>

          {/* Decorative Elements */}
          <div className="mt-12 flex justify-center gap-2">
            <div
              className="w-2 h-2 bg-[#682c0d] rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#682c0d] rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
            <div
              className="w-2 h-2 bg-[#682c0d] rounded-full animate-bounce"
              style={{ animationDelay: "0.4s" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
