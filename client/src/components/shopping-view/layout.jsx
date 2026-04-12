import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";
import Footer from "./Footer";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background selection:bg-primary selection:text-black">
      {/* Shopping Header */}
      <ShoppingHeader />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Shoppinglayout;
