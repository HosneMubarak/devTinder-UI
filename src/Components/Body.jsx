import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { Outlet, useNavigate } from "react-router";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { addUserFeed } from "../utils/userFeedSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/auth/user/", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
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
    fetchUser();
    fetchUserFeed();
  }, []);
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Body;
