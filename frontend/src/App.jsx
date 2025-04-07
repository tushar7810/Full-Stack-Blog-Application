import React, { useContext, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../src/components/pages/Home.jsx";
import About from "../src/components/pages/About.jsx";
import Blogs from "../src/components/pages/Blogs.jsx";
import SingleBlog from "../src/components/pages/SingleBlog.jsx";
import Navbar from "../src/components/layout/Navbar.jsx";
import Footer from "../src/components/layout/Footer.jsx";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/pages/Dashboard.jsx";
import Register from "./components/pages/Register.jsx";
import Login from "./components/pages/Login.jsx";
import AllAuthors from "./components/pages/AllAuthors.jsx";
import { Context } from "./main.jsx";
import Axios from "axios";
import UpdateBlog from "./components/pages/UpdateBlog.jsx";
import UpdateUser from "./components/pages/UpdateUser.jsx";


const App = () => {
  const { setUser, isAuthenticated, setIsAuthenticated, user ,setBlogs} = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        await Axios.get(`${process.env.BACKEND_URL}/user/profile`,{withCredentials: true})
        .then(res => {
          setUser(res.data.user)
        })
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }   
    };
    const fetchBlogs = async () => {
      try {
        const {data} = await Axios.get(`${process.env.BACKEND_URL}/blog/allBlogs`,{withCredentials: true})
        setBlogs(data.allBlogs)
      } catch (error) {
        setBlogs([]);
      }
    };
    fetchUser();
    fetchBlogs();
  }, [isAuthenticated,user]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<SingleBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/authors" element={<AllAuthors />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blog/update/:id" element={<UpdateBlog />} />
          <Route path="/user/update/:id" element={<UpdateUser />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;