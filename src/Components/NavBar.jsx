import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Links, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user_data = useSelector((store) => store.user);
  const user_feed_data = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const res = await axios.get(BASE_URL + "/auth/logout/", {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(removeUser());
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-100 shadow-sm px-5">
      <div className="flex-1">
        <Link to={"/"} className="btn btn-ghost text-xl">
          daisyUI
        </Link>
      </div>
      <div className="flex-none flex items-center gap-2">
        {user_data && (
          <>
            <div className="flex-1">
              <span className="font-medium">
                Welcome, {user_data?.username || user_data?.email}
              </span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                {user_feed_data && (
                  <div className="w-12 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={user_feed_data.photo}
                    />
                  </div>
                )}
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to={"/profile"} className="justify-between">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to={"/connection"}>Connection</Link>
                </li>
                <li>
                  <Link to={"/request"}>Request</Link>
                </li>
                <li>
                  <a onClick={handleLogout}>Logout</a>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NavBar;
