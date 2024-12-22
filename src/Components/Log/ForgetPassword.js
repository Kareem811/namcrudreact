import React, { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../axiosClient";
import logStyles from "../Assets/form.module.css";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

const ForgetPassword = () => {
  const [formData, setFormData] = useState({
    email: "",
    new_password: "",
    new_password_confirmation: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/forget-password", formData)
      .then((res) => {
        setMessage(res.data.message);
        setError("");
        setFormData({ email: "", new_password: "", new_password_confirmation: "" });
      })
      .catch((err) => {
        setMessage("");
        setError(err.response?.data?.message || "An error occurred.");
      });
  };

  return (
    <>
      <Navbar />
      <section className={logStyles.container}>
        <div style={{gridTemplateColumns : '1fr'}} className={logStyles.content}>
          <div className={logStyles.data}>
            <form onSubmit={handleSubmit}>
              <h1>Forget Password</h1>
              <div className={logStyles.inputData}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
              </div>

              <div className={logStyles.inputData}>
                <label htmlFor="new_password">New Password</label>
                <input type="password" id="new_password" value={formData.new_password} onChange={(e) => setFormData({ ...formData, new_password: e.target.value })} required />
              </div>

              <div className={logStyles.inputData}>
                <label htmlFor="confirm_password">Confirm New Password</label>
                <input
                  type="password"
                  id="confirm_password"
                  value={formData.new_password_confirmation}
                  onChange={(e) => setFormData({ ...formData, new_password_confirmation: e.target.value })}
                  required
                />
              </div>

              <button style={{ alignSelf: "flex-start" }}>Reset Password</button>
              {message && <p style={{ color: "green", marginTop: "10px" }}>{message}</p>}
              {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
              <Link style={{ alignSelf: "flex-start" }} to={"/login"}>
                Back to Login
              </Link>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ForgetPassword;
