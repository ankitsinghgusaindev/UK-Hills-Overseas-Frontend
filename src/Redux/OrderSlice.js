import { createSlice } from "@reduxjs/toolkit";

const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];

const initialState = {
  orders: savedOrders,
};

const orderSlice = createSlice({
  name: "orders",

  initialState,

  reducers: {
    placeOrder(state, action) {
      const newOrder = {
        id: action.payload.id || "UKH" + Date.now(),

        items: action.payload.items,

        customer: action.payload.customer,

        total: action.payload.total,

        paymentMethod: action.payload.paymentMethod || "COD",

        paymentId: action.payload.paymentId || null,

        paymentStatus: action.payload.paymentStatus || "Pending",

        status: action.payload.status || "Confirmed",

        createdAt: action.payload.createdAt || new Date().toISOString(),
      };

      state.orders.unshift(newOrder);

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    updateOrderStatus(state, action) {
      const order = state.orders.find((item) => item.id === action.payload.id);

      if (order) {
        order.status = action.payload.status;

        localStorage.setItem("orders", JSON.stringify(state.orders));
      }
    },

    removeOrder(state, action) {
      state.orders = state.orders.filter((item) => item.id !== action.payload);

      localStorage.setItem("orders", JSON.stringify(state.orders));
    },

    clearOrders(state) {
      state.orders = [];

      localStorage.setItem("orders", JSON.stringify([]));
    },
  },
});

export const { placeOrder, updateOrderStatus, removeOrder, clearOrders } =
  orderSlice.actions;

export default orderSlice.reducer;
