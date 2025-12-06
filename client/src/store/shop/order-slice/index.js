import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/api/api";

const initialState = {
  OrderDetails: null,
  orders: [],
  isLoading: false,
};

export const createOrder = createAsyncThunk(
  "order/createorder",
  async (OrderDetails) => {
    const response = await axiosClient.post(
      "shop/order/create-checkout-session",
      OrderDetails,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data;
  }
);

export const fetchOrders = createAsyncThunk(
  "order/fetchOrders",
  async (userId) => {
    try {
      const response = await axiosClient.get(`shop/order/order-list/${userId}`);

      return response?.data;
    } catch (error) {
      console.log(error);
      return error?.response?.data;
    }
  }
);

const OrderDetailSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.OrderDetails = action.payload?.data;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.OrderDetails = [];
      })
      .addCase(fetchOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload?.data;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.orders = [];
      });
  },
});

export default OrderDetailSlice.reducer;
