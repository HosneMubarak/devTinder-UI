import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import userFeedReducer from "./userFeedSlice";
import userConnectionReducer from "./userConnectionSlice";
import userRequestReducer from "./userRequestSlice";

export default configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    userFeed: userFeedReducer,
    userConnection: userConnectionReducer,
    userRequest: userRequestReducer,
  },
});
