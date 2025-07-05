import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password1: "",
    password2: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL + "/auth/registration/", formData, {
        withCredentials: true,
      });
      dispatch(addUser(res.data?.user));
      navigate("/login");
    } catch (error) {
      const errData = error.response?.data;
      const firstError =
        errData?.non_field_errors?.[0] ||
        errData?.email?.[0] ||
        errData?.username?.[0] ||
        errData?.password1?.[0] ||
        "Registration failed";
      setError(firstError);
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-sm justify-self-center-safe mt-3">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>
        <form className="form-control mt-6" onSubmit={handleRegister}>
          <label className="label">
            <span className="label-text">Username</span>
          </label>
          <input
            type="text"
            name="username"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="first_name"
            className="input input-bordered"
            onChange={handleChange}
          />
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="last_name"
            className="input input-bordered"
            onChange={handleChange}
          />
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            name="password1"
            className="input input-bordered"
            onChange={handleChange}
            required
          />
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            type="password"
            name="password2"
            className="input input-bordered"
            onChange={handleChange}
            required
          />

          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button type="submit" className="btn btn-primary mt-6">
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link to="/login" className="link link-primary ml-1">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Registration;
