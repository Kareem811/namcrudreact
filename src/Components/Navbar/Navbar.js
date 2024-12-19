import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./nav.css";
import { IoLogInOutline } from "react-icons/io5";
import { FaRegRegistered } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AuthContext } from "../../Context/AuthContext";
import { MdOutlinePrivacyTip } from "react-icons/md";
const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [words, setWords] = useState(window.innerWidth <= 1050);
  const [menu, setMenu] = useState(window.innerWidth <= 850);
  const [bigMenu, setBigMenu] = useState(false);
  const [close, setClose] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  const navRef = useRef();
  const [navWidth, setNavWidth] = useState(null);
  const checkMenu = (menuSize) => {
    setWords(menuSize <= 1050);
    setMenu(menuSize <= 850);
  };
  useEffect(() => {
    const handleResize = () => {
      checkMenu(window.innerWidth);
      if (navRef.current) {
        setNavWidth(navRef.current.getBoundingClientRect().width);
      }
    };
    const handleScroll = () => {
      if (window.scrollY > 923) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    if (navRef.current) {
      setNavWidth(navRef.current.getBoundingClientRect().width);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const changeMenu = () => {
    setBigMenu(!bigMenu);
    setClose(!close);
  };

  return (
    <header style={window.location.pathname === "/" ? (scrolling ? { background: `#fff`, padding: `10px` } : { background: `rgba(0,0,0,0.3)`, padding: 0 }) : undefined}>
      <nav
        ref={navRef}
        style={window.location.pathname === "/" ? (scrolling ? { color: "#2b2b2b", padding: `20px`, width: `calc(100% - 400px)` } : { padding: 0, width: `90%`, color: "#fff" }) : undefined}>
        <span>LOGO</span>
        <ul
          className={bigMenu ? "bigMenu" : undefined}
          style={
            menu
              ? bigMenu
                ? {
                    display: "block",
                    overflow: "visible",
                    height: "auto",
                    width: `${navWidth}px`,
                  }
                : { display: "none" }
              : { display: "flex", height: "auto" }
          }>
          {auth.user ? (
            <>
              <li>
                <NavLink style={{ textTransform: "capitalize" }} to={window.location.pathname}>
                  <MdOutlinePrivacyTip size={23} />
                  Welcome {!words && auth.user.username} ({auth.user.role})
                </NavLink>
              </li>
              <li>
                <button onClick={() => logout()}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to={"/login"}>
                  <IoLogInOutline size={23} />
                  {!words && "Login"}
                </NavLink>
              </li>
              <li>
                <NavLink to={"/register"}>
                  <FaRegRegistered size={23} />
                  {!words && "Register"}
                </NavLink>
              </li>
            </>
          )}
        </ul>
        {menu ? (
          close ? (
            <IoCloseCircleOutline size={30} color="darkred" cursor={"pointer"} onClick={changeMenu} />
          ) : (
            <IoMenu size={30} color="darkred" cursor={"pointer"} onClick={changeMenu} />
          )
        ) : (
          bigMenu && <IoCloseCircleOutline size={30} color="darkred" cursor={"pointer"} onClick={changeMenu} />
        )}
      </nav>
    </header>
  );
};

export default Navbar;
