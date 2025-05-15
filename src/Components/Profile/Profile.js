// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";
// import profileStyles from "./profile.module.css";
// import { useParams } from "react-router-dom";
// import axiosClient from "../../axiosClient";
// const Profile = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [content, setContent] = useState("Update");
//   const [updatedUser, setUpdatedUser] = useState({
//     name: ``,
//     username: ``,
//     email: ``,
//     phone: ``,
//   });
//   useEffect(() => {
//     axiosClient
//       .get(`profile/${id}`)
//       .then((res) => {
//         setLoading(false);
//         setUser(res.data.user);
//         setUpdatedUser({
//           name: res.data.user.name,
//           username: res.data.user.username,
//           email: res.data.user.email,
//           phone: res.data.user.phone,
//         });
//       })
//       .catch((err) => console.log(err));
//   }, [id]);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (content === "Save") {
//       axiosClient
//         .post(`/updatedata/${user.id}`, updatedUser)
//         .then((res) => console.log(res))
//         .catch((err) => console.log(err));
//     }
//   };
//   return (
//     <>
//       <Navbar />
//       <section className={profileStyles.profile}>
//         {loading ? (
//           <p>Loading .....</p>
//         ) : (
//           <>
//             <div className={profileStyles.container}>
//               <div className={profileStyles.left}>
//                 <form onSubmit={(e) => handleSubmit(e)}>
//                   <input type="text" value={user.username} onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })} disabled={content === "Update" ? true : false} />
//                   <input type="text" value={user.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} disabled={content === "Update" ? true : false} />
//                   <input type="text" value={user.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} disabled={content === "Update" ? true : false} />
//                   <input type="text" value={user.phone} onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })} disabled={content === "Update" ? true : false} />
//                   <input type="text" value={user.created_at} disabled />
//                   <input type="text" value={user.role} disabled />
//                   {content === "Save" && <button>{content}</button>}
//                 </form>
//                 {content === "Update" && (
//                   <button button onClick={() => setContent("Save")}>
//                     {content}
//                   </button>
//                 )}
//               </div>
//               {user.bookings && user.bookings.length > 0 && (
//                 <div className={profileStyles.middle}>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Booking Id</th>
//                         <th>Serive</th>
//                         <th>Status</th>
//                         <th>Type</th>
//                         <th>Department</th>
//                         <th>Date</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {user.bookings.map((el, idx) => (
//                         <tr key={idx}>
//                           <td>{el.id}</td>
//                           <td>{el.service}</td>
//                           <td>{el.status}</td>
//                           <td>{el.type}</td>
//                           <td>{el.department}</td>
//                           <td>{el.date}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               )}
//               {user.messages && user.messages.length > 0 ? (
//                 <div className={profileStyles.right}>
//                   <h1>Messages</h1>
//                   <table>
//                     <thead>
//                       <tr>
//                         <th>Message Id</th>
//                         <th>Message</th>
//                         <th>User</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {user.messages.map((el, idx) => (
//                         <tr key={idx}>
//                           <td>{el.id}</td>
//                           <td>{el.message}</td>
//                           <td>{el.name}</td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               ) : null}
//             </div>
//           </>
//         )}
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Profile;

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
  const [content, setContent] = useState("Update");
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axiosClient
      .get(`profile/${id}`)
      .then((res) => {
        setLoading(false);
        setUser(res.data.user);
        setUpdatedUser({
          name: res.data.user.name || "",
          username: res.data.user.username || "",
          email: res.data.user.email || "",
          phone: res.data.user.phone || "",
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content === "Save") {
      axiosClient
        .post(`/updatedata/${user.id}`, updatedUser)
        .then((res) => {
          console.log(res);
          setContent("Update");
          setUser({ ...user, ...updatedUser });
          if (res.status === 201) {
            return (window.location.href = window.location.pathname);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Navbar />
      <section className={profileStyles.profile}>
        {loading ? (
          <p>Loading .....</p>
        ) : (
          <>
            <div className={profileStyles.container}>
              <div className={profileStyles.left}>
                <form onSubmit={handleSubmit}>
                  <input type="text" value={updatedUser.username} onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })} disabled={content === "Update"} />
                  <input type="text" value={updatedUser.name} onChange={(e) => setUpdatedUser({ ...updatedUser, name: e.target.value })} disabled={content === "Update"} />
                  <input type="text" value={updatedUser.email} onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })} disabled={content === "Update"} />
                  <input type="text" value={updatedUser.phone} onChange={(e) => setUpdatedUser({ ...updatedUser, phone: e.target.value })} disabled={content === "Update"} />
                  <input type="text" value={user.created_at} disabled />
                  <input type="text" value={user.role} disabled />

                  {content === "Save" && <button type="submit">Save</button>}
                </form>
                {content === "Update" && <button onClick={() => setContent("Save")}>Edit</button>}
              </div>

              {user.bookings && user.bookings.length > 0 && (
                <div className={profileStyles.middle}>
                  <table>
                    <thead>
                      <tr>
                        <th>Booking Id</th>
                        <th>Service</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Description</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {user.bookings.map((el, idx) => (
                        <tr key={idx}>
                          <td>{el.id}</td>
                          <td>{el.service}</td>
                          <td>{el.status}</td>
                          <td>{el.type}</td>
                          <td>{el.description ? el.description : "No Description found"}</td>
                          <td>{el.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {user.messages && user.messages.length > 0 && (
                <div className={profileStyles.right}>
                  <h1>Messages</h1>
                  <table>
                    <thead>
                      <tr>
                        <th>Message Id</th>
                        <th>Message</th>
                        <th>User</th>
                        <th>Reply</th> {/* ✅ أضف العنوان هنا */}
                      </tr>
                    </thead>
                    <tbody>
                      {user.messages.map((el, idx) => (
                        <tr key={idx}>
                          <td>{el.id}</td>
                          <td>{el.message}</td>
                          <td>{el.name}</td>
                          <td>{el.reply ? el.reply : "No reply yet"}</td> {/* ✅ عرض الرد */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Profile;
