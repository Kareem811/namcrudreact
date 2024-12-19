import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import Navbar from "../Navbar/Navbar";
import dashboardStyles from "./dashboard.module.css";
import Actions from "./Actions";
const Dashboard = () => {
  const { auth } = useContext(AuthContext); // Access context values

  if (!auth.user) {
    return <p>Loading...</p>; // Or some other placeholder until auth data is available
  }

  return (
    <>
      <Navbar />
      <section className={dashboardStyles.container}>
        <Actions />
      </section>
    </>
  );
};

export default Dashboard;
