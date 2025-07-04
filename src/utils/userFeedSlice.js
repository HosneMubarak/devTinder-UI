import { createSlice } from "@reduxjs/toolkit";

export const userFeedSlice = createSlice({
  name: "userFeed",
  initialState: null,
  reducers: {
    addUserFeed: (_state, action) => action.payload,
    removeUserFeed: () => null,
  },
});

export const { addUserFeed, removeUserFeed } = userFeedSlice.actions;
export default userFeedSlice.reducer;
