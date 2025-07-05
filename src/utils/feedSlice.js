import { createSlice } from "@reduxjs/toolkit";

export const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => {
      console.log("call", action.payload);
      if (!state) return state;
      return state.filter((user) => user.id !== action.payload);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
