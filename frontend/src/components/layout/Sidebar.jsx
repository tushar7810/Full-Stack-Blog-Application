import React, { useContext, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Context } from "../../main";
import { CiLight } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoCreateSharp } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BiSolidCloudUpload } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";

const SideBar = ({ setComponent }) => {
  const [show, setShow] = useState(false);
  const { mode, setMode, setIsAuthenticated, user } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        "user/logout",{ withCredentials: true }
      ).then(res => {
        setIsAuthenticated(false);
      toast.success(res.data.message);
      navigateTo("/");
      })
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const gotoHome = () => {
    navigateTo("/");
  };
  const handleComponent = (value) => {
    setComponent(value);
  };
  return (
    <>
      <div className="icon-wrapper" onClick={() => setShow(!show)}>
        <RxHamburgerMenu />
      </div>
      <section className={show ? "show-sidebar sidebar" : "sidebar"}>
        <div className="icon-wrapper-arrow" onClick={() => setShow(!show)}>
          <FaArrowLeft />
        </div>
        <div className="user-detail">
          <img src={user && user.avatar.url} alt="avatar" />
          <p>{user.name}</p>
        </div>
        <ul>
          <button onClick={() => handleComponent("My Blogs")}>
            <BiSolidCloudUpload />My Blogs</button>
          <button onClick={() => handleComponent("Create Blog")}>
            {< IoCreateSharp />}Create 
          </button>
          <button onClick={() => handleComponent("Analytics")}>
            {<IoAnalyticsSharp/>} Analytics
          </button>
          <button onClick={() => handleComponent("My Profile")}>
            {<CgProfile />}My Profile
          </button>
          <button onClick={gotoHome}> <span><FaHome /></span>Home</button>
          <button onClick={handleLogout}> 
            {< IoMdLogOut/>}Logout</button>
          <button
            onClick={() =>
              mode === "light" ? setMode("dark") : setMode("light")
            }
            className={
              mode === "light" ? "mode-btn light-mode" : "mode-btn dark-mode"
            }
          >
            {mode === "light" ? (
              <CiLight className="light-icon" />
            ) : (
              <MdDarkMode className="dark-icon" />
            )}
          </button>
        </ul>
      </section>
    </>
  );
};

export default SideBar;