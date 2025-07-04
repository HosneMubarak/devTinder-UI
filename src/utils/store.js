import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userFeedReducer from "./userFeedSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userFeed: userFeedReducer,
  },
});
