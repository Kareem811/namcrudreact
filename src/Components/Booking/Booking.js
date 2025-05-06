// import React, { useState } from "react";
// import bookingStyles from "./booking.module.css";
// import axiosClient from "../../axiosClient";
// import Navbar from "../Navbar/Navbar";
// import Footer from "../Footer/Footer";

// const Booking = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     number: "",
//     department: "",
//     service: "",
//     type: "online",
//     date: "",
//     time: "",
//   });

//   const [done, setDone] = useState(false);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axiosClient
//       .post("/booking", formData)
//       .then((res) => {
//         if (res.data === "Success") {
//           setFormData({
//             username: "",
//             number: "",
//             department: "",
//             service: "",
//             type: "online",
//             date: "",
//             time: "",
//           });
//           setDone(true);
//         }
//       })
//       .catch((err) => console.log(err));
//   };

//   return (
//     <>
//       <Navbar />
//       <section className={bookingStyles.section}>
//         {done && (
//           <div className={bookingStyles.success}>
//             <div className={bookingStyles.message}>
//               <h2>Message Sent Successfully</h2>
//               <button onClick={() => setDone(false)}>Confirm</button>
//             </div>
//           </div>
//         )}
//         <div className={bookingStyles.container}>
//           <h2 className={bookingStyles.heading}>Book Now</h2>
//           <form className={bookingStyles.form} onSubmit={handleSubmit}>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="username" className={bookingStyles.label}>
//                 Username
//               </label>
//               <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="number" className={bookingStyles.label}>
//                 Number
//               </label>
//               <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="department" className={bookingStyles.label}>
//                 Department
//               </label>
//               <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="service" className={bookingStyles.label}>
//                 Service
//               </label>
//               <input type="text" id="service" name="service" value={formData.service} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="type" className={bookingStyles.label}>
//                 Type
//               </label>
//               <select name="type" value={formData.type} onChange={handleChange} className={bookingStyles.input}>
//                 <option value="online">Online</option>
//                 <option value="offline">Offline</option>
//               </select>
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="date" className={bookingStyles.label}>
//                 Date
//               </label>
//               <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <div className={bookingStyles.formGroup}>
//               <label htmlFor="time" className={bookingStyles.label}>
//                 Time
//               </label>
//               <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className={bookingStyles.input} required />
//             </div>
//             <button type="submit" className={bookingStyles.button}>
//               Submit
//             </button>
//           </form>
//         </div>
//       </section>
//       <Footer />
//     </>
//   );
// };

// export default Booking;

import React, { useState, useContext } from "react";
import bookingStyles from "./booking.module.css";
import axiosClient from "../../axiosClient";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";

const Booking = () => {
  const { auth } = useContext(AuthContext);
  const { user } = auth;
  const [formData, setFormData] = useState({
    username: user.username !== "" ? user.username : "",
    number: user.phone !== "" ? user.phone : "",
    department: "",
    service: "",
    type: "online",
    date: "",
    time: "",
  });

  const [done, setDone] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSend = {
      username: formData.username,
      number: formData.number,
      department: formData.department,
      service: formData.service,
      type: formData.type,
      date: formData.date,
      time: formData.time,
    };

    if (user) {
      dataToSend.user_id = user.id;
    } else {
      dataToSend.username = formData.username;
      dataToSend.number = formData.number;
    }

    axiosClient
      .post("/booking", dataToSend)
      .then((res) => {
        if (res.data.message === "Booking created successfully" || res.data === "Success") {
          setFormData({
            username: "",
            number: "",
            department: "",
            service: "",
            type: "online",
            date: "",
            time: "",
          });
          setDone(true);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <Navbar />
      <section className={bookingStyles.section}>
        {done && (
          <div className={bookingStyles.success}>
            <div className={bookingStyles.message}>
              <h2>Booking Submitted Successfully</h2>
              <button onClick={() => setDone(false)}>OK</button>
            </div>
          </div>
        )}

        <div className={bookingStyles.container}>
          <h2 className={bookingStyles.heading}>Book Now</h2>
          <form className={bookingStyles.form} onSubmit={handleSubmit}>
            {!user && (
              <>
                <div className={bookingStyles.formGroup}>
                  <label htmlFor="username" className={bookingStyles.label}>
                    Username
                  </label>
                  <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} className={bookingStyles.input} required />
                </div>
                <div className={bookingStyles.formGroup}>
                  <label htmlFor="number" className={bookingStyles.label}>
                    Number
                  </label>
                  <input type="number" id="number" name="number" value={formData.number} onChange={handleChange} className={bookingStyles.input} required />
                </div>
              </>
            )}
            <div className={bookingStyles.formGroup}>
              <label htmlFor="department" className={bookingStyles.label}>
                Department
              </label>
              <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} className={bookingStyles.input} required />
            </div>
            <div className={bookingStyles.formGroup}>
              <label htmlFor="service" className={bookingStyles.label}>
                Service
              </label>
              <input type="text" id="service" name="service" value={formData.service} onChange={handleChange} className={bookingStyles.input} required />
            </div>
            <div className={bookingStyles.formGroup}>
              <label htmlFor="type" className={bookingStyles.label}>
                Type
              </label>
              <select name="type" value={formData.type} onChange={handleChange} className={bookingStyles.input}>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>
            <div className={bookingStyles.formGroup}>
              <label htmlFor="date" className={bookingStyles.label}>
                Date
              </label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} className={bookingStyles.input} required />
            </div>
            <div className={bookingStyles.formGroup}>
              <label htmlFor="time" className={bookingStyles.label}>
                Time
              </label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} className={bookingStyles.input} required />
            </div>
            <button type="submit" className={bookingStyles.button}>
              Submit
            </button>
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Booking;
