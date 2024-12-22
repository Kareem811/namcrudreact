// import React, { useContext } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoute = ({ children }) => {
//   const { auth } = useContext(AuthContext);

//   return auth.token ? children : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
// ProtectedRoutes.js

// import React, { useContext } from "react";
// import { AuthContext } from "../../Context/AuthContext";
// import { Navigate } from "react-router-dom";

// const ProtectedRoutes = ({ children, allowedRoles }) => {
//     const { auth } = useContext(AuthContext);
//   if (!auth.token) {
//     return <Navigate to="/login" />;
//   }
//   if (allowedRoles && !allowedRoles.includes(auth.role)) {
//     return <Navigate to="/unauthorized" />;
//   }
//   return children;
// };

// export default ProtectedRoutes;

import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ children, allowedRoles }) => {
  const { auth } = useContext(AuthContext);

  if (!auth.token && allowedRoles.includes("user")) {
    return children;
  }

  if (!auth.token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(auth.role)) {
    return <Navigate to="/unauthorized" />;
  }
  return children;
};

export default ProtectedRoutes;
