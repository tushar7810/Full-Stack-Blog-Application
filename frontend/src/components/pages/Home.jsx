import React, { useContext } from 'react';
import { Context } from '../../main';
import HeroSection from "../miniComponents/HeroSection.jsx"
import TrendingBlogs from "../miniComponents/TrendingBlogs.jsx"
import LatestBlog from "../miniComponents/LatestBlog.jsx"
import PopularAuthor from "../miniComponents/PopularAuthor.jsx"

const Home = () => {
  const {mode , blogs } = useContext(Context)
  const filterBlogs = blogs.slice(1, 6);
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <HeroSection />
      <TrendingBlogs />
      <LatestBlog blogs={filterBlogs} heading={"Latest Blogs"}/>
      <PopularAuthor />
    </article>
    
  );
}

export default Home;
