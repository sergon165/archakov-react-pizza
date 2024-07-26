import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Pizza } from "./pizzaSlice";
import { RootState } from "./store";

type CartItem = {
  id: number;
  pizzaId: number;
  count: number;
  type: number;
  size: number;
}

interface CartState {
  newId: number;
  items: CartItem[];
  pizzasInfo: Pizza[];
}

const initialState: CartState = {
  newId: 1,
  items: [], // {id, pizzaId, count, type, size}
  pizzasInfo: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<{pizza: Pizza, count: number, type: number, size: number}>) => {
      // payload = {pizza, count, type, size}
      const { pizza, count, type, size } = action.payload;
      const item = state.items.find(
        (item) =>
          item.pizzaId === pizza.id &&
          item.type === type &&
          item.size === size
      );

      if (item) item.count += count;
      else {
        const newItem: CartItem = {
          id: state.newId++,
          pizzaId: pizza.id,
          count,
          type, 
          size
        }
        state.items.push(newItem as CartItem);

        if (!state.pizzasInfo.find((p) => p.id === pizza.id))
          state.pizzasInfo.push(pizza);
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      // payload = id
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      // payload = id
      const foundItem = state.items.find((item) => item.id === action.payload);
      if (foundItem) foundItem.count++;
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      // payload = id
      const item = state.items.find((item) => item.id === action.payload);
      if (item && --item.count < 1)
        state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems: (state) => {
      state.newId = 1;
      state.items = [];
      state.pizzasInfo = [];
    },
  },
});

export const selectCartCount = (state: RootState) =>
  state.cart.items.reduce((sum, item) => sum + item.count, 0);

export const selectCartSum = (state: RootState) =>
  state.cart.items.reduce(
    (sum, item) =>
      sum +
      (state.cart.pizzasInfo.find((pizza) => pizza.id === item.pizzaId)?.price || 0) *
        item.count,
    0
  );

export const selectPizzaCount = (id: number, type: number, size: number) => (state: RootState) => {
  const item = state.cart.items.find(
    (item) => item.pizzaId === id && item.type === type && item.size === size
  );
  return item ? item.count : 0;
}

export const { addItem, removeItem, incrementItem, decrementItem, clearItems } =
  cartSlice.actions;
export default cartSlice.reducer;
