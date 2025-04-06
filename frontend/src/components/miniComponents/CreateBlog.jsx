import React, { useState } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';

const CreateBlog = () => {
  const [category , setCategory] = useState("")
  const [mainImage , setMainImage] = useState("")
  const [intro , setIntro ] = useState("")
  const [paraOneTitle , setParaOneTitle] = useState("")
  const [paraOneImage, setParaOneImage] = useState("")
  const [paraOneDescription , setParaOneDescription] = useState("")
  const [paraTwoTitle , setParaTwoTitle] = useState("")
  const [paraTwoImage, setParaTwoImage] = useState("")
  const [paraTwoDescription , setParaTwoDescription] = useState("")
  const [paraThreeTitle , setParaThreeTitle] = useState("")
  const [paraThreeImage, setParaThreeImage] = useState("")
  const [paraThreeDescription , setParaThreeDescription] = useState("")
  const [mainImagePreview , setMainImagePreview] = useState("")
  const [paraOneImagePreview, setParaOneImagePreview] = useState("")
  const [paraTwoImagePreview, setParaTwoImagePreview] = useState("")
  const [paraThreeImagePreview, setParaThreeImagePreview] = useState("")
  const [title , setTitle] = useState("")
  const [published , setPublished] = useState(true)

  const mainImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setMainImagePreview(reader.result)
      setMainImage(file)
    }
  }
  const paraOneImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setParaOneImagePreview(reader.result)
      setParaOneImage(file)
    }
  }
  const paraTwoImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setParaTwoImagePreview(reader.result)
      setParaTwoImage(file)
    }
  }
  const paraThreeImageHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setParaThreeImagePreview(reader.result)
      setParaThreeImage(file)
    }
  }

  const handleBlog = async(e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append("title" , title)
    formData.append("category" , category)
    formData.append("mainImage" , mainImage)
    formData.append("intro" , intro)
    formData.append("published" , published)
    if(paraOneTitle.length > 0){
      formData.append("paraOneTitle",paraOneTitle)
    }if(paraOneImage){
      formData.append('paraOneImage',paraOneImage)
    }if(paraOneDescription.length > 0){
      formData.append("paraOneDescription",paraOneDescription)
    }
    if(paraTwoTitle.length > 0){
      formData.append("paraTwoTitle",paraTwoTitle)
    }if(paraTwoImage){
      formData.append('paraTwoImage',paraTwoImage)
    }if(paraTwoDescription.length > 0){
      formData.append("paraTwoDescription",paraTwoDescription)
    }
    if(paraThreeTitle.length > 0){
      formData.append("paraThreeTitle",paraThreeTitle)
    }if(paraThreeImage){
      formData.append('paraThreeImage',paraThreeImage)
    }if(paraThreeDescription.length > 0){
      formData.append("paraThreeDescription",paraThreeDescription)
    }

    try {
      await axios.post(`${process.env.BACKEND_URL}/blog/post`, formData , {withCredentials: true , headers: {"Content-Type" : "mutlipart/form-data"}})
      .then( res => {
        setTitle(""),
        setIntro(""),
        setCategory(""),
        setMainImage(""),
        setMainImagePreview(""),
        setParaOneImage(""),
        setParaOneTitle(""),
        setParaOneImagePreview(""),
        setParaOneDescription(""),
        setParaTwoImage(""),
        setParaTwoTitle(""),
        setParaTwoImagePreview(""),
        setParaTwoDescription(""),
        setParaThreeImage(""),
        setParaThreeTitle(""),
        setParaThreeImagePreview(""),
        setParaThreeDescription(""),
        setPublished(true)
        toast.success(res.data.message)
      }
      )
    } catch (error) {
      toast.error(error.response.data.message)
    }


  };

  return (
    <>
      <section className='create-blog'>
        <h3>Create Blog</h3>
        <form onSubmit={handleBlog}>
          <div className="category-box">
            <label htmlFor="">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="">Select Blog Category</option>
              <option value="LifeStyle">LifeStyle</option>
              <option value="Technology">Technology</option>
              <option value="Economy">Economy</option>
              <option value="Business">Business</option>
              <option value="Travel">Travel</option>
              <option value="Sports">Sports</option>
            </select>
          </div>
          <input type="text" placeholder='Blog Main Title' value={title} onChange={(e) => setTitle(e.target.value)} />
          <div style={{display: "flex" , flexDirection: "column"}}>
            <label>Blog Main Image</label>
            <img src={mainImagePreview ? `${mainImagePreview}` : '/imgd.png'} alt="mainImage" className='mainImg' />
            <input type="file" onChange={mainImageHandler} style={{border:"none"}}  />
            <textarea rows={10} placeholder='Blog Intro....' value={intro} onChange={(e) => setIntro(e.target.value)} className='intro' />
          </div>
          <div className="sub-para">
            <input type="text" placeholder='Paragraph one title' value={paraOneTitle} onChange={(e) => setParaOneTitle(e.target.value)} />
            <img src={paraOneImagePreview ? `${paraOneImagePreview}` : '/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraOneImageHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog first paragraph .....' value={paraOneDescription} onChange={(e) => setParaOneDescription(e.target.value)}/>
          </div>

          <div className="sub-para">
            <input type="text" placeholder='Paragraph two title' value={paraTwoTitle} onChange={(e) => setParaTwoTitle(e.target.value)} />
            <img src={paraTwoImagePreview ? `${paraTwoImagePreview}` : '/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraTwoImageHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog second paragraph .....' value={paraTwoDescription} onChange={(e) => setParaTwoDescription(e.target.value)}/>
          </div>

          <div className="sub-para">
            <input type="text" placeholder='Paragraph three title' value={paraThreeTitle} onChange={(e) => setParaThreeTitle(e.target.value)} />
            <img src={paraThreeImagePreview ? `${paraThreeImagePreview}` : '/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraThreeImageHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog three paragraph .....' value={paraThreeDescription} onChange={(e) => setParaThreeDescription(e.target.value)}/>
          </div>

          <div className="publish-box">
            <label htmlFor="">Wants to publish now</label>
            <select value={published} onChange={(e) => setPublished(e.target.value)}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <button type="submit" className='create-btn'>Create Blog</button>
        </form>
      </section>
    </>
  );
}

export default CreateBlog;
