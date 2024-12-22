// import React, { useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import logStyles from "../Assets/form.module.css";
// import { IoLogInOutline } from "react-icons/io5";
// import axiosClient from "../../axiosClient";
// const Login = () => {
//   const [user, setUser] = useState({
//     password: "",
//     email: "",
//   });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosClient
//       .post(`/login`, user)
//       .then((res) => {
//         console.log(res);
//         if (res.message === "Logged in") {
//           const token = res.token;
//           window.sessionStorage.setItem("authToken", token);

//         }
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <>
//       <Navbar />
//       <section className={logStyles.container}>
//         <div style={{ direction: "rtl" }} className={logStyles.content}>
//           <div className={logStyles.data}>
//             <IoLogInOutline size={200} color="#2b2b2b" />
//           </div>
//           <div className={logStyles.data}>
//             <form style={{ direction: "ltr" }} onSubmit={(e) => handleSubmit(e)}>
//               <h1>Login</h1>
//               <div className={logStyles.inputData}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//               </div>

//               <div className={logStyles.inputData}>
//                 <label htmlFor="pw">Password</label>
//                 <input type="password" id="pw" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//               </div>
//               <button style={{ alignSelf: "flex-start" }}>Login</button>
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;

// import React, { useState, useContext } from "react";
// import Navbar from "../Navbar/Navbar";
// import logStyles from "../Assets/form.module.css";
// import { IoLogInOutline } from "react-icons/io5";
// import { AuthContext } from "../../Context/AuthContext";
// import axiosClient from "../../axiosClient";

// const Login = () => {
//   const { login } = useContext(AuthContext); // Access login function from context
//   const [user, setUser] = useState({ email: "", password: "" });
//   const [error, setError] = useState(""); // Error state

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosClient
//       .post("/login", user)
//       .then((res) => {
//         if (res.data.message === "Logged in") {
//           // console.log(res.data.message)
//           // Assuming the server sends this message
//           const { token, user: userData } = res.data; // Extract token and user
//           window.sessionStorage.setItem("authToken", res.data.token);
//           login(userData, token); // Update global auth state
//           // console.log(login())
//           // console.log(userData);
//           // window.location.href = "/admin/dashboard"; // Redirect after login
//         }
//       })
//       .catch(() => setError("Invalid email or password")); // Set error message
//   };

//   return (
//     <>
//       <Navbar />
//       <section className={logStyles.container}>
//         <div style={{ direction: "rtl" }} className={logStyles.content}>
//           <div className={logStyles.data}>
//             <IoLogInOutline size={200} color="#2b2b2b" />
//           </div>
//           <div className={logStyles.data}>
//             <form style={{ direction: "ltr" }} onSubmit={handleSubmit}>
//               <h1>Login</h1>
//               <div className={logStyles.inputData}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
//               </div>

//               <div className={logStyles.inputData}>
//                 <label htmlFor="pw">Password</label>
//                 <input type="password" id="pw" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
//               </div>
//               <button style={{ alignSelf: "flex-start" }}>Login</button>
//               {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
//             </form>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import { IoLogInOutline } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthContext";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [user, setUser] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/login", user)
      .then((res) => {
        if (res.data.message === "Logged in") {
          const { token, user: userData } = res.data;
          window.sessionStorage.setItem("authToken", token);
          login(userData, token);
          setTimeout(() => {
            if (userData.role === "admin") {
              navigate("/admin/dashboard");
            } else if (userData.role === "assistant") {
              navigate("/assistant/dashboard");
            } else {
              navigate("/");
            }
          }, 100);
        }
      })
      .catch(() => setError("Invalid email or password"));
  };

  return (
    <>
      <Navbar />
      <section className={logStyles.container}>
        <div style={{ direction: "rtl" }} className={logStyles.content}>
          <div className={logStyles.data}>
            <IoLogInOutline size={200} color="#2b2b2b" />
          </div>
          <div className={logStyles.data}>
            <form style={{ direction: "ltr" }} onSubmit={handleSubmit}>
              <h1>Login</h1>
              <div className={logStyles.inputData}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} required />
              </div>

              <div className={logStyles.inputData}>
                <label htmlFor="pw">Password</label>
                <input type="password" id="pw" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} required />
              </div>
              <button style={{ alignSelf: "flex-start" }}>Login</button>
              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              <Link style={{ alignSelf: "flex-start" }} to={"/forget-password"}>
                Forget Password
              </Link>
              <Link style={{ alignSelf: "flex-start" }} to={"/register"}>
                Register Now
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
