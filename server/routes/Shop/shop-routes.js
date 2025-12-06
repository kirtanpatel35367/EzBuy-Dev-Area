const express = require("express");
const {
  getFilteredProducts,
  getProductDetails,
} = require("../../controllers/shop/product-controller");
const router = express.Router();

router.get("/getproducts", getFilteredProducts);
router.get("/productdetails/:id", getProductDetails);

module.exports = router;
