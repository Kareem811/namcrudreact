import React from "react";
import footerStyles from "./footer.module.css";
import { IoIosLink } from "react-icons/io";
import { Link } from "react-router-dom";
import logo from "../Images/logo.jpeg";
const Footer = () => {
  return (
    <footer>
      <div className={footerStyles.footerData}>
        <div className={footerStyles.links}>
          <h3>Quick Links</h3>
          <ol>
            <li>
              <Link to={"/home"}>
                <IoIosLink size={15} color="#fff" />
                Home
              </Link>
            </li>
            <li>
              <Link to={"/about"}>
                <IoIosLink size={15} color="#fff" />
                About
              </Link>
            </li>
            <li>
              <Link to={"/products"}>
                <IoIosLink size={15} color="#fff" />
                Products
              </Link>
            </li>
          </ol>
        </div>
        <img src={logo} alt="" />
      </div>
      <div className={footerStyles.line}></div>
      <p>Copyrights &copy;2024 Sollam</p>
    </footer>
  );
};

export default Footer;
