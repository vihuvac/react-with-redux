import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

// This slice will be the reducer for the counter state.
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      // The value is not directly mutated, but instead a new state object is returned (automatically manage by `createSlice`).
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  // Extra reducers are reducers that are defined outside of the slice, but still belong to the slice (async reducers).
  extraReducers: (builder) => {
    // This will be called when the `incrementAsync` action is dispatched.
    // The `builder` is a callback that allows us to add reducers for the pending, fulfilled, and rejected action types (chained).
    builder
      .addCase(incrementAsync.pending, () => {
        console.log('incrementAsync.pending');
      })
      .addCase(incrementAsync.fulfilled, (state, action: PayloadAction<number>) => {
        state.value += action.payload;
      });
  },
});

// Export an async action (useful example to manage an async operation).
// Unlike sync actions, for async actions we need to define a name.
export const incrementAsync = createAsyncThunk(
  'counter/incrementAsync',
  async (amount: number) => {
    // Wait 1 second to simulate an async operation.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return amount;
  }
);

// Export the actions.
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer.
export default counterSlice.reducer;
