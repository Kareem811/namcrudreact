import React, { useContext, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass, FaMessage } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import dashboardStyles from "./dashboard.module.css";
import { AuthContext } from "../../Context/AuthContext";

const Actions = () => {
  const { auth } = useContext(AuthContext);

  const [actions] = useState([
    {
      name: "Add Product",
      path: "addproduct",
      icon: <IoIosAddCircleOutline size={40} />,
    },
    {
      name: "Show Products",
      path: "showproducts",
      icon: <FaMagnifyingGlass size={40} />,
    },
    {
      name: "Show Users",
      path: "showusers",
      icon: <FaEdit size={40} />,
    },
    {
      name: "Show Messages",
      path: "showmessages",
      icon: <FaMessage size={40} />,
    },
  ]);

  return (
    <>
      <h1>Dashboard</h1>
      <div className={dashboardStyles.actions}>
        {actions
          .filter(
            (el) => !(auth.user.role === "assistant" && el.name === "Show Users")
          )
          .map((el, idx) => (
            <Link to={el.path} className={dashboardStyles.action} key={idx}>
              {el.icon}
              {el.name}
            </Link>
          ))}
        {auth.user.role === "assistant" && (
          <Link to={"showbookings"} className={dashboardStyles.action}>
            <FaEdit size={40} />
            Show Bookings
          </Link>
        )}
      </div>
    </>
  );
};

export default Actions;
