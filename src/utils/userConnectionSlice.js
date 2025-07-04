import { createSlice } from "@reduxjs/toolkit";

export const userConnectionSlice = createSlice({
  name: "userConnection",
  initialState: null,
  reducers: {
    addUserConnection: (_state, action) => action.payload,
    removeUserConnection: () => null,
  },
});

export const { addUserConnection, removeUserConnection } =
  userConnectionSlice.actions;
export default userConnectionSlice.reducer;
