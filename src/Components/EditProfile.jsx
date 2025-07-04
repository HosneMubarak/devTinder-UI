import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { addUserFeed } from "../utils/userFeedSlice";

const EditProfile = ({ user, userFeed }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [previewEnable, setPreviewEnable] = useState(false);

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
        dispatch(addUserFeed(res?.data));
        setShowSucessMessage(true);
        setSucessMessage(res?.data?.message);
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
    <div className="flex flex-col md:flex-row gap-6 justify-center items-start mt-4">
      <div className="card w-96 bg-base-200 shadow-sm mt-3 mx-4">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Update User Info</h2>
          <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-64 border p-4">
            <legend className="fieldset-legend">Preview options</legend>
            <label className="label">
              <input
                onChange={(e) => {
                  setPreviewEnable(e.target.checked);
                }}
                type="checkbox"
                checked={previewEnable}
                className="toggle"
              />
              Preview
            </label>
          </fieldset>

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
              Update Feed
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
                <span>{sucessMessage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {previewEnable && (
        <div className="card w-96 bg-base-200 shadow-sm justify-self-center-safe mt-3">
          {photo ? (
            <figure>
              <img src={photo} alt="photo" />
            </figure>
          ) : (
            <figure>
              <img
                src="https://www.pngarts.com/files/5/User-Avatar-PNG-Transparent-Image.png"
                alt="photo"
              />
            </figure>
          )}

          <div className="card-body items-center text-center">
            <h2 className="card-title">
              {firstName} {lastName}
            </h2>
            <div className="w-full break-words whitespace-pre-wrap">
              <span>{feedAbout}</span>
            </div>
            {skills && (
              <div className="flex flex-wrap justify-center gap-2 my-2">
                {skills.map((s, index) => (
                  <span
                    key={index}
                    className="badge badge-outline badge-accent px-3 py-1 text-sm"
                  >
                    {s.name}
                  </span>
                ))}
              </div>
            )}
            <div className="card-actions justify-end">
              <button className="btn btn-success">Accept</button>
              <button className="btn btn-error">Ignore</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
