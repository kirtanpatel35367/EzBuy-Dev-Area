const express = require("express");
const {
  UserRegister,
  UserLoginwithOTPVerification,
  Userlogout,
  authMiddleware,
  UserLogin,
  EnableDisable2FA,
} = require("../../controllers/auth/Auth-Controller");
const router = express.Router();

router.post("/register", UserRegister);
router.post("/login", UserLogin);
router.post("/verify-otp-login", UserLoginwithOTPVerification);
router.post("/logout", Userlogout);
router.post("/enable-disable-2fa", EnableDisable2FA);
router.get("/check-auth", authMiddleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authorised User",
    user,
  });
});

module.exports = router;
