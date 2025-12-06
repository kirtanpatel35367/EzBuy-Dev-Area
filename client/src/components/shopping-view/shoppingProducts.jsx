import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter } from "../ui/card";
import { BrandOptionMap, CategoryOptionMap } from "@/config";

function FetchShoppingProducts({
  product,
  handleGetProductDetails,
  handleAddtoCart,
}) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden cursor-pointer transition-transform  duration-300">
      <div
        onClick={() => handleGetProductDetails(product?._id)}
        className="relative group"
      >
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-[300px] object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
        />
        {product?.salePrice > 0 && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs font-semibold">
            Sale
          </Badge>
        )}
      </div>
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-2 truncate">
          {product?.title}
        </h2>

        <div className="flex justify-between items-center text-gray-600 text-sm mb-2">
          <span>{CategoryOptionMap[product?.category]}</span>
          <span>{BrandOptionMap[product?.brand]}</span>
        </div>

        <div className="flex justify-between items-center">
          <span
            className={`text-lg font-bold ${
              product.salePrice > 0
                ? "text-gray-500 line-through"
                : "text-black"
            }`}
          >
            ₹{product?.price}
          </span>
          {product?.salePrice > 0 && (
            <span className="text-lg font-bold "> ₹{product?.salePrice}</span>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t">
        <Button
          onClick={() => handleAddtoCart(product?._id)}
          className="w-full bg-[#682b0dcb] hover:bg-[#682b0dcb]/50] text-white font-semibold py-2 rounded-md"
        >
          Add To Cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export default FetchShoppingProducts;
