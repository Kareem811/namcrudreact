// import React, { useContext, useEffect, useRef, useState } from "react";
// import { Link, NavLink } from "react-router-dom";
// import "./nav.css";
// import { IoLogInOutline } from "react-icons/io5";
// import { FaRegRegistered } from "react-icons/fa6";
// import { IoMenu } from "react-icons/io5";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import { AuthContext } from "../../Context/AuthContext";
// import { MdOutlinePrivacyTip } from "react-icons/md";
// import logo from "../Images/logo2.png";
// const Navbar = () => {
//   const { auth, logout } = useContext(AuthContext);
//   const [words, setWords] = useState(window.innerWidth <= 1050);
//   const [menu, setMenu] = useState(window.innerWidth <= 1320);
//   const [bigMenu, setBigMenu] = useState(false);
//   const [close, setClose] = useState(false);
//   const [scrolling, setScrolling] = useState(false);
//   const navRef = useRef();
//   const [navWidth, setNavWidth] = useState(null);
//   const checkMenu = (menuSize) => {
//     setWords(menuSize <= 1050);
//     setMenu(menuSize <= 1320);
//   };
//   useEffect(() => {
//     const handleResize = () => {
//       checkMenu(window.innerWidth);
//       if (navRef.current) {
//         setNavWidth(navRef.current.getBoundingClientRect().width);
//       }
//     };
//     const handleScroll = () => {
//       if (window.scrollY > 923) {
//         setScrolling(true);
//       } else {
//         setScrolling(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     window.addEventListener("scroll", handleScroll);

//     if (navRef.current) {
//       setNavWidth(navRef.current.getBoundingClientRect().width);
//     }

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const changeMenu = () => {
//     setBigMenu(!bigMenu);
//     setClose(!close);
//   };
//   return (
//     <header
//       style={
//         window.location.pathname === "/" || window.location.pathname === "/home"
//           ? scrolling
//             ? { background: `#fff`, padding: `10px` }
//             : { background: `rgba(255,255,255,0.5)`, padding: 0 }
//           : undefined
//       }
//     >
//       <nav
//         ref={navRef}
//         style={
//           window.location.pathname === "/" ||
//           window.location.pathname === "/home"
//             ? scrolling
//               ? { color: "#2b2b2b", padding: `20px` }
//               : { padding: 0, width: `90%`, color: "#fff" }
//             : undefined
//         }
//       >
//         <Link to={"/home"}>
//           <img src={logo} alt="" />
//         </Link>
//         <ul
//           className={bigMenu ? "bigMenu" : undefined}
//           style={
//             menu
//               ? bigMenu
//                 ? {
//                     display: "block",
//                     overflow: "visible",
//                     height: "auto",
//                     width: `${navWidth}px`,
//                   }
//                 : { display: "none" }
//               : { display: "flex", height: "auto" }
//           }
//         >
//           {auth.user ? (
//             <>
//               {auth.role === "user" ? (
//                 <>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/home"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Home
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/about"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       About
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/products"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Products
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/contact"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Contact
//                     </NavLink>
//                   </li>
//                 </>
//               ) : (
//                 <>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/admin/dashboard"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Dashboard
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/admin/dashboard/addproduct"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Add Products
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/admin/dashboard/showproducts"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Show Products
//                     </NavLink>
//                   </li>
//                   <li>
//                     <NavLink
//                       style={
//                         ({ textTransform: "capitalize" },
//                         window.location.pathname === "/" ||
//                         window.location.pathname === "/home"
//                           ? scrolling
//                             ? { color: "#bc9a6d" }
//                             : { color: "#fff" }
//                           : { color: "#bc9a6d" })
//                       }
//                       to={"/admin/dashboard/showusers"}
//                     >
//                       <MdOutlinePrivacyTip size={23} />
//                       Show Users
//                     </NavLink>
//                   </li>
//                 </>
//               )}
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={window.location.pathname}
//                 >
//                   <MdOutlinePrivacyTip size={23} />
//                   Welcome {!words && auth.user.username} ({auth.user.role})
//                 </NavLink>
//               </li>
//               <li>
//                 <button onClick={() => logout()}>Logout</button>
//               </li>
//             </>
//           ) : (
//             <>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/home"}
//                 >
//                   <MdOutlinePrivacyTip size={23} />
//                   Home
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/about"}
//                 >
//                   <MdOutlinePrivacyTip size={23} />
//                   About
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/products"}
//                 >
//                   <MdOutlinePrivacyTip size={23} />
//                   Products
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/contact"}
//                 >
//                   <MdOutlinePrivacyTip size={23} />
//                   Contact
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/login"}
//                 >
//                   <IoLogInOutline size={23} />
//                   {!words && "Login"}
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   style={
//                     ({ textTransform: "capitalize" },
//                     window.location.pathname === "/" ||
//                     window.location.pathname === "/home"
//                       ? scrolling
//                         ? { color: "#bc9a6d" }
//                         : { color: "#fff" }
//                       : { color: "#bc9a6d" })
//                   }
//                   to={"/register"}
//                 >
//                   <FaRegRegistered size={23} />
//                   {!words && "Register"}
//                 </NavLink>
//               </li>
//             </>
//           )}
//         </ul>
//         {menu ? (
//           close ? (
//             <IoCloseCircleOutline
//               size={30}
//               color="#bc9a6d"
//               cursor={"pointer"}
//               onClick={changeMenu}
//             />
//           ) : (
//             <IoMenu
//               size={30}
//               color="#bc9a6d"
//               cursor={"pointer"}
//               onClick={changeMenu}
//             />
//           )
//         ) : (
//           bigMenu && (
//             <IoCloseCircleOutline
//               size={30}
//               color="#bc9a6d"
//               cursor={"pointer"}
//               onClick={changeMenu}
//             />
//           )
//         )}
//       </nav>
//     </header>
//   );
// };

// export default Navbar;

import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { IoLogInOutline, IoMenu, IoCloseCircleOutline } from "react-icons/io5";
import { FaRegRegistered } from "react-icons/fa6";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { AuthContext } from "../../Context/AuthContext";
import logo from "../Images/logo2.png";
import "./nav.css";

const Navbar = () => {
  const { auth, logout } = useContext(AuthContext);
  const [words, setWords] = useState(window.innerWidth <= 1050);
  const [menu, setMenu] = useState(window.innerWidth <= 1320);
  const [bigMenu, setBigMenu] = useState(false);
  const [close, setClose] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const navRef = useRef();
  const [navWidth, setNavWidth] = useState(null);

  const checkMenu = (menuSize) => {
    setWords(menuSize <= 1050);
    setMenu(menuSize <= 1320);
  };

  useEffect(() => {
    const handleResize = () => {
      checkMenu(window.innerWidth);
      if (navRef.current) {
        setNavWidth(navRef.current.getBoundingClientRect().width);
      }
    };

    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrolling(window.scrollY > 100);
      });
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
    <header className={`navbar-container ${scrolling ? "scrolled" : ""}`}>
      <nav ref={navRef}>
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
        <ul
          className={bigMenu ? "bigMenu" : ""}
          style={
            menu
              ? bigMenu
                ? { display: "block", width: `${navWidth}px` }
                : { display: "none" }
              : { display: "flex" }
          }
        >
          {auth.user ? (
            auth.role === "user" ? (
              <>
                <li>
                  <NavLink to="/home">Home</NavLink>
                </li>
                <li>
                  <NavLink to="/about">About</NavLink>
                </li>
                <li>
                  <NavLink to="/products">Products</NavLink>
                </li>
                <li>
                  <NavLink to="/contact">Contact</NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/admin/dashboard">Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to="/admin/dashboard/addproduct">
                    Add Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/dashboard/showproducts">
                    Show Products
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/dashboard/showusers">Show Users</NavLink>
                </li>
              </>
            )
          ) : (
            <>
              <li>
                <NavLink to="/home">Home</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/products">Products</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
              <li>
                <NavLink to="/login">
                  <IoLogInOutline size={23} /> {!words && "Login"}
                </NavLink>
              </li>
              <li>
                <NavLink to="/register">
                  <FaRegRegistered size={23} /> {!words && "Register"}
                </NavLink>
              </li>
            </>
          )}
          {auth.user && (
            <li>
              <span>
                Welcome {!words && auth.user.username} ({auth.user.role})
              </span>
            </li>
          )}
          {auth.user && (
            <li>
              <button onClick={logout}>Logout</button>
            </li>
          )}
        </ul>
        {menu &&
          (close ? (
            <IoCloseCircleOutline
              size={30}
              className="menu-icon"
              onClick={changeMenu}
            />
          ) : (
            <IoMenu size={30} className="menu-icon" onClick={changeMenu} />
          ))}
      </nav>
    </header>
  );
};

export default Navbar;
