import React from "react";
import Navbar from "../Navbar/Navbar";
import BackgroundSection from "./Background Section/BackgroundSection";
import AboutSection from "./About Section/AboutSection";
import Footer from "../Footer/Footer";
import Services from "./Services/Services";
import Contact from "../Contact/Contact";
const HomeCompnent = () => {
  return (
    <>
      <Navbar />
      <BackgroundSection />
      <AboutSection />
      <Services />
      <Footer />
    </>
  );
};

export default HomeCompnent;
