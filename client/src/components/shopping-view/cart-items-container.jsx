import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleMinus } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { deleteItem, updateItemQuantity } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function UserCartContainer({ cartItem }) {
  if (!cartItem)
    return <p className="text-center text-gray-500">No item in cart</p>;
  const dispatch = useDispatch();
  const { toast } = useToast();

  //Getting User Details From Auth Reducer
  const { user } = useSelector((state) => state.auth);

  //Handle Product Delete
  function handleProductDelete(productId) {
    dispatch(
      deleteItem({
        userId: user.id,
        productId: productId,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message || "Product Deleted Succesfully",
          variant: "success",
        });
      }
    });
  }

  function handleProductAdd(productId) {
    dispatch(
      updateItemQuantity({
        userId: user.id,
        productId,
        quantity: cartItem.quantity + 1,
      })
    ).then((data) => {
      console.log(data);
    });
  }

  function handleProductDecrease(productId) {
    dispatch(
      updateItemQuantity({
        userId: user.id,
        productId,
        quantity: cartItem.quantity - 1,
      })
    );
  }

  return (
    <div>
      <div className="flex items-center gap-1 p-4 bg-white  rounded-lg border border-gray-200">
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="w-16 h-16 object-cover rounded-lg"
        />

        <h2 className="text-sm font-bold">{cartItem.title}</h2>
        <div className="flex justify-between items-center gap-1.5 flex-grow">
          <p className="text-gray-500">
            <span className="font-medium text-sm">
              ₹
              {cartItem.salePrice > 0
                ? cartItem.salePrice * cartItem.quantity
                : cartItem.price * cartItem.qua}
            </span>
          </p>
          <div className="flex items-center justify-center gap-1 ">
            {cartItem.quantity < 10 ? (
              <IoIosAddCircleOutline
                onClick={() => handleProductAdd(cartItem.productId)}
                className="cursor-pointer text-lg"
              />
            ) : (
              <IoIosAddCircleOutline />
            )}

            <p className="text-gray-500">
              <span className="font-medium text-sm">{cartItem.quantity}</span>
            </p>
            {cartItem.quantity >= 1 ? (
              <CiCircleMinus
                onClick={() => handleProductDecrease(cartItem.productId)}
                className="cursor-pointer text-lg"
              />
            ) : (
              <CiCircleMinus />
            )}
          </div>

          <MdDeleteOutline
            onClick={() => handleProductDelete(cartItem.productId)}
            className="text-md cursor-pointer"
          />
          {/* <p className="text-gray-700 font-bold text-sm">Total: ₹{totalCost}</p> */}
        </div>
      </div>
    </div>
  );
}

export default UserCartContainer;
