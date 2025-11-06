import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../../api/authApi";
import { toast } from "react-toastify";

/**
 * 🔹 Login user
 */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.login(payload);
      const { user, accessToken, refreshToken } = data.data;

      // Store tokens and user
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("user", JSON.stringify(user));

      toast.success(`Welcome, ${user.name || "User"}!`);
      return { user, accessToken, refreshToken };
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/**
 * 🔹 Register new user
 */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await api.register(payload);
      toast.success("Registered successfully! You can now log in.");
      return data.data;
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/**
 * 🔹 Logout user (revokes refresh token)
 */
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");

      // Call backend API to revoke refresh token
      if (refreshToken) {
        await api.logoutUser(refreshToken);
      }

      // Clear storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      toast.info("Logged out successfully.");
      return true;
    } catch (err) {
      console.error("Logout error:", err);
      const msg = err?.response?.data?.message || "Logout failed";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

/**
 * 🔹 Slice definition
 */
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    accessToken: localStorage.getItem("accessToken") || null,
    refreshToken: localStorage.getItem("refreshToken") || null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
