import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartContainer from "./cart-items-container";
import { ShoppingBasket, ArrowRight, Zap } from "lucide-react";

function UserCartItemWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();
  
  const totalCost = cartItems.reduce(
    (acc, cartItem) =>
      acc +
      (cartItem.salePrice > 0
        ? cartItem.salePrice * cartItem.quantity
        : cartItem.price * cartItem.quantity),
    0
  );

  return (
    <SheetContent className="bg-background border-white/5 sm:max-w-md p-0 overflow-hidden flex flex-col">
      {/* Header Area */}
      <div className="p-6 glass border-b border-white/5">
        <SheetHeader>
          <SheetTitle>
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                 <div className="flex items-center gap-2 text-primary">
                    <ShoppingBasket size={20} />
                    <span className="text-xs font-black uppercase tracking-[0.2em]">Secure Vault</span>
                 </div>
                 <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Your Cart</h2>
              </div>
              <div className="bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                 <span className="text-[10px] font-bold text-white/60 uppercase">
                    {cartItems.length} {cartItems.length === 1 ? 'Artifact' : 'Artifacts'}
                 </span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>
      </div>

      {/* Items Scroll Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
        {cartItems && cartItems.length > 0 ? (
          cartItems.map((cartItem) => (
            <UserCartContainer key={cartItem.productId} cartItem={cartItem} />
          ))
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-20">
             <ShoppingBasket size={48} />
             <p className="text-xs font-bold uppercase tracking-widest">Your vault is currently empty</p>
          </div>
        )}
      </div>

      {/* Footer / Summary Area */}
      <div className="p-6 glass border-t border-white/5 space-y-6">
        <div className="space-y-3">
           <div className="flex justify-between items-center text-white/40 text-xs font-bold uppercase tracking-widest">
              <span>Subtotal Manifest</span>
              <span>₹{totalCost.toLocaleString()}</span>
           </div>
           <div className="flex justify-between items-center text-white/40 text-xs font-bold uppercase tracking-widest">
              <span>Logistics Tax</span>
              <span className="text-primary italic">Calculated at Checkout</span>
           </div>
           <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-black text-white uppercase tracking-tighter">Total</span>
              <span className="text-3xl font-black text-primary">₹{totalCost.toLocaleString()}</span>
           </div>
        </div>

        <Button
          onClick={() => {
            navigate("/shop/checkout");
            setOpenCartSheet(false);
          }}
          className="w-full bg-primary text-black font-black h-16 rounded-2xl text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 active:scale-95 shadow-[0_0_30px_rgba(204,255,0,0.1)]"
        >
          INHERIT & CHECKOUT <ArrowRight size={20} />
        </Button>
        
        <div className="flex items-center justify-center gap-2 opacity-20">
           <Zap size={12} className="text-primary fill-primary" />
           <span className="text-[10px] font-bold uppercase tracking-widest">Hyper-Secure Transaction</span>
        </div>
      </div>
    </SheetContent>
  );
}

export default UserCartItemWrapper;
