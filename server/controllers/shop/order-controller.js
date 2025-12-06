require("dotenv").config();
const Joi = require("joi");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const Order = require("../../models/Order");

const createOrder = async (req, res) => {
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
    } = req.body;

    if (
      !userId ||
      !cartItems ||
      !addressInfo ||
      !totalAmount ||
      !orderDate ||
      !orderStatus ||
      !paymentMethod ||
      !orderUpdateDate
    ) {
      return res.status(400).json({
        success: false,
        message: "Data is Not provided",
      });
    }

    const lineItems =
      cartItems && cartItems.length > 0
        ? cartItems.map((product) => ({
            price_data: {
              currency: "inr",
              product_data: {
                name: product.title,
              },
              unit_amount: product.salePrice * 100,
            },
            quantity: product.quantity,
          }))
        : "";

    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      totalAmount,
      orderStatus,
      paymentMethod,
      paymentStatus,
      orderDate,
      orderUpdateDate,
    });

    await newOrder.save();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      metadata: {
        orderId: newOrder._id.toString(),
      },
      success_url: "http://localhost:5173/shop/success",
      cancel_url: "http://localhost:5173/shop/cancel",
    });

    return res.status(200).json({
      success: true,
      message: "Order Created Succesfully",
      data: newOrder,
      id: session.id,
      url: session.url,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error While Create Order",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    console.log("Order Captured");
    return res.status(200).json({
      success: true,
      message: "Payment Completed",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error While Payment ",
    });
  }
};

const OrderList = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await Order.find({ userId });

    // Transform into flattened structure
    const formattedOrders = orders.flatMap((order) =>
      order.cartItems.map((item) => ({
        cartItem: item,
        orderDetails: {
          orderStatus: order.orderStatus,
          paymentMethod: order.paymentMethod,
          paymentStatus: order.paymentStatus,
          totalAmount: order.totalAmount,
          orderDate: order.orderDate,
          orderUpdateDate: order.orderUpdateDate,
        },
      }))
    );

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: formattedOrders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { createOrder, capturePayment, OrderList };
