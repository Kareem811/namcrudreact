import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import aiStyles from "./ai.module.css";
const AIProduction = () => {
  return (
    <>
      <Navbar />

      <div className={aiStyles.container}>
        <h1>AIProduction</h1>
      </div>
      <Footer />
    </>
  );
};

export default AIProduction;
