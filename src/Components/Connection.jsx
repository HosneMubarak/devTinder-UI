import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { addUserConnection } from "../utils/userConnectionSlice";
import { useDispatch, useSelector } from "react-redux";
import ConnectionCard from "./ConnectionCard";

const Connection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userConnection = useSelector((store) => store.userConnection);

  const fetchUserConnection = async () => {
    try {
      const res = await axios.get(
        BASE_URL + "/connection/accepted-connections/",
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(addUserConnection(res.data));
      }
      if (res.status === 404) {
        dispatch(addUserConnection([]));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUserConnection();
  }, []);

  return userConnection && userConnection.length > 0 ? (
    <ConnectionCard userConnection={userConnection} />
  ) : (
    <div className="text-center mt-5">No connection available</div>
  );
};

export default Connection;
