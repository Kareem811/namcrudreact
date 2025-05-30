import React, { useContext, useEffect, useState } from "react";
import contactStyles from "./contact.module.css";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";

const Contact = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    message: "",
  });
  const [done, setDone] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (auth.user?.email) {
      setFormData((prev) => ({
        ...prev,
        email: auth.user.email,
        username: auth.user.username,
      }));
    }
  }, [auth.user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post("/send", formData)
      .then((res) => {
        if (res.data === "Success") {
          setFormData({
            username: ``,
            email: ``,
            message: ``,
          });
          setDone(true);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <section className={contactStyles.section}>
        {done && (
          <div className={contactStyles.success}>
            <div className={contactStyles.message}>
              <h2>Message Sent Successfully</h2>
              <button onClick={() => setDone(false)}>Confirm</button>
            </div>
          </div>
        )}
        <div className={contactStyles.container}>
          <h2 className={contactStyles.heading}>Contact Us</h2>
          <form className={contactStyles.form} onSubmit={handleSubmit}>
            <div className={contactStyles.formGroup}>
              <label htmlFor="username" className={contactStyles.label}>
                Username
              </label>
              <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={contactStyles.input} required disabled={auth.user?.username} />
            </div>
            <div className={contactStyles.formGroup}>
              <label htmlFor="email" className={contactStyles.label}>
                Email
              </label>
              <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={contactStyles.input} required disabled={auth.user?.email} />
            </div>
            <div className={contactStyles.formGroup}>
              <label htmlFor="message" className={contactStyles.label}>
                Message
              </label>
              <textarea id="message" name="message" value={formData.message} onChange={handleChange} className={contactStyles.textarea} required></textarea>
            </div>
            <button type="submit" className={contactStyles.button}>
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
