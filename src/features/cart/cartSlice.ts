import { createSlice } from "@reduxjs/toolkit";
import { IRootState } from "../../store";

export interface ICartItem {
  imageUrl: string;
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

interface InitialState {
  cart: Array<ICartItem>;
}

const initialState: InitialState = {
  cart: [],
  // cart: [
  //   {
  //     imageURL: "",
  //     pizzaId: 12,
  //     name: "Medi...",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((el) => el.pizzaId !== action.payload);
    },
    incItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((el) => el.pizzaId === action.payload) as ICartItem;
      // tao 1 reference toi object co pizzaId = action.payload
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload) as ICartItem;

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) {
        state.cart = state.cart.filter((el) => el.pizzaId !== item.pizzaId);
      }
    },
    setItemQuantity(state, action) {
      const item = state.cart.find((el) => el.pizzaId === action.payload.pizzaId) as ICartItem;
      item.quantity = action.payload.quantity;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) {
        state.cart = state.cart.filter((el) => el.pizzaId !== item.pizzaId);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const { setItemQuantity, addItem, deleteItem, incItemQuantity, decItemQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;

export const getTotalQuantity = (state: IRootState) =>
  state.cartSlice.cart.reduce((a: number, b: ICartItem) => a + b.quantity, 0);

export const getTotalCartPrice = (state: IRootState) =>
  state.cartSlice.cart.reduce((a: number, b: ICartItem) => a + b.totalPrice, 0);
