import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { products as localProducts } from "./ProductData";
import { adaptBackendProduct } from "../utils/productAdapter";
import { apiRequest } from "../services/apiClient";

// Fetch products from the backend

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const result = await apiRequest("/products?limit=50");

      return result.data.map(adaptBackendProduct);
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