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
import { Package, Calendar, Clock, ChevronRight, Hash, CreditCard } from "lucide-react";

const UserOrdersList = () => {
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { orders, isLoading } = useSelector((state) => state.orderDetails);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchOrders(user.id));
    }
  }, [user?.id, dispatch]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Decrypting Manifests...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Package className="text-primary" size={24} />
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Acquisition Manifests</h2>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
           <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{orders?.length} TOTAL RECORDS</span>
        </div>
      </div>

      <div className="grid gap-6">
        {orders && orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order._id} className="glass border-white/5 hover:border-primary/20 transition-all duration-500 group overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col lg:flex-row">
                  {/* Status & ID Column */}
                  <div className="lg:w-64 bg-white/5 p-6 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                    <div className="space-y-4">
                       <div className="flex items-center gap-2">
                          <Hash size={14} className="text-primary" />
                          <span className="text-xs font-black text-white/60 tracking-tighter uppercase">{order?._id?.slice(-12)}</span>
                       </div>
                       <Badge 
                        className={`font-black text-[10px] uppercase px-3 py-1 rounded-sm border-none shadow-[0_0_15px_rgba(204,255,0,0.1)] ${
                          order?.orderStatus === "Delivered" || order?.orderStatus === "confirmed" 
                          ? "bg-primary text-black" 
                          : "bg-white/10 text-white/40"
                        }`}
                       >
                         {order?.orderStatus}
                       </Badge>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-white/20">
                       <Calendar size={14} />
                       <span className="text-[10px] font-bold uppercase">{order?.orderDate}</span>
                    </div>
                  </div>

                  {/* Product Info Column */}
                  <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-black/40 border border-white/5 shrink-0">
                          <img src={order?.cartItems?.[0]?.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Manifest" />
                       </div>
                       <div className="space-y-1">
                          <h3 className="text-lg font-black text-white leading-tight uppercase group-hover:text-primary transition-colors">
                            {order?.cartItems?.[0]?.title || "Bundle Acquisition"}
                          </h3>
                          <div className="flex items-center gap-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                             <div className="flex items-center gap-1">
                               <Package size={12} />
                               <span>{order?.cartItems?.length} {order?.cartItems?.length === 1 ? 'Item' : 'Items'}</span>
                             </div>
                             <div className="flex items-center gap-1">
                               <CreditCard size={12} />
                               <span>{order?.paymentMethod}</span>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Settlement Value</p>
                        <p className="text-2xl font-black text-primary">₹{order?.totalAmount?.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" className="h-14 px-8 border-white/10 bg-white/5 text-white/60 hover:text-white rounded-2xl flex gap-2 font-bold group/btn">
                         DETAILS <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="py-24 border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4">
             <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/10">
                <Package size={32} />
             </div>
             <p className="text-xs font-black text-white/20 uppercase tracking-[0.2em]">No manifestations recorded in log</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrdersList;
