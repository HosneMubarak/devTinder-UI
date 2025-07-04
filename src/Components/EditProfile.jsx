import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = (user) => {
  const dispatch = useDispatch();
  const { first_name, last_name, username } = user.user;
  const [firstName, setFirstName] = useState(first_name);
  const [userName, setUserName] = useState(username);
  const [lastName, setLastName] = useState(last_name);
  const [sucessMessage, setSucessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});
  const [showError, setShowError] = useState(true);
  const [showSucessMessage, setShowSucessMessage] = useState(true);

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
        setShowError(false);
        setSucessMessage("User profile update successfully.");
      }
    } catch (error) {
      console.log(error);
      if (error?.response && error.response.status === 400) {
        console.log(error.response.data);
        setErrorMessage(error.response.data);
      } else {
        console.error("Unexpected error:", error);
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
          {showSucessMessage && sucessMessage && (
            <div className="text-green-600 text-sm mt-4">{sucessMessage}</div>
          )}

          <button type="submit" className="btn btn-primary mt-6">
            Update User Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
