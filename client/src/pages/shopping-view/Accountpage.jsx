import React from "react";
import CoverImg from "../../assets/AccountCoverImg.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Orders from "./Orders";
import Address from "./Address";
const Accountpage = () => {
  return (
    <div className="flex flex-col">
      <div className="relative h-[400px] w-full overflow-hidden cursor-pointer bg-[#682b0dcb] flex items-center justify-center">
        {/* <img
          src={CoverImg}
          className='h-full w-full object-cover object-center'
        ></img> */}

        <p className="text-white  flex items-center text-center justify-center font-common text-6xl py-2">
          Your style, your choices, your store crafted just for you. <br />
          Shop with confidence, live with elegance.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 gap-8 p-8 font-HeadFont">
        <div className="flex flex-col rounded-lg border bg-background shadow-sm p-4">
          <Tabs defaultValue="userprofile">
            <TabsList>
              <TabsTrigger value="userprofile">User Profile</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <Orders />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Accountpage;
