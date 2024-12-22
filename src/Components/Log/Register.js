import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import logStyles from "../Assets/form.module.css";
import { FaRegRegistered } from "react-icons/fa6";
import axiosClient from "../../axiosClient";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [user, setUser] = useState({
    name: ``,
    username: "",
    password: "",
    email: "",
    phone: "",
  });
  const [err, setErr] = useState(false);
  const [cpw, setCpw] = useState("");
  const [done, setDone] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [inputs, setInputs] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === "" || user.phone === "" || user.username === "") {
      setInputs(true);
    } else {
      setInputs(false);
      user.password !== cpw ? setErr(true) : setErr(false);
      axiosClient
        .post(`/register`, user)
        .then((res) => {
          if (res.data.message === "Registered Successfully") {
            setDone(true);
            setRepeat(false);
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.response?.data?.message === "Email is already used") {
            setRepeat(true);
          }
        });
    }
  };
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <section className={logStyles.container}>
        {done && (
          <div
            onClick={() => {
              setDone(false);
            }}
            className={logStyles.success}>
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
            <form onSubmit={(e) => handleSubmit(e)}>
              <h1>Register</h1>
              <div className={logStyles.inputData}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
              </div>
              {inputs && <span>Field is required</span>}
              <div className={logStyles.inputData}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
              </div>
              {inputs && <span>Field is required</span>}
              <div className={logStyles.inputData}>
                <label htmlFor="pw">Password</label>
                <input type="password" id="pw" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
              </div>
              {inputs && <span>Field is required</span>}
              {err && <span>Password not Match</span>}
              <div className={logStyles.inputData}>
                <label htmlFor="cpw">Confirm Password</label>
                <input type="password" id="cpw" value={cpw} onChange={(e) => setCpw(e.target.value)} />
              </div>
              {inputs && <span>Field is required</span>}
              {err && <span>Password not Match</span>}
              <div className={logStyles.inputData}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
              </div>
              {inputs && <span>Field is required</span>}
              {repeat && <span>Email is Already Used</span>}
              <div className={logStyles.inputData}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="Phone" value={user.phone} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
              </div>
              {inputs && <span>Field is required</span>}
              <button>Register</button>
              <Link style={{ alignSelf: "flex-end" }} to={"/login"}>
                Login Now
              </Link>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
