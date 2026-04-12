import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Address from './Address';
import UserCartContainer from '@/components/shopping-view/cart-items-container';
import { loadStripe } from '@stripe/stripe-js';
import { createOrder } from '@/store/shop/order-slice';
import { 
  CreditCard, 
  ShoppingCart, 
  ArrowRight, 
  ShieldCheck, 
  Truck,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const CheckOut = () => {
  const date = new Date();
  const [currentSelectedAdddress, setCurrentSelectedAddress] = useState(null);
  const { user } = useSelector(state => state.auth);
  const { cartItems } = useSelector(state => state.shoppingcart);
  const dispatch = useDispatch();

  const totalCost = cartItems.items && cartItems.items.length > 0 
    ? cartItems.items.reduce((acc, cartItem) => acc + (cartItem.salePrice > 0 ? cartItem.salePrice * cartItem.quantity : cartItem.price * cartItem.quantity), 0) 
    : 0;

  async function handlePayment() {
    if (!currentSelectedAdddress) return;
    
    // Using the Stripe public key from your previous code
    const stripe = await loadStripe("pk_test_51QwkBAGYJlXEbupCrBr1Qh41iOpS6RystPM4N6ivAQ30RwQGv96BEEviRY1VjeIUQBLavjwT72HGbA10yCuxmgRQ00e1dWm1yi");

    const orderDetails = {
      userId: user.id,
      cartItems: cartItems.items.map((cartItem) => ({
        productId: cartItem?.productId,
        title: cartItem?.title,
        image: cartItem?.image,
        price: cartItem?.price,
        salePrice: cartItem?.salePrice,
        quantity: cartItem?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAdddress?._id,
        address: currentSelectedAdddress?.address,
        city: currentSelectedAdddress?.city,
        pincode: currentSelectedAdddress?.pincode,
        phone: currentSelectedAdddress?.phone,
        notes: currentSelectedAdddress?.notes
      },
      orderStatus: "pending",
      paymentMethod: "stripe",
      paymentStatus: "pending",
      totalAmount: totalCost,
      orderDate: date.toLocaleDateString('en-GB').replace(/\//g, '-'),
      orderUpdateDate: date.toLocaleDateString('en-GB').replace(/\//g, '-'),
    };

    dispatch(createOrder(orderDetails)).then((data) => {
      if (data?.payload?.success) {
        stripe.redirectToCheckout({
          sessionId: data.payload.id
        }).then((result) => {
          if (result.error) console.log(result.error);
        });
      }
    });
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* HEADER */}
        <div className="mb-12">
           <div className="flex items-center gap-3 text-white/40 text-[10px] font-bold uppercase tracking-widest mb-2 font-HeadFont">
              <ShoppingCart size={12} />
              <span>Checkout Protocol</span>
              <ArrowRight size={10} />
              <span className="text-primary">Securing Destination</span>
           </div>
           <h1 className="text-5xl font-black text-white uppercase tracking-tighter font-HeadFont">
             Finalize <span className="text-white/20">Transaction</span>
           </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT: SHIPPING & IDENTITY (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
             <Address 
               setCurrentSelectedAddress={setCurrentSelectedAddress} 
               currentSelectedAdddress={currentSelectedAdddress} 
             />
             
             {/* Security Signals */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <ShieldCheck size={20} />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">Encrypted Checkout</h4>
                      <p className="text-[10px] text-white/40 mt-1">Your data is processed through 256-bit AES encryption before transmission.</p>
                   </div>
                </div>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex gap-4">
                   <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Truck size={20} />
                   </div>
                   <div>
                      <h4 className="text-sm font-bold text-white uppercase tracking-tight">Express Logistics</h4>
                      <p className="text-[10px] text-white/40 mt-1">Free priority shipping included with this premium acquisition.</p>
                   </div>
                </div>
             </div>
          </div>

          {/* RIGHT: ORDER MANIFEST (4 Columns) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
             <div className="glass rounded-[2rem] overflow-hidden">
                <div className="p-6 bg-white/5 border-b border-white/5">
                   <h2 className="text-lg font-black text-white uppercase tracking-widest flex items-center gap-2">
                     <CreditCard size={18} className="text-primary" />
                     Order Manifest
                   </h2>
                </div>
                
                <div className="p-6 space-y-6">
                   {/* Cart Items List */}
                   <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                      {cartItems?.items?.length > 0 ? (
                        cartItems.items.map((item) => (
                           <UserCartContainer key={item.productId} cartItem={item} />
                        ))
                      ) : (
                        <div className="py-10 text-center">
                           <p className="text-white/20 text-xs font-bold uppercase">Manifest Empty</p>
                        </div>
                      )}
                   </div>

                   <Separator className="bg-white/5" />

                   {/* Pricing Summary */}
                   <div className="space-y-3">
                      <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                         <span>Subtotal</span>
                         <span>₹{totalCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-widest">
                         <span>Logistics</span>
                         <span className="text-primary">FREE</span>
                      </div>
                      <div className="pt-4 flex justify-between items-center">
                         <span className="text-xl font-black text-white uppercase tracking-tighter font-HeadFont">Total</span>
                         <span className="text-3xl font-black text-primary font-HeadFont">₹{totalCost.toLocaleString()}</span>
                      </div>
                   </div>

                   {/* Payment Button */}
                   <div className="space-y-4 pt-4">
                      <Button 
                        onClick={handlePayment} 
                        disabled={!currentSelectedAdddress || cartItems?.items?.length === 0}
                        className="w-full bg-primary text-black font-black h-16 rounded-2xl text-lg hover:scale-[1.02] transition-all shadow-[0_0_30px_rgba(204,255,0,0.1)] active:scale-95 disabled:grayscale"
                      >
                        CHECKOUT WITH STRIPE
                      </Button>
                      
                      {!currentSelectedAdddress && cartItems?.items?.length > 0 && (
                        <div className="flex items-center gap-2 text-red-500 bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                           <AlertCircle size={14} className="shrink-0" />
                           <p className="text-[10px] font-bold uppercase leading-tight">Please select a shipping destination to continue.</p>
                        </div>
                      )}
                   </div>
                </div>
                
                <div className="p-4 bg-black/40 text-center">
                   <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Secure Payment Powered by Stripe</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
