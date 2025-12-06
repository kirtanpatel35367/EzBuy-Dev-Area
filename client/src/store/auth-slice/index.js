import axiosClient from "@/api/api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { Cookies } from "react-cookie";

const initialState = {
  isAuthanticated: false,
  isLoading: true,
  user: null,
  is2FAEnabled: false,
  notifications: {
    is2FAEnabled: false,
    emailNotifications2FA: false,
    smsNotifications2FA: false,
  },
  notificationsLoading: false,
};

//Verify OTP Login
export const VerifyOtpLogin = createAsyncThunk(
  "/auth/verify-otp-login",
  async (formData) => {
    const response = await axiosClient.post("auth/verify-otp-login", formData);
    return response.data;
  }
);

//CreateThunk For sending Data to API from Register Form
export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData) => {
    try {
      const response = await axiosClient.post("auth/register", formData);
      //Message Return from APi Like success and messagef
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

//CheckAuth Middleware
export const checkAuth = createAsyncThunk(
  "/auth/check-auth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/auth/check-auth");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Network error" }
      );
    }
  }
);

//LogOut User
export const UserLogout = createAsyncThunk("/auth/logout", async () => {
  const response = await axiosClient.post("auth/logout", {});

  return response.data;
});

//Login User
export const loginUser = createAsyncThunk("/auth/login", async (formData) => {
  try {
    const response = await axiosClient.post("auth/login", formData);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
});

//Enable Disable 2FA
export const EnableDisable2FA = createAsyncThunk(
  "/auth/enable-disable-2fa",
  async ({ email, enable2FA }) => {
    const response = await axiosClient.post("auth/enable-disable-2fa", {
      email,
      enable2FA,
    });
    return response.data;
  }
);

//Get User Notifications
export const GetUserNotifications = createAsyncThunk(
  "/user/get-user-notifications",
  async ({ userId }) => {
    const response = await axiosClient.get(
      `user/get-user-notifications/${userId}`
    );
    return response.data;
  }
);

//Auth Slicce
const authSlice = createSlice({
  name: "auth",
  initialState,

  //set User
  reducers: {
    setUser: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(registerUser.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // If 2FA is enabled, don't set user as authenticated yet - wait for OTP verification
        if (action.payload.success && !action.payload.is2FAEnabled) {
          state.user = action.payload.user || null;
          state.isAuthanticated = true;
        } else if (action.payload.success && action.payload.is2FAEnabled) {
          // 2FA is enabled - store the flag but don't authenticate yet
          state.is2FAEnabled = true;
          state.user = null;
          state.isAuthanticated = false;
        } else {
          state.user = null;
          state.isAuthanticated = false;
        }
      })
      .addCase(loginUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthanticated = false;
        state.is2FAEnabled = false;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = action.payload.success ? action.payload.user : null); //Data which API Response mean what createthunk is Respond Just Only Payload
        state.isAuthanticated = action.payload.success ? true : false;
      })
      .addCase(checkAuth.rejected, (state) => {
        (state.isLoading = false), (state.user = null);
        state.isAuthanticated = false;
      })
      .addCase(UserLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(UserLogout.fulfilled, (state, action) => {
        (state.isLoading = false),
          (state.user = null),
          (state.isAuthanticated = false);
      })
      .addCase(UserLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(VerifyOtpLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(VerifyOtpLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.success) {
          state.user = action.payload.user || null;
          state.isAuthanticated = true;
          state.is2FAEnabled = false; // Reset after successful OTP verification
        } else {
          state.isAuthanticated = false;
        }
      })
      .addCase(VerifyOtpLogin.rejected, (state) => {
        state.isLoading = false;
        state.isAuthanticated = false;
        state.is2FAEnabled = false;
      })
      .addCase(EnableDisable2FA.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(EnableDisable2FA.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.is2FAEnabled = action.payload.is2FAEnabled;
        // Update notifications state to keep it in sync
        if (state.notifications) {
          state.notifications.is2FAEnabled = action.payload.is2FAEnabled;
        }
      })
      .addCase(EnableDisable2FA.rejected, (state) => {
        state.notificationsLoading = false;
      })
      .addCase(GetUserNotifications.pending, (state) => {
        state.notificationsLoading = true;
      })
      .addCase(GetUserNotifications.fulfilled, (state, action) => {
        state.notificationsLoading = false;
        state.notifications = action.payload.notifications;
      })
      .addCase(GetUserNotifications.rejected, (state) => {
        state.notificationsLoading = false;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
