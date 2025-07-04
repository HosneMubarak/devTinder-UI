import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { addUserFeed } from "../utils/userFeedSlice";

const EditProfile = ({ user, userFeed }) => {
  const dispatch = useDispatch();
  const { first_name, last_name, username } = user;
  const { id, about, photo, skills } = userFeed;
  const [firstName, setFirstName] = useState(first_name);
  const [userName, setUserName] = useState(username);
  const [lastName, setLastName] = useState(last_name);
  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showError, setShowError] = useState(true);
  const [showSucessMessage, setShowSucessMessage] = useState(true);
  const [feedAbout, setFeedAbout] = useState(about);
  const [photoUrl, setPhotoUrl] = useState(photo);
  const [userFeedId] = useState(id);
  const navigate = useNavigate();

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        BASE_URL + "/auth/user/",
        { username: userName, first_name: firstName, last_name: lastName },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(addUser(res.data));
        setShowSucessMessage(true);
        setSucessMessage("User profile update successfully.");
        setTimeout(() => {
          setShowSucessMessage(false);
        }, 3000);
      }
    } catch (error) {
      if (error?.response) {
        const status = error.response.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 400) {
          console.log(error.response.data);
          setErrorMessage(error.response.data);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        } else {
          console.error("Unexpected error:", error);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };
  const handleFeed = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        BASE_URL + "/user-feed/" + userFeedId + "/",
        {
          photo: photoUrl,
          about: feedAbout,
        },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setShowSucessMessage(true);
        dispatch(addUserFeed(res.data.data));
        setSucessMessage(res.data.message);
        setTimeout(() => {
          setShowSucessMessage(false);
        }, 3000);
      }
    } catch (error) {
      if (error?.response) {
        const status = error.response.status;

        if (status === 401) {
          navigate("/login");
        } else if (status === 400) {
          console.log(error.response.data);
          setErrorMessage(error.response.data);
          setShowError(true);
          setTimeout(() => {
            setShowError(false);
          }, 3000);
        } else {
          console.error("Unexpected error:", error);
        }
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-sm mt-3 mx-auto">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Update User Info</h2>

        <form className="form-control mt-6" onSubmit={handleUpdate}>
          <label className="label mt-4" htmlFor="userName">
            <span className="label-text">Username</span>
          </label>
          <input
            value={userName}
            type="text"
            id="userName"
            placeholder="Enter Username"
            className="input input-bordered"
            onChange={(e) => setUserName(e.target.value)}
          />
          {showError && errorMessage.username && (
            <p className="text-red-500 text-sm mt-1">
              {errorMessage.username[0]}
            </p>
          )}
          <label className="label mt-4" htmlFor="firstName">
            <span className="label-text">First Name</span>
          </label>
          <input
            value={firstName}
            type="text"
            id="firstName"
            placeholder="Enter first name"
            className="input input-bordered"
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label mt-4" htmlFor="lastName">
            <span className="label-text">Last Name</span>
          </label>
          <input
            value={lastName}
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="input input-bordered"
            onChange={(e) => setLastName(e.target.value)}
          />

          <button type="submit" className="btn btn-primary mt-6">
            Update User Info
          </button>
        </form>
        <form className="form-control mt-6" onSubmit={handleFeed}>
          <label className="label mt-4" htmlFor="photoUrl">
            <span className="label-text">Photo Url</span>
          </label>
          <input
            value={photoUrl}
            type="text"
            id="lastName"
            placeholder="Enter last name"
            className="input input-bordered"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
          <label className="label mt-4" htmlFor="about">
            <span className="label-text">About</span>
          </label>
          <textarea
            value={feedAbout}
            id="about"
            placeholder="Write something about yourself"
            className="textarea textarea-bordered"
            onChange={(e) => setFeedAbout(e.target.value)}
            rows={4}
          />
          <button type="submit" className="btn btn-primary mt-6">
            Update About
          </button>
        </form>
        <div className="toast toast-center toast-end">
          {showError && errorMessage.username && (
            <div className="alert alert-error">
              <span>{errorMessage.username[0]}</span>
            </div>
          )}
          {showSucessMessage && sucessMessage && (
            <div className="alert alert-success">
              <span>{showSucessMessage}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
