import React, { useEffect } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router";
import { addUserFeed } from "../utils/userFeedSlice";

const Feed = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feeds = useSelector((store) => store.feed);

  const getFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/feeds/", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.results));
    } catch (error) {
      error.status === 401 ? navigate("/login") : console.log(error);
    }
  };
  const fetchUserFeed = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user-feed/", {
        withCredentials: true,
      });
      dispatch(addUserFeed(res.data?.results[0]));
    } catch (error) {
      error.status === 401 ? navigate("/login") : console.log(error);
    }
  };

  useEffect(() => {
    getFeed();
    fetchUserFeed();
  }, []);

  return feeds && <UserCard feeds={feeds[0]} />;
};

export default Feed;
