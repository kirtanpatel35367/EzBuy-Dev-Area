import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/shop/order-slice";

const UserOrdersList = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orderDetails);
  const userId = useSelector((state) => state.auth.user?.id);

  useEffect(() => {
    if (userId) {
      dispatch(fetchOrders(userId)).then((data) => {
        console.log(data);
      });
    }
  }, [userId, dispatch]);

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setOpenDetailsDialog(true);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
        <CardDescription>View and track your orders</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {orders.map((order) => (
          <Card key={order._id} className="border-2">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">
                      {order.cartItem.title}
                    </h3>
                    <Badge
                      variant={
                        order.orderDetails.orderStatus === "Delivered"
                          ? "secondary"
                          : "default"
                      }
                    >
                      {order.orderDetails.orderStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ordered on {order.orderDetails.orderDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order?.cartItems?.length} items
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Total</p>
                    <p className="text-xl font-bold text-primary">
                      {order.orderDetails.totalAmount}
                    </p>
                  </div>
                  <Button variant="outline">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>
    </Card>
  );
};

export default UserOrdersList;
