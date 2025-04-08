import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axiosClient from "../../axiosClient";
import tableStyles from "./table.module.css";
import logStyles from "../Assets/form.module.css";
import dashboardStyles from "../Assets/form.module.css";
const ShowMessages = () => {
  const [replyForm, setReplyForm] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [done, setDone] = useState(false);
  const [reply, setReply] = useState(``);
  const [userName, setUserName] = useState(``);
  useEffect(() => {
    axiosClient
      .get("/get")
      .then((res) => {
        setLoading(false);
        setMessages(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleReplyForm = (id, userName) => {
    setSelectedId(id);
    setUserName(userName);
    setReplyForm(true);
  };
  const handleReply = (e, id) => {
    e.preventDefault();
    axiosClient
      .post("/reply", {
        id: id,
        reply: reply,
      })
      .then((res) => {
        res.status === 200 ? setDone(true) : setDone(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className={tableStyles.container}>
        {replyForm && (
          <div className={dashboardStyles.replyContainer}>
            <form onSubmit={(e) => handleReply(e, selectedId)}>
              <h1>Reply to {userName}</h1>
              <textarea placeholder="Enter Your Reply..." value={reply} onChange={(e) => setReply(e.target.value)}></textarea>
              <button>Reply</button>
            </form>
          </div>
        )}
        {done && (
          <div onClick={() => setDone(false)} className={logStyles.success}>
            <div className={logStyles.message}>
              <h1>Reply Added Successfully</h1>
              <button onClick={() => (window.location.href = window.location.pathname)}>Confirm</button>
            </div>
          </div>
        )}
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
                <th>Reply</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.message}</td>
                  <td>{el.reply}</td>
                  <td>
                    {/* <button onClick={() => handleReplyForm()}>Reply</button> */}
                    <button onClick={() => handleReplyForm(el.id, el.name)}>Reply</button>
                  </td>
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
