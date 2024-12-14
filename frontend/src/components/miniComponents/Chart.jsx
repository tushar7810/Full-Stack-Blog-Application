import React, { useEffect, useState } from 'react';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  ArcElement, 
  Legend 
} from "chart.js"
import {Doughnut} from "react-chartjs-2"
import axios from 'axios';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  ArcElement, 
  Legend 
)

function Chart() {
  const [myBlogs , setMyBlogs] = useState([])
  useEffect(() => {
    const fetchMyBlogs = async() => {
        const {data} = await axios.get("/blog/myBlogs" , {withCredentials: true})
        setMyBlogs(data.blogs)
      }
    fetchMyBlogs()
  },[])

  const publishedBlogs = myBlogs && myBlogs.filter((blog) => blog.published === true)
  const NotPublishedBlogs = myBlogs && myBlogs.filter((blog) => blog.published === false)

  const data = {
    labels: ["Published" , "Not Published"],
    datasets : [
      {
        label: "Blogs",
        data: [
          publishedBlogs.length > 0 ? publishedBlogs.length : 0 , 
          NotPublishedBlogs.length > 0 ? NotPublishedBlogs.length : 0 
        ],
        borderColor: ["#0e7490", "#facc15"],
        backgroundColor: ["#0e7490", "#facc15"],
        borderWidth: 1,
      },
    ],
  }

  return (
    <>
      <section className='chart-container' style={{heigth: "20vh" }}>
        <h3>Blog Analytics</h3>
        <Doughnut data={data} />
      </section>
    </>
  );
}

export default Chart;
