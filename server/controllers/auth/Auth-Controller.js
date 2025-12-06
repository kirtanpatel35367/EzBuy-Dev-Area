const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const User = require("../../models/User");
const sendOTPEmail = require("../../helpers/sendotp");
require("dotenv").config();

//Register For New User
const UserRegister = async (req, res) => {
  const SignUpSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(/^[a-zA-Z0-9@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/)
      .required(),
  });

  const { error, value } = SignUpSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { username, email, password } = value;

  try {
    const checkUser = await User.findOne({ email });
    if (checkUser)
      return res.json({
        success: false,
        message: "Email Already Exits Try with Alternate Email",
      });

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashPassword,
      originalPassword: password,
    });

    await newUser.save();

    res.status(200).json({
      success: true,
      message: "User Register Succesfully",
    });
  } catch (error) {
    console.log("Error while Create New User", error);
    res.status(500).json({
      success: false,
      message: "New User Registration Failed",
    });
  }
};

//Login

const UserLogin = async (req, res) => {
  const LoginSchema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(/^[a-zA-Z0-9@#$%^&*!()_+\-=\[\]{};':"\\|,.<>\/?]{6,30}$/)
      )
      .required(),
  });

  const { error, value } = LoginSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  const { email, password } = value;

  try {
    const checkUser = await User.findOne({ email });
    if (!checkUser)
      return res.json({
        success: false,
        message: "User With This Email is Not Exits, Create New Account first!",
      });

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword)
      return res.json({
        success: false,
        message: "Enter Valid Password",
        data: checkPassword,
      });

    //Here if 2FA is Enabled then Send OTP to Email and Verify OTP to Login else Login Directly
    if (checkUser.is2FAEnabled) {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      checkUser.otp = otp;
      checkUser.otpExpiry = Date.now() + 5 * 60 * 1000; // valid for 5 mins
      await checkUser.save();

      // ✅ Send OTP via email (Nodemailer)
      await sendOTPEmail(checkUser.email, otp);

      return res.json({
        is2FAEnabled: checkUser.is2FAEnabled,
        success: true,
        message: "OTP sent to your email. Please verify.",
      });
    } else {
      const token = jwt.sign(
        {
          id: checkUser._id,
          role: checkUser.role,
          email: checkUser.email,
          username: checkUser.username,
        },
        process.env.CLIENT_SECRET_KEY, // use env variable
        { expiresIn: "60m" }
      );

      res
        .cookie("jwtToken", token, {
          httpOnly: true,
          secure: false, // set true in production with HTTPS
          sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        })
        .json({
          success: true,
          message: "User Logged In SuccesFully",
          user: {
            email: checkUser.email,
            role: checkUser.role,
            id: checkUser._id,
            username: checkUser.username,
          },
        });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//Auth Middleware

const authMiddleware = (req, res, next) => {
  const token = req.cookies.jwtToken;

  if (!token)
    return res.status(401).json({
      success: false,
      message: "UnAuthorised User",
    });

  try {
    const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "UnAuthorised User",
    });
  }
};

const UserLoginwithOTPVerification = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    // ✅ Check OTP validity
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    // ✅ Clear OTP fields after successful verification
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    // ✅ Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        email: user.email,
        username: user.username,
      },
      process.env.CLIENT_SECRET_KEY, // use env variable
      { expiresIn: "60m" }
    );

    res
      .cookie("jwtToken", token, {
        httpOnly: true,
        secure: false, // set true in production with HTTPS
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      })
      .json({
        success: true,
        message: "OTP verified, user logged in successfully",
        user: {
          email: user.email,
          role: user.role,
          id: user._id,
          username: user.username,
        },
      });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

//LogOut

const Userlogout = (req, res) => {
  res.clearCookie("jwtToken").json({
    success: true,
    message: "User Logged Out Sucessfully",
  });
};

//2FA Authentication
const EnableDisable2FA = async (req, res) => {
  const { email, enable2FA } = req.body; // 👈 frontend sends true/false

  if (typeof enable2FA !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "Invalid value for enable2FA",
    });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ success: false, message: "User not found" });
  }

  user.is2FAEnabled = enable2FA; // 👈 directly set
  await user.save();

  res.status(200).json({
    success: true,
    is2FAEnabled: user.is2FAEnabled,
    message: `2FA ${enable2FA ? "enabled" : "disabled"} successfully`,
  });
};

//Auth Middleware

module.exports = {
  UserRegister,
  UserLoginwithOTPVerification,
  Userlogout,
  authMiddleware,
  UserLogin,
  EnableDisable2FA,
};
