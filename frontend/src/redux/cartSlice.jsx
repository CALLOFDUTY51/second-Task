import { createSlice } from "@reduxjs/toolkit";

const Slice = createSlice({
  name: "mySlice",
  initialState: {
    cart: [],
  },
  reducers: {
    // Add a product to the cart
    addCart: (state, action) => {
      const existingProduct = state.cart.find((item) => item.id === action.payload.id);

      if (!existingProduct) {
        state.cart.push({ ...action.payload, quantity: 1 }); // Add quantity by default
      } else {
        // Optionally handle duplicate adds in UI
        console.warn("Product already in cart");
      }
      
    },

    // Delete a product from the cart
    deleteCart: (state, action) => {
      state.cart = state.cart.filter((item) => item.id !== action.payload);
    },

    // Increment product quantity
    incrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);

      if (product) {
        product.quantity += 1;
      }
    },

    // Decrement product quantity
    decrementQuantity: (state, action) => {
      const product = state.cart.find((item) => item.id === action.payload);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      } else if (product && product.quantity === 1) {
        state.cart = state.cart.filter((item) => item.id !== action.payload); // Remove from cart if quantity is 0
      }
    },
  },
});

export default Slice.reducer;

export const { addCart, deleteCart, incrementQuantity, decrementQuantity } = Slice.actions;
