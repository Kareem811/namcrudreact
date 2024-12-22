import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axiosClient from "../../axiosClient";
import tableStyles from "./table.module.css";
const ShowMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosClient
      .get("/get")
      .then((res) => {
        setLoading(false);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <Navbar />
      <div className={tableStyles.container}>
        {loading ? (
          <p>Loading .... </p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Message Id</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default ShowMessages;
