import React, { useEffect } from "react";
import UserCard from "./userCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router";

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

  useEffect(() => {
    getFeed();
  }, []);

  return feeds && <UserCard feeds={feeds[0]} />;
};

export default Feed;
