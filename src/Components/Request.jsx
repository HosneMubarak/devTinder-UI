import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { addUserRequest } from "../utils/userRequestSlice";

const Request = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.userRequest);
  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showError, setShowError] = useState(true);
  const [showSucessMessage, setShowSucessMessage] = useState(true);

  const getConnectionRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/connections/received/", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(addUserRequest(res.data));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
      }
    }
  };

  const handleRequestAccept = async (Id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connections/" + Id + "/respond/",
        { action: "accept" },
        { withCredentials: true }
      );
      console.log(res.data);
      setShowSucessMessage(true);
      setSucessMessage("Request accepted successfully.");
      setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000);
      // Optionally re-fetch or update requests
      getConnectionRequest();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
        setErrorMessage(error.response.data);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    }
  };
  const handleRequestIgnore = async (Id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connections/" + Id + "/respond/",
        { action: "decline" },
        { withCredentials: true }
      );
      console.log(res.data);
      setShowSucessMessage(true);
      setSucessMessage("Request ignored successfully.");
      setTimeout(() => {
        setShowSucessMessage(false);
      }, 3000);
      // Optionally re-fetch or update requests
      getConnectionRequest();
    } catch (error) {
      if (error.response?.status === 401) {
        navigate("/login");
      } else {
        console.error(error);
        setErrorMessage(error.response.data);
        setShowError(true);
        setTimeout(() => {
          setShowError(false);
        }, 3000);
      }
    }
  };

  useEffect(() => {
    getConnectionRequest();
  }, []);

  if (!requests) return null;

  return (
    <>
      {requests.map((r) => (
        <div
          key={r.id}
          className="card w-96 bg-base-200 shadow-sm justify-self-center-safe mt-3"
        >
          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {r.from_user.first_name} {r.from_user.last_name}
            </h2>
            <div className="card-actions justify-end">
              <button
                className="btn btn-success"
                onClick={() => handleRequestAccept(r.id)}
              >
                Accept
              </button>
              <button
                className="btn btn-error"
                onClick={() => handleRequestIgnore(r.id)}
              >
                Ignore
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="toast toast-center toast-end">
        {showError && errorMessage.username && (
          <div className="alert alert-error">
            <span>{errorMessage.username[0]}</span>
          </div>
        )}
        {showSucessMessage && sucessMessage && (
          <div className="alert alert-success">
            <span>{sucessMessage}</span>
          </div>
        )}
      </div>
    </>
  );
};

export default Request;
