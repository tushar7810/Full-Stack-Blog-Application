import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function MyBlogs() {
  const [myBlogs , setMyBlogs] = useState([])
  
  useEffect(() => {
    const fetchMyBlogs = async() => {
      try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/blog/myBlogs` , {withCredentials: true})
          setMyBlogs(data.blogs)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
    fetchMyBlogs()
  },[])

  const deleteBlogHandler = async(id) => {
    await axios.delete(`${process.env.BACKEND_URL}/blog/delete/${id}` , {withCredentials: true})
    .then(res => {
      toast.success(res.data.message)
      setMyBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id))
    }).catch(err => {
      toast.error(err.response.data.message)
    })
  }

  return (
    <>
      <section className='my-blogs'>
        {
          myBlogs && myBlogs.length > 0 ? myBlogs.map(element => {
            return (
              <div className="author-blog-card" key={element._id}>
                {element.mainImage && (<img src={element.mainImage.url} alt='mainImage'/>)}
                <span className='category'>{element.category}</span>
                <h4>{element.title}</h4>
                <div className="btn-wrapper">
                  <Link to={`/blog/update/${element._id}`} className='update-btn'>Update Blog</Link>
                  <button onClick={() => deleteBlogHandler(element._id)} className='delete-btn'>Delete Blog</button>
                </div>
              </div>
            )
          }) : "You have not posted any blog yet!!"
        }
      </section>
    </>
  );
}

export default MyBlogs;
