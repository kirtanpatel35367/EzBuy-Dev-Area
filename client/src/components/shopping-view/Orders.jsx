import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Dialog } from "../ui/dialog";
import { Button } from "../ui/button";
import ShoppingOrderDetails from "./Order-Details";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "@/store/shop/order-slice";

function ShoppingOrderView() {
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  return (
    <div>
      <Card className="font-HeadFont mt-4">
        <CardHeader>
          <CardTitle>Your Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-4">Loading orders...</div>
          ) : orders && orders.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Order Date</TableHead>
                  <TableHead>Order Status</TableHead>
                  <TableHead>Payment Status</TableHead>
                  <TableHead>Order Price</TableHead>
                  <TableHead>
                    <span className="sr-only">Details</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow key={index}>
                    <TableCell>{order?.cartItem?.title || "N/A"}</TableCell>
                    <TableCell>{order?.orderDetails?.orderDate}</TableCell>
                    <TableCell>{order?.orderDetails?.orderStatus}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order?.orderDetails?.paymentStatus === "paid"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order?.orderDetails?.paymentStatus || "Pending"}
                      </span>
                    </TableCell>
                    <TableCell>
                      ₹{order?.orderDetails?.totalAmount?.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button
                        className="bg-[#682c0d] hover:bg-[#682b0dd6]"
                        onClick={() => handleViewDetails(order)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No orders found. Start shopping to create your first order!
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <ShoppingOrderDetails orderData={selectedOrder} />
      </Dialog>
    </div>
  );
}

export default ShoppingOrderView;
