import React, { useContext } from 'react';
import { Context } from '../../main';
import LatestBlog from '../miniComponents/LatestBlog.jsx';

const Blogs = () => {
  const { mode, blogs } = useContext(Context)
  // console.log(setBlogs);

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <LatestBlog blogs={blogs} title={"Blogs"}/>
    </article>
  );
}

export default Blogs;
