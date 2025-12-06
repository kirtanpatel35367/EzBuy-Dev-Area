const express = require("express");
const {
  addAddress,
  editAddress,
  deleteAddress,
  fetchAllAddress,
} = require("../../controllers/shop/address-controller");
const router = express.Router();

router.get("/fetchAddress/:userId", fetchAllAddress);
router.post("/addAddress", addAddress);
router.put("/updateAddress/:userId/:addressId", editAddress);
router.delete("/deleteAddress/:userId/:addressId", deleteAddress);

module.exports = router;
