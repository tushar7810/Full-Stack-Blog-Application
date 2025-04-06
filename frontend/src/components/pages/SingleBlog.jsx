import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../main';
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

function SingleBlog() {
  const {mode , isAuthenticated , user} = useContext(Context)
  const {id} = useParams()
  const [blog , setBlog] = useState({})
  useEffect( () => {
    const getSingleBlog = async() =>{
      try {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/blog/oneBlog/${id}` , {withCredentials: true})
        console.log(data.blog);
        setBlog(data.blog)
      } catch (error) {
        setBlog({})
        console.log(error)
      }

    }
    getSingleBlog()
  },[])

  if(!isAuthenticated ){
    return <Navigate to={"/"} />
  }

  return (
    <article className={mode === "dark" ? "dark-bg singleBlog" : "light-bg singleBlog"}>
      {
        blog && (
          <section className='container'>
            <div className="category">{blog.category}</div>
            <h1>{blog.title}</h1>
            <div className="writer_section">
              <div className="author">
                <img src={blog.authorAvatar} alt="authorAvatar" />
                <p>{blog.authorName}</p>
              </div>
            </div>
            {
              blog && blog.mainImage && (
                  <img src={blog.mainImage.url} alt="mainBlogImg" className='mainImg'/>
              )
            }
            <p className='intro-text'>{blog.intro}</p>
            <div className="sub-para">
              <h3>{blog.paraOneTitle}</h3>
              {blog && blog.paraOneImage && (
                  <img src={blog.paraOneImage.url} alt="paraOneImage" />
              )}
              <p>{blog.paraOneDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraTwoTitle}</h3>
              {blog && blog.paraTwoImage && (
                  <img src={blog.paraTwoImage.url} alt="paraTwoImage" />
              )}
              <p>{blog.paraTwoDescription}</p>
            </div>
            <div className="sub-para">
              <h3>{blog.paraThreeImage}</h3>
              <p>{blog.paraThreeDescription}</p>
              {blog && blog.paraThreeImage && (
                <img src={blog.paraThreeImage.url} alt="paraThreeImage" />
              )}
            </div>
          </section>
        )}
    </article>
  );
};

export default SingleBlog;
