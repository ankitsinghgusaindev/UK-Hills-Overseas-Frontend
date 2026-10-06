import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  loginUser as loginUserApi,
  getCurrentUser,
  logoutUser as logoutUserApi,
} from "../services/authService";

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      return await loginUserApi(credentials);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// INITIALIZE ADMIN SESSION
export const initializeAdminAuth = createAsyncThunk(
  "auth/initializeAdminAuth",
  async (_, { rejectWithValue }) => {
    try {
      const user = await getCurrentUser("admin");

      if (user.role !== "ADMIN") {
        throw new Error("Invalid admin session");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// INITIALIZE CUSTOMER SESSION
export const initializeCustomerAuth = createAsyncThunk(
  "auth/initializeCustomerAuth",
  async (_, { rejectWithValue }) => {
    try {
       const user = await getCurrentUser("customer");

      if (user.role !== "CUSTOMER") {
        throw new Error("Invalid customer session");
      }

      return user;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// LOGOUT ADMIN
export const logoutAdmin = createAsyncThunk(
  "auth/logoutAdmin",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi("admin");
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// LOGOUT CUSTOMER
export const logoutCustomer = createAsyncThunk(
  "auth/logoutCustomer",
  async (_, { rejectWithValue }) => {
    try {
      await logoutUserApi("customer");
      return true;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const createAuthState = () => ({
  user: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,
});

const initialState = {
  admin: createAuthState(),
  customer: createAuthState(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthError: (state, action) => {
      const context = action.payload;
      if (state[context]) {
        state[context].error = null;
      }
    },
  },

  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.admin.loading = true;
        state.customer.loading = true;
        state.admin.error = null;
        state.customer.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const context =
          action.payload.role === "ADMIN" ? "admin" : "customer";

        state.admin.loading = false;
        state.customer.loading = false;

        state[context].user = action.payload;
        state[context].isAuthenticated = true;
        state[context].loading = false;
        state[context].initialized = true;
        state[context].error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.admin.loading = false;
        state.customer.loading = false;
        state.admin.error = action.payload || "Login failed";
        state.customer.error = action.payload || "Login failed";
      });

    // INITIALIZE SESSIONS
    [
      ["admin", initializeAdminAuth],
      ["customer", initializeCustomerAuth],
    ].forEach(([context, thunk]) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[context].loading = true;
        })
        .addCase(thunk.fulfilled, (state, action) => {
          state[context].user = action.payload;
          state[context].isAuthenticated = true;
          state[context].loading = false;
          state[context].initialized = true;
          state[context].error = null;
        })
        .addCase(thunk.rejected, (state) => {
          state[context].user = null;
          state[context].isAuthenticated = false;
          state[context].loading = false;
          state[context].initialized = true;
          state[context].error = null;
        });
    });

    // LOGOUT
    [
      ["admin", logoutAdmin],
      ["customer", logoutCustomer],
    ].forEach(([context, thunk]) => {
      builder
        .addCase(thunk.pending, (state) => {
          state[context].loading = true;
          state[context].error = null;
        })
        .addCase(thunk.fulfilled, (state) => {
          state[context].user = null;
          state[context].isAuthenticated = false;
          state[context].loading = false;
          state[context].initialized = true;
          state[context].error = null;
        })
        .addCase(thunk.rejected, (state, action) => {
          state[context].loading = false;
          state[context].error = action.payload || "Logout failed";
        });
    });
  },
});

export const { clearAuthError } = authSlice.actions;

export default authSlice.reducer;