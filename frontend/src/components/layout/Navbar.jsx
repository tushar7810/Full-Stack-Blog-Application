import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { Context } from "../../main";
import { MdDarkMode } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { FcAbout } from "react-icons/fc";
import { LiaBlogSolid } from "react-icons/lia";
import { IoLogOutOutline } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { TiAdjustBrightness } from "react-icons/ti";
import { RiDashboardFill } from "react-icons/ri";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const handleNavbar = () => {
    setShow(!show);
  };
  
  const isDashboard = useLocation("http://localhost:5173/dashboard");
  
  const { mode, setMode, isAuthenticated, user, setIsAuthenticated } = useContext(Context);
  
  const navigateTo = useNavigate();
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "user/logout",
        { withCredentials: true }
      );
      setIsAuthenticated(false);
      toast.success(data.message);
      navigateTo("/");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section
      className={
        isDashboard.pathname === "/dashboard"
          ? "hideNavbar"
          : mode === "light"
          ? "header light-navbar"
          : "header dark-navbar"
      }
    >
      <nav>
        <div className="logo">
          <span><LiaBlogSolid /></span> Info<span>Blog</span>
        </div>
        <div className={show ? "links show" : "links"}>
          <ul>
            <li>
              <Link to={"/"} onClick={handleNavbar}>
                <IoHome /> Home
              </Link>
            </li>
            <li>
              <Link to={"/blogs"} onClick={handleNavbar}>
                <LiaBlogSolid /> Blogs
              </Link>
            </li>
            <li>
              <Link to={"/authors"} onClick={handleNavbar}>
                <ImUsers /> All Authors
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={handleNavbar}>
                <FcAbout /> About
              </Link>
            </li>
          </ul>
          <div className="btns">
            <button
              onClick={() =>
                mode === "light" ? setMode("dark") : setMode("light")
              }
              className={
                mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
              }
            >
              {mode === "light" ? (
                <TiAdjustBrightness className="light-icon" />
              ) : (
                <MdDarkMode className="dark-icon" />
              )}
            </button>
            {isAuthenticated && user.role === "Author" ? (
              <Link
                to={"/dashboard"}
                onClick={handleNavbar}
                className="dashboard-btn"
              >
                <RiDashboardFill /> Dashboard
              </Link>
            ) : (
              ""
            )}
            {!isAuthenticated ? (
              <Link to={"/login"} onClick={handleNavbar} className="login-btn">
                <IoLogIn /> Login
              </Link>
            ) : (
              <div>
                <button className="logout-btn" onClick={handleLogout}>
                  Logout <IoLogOutOutline /> 
                </button>
              </div>
            )}
          </div>
        </div>
        <RxHamburgerMenu className="hamburger" onClick={handleNavbar} />
      </nav>
    </section>
  );
};

export default Navbar;