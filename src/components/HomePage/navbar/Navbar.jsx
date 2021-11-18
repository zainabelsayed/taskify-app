import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom"
import logo from "../../../assets/images/logo.png";
import "./Navbar.css";

export default function Navbar() {
  /* -------------------------------------------------------------------------- */
  /*                 changing navbar background color on scroll                 */
  /* -------------------------------------------------------------------------- */
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  useEffect(() => {
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (navRef.current !== show) {
        setNavBackground(show);
      }
    };
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <nav
      className="navbar navbar-ligh fixed-top p-0"
      style={{
        transition: "1s ease",
        backgroundColor: navBackground
          ? "rgba(255,255,255,0.9)"
          : "transparent",
      }}
    >
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img className="pe-2" src={logo} alt="" />
          <h1
            className="d-inline-block logo-font"
            style={{
              transition: "1s ease",
              color: navBackground ? "black" : "white",
            }}
          >
            TASKIFY
          </h1>
        </Link>
        <div className="d-flex">
          <button
            className="btn btn-white me-3 rounded-pill shadow-sm"
            type="submit"
          >
            Login
          </button>
          <button
            className="btn btn-white rounded-pill px-4 shadow-sm  d-none d-md-block"
            type="submit"
          >
            Register
          </button>
        </div>
      </div>
    </nav>
  );
}
