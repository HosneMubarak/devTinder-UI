import React from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
  const user = useSelector((store) => store.user);
  const userFeed = useSelector((store) => store.userFeed);
  return user && userFeed && <EditProfile user={user} userFeed={userFeed} />;
};

export default Profile;
