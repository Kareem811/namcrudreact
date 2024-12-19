// // import React, { createContext, useState } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [auth, setAuth] = useState({
// //     user: null,
// //     token: sessionStorage.getItem("authToken") || null,
// //   });

// //   const login = (userData, token) => {
// //     setAuth({ user: userData, token });
// //     sessionStorage.setItem("authToken", token);
// //   };

// //   const logout = () => {
// //     setAuth({ user: null, token: null });
// //     sessionStorage.removeItem("authToken");
// //   };

// //   return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
// // };
// // import React, { createContext, useState } from "react";

// // export const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {
// //   const [auth, setAuth] = useState({
// //     user: null,
// //     token: sessionStorage.getItem("authToken") || null,
// //     role: null, // Store role here
// //   });

// //   const login = async (userData, token) => {
// //     setAuth({ user: userData, token, role: userData.role }); // Store user and role
// //     console.log(auth);
// //     sessionStorage.setItem("authToken", token); // Save token in sessionStorage
// //   };

// //   const logout = () => {
// //     setAuth({ user: null, token: null, role: null });
// //     sessionStorage.removeItem("authToken"); // Remove token on logout
// //   };

// //   return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
// // };

// import React, { createContext, useState } from "react";
// import axiosClient from "../axiosClient";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [auth, setAuth] = useState({
//     user: null,
//     token: sessionStorage.getItem("authToken") || null,
//     role: null,
//   });

//   const login = async (userData, token) => {
//     setAuth({ user: userData, token, role: userData.role });
//     sessionStorage.setItem("authToken", token);
//   };

//   const logout = async () => {
//     await axiosClient
//       .post(`/logout`)
//       .then((res) => {
//         if (res.data.message === "Logged out successfully") {
//           setAuth({ user: null, token: null, role: null });
//           sessionStorage.removeItem("authToken");
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
// };

import React, { createContext, useState, useEffect } from "react";
import axiosClient from "../axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Initialize the auth state from sessionStorage on page load
  const [auth, setAuth] = useState({
    user: JSON.parse(sessionStorage.getItem("userData")) || null,
    token: sessionStorage.getItem("authToken") || null,
    role: sessionStorage.getItem("userRole") || null,
  });
  const login = async (userData, token) => {
    setAuth({ user: userData, token, role: userData.role });
    sessionStorage.setItem("authToken", token);
    sessionStorage.setItem("userData", JSON.stringify(userData));
    sessionStorage.setItem("userRole", userData.role);
  };

  const logout = async () => {
    try {
      const res = await axiosClient.post("/logout");
      if (res.data.message === "Logged out successfully") {
        setAuth({ user: null, token: null, role: null });
        sessionStorage.removeItem("authToken");
        sessionStorage.removeItem("userData");
        sessionStorage.removeItem("userRole");
      }
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };
  useEffect(() => {
    if (auth.token) {
      const storedUserData = sessionStorage.getItem("userData");
      const storedRole = sessionStorage.getItem("userRole");

      if (storedUserData && storedRole) {
        setAuth({
          user: JSON.parse(storedUserData),
          token: auth.token,
          role: storedRole,
        });
      }
    }
  }, [auth.token]);

  return <AuthContext.Provider value={{ auth, login, logout }}>{children}</AuthContext.Provider>;
};
