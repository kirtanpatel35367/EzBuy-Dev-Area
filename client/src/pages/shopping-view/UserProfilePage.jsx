import React, { useCallback } from "react";
import CoverImg from "../../assets/AccountCoverImg.jpg";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import Profile from "./Profile";
import Payment from "./Payment";
import SettingsPage from "./Settings";
import UserOrdersList from "./UserOrdersList";
import UserAddress from "./UserAddress";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  MapPin,
  Package,
  Settings,
  CreditCard,
  Edit,
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

const Accountpage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "profile";

  // Memoize the handler to prevent unnecessary re-renders
  const handleTabChange = useCallback(
    (value) => {
      setSearchParams({ tab: value });
    },
    [setSearchParams]
  );

  console.log("🟢 Accountpage rendered, activeTab:", activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <Avatar className="h-24 w-24 border-4 border-[#f1ebe7]">
                  <AvatarFallback className="bg-[#682b0dcb] text-primary-foreground text-2xl">
                    JD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    John Doe
                  </h1>
                  <p className="text-muted-foreground mb-3">
                    john.doe@example.com
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <Badge variant="secondary" className="px-3 py-1">
                      Premium Member
                    </Badge>
                    <Badge variant="outline" className="px-3 py-1">
                      Verified
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs
          value={activeTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto p-1 bg-card border shadow-sm">
            <TabsTrigger
              value="profile"
              className="gap-2 data-[state=active]:bg-[#682b0dcb] data-[state=active]:text-primary-foreground py-3"
            >
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger
              value="address"
              className="gap-2 data-[state=active]:bg-[#682b0dcb] data-[state=active]:text-primary-foreground py-3"
            >
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Address</span>
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="gap-2 data-[state=active]:bg-[#682b0dcb] data-[state=active]:text-primary-foreground py-3"
            >
              <Package className="h-4 w-4" />
              <span className="hidden sm:inline">Orders</span>
            </TabsTrigger>
            <TabsTrigger
              value="payment"
              className="gap-2 data-[state=active]:bg-[#682b0dcb] data-[state=active]:text-primary-foreground py-3"
            >
              <CreditCard className="h-4 w-4" />
              <span className="hidden sm:inline">Payment</span>
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="gap-2 data-[state=active]:bg-[#682b0dcb] data-[state=active]:text-primary-foreground py-3"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Profile />
          </TabsContent>

          {/* Address Tab */}
          <TabsContent value="address">
            <UserAddress />
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <UserOrdersList />
          </TabsContent>

          {/* Payment Tab */}
          <TabsContent value="payment">
            <Payment />
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            {activeTab === "settings" && <SettingsPage />}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Accountpage;
