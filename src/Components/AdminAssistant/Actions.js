import React, { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

import dashboardStyles from "./dashboard.module.css";
const Actions = () => {
  const [actions] = useState([
    {
      name: "Add Product",
      path: "addproduct",
      icon: <IoIosAddCircleOutline size={40} />,
    },
    {
      name: "Show Product",
      path: "showproducts",
      icon: <FaMagnifyingGlass size={40} />,
    },
    {
      name: "Show Users",
      path: "showusers",
      icon: <FaEdit size={40} />,
    },
  ]);
  return (
    <>
      <h1>Dashboard</h1>
      <div className={dashboardStyles.actions}>
        {actions.map((el, idx) => (
          <Link to={el.path} className={dashboardStyles.action} key={idx}>
            {el.icon}
            {el.name}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Actions;
