import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = (feeds) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, first_name, last_name, about, photo, skills } = feeds.feeds;
  const handleInterested = async (Id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/",
        { to_user_id: Id },
        { withCredentials: true }
      );

      if (res.status === 201) {
        dispatch(removeFeed(Number(Id)));
      }
    } catch (error) {
      error.status === 401 ? navigate("/login") : console.log(error);
    }
  };
  const handleNoInterested = async (Id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/connection/" + Id + "/not-interested/",
        {},
        { withCredentials: true }
      );

      if (res.status === 200) {
        dispatch(removeFeed(Number(Id)));
      }
    } catch (error) {
      error.status === 401 ? navigate("/login") : console.log(error);
    }
  };

  return (
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
          {first_name} {last_name}
        </h2>
        <div className="w-full break-words whitespace-pre-wrap">
          <span>{about}</span>
        </div>
        {skills && (
          <div className="flex flex-wrap justify-center gap-2 my-2">
            {skills.map((s, index) => (
              <span
                key={index}
                className="badge badge-outline badge-accent px-3 py-1 text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        )}
        <div className="card-actions justify-end">
          <button
            className="btn btn-success"
            onClick={() => handleInterested(id)}
          >
            Interested
          </button>
          <button
            className="btn btn-error"
            onClick={() => handleNoInterested(id)}
          >
            Not Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
