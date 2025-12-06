import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const UserAddress = () => {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Shipping Address</CardTitle>
              <CardDescription>Your default shipping address</CardDescription>
            </div>
            <Badge>Default</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" defaultValue="123 Main Street" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State/Province</Label>
              <Input id="state" defaultValue="NY" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" defaultValue="10001" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Input id="country" defaultValue="United States" />
            </div>
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            Update Address
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing Address</CardTitle>
          <CardDescription>Address for billing and invoices</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Same as shipping address</p>
          <Button variant="outline">Add Different Billing Address</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserAddress;
