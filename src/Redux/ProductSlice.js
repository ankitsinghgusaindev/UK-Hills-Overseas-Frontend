import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products as localProducts } from "./ProductData";
import { adaptBackendProduct } from "../utils/productAdapter";

// Fetch products from the backend
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/products?limit=50"
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch products (${response.status})`);
      }

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Failed to fetch products");
      }

      return result.data.map(adaptBackendProduct)
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: localProducts,
  searchTerm: "",
  selectedCategory: "All",
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,

  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },

    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSearchTerm, setCategory } = productSlice.actions;

export default productSlice.reducer;