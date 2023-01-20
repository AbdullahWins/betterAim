import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();
  if (loading) {
    return (
      <div className="flex items-center justify-center py-6 bg-base-300">
        <progress className="progress w-56"></progress>
      </div>
    );
  }
  if (user && user.uid) {
    return children;
  }

  <h2>private route</h2>;
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;
