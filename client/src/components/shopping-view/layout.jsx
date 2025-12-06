import React from "react";
import { Outlet } from "react-router-dom";
import ShoppingHeader from "./ShoppingHeader";

const Shoppinglayout = () => {
  return (
    <div className="flex flex-col bg-white fixed w-full h-screen ">
      {/* Shopping Header */}
      <ShoppingHeader />
      <main className="flex flex-col h-full w-full overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Shoppinglayout;
