import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userConnectionReducer from "./userConnectionSlice";
import userRequestReducer from "./userRequestSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userConnection: userConnectionReducer,
    userRequest: userRequestReducer,
  },
});
