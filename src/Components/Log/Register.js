// import React, { useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import logStyles from "../Assets/form.module.css";
// import { FaRegRegistered } from "react-icons/fa6";
// import axiosClient from "../../axiosClient";
// import { Link, useNavigate } from "react-router-dom";
// import Footer from "../Footer/Footer";

// const Register = () => {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     password: "",
//     email: "",
//     phone: "",
//   });
//   const [errors, setErrors] = useState({
//     name: "",
//     username: "",
//     password: "",
//     email: "",
//     phone: "",
//     confirmPassword: "",
//   });
//   const [cpw, setCpw] = useState("");
//   const [done, setDone] = useState(false);

//   const handleValidation = () => {
//     const newErrors = {};
//     if (!user.name) newErrors.name = "Name is required.";
//     if (!user.username) newErrors.username = "Username is required.";
//     if (!user.email) newErrors.email = "Email is required.";
//     if (!user.password) newErrors.password = "Password is required.";
//     if (!user.phone) newErrors.phone = "Phone is required.";
//     if (user.password !== cpw) newErrors.confirmPassword = "Passwords do not match.";
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = handleValidation();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       setErrors({});
//       axiosClient
//         .post(`/register`, user)
//         .then((res) => {
//           if (res.data.message === "Registered Successfully") {
//             setDone(true);
//           }
//         })
//         .catch((err) => {
//           const backendErrors = err.response?.data?.errors || {};
//           setErrors((prev) => ({ ...prev, ...backendErrors }));
//         });
//     }
//   };
//   const navigate = useNavigate();
//   return (
//     <>
//       <Navbar />
//       <section className={logStyles.container}>
//         {done && (
//           <div onClick={() => setDone(false)} className={logStyles.success}>
//             <div className={logStyles.message}>
//               <h1>Registered Successfully</h1>
//               <button onClick={() => navigate("/login")}>Confirm</button>
//             </div>
//           </div>
//         )}
//         <div className={logStyles.content}>
//           <div className={logStyles.data}>
//             <FaRegRegistered size={150} color="#2b2b2b" />
//           </div>
//           <div className={logStyles.data}>
//             <form onSubmit={handleSubmit}>
//               <h1>Register</h1>
//               <div className={logStyles.inputData}>
//                 <label htmlFor="name">Name</label>
//                 <input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
//               </div>
//               {errors.name && <span className={logStyles.error}>{errors.name}</span>}

//               <div className={logStyles.inputData}>
//                 <label htmlFor="username">Username</label>
//                 <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
//               </div>
//               {errors.username && <span className={logStyles.error}>{errors.username}</span>}

//               <div className={logStyles.inputData}>
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
//               </div>
//               {errors.password && <span className={logStyles.error}>{errors.password}</span>}

//               <div className={logStyles.inputData}>
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input type="password" id="confirmPassword" value={cpw} onChange={(e) => setCpw(e.target.value)} />
//               </div>
//               {errors.confirmPassword && <span className={logStyles.error}>{errors.confirmPassword}</span>}

//               <div className={logStyles.inputData}>
//                 <label htmlFor="email">Email</label>
//                 <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
//               </div>
//               {errors.email && <span className={logStyles.error}>{errors.email}</span>}

//               <div className={logStyles.inputData}>
//                 <label htmlFor="phone">Phone</label>
//                 <input type="text" id="phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
//               </div>
//               {errors.phone && <span className={logStyles.error}>{errors.phone}</span>}

//               <button type="submit">Register</button>
//               <Link style={{ alignSelf: "flex-end" }} to={"/login"}>
//                 Login Now
//               </Link>
//             </form>
//           </div>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Register;

import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import { FaRegRegistered } from "react-icons/fa6";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [cpw, setCpw] = useState("");
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const navigate = useNavigate();

  const validateInputs = () => {
    let newErrors = {};

    // Name validation (only letters)
    if (!user.name) {
      newErrors.name = "Name is required.";
    } else if (!/^[a-zA-Z]+$/.test(user.name)) {
      newErrors.name = "Name must contain only letters.";
    }

    // Username validation
    if (!user.username) {
      newErrors.username = "Username is required.";
    }

    // Email validation (must be Gmail, Yahoo, or Outlook)
    if (!user.email) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|yahoo\.com)$/.test(
        user.email
      )
    ) {
      newErrors.email = "Only Gmail, Yahoo, or Outlook emails are allowed.";
    }

    // Password validation (min 6 chars & must contain a special character)
    if (!user.password) {
      newErrors.password = "Password is required.";
    } else if (user.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    // Confirm Password validation
    if (user.password !== cpw) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});

    axiosClient
      .post(`/register`, user)
      .then((res) => {
        if (res.data.message === "Registered Successfully") {
          setDone(true);
        }
      })
      .catch((err) => {
        const backendErrors = err.response?.data?.errors || {};
        setErrors((prev) => ({ ...prev, ...backendErrors }));
      });
  };

  return (
    <>
      <Navbar />
      <section className={logStyles.container}>
        {done && (
          <div onClick={() => setDone(false)} className={logStyles.success}>
            <div className={logStyles.message}>
              <h1>Registered Successfully</h1>
              <button onClick={() => navigate("/login")}>Confirm</button>
            </div>
          </div>
        )}
        <div className={logStyles.content}>
          <div className={logStyles.data}>
            <FaRegRegistered size={150} color="#2b2b2b" />
          </div>
          <div className={logStyles.data}>
            <form onSubmit={handleSubmit}>
              <h1>Register</h1>

              <div className={logStyles.inputData}>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
              </div>
              {errors.name && (
                <span className={logStyles.error}>{errors.name}</span>
              )}

              <div className={logStyles.inputData}>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={user.username}
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              {errors.username && (
                <span className={logStyles.error}>{errors.username}</span>
              )}

              <div className={logStyles.inputData}>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              {errors.email && (
                <span className={logStyles.error}>{errors.email}</span>
              )}

              <div className={logStyles.inputData}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
              {errors.password && (
                <span className={logStyles.error}>{errors.password}</span>
              )}

              <div className={logStyles.inputData}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={cpw}
                  onChange={(e) => setCpw(e.target.value)}
                />
              </div>
              {errors.confirmPassword && (
                <span className={logStyles.error}>
                  {errors.confirmPassword}
                </span>
              )}

              <div className={logStyles.inputData}>
                <label htmlFor="phone">Phone</label>
                <input
                  type="text"
                  id="phone"
                  value={user.phone}
                  onChange={(e) => setUser({ ...user, phone: e.target.value })}
                />
              </div>
              {errors.phone && (
                <span className={logStyles.error}>{errors.phone}</span>
              )}

              <button type="submit">Register</button>
              <Link style={{ alignSelf: "flex-end" }} to={"/login"}>
                Login Now
              </Link>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Register;
