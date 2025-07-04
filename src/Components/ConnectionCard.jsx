import React from "react";

const ConnectionCard = ({ userConnection }) => {
  return (
    userConnection && (
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {userConnection.map((c) => (
          <div
            key={c.id}
            className="card bg-base-100 shadow-md border border-base-200 rounded-xl transition hover:shadow-lg"
          >
            <div className="card-body p-5">
              <div className="flex items-center gap-4">
                <div>
                  <h2 className="font-bold text-lg">
                    {c.from_user.first_name} {c.from_user.last_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    @{c.from_user.username}
                  </p>
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <span className="font-medium text-gray-700">Last Login:</span>{" "}
                {new Date(c.from_user.last_login).toLocaleString()}
              </div>

              <div className="card-actions mt-4 justify-end">
                <button className="btn btn-sm btn-outline btn-primary">
                  View Profile
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default ConnectionCard;
