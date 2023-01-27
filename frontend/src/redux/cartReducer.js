import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shipingaddress: {
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  },
  paymentMethod: '',
  products: [],
  users: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    removeItem: (state, action) => {
      console.log(state, action);
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    decrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);

      if (item && item.quantity > 1) {
        item.quantity = item.quantity - 1;
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.products.find((item) => item._id === action.payload);

      if (item && item.quantity < item.countInStock) {
        item.quantity = item.quantity + 1;
      }
    },
    resetCart: (state) => {
      state.products = [];
    },

    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    removeUser: (state) => {
      state.users = [];
      state.shipingaddress = [];
      state.paymentMethod = '';
    },
    saveShippingAddress: (state, action) => {
      state.shipingaddress = {
        ...state.shipingaddress,
        fullName: action.payload.fullName,
        address: action.payload.address,
        city: action.payload.city,
        postalCode: action.payload.postalCode,
        country: action.payload.country,
      };
    },
    SAVE_PAYMENT_METHOD: (state, action) => {
      state.paymentMethod = action.payload;
      console.log(state.paymentMethod);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  removeItem,
  resetCart,
  decrementQuantity,
  incrementQuantity,
  addUser,
  removeUser,
  saveShippingAddress,
  SAVE_PAYMENT_METHOD,
} = cartSlice.actions;

export default cartSlice.reducer;
