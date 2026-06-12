import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fetchProductsAPI,
  addProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productService";

export const fetchProducts =
  createAsyncThunk(
    "products/fetchProducts",
    async () => {
      return await fetchProductsAPI();
    }
  );

export const addProduct =
  createAsyncThunk(
    "products/addProduct",
    async (product) => {

      await addProductAPI(product);

      return {
        ...product,
        id: Date.now(),
      };
    }
  );

export const updateProduct =
  createAsyncThunk(
    "products/updateProduct",
    async (product) => {

      await updateProductAPI(product);

      return product;
    }
  );

export const deleteProduct =
  createAsyncThunk(
    "products/deleteProduct",
    async (id) => {

      await deleteProductAPI(id);

      return id;
    }
  );

const productSlice = createSlice({
  name: "products",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        fetchProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )

      .addCase(
        addProduct.fulfilled,
        (state, action) => {

          state.products.push(
            action.payload
          );
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {

          const index =
            state.products.findIndex(
              (product) =>
                product.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.products[index] =
              action.payload;
          }
        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {

          state.products =
            state.products.filter(
              (product) =>
                product.id !==
                action.payload
            );
        }
      );
  },
});

export default productSlice.reducer;