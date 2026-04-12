import { Plus, Minus, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, updateItemQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartContainer({ cartItem }) {
  if (!cartItem) return null;
  
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { user } = useSelector((state) => state.auth);

  function handleProductDelete(productId) {
    dispatch(deleteItem({ userId: user.id, productId: productId })).then((data) => {
      if (data?.payload?.success) {
        toast({ title: "Item removed from cart" });
      }
    });
  }

  function handleUpdateQuantity(newQuantity) {
    if (newQuantity < 1) return;
    dispatch(
      updateItemQuantity({
        userId: user.id,
        productId: cartItem.productId,
        quantity: newQuantity,
      })
    );
  }

  const price = cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price;

  return (
    <div className="glass rounded-2xl p-4 flex items-center gap-4 group transition-all duration-300 hover:bg-white/[0.08]">
      {/* Product Image */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-white/5 border border-white/10 shrink-0">
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-110"
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-sm font-bold text-white truncate pr-4">{cartItem.title}</h3>
          <button 
            onClick={() => handleProductDelete(cartItem.productId)}
            className="text-white/20 hover:text-red-500 transition-colors"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <span className="text-primary font-black text-lg">₹{(price * cartItem.quantity).toLocaleString()}</span>
            <span className="text-[10px] text-white/30 uppercase font-bold tracking-tight">
              ₹{price.toLocaleString()} / Unit
            </span>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 bg-black/40 border border-white/10 rounded-xl p-1">
            <button 
              onClick={() => handleUpdateQuantity(cartItem.quantity - 1)}
              disabled={cartItem.quantity <= 1}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-white disabled:opacity-20"
            >
              <Minus size={14} />
            </button>
            <span className="text-sm font-black text-white w-4 text-center">{cartItem.quantity}</span>
            <button 
              onClick={() => handleUpdateQuantity(cartItem.quantity + 1)}
              disabled={cartItem.quantity >= 10}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/10 text-primary disabled:opacity-20"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCartContainer;
