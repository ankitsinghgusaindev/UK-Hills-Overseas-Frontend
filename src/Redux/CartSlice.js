
import { createSlice } from "@reduxjs/toolkit";

const localCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Failed to load cart", error);
    return [];
  }
};

const initialState = {
  cartItems: localCartFromStorage(),
  coupon: "",
};



const cartSlice = createSlice({
  name: "cart",
  initialState,

  reducers: {

    addToCart: (state, action) => {
      const { productId, variantId } = action.payload
      const item = state.cartItems.find(
        (cartItem) =>
          cartItem.productId === productId &&
          cartItem.variantId === variantId
      );

      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    removeFromCart: (state, action) => {
     const { productId, variantId } = action.payload

      state.cartItems = state.cartItems.filter(
        (item) =>
          !(
            item.productId === productId &&
            item.variantId === variantId
          )
      );

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    increaseQty: (state, action) => {
      const { productId, variantId } = action.payload

      const item = state.cartItems.find(
        (cartItem) =>
          cartItem.productId === productId &&
          cartItem.variantId === variantId
      );

      if (item) {
        item.quantity += 1;
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    decreaseQty: (state, action) => {
     const { productId, variantId } = action.payload

      const itemIndex = state.cartItems.findIndex(
        (cartItem) =>
          cartItem.productId === productId &&
          cartItem.variantId === variantId
      );

      if (itemIndex !== -1) {
        const item = state.cartItems[itemIndex];

        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },

    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },

    clearCart: (state) => {
      state.cartItems = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  applyCoupon,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;