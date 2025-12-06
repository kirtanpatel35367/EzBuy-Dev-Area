const express = require("express");
const {
  addToCart,
  fetchCartItems,
  updateCartItemQuantity,
  deleteCartItem,
} = require("../../controllers/shop/cart-controller");
const router = express.Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCartItems);
router.put("/updateCart", updateCartItemQuantity);
router.delete("/deleteCart/:userId/:productId", deleteCartItem);

module.exports = router;
