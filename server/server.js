require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require("./routes/Auth-Route/Auth-Route");
const AdminProductRouter = require("./routes/admin/AdminProductRoute");
const AdminReviewRouter = require("./routes/admin/admin-review-routes");
const ShopProductRouter = require("./routes/Shop/shop-routes");
const CartRouter = require("./routes/Shop/cart-routes");
const AddressRouter = require("./routes/Shop/address-routes");
const OrderRouter = require("./routes/Shop/order-routes");
const ReviewRouter = require("./routes/Shop/review-routes");
const UserRouter = require("./routes/User/User-Routes");
const app = express();

//CORS
const allowedOrigins =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_ORIGIN
    : process.env.LOCAL_ORIGIN;

const corsOptions = {
  origin: function (origin, callback) {
    if (origin === allowedOrigins) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

//Middlereware FUnctions for Cookie Parsing and JSON Data ParSing
app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Hello");
});

//MongoDb Connection
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => console.log("MongoDb Connected Succesfully"))
  .catch((error) => console.log(`Error While Connecting to MongoDb`, error));

//Auth Middleware
app.use("/api/auth", AuthRouter);
app.use("/api/admin/products", AdminProductRouter);
app.use("/api/admin/reviews", AdminReviewRouter);
app.use("/api/shop/products", ShopProductRouter);
app.use("/api/shop/cart", CartRouter);
app.use("/api/shop/address", AddressRouter);
app.use("/api/shop/order", OrderRouter);
app.use("/api/shop/reviews", ReviewRouter);
app.use("/api/user", UserRouter);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`server is Running on ${PORT}`);
});
