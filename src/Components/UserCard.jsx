import React from "react";

const userCard = (feeds) => {
  const { user, about, skills } = feeds.feeds;
  console.log(about);
  console.log(skills);

  return (
    <div className="card w-96 bg-base-200 shadow-sm justify-self-center-safe mt-3">
      <div className="card-body items-center text-center">
        <h2 className="card-title">
          {user.first_name} {user.last_name}
        </h2>
        <p>{about} </p>
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
        <div className="card-actions justify-end">
          <button className="btn btn-success">Accept</button>
          <button className="btn btn-error">Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default userCard;
