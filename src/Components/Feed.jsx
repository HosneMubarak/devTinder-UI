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
      const res = await axios.get(BASE_URL + "/connection/explore-users/", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data));
    } catch (error) {
      error.status === 401 ? navigate("/login") : console.log(error);
    }
  };
  useEffect(() => {
    getFeed();
  }, []);

  return feeds && feeds.length > 0 ? (
    <UserCard feeds={feeds[0]} />
  ) : (
    <div className="text-center mt-5">No Feed available</div>
  );
};

export default Feed;
