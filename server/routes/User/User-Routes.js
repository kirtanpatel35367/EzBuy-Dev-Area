const express = require("express");
const {
  GetUserDetails,
  UpdateUserDetails,
  GetUserNotifications,
} = require("../../controllers/User/User-Controller");

const router = express.Router();

router.get("/get-user-details/:userId", GetUserDetails);
router.put("/update-user-details", UpdateUserDetails);
router.get("/get-user-notifications/:userId", GetUserNotifications);

module.exports = router;
