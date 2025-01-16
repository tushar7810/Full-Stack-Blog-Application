import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { Context } from '../../main';

const LatestBlog = ({newClass ,blogs,heading}) => {
  const {mode} = useContext(Context)
  return (
    <section className={(newClass && newClass.length > 0 ? "dashboard-blogs blogs" : "blogs") }>
      <h3>{heading}</h3>
      <div className="container">
        {
          blogs && blogs.length > 0 ?  blogs.map((element) => {
            return(
              <Link to={`/blog/${element._id}`} key={element._id} className='card'>
                <img src={element.mainImage.url} alt="mainImg" />
                <span>{element.category}</span>
                <h4>{element.title}</h4>
                <div className="writer_section">
                    <div className="author">
                      <img src={element.authorAvatar} alt="authorAvatar" />
                      <p>{element.authorName}</p>
                    </div>
                  </div>
              </Link>
            )
          }) : (
            <BeatLoader color='gray' size={30} />
          )
        }
      </div>
    </section>
  );
}

export default LatestBlog;
