import React from "react";
import bgStyles from "./background.module.css";
import background from "../../Images/background2.webp";
import { Link } from "react-router-dom";
const BackgroundSection = () => {
  return (
    <section className={bgStyles.container}>
      <img src={background} alt="" loading="lazy" />
      <div className={bgStyles.darkLayer}>
        <div className={bgStyles.backgroundData}>
          <h1>Welcome To Our Website</h1>
          <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </span>
          <Link to={""}>Get Started</Link>
        </div>
      </div>
    </section>
  );
};

export default BackgroundSection;
