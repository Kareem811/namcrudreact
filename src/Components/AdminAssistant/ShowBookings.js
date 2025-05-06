// import React, { useEffect, useState } from "react";
// import Navbar from "../Navbar/Navbar";
// import axiosClient from "../../axiosClient";
// import tableStyles from "./table.module.css";
// import logStyles from "../Assets/form.module.css";
// import dashboardStyles from "../Assets/form.module.css";
// const ShowBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     axiosClient
//       .get("/bookings")
//       .then((res) => {
//         if (res.status === 200) {
//           console.log(res.data.bookings);
//           setLoading(false);
//           setBookings(res.data.bookings);
//         }
//       })
//       .catch((err) => console.log(err));
//   }, []);
//   const handleStatus = (id, status) => {
//     axiosClient
//       .put(`/handlestatus/${id}`, status)
//       .then((res) => {
//         console.log(res);
//         if (res.status === 200) {
//           return (window.location.href = window.location.pathname);
//         }
//       })
//       .catch((err) => console.log(err));
//   };
//   return (
//     <>
//       <Navbar />
//       <div className={tableStyles.container}>
//         {loading ? (
//           <p>Loading .....</p>
//         ) : (
//           <table>
//             <thead>
//               <tr>
//                 <th>#</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Phone</th>
//                 <th>Service</th>
//                 <th>Date</th>
//                 <th>Type</th>
//                 <th>Status</th>
//                 <th>Accept</th>
//               </tr>
//             </thead>
//             <tbody>
//               {bookings.map((el) => (
//                 <tr key={el.id}>
//                   <td>{el.id}</td>
//                   <td>{el.user.username ? el.user.username : "No username found"}</td>
//                   <td>{el.user.email ? el.user.email : "No email found"}</td>
//                   <td>{el.user.phone}</td>
//                   <td>{el.service}</td>
//                   <td>{el.date}</td>
//                   <td>{el.type}</td>
//                   <td style={{ textTransform: "capitalize" }}>{el.status}</td>
//                   <td style={{ textTransform: "capitalize" }}>
//                     {el.status === "pending" || el.stats === "rejected" ? (
//                       <button onClick={() => handleStatus(el.id, el.status)}>Accept</button>
//                     ) : el.status === "accepted" ? (
//                       <button onClick={() => handleStatus(el.id, el.status)}>Reject</button>
//                     ) : (
//                       <button onClick={() => handleStatus(el.id, el.status)}>Accept</button>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}
//       </div>
//     </>
//   );
// };

// export default ShowBookings;



import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import axiosClient from "../../axiosClient";
import tableStyles from "./table.module.css";

const ShowBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosClient
      .get("/bookings")
      .then((res) => {
        if (res.status === 200) {
          setBookings(res.data.bookings);
        }
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleStatus = (id, currentStatus) => {
    axiosClient
      .put(`/handlestatus/${id}`, { status: currentStatus }) // send as object
      .then((res) => {
        if (res.status === 200) {
          // Refresh the bookings without full reload
          setBookings((prev) =>
            prev.map((booking) =>
              booking.id === id
                ? {
                    ...booking,
                    status: currentStatus === "accepted" ? "rejected" : "accepted",
                  }
                : booking,
            ),
          );
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <div className={tableStyles.container}>
        {loading ? (
          <p>Loading .....</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Service</th>
                <th>Date</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.user?.username || "No username found"}</td>
                  <td>{el.user?.email || "No email found"}</td>
                  <td>{el.user?.phone || "N/A"}</td>
                  <td>{el.service}</td>
                  <td>{el.date}</td>
                  <td>{el.type}</td>
                  <td style={{ textTransform: "capitalize" }}>{el.status}</td>
                  <td>
                    {el.status === "pending" || el.status === "rejected" ? (
                      <button onClick={() => handleStatus(el.id, el.status)}>Accept</button>
                    ) : (
                      <button onClick={() => handleStatus(el.id, el.status)}>Reject</button>
                    )}
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

export default ShowBookings;
