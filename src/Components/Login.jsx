import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/auth/login/",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      console.log(res);
    } catch (error) {
      setError(
        error.response?.data?.non_field_errors[0] ||
          error.response?.data?.detail ||
          "Login failed. Please check your credentials"
      );
    }
  };

  return (
    <div className="card w-96 bg-base-200 shadow-sm justify-self-center-safe mt-3">
      <div className="card-body">
        <h2 className="text-2xl font-bold text-center">
          Login to Your Account
        </h2>

        <form className="form-control mt-6" onSubmit={handleLogin}>
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            className="input input-bordered"
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="label mt-4" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="input input-bordered"
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="mt-2 text-right text-xs">
            <a href="#" className="link link-hover text-primary">
              Forgot password?
            </a>
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          <button type="submit" className="btn btn-primary mt-6">
            Login
          </button>
        </form>

        <div className="mt-4 text-center text-sm">
          Don’t have an account?
          <a href="#" className="link link-primary ml-1">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
