import { createSlice } from "@reduxjs/toolkit";

const userRequestSlice = createSlice({
  name: "userRequest",
  initialState: null,
  reducers: {
    addUserRequest: (state, action) => action.payload,
    removeUserRequest: () => null,
  },
});

export const { addUserRequest, removeUserRequest } = userRequestSlice.actions;
export default userRequestSlice.reducer;
