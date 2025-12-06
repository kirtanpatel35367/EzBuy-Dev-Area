import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { setProductDetails } from "@/store/product-slice";
import ReviewList from "./reviews/ReviewList";

function ProductDetailsDialog({
  open,
  setOpen,
  productDetails,
  handleAddtoCart,
}) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  function handleOpenCart() {
    setOpen(close);
    dispatch(setProductDetails());
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenCart}>
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12  max-w-[90vw] sm:max-w-[80vw] lg:max-w-[50vw] font-HeadFont ">
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={300}
            height={300}
            className="object-cover w-full"
          />
        </div>

        <DialogTitle className="text-2xl font-bold flex-col items-center justify-center">
          {productDetails?.title}
          <div className="grid gap-2">
            <p
              className={`${
                productDetails?.salePrice > 0 ? "line-through" : ""
              } text-lg font-medium`}
            >
              Price: ${productDetails?.price}
            </p>
            <p className="text-lg font-medium">
              Sale Price: ${productDetails?.salePrice}
            </p>
            <Button onClick={() => handleAddtoCart(productDetails?._id)}>
              Add To Cart
            </Button>
            <Separator />
            <div className="max-h-[400px] overflow-y-auto">
              <ReviewList
                productId={productDetails?._id}
                currentUser={user}
                showWriteReview={true}
                maxReviews={5}
              />
            </div>
          </div>
        </DialogTitle>

        <div className="flex items-center justify-center">
          {productDetails?.description}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProductDetailsDialog;
