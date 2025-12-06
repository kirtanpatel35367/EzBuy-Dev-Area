import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CreditCard } from "lucide-react";

const Payment = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Methods</CardTitle>
        <CardDescription>Manage your payment methods</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Card className="border-2">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="h-12 w-16 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold">•••• •••• •••• 4242</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge>Default</Badge>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Button variant="outline" className="w-full">
          Add New Payment Method
        </Button>
      </CardContent>
    </Card>
  );
};

export default Payment;
