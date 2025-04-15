import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import profileStyles from "./profile.module.css";
import { useParams } from "react-router-dom";
import axiosClient from "../../axiosClient";
const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosClient
      .get(`profile/${id}`)
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));
  }, [id]);
  return (
    <>
      <Navbar />
      <section className={profileStyles.profile}>
        {loading ? (
          <p>Loading .....</p>
        ) : (
          <>
            <div className={profileStyles.left}>
              <h1>Username: {user.username}</h1>
              <h3>Email: {user.email}</h3>
              <h3>Name: {user.name}</h3>
              <span>Signed at: {user.created_at}</span>
              <span>Role: {user.role}</span>
            </div>
            {user.messages && user.messages.length > 0 ? (
              <div className={profileStyles.right}>
                <h1>Messages</h1>
                <table>
                  <thead>
                    <tr>
                      <th>Message Id</th>
                      <th>Message</th>
                      <th>User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.messages.map((el, idx) => (
                      <tr key={idx}>
                        <td>{el.id}</td>
                        <td>{el.message}</td>
                        <td>{el.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Profile;
