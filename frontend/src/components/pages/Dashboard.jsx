import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { Navigate } from 'react-router-dom';
import SideBar from '../layout/Sidebar';
import MyProfile from "../miniComponents/MyProfile.jsx"
import CreateBlog from "../miniComponents/CreateBlog.jsx"
import Chart from "../miniComponents/Chart.jsx"
import MyBlogs from "../miniComponents/MyBlogs.jsx"

function Dashboard() {
  const {mode , isAuthenticated, user} = useContext(Context)
  const [component,setComponent] = useState("MyBlogs")

  if(!isAuthenticated || user.role === "Reader"){
    return <Navigate to={"/"}/>
  }
  return (
    <section className={mode === "dark" ? "dark-bg dashboard" : "light-bg dashboard"}>
      <SideBar component={component} setComponent={setComponent} />
        {
          component === "My Profile" ? (< MyProfile/>) : component === "Create Blog" ? (<CreateBlog/>) : component === "Analytics" ? (<Chart/>) : (<MyBlogs/>)
        }
    </section>
  );
}

export default Dashboard;

