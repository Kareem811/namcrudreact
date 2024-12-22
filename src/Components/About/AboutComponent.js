import React from "react";
import Navbar from "../Navbar/Navbar";
import aboutStyles from "./about.module.css";
import Footer from "../Footer/Footer";
import aboutImg from "../Images/background2.webp";
import { IoIdCard } from "react-icons/io5";
const AboutComponent = () => {
  return (
    <>
      <Navbar />
      <section className={aboutStyles.container}>
        <h1>About Us</h1>
        <div className={aboutStyles.content}>
          <div className={aboutStyles.aboutData}>
            <h2>Who Are We</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
          <div className={aboutStyles.aboutImage}>
            <img src={aboutImg} alt="" />
          </div>
        </div>
        <div className={aboutStyles.data}>
          <div className={aboutStyles.objective}>
            <IoIdCard size={50} />
            <h2>Our Vision</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
          <div className={aboutStyles.objective}>
            <IoIdCard size={50} />
            <h2>Our Mission</h2>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It
              was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including
              versions of Lorem Ipsum.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default AboutComponent;
