import axios from 'axios';
import React , { useEffect, useState , useContext } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { Context } from '../../main';

const UpdateBlog = () =>{
  const {id} = useParams()
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

  useEffect(() => {
    const fetchBlog = async() => {
      try {
        const {data} = await axios.get(`/blog/oneBlog/${id}` , {withCredentials: true})
        setTitle(data.blog.title)
        setIntro(data.blog.intro)
        setCategory(data.blog.category)
        setPublished(data.blog.published)
        setMainImage(data.blog.mainImage.url)
        setParaOneTitle(data.blog.paraOneTitle)
        setParaOneDescription(data.blog.paraOneDescription)
        data.blog.paraOneImage && setParaOneImage(data.blog.paraOneImage.url)
        setParaTwoTitle(data.blog.paraTwoTitle)
        setParaTwoDescription(data.blog.paraTwoDescription)
        data.blog.paraTwoImage && setParaTwoImage(data.blog.paraTwoImage.url)
        setParaThreeTitle(data.blog.paraThreeTitle)
        setParaThreeDescription(data.blog.paraThreeDescription)
        data.blog.paraThreeImage && setParaThreeImage(data.blog.paraThreeImage.url)
      } catch (error) {
        toast.error(error.response.data.message)
      }
    };
    fetchBlog()
  },[id]);

  const handleUpdate = async(e) => {
    e.preventDefault()
    const updatedData = new FormData()
    updatedData.append("title" , title)
    updatedData.append("intro" , intro )
    updatedData.append("category" , category)
    updatedData.append("published" , published)
    updatedData.append("mainImage" , mainImage)
    if(paraOneTitle && paraOneTitle.length !== 0 ){
      updatedData.append("paraOneTitle" , paraOneTitle)
    }else{
      updatedData.append("paraOneTitle", "")
    }
    if(paraOneDescription && paraOneDescription.length !== 0 ){
      updatedData.append("paraOneDescription" , paraOneDescription)
    }else{
      updatedData.append("paraOneDescription" , "")
    }
    if(paraOneImage){
      updatedData.append("paraOneImage" , paraOneImage)
    }
    if(paraTwoTitle && paraTwoTitle.length !== 0 ){
      updatedData.append("paraTwoTitle" , paraTwoTitle)
    }else{
      updatedData.append("paraTwoTitle" , "")
    }
    if(paraTwoDescription && paraTwoDescription.length !== 0 ){
      updatedData.append("paraTwoDescription" , paraTwoDescription)
    }else{
      updatedData.append("paraTwoDescription" , "")
    }
    if(paraTwoImage){
      updatedData.append("paraTwoImage" , paraTwoImage)
    }
    if(paraThreeTitle && paraThreeTitle.length !== 0 ){
      updatedData.append("paraThreeTitle" , paraThreeTitle)
    }else{
      updatedData.append("paraThreeTitle" , "")
    }
    if(paraThreeDescription && paraThreeDescription.length !== 0 ){
      updatedData.append("paraThreeDescription" , paraThreeDescription)
    }else{
      updatedData.append("paraThreeDescription" , "")
    }
    if(paraThreeImage){
      updatedData.append("paraThreeImage" , paraThreeImage)
    }

    try {
      await axios.put(`/blog/updateBlog/${id}` , updatedData , {withCredentials: true})
      .then(res => {
        toast.success(res.data.message)
      })
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const mainImagePreviewHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      setMainImagePreview(reader.result)
      setMainImage(file)
    }
  }
  const paraOneImagePreviewHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      setParaOneImagePreview(reader.result)
      setParaOneImage(file)
    }
  }
  const paraTwoImagePreviewHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      setParaTwoImagePreview(reader.result)
      setParaTwoImage(file)
    }
  }
  const paraThreeImagePreviewHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () =>{
      setParaThreeImagePreview(reader.result)
      setParaThreeImage(file)
    }
  }


  const {mode} = useContext(Context)
  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg" }>
      <section className='update-blog'>
        <h3>Update Blog</h3>
        <form>
          <div className="category-box">
            <label >Category</label>
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
            <img src={mainImagePreview ? `${mainImagePreview}` : mainImage ? `${mainImage}` : '/imgd.png'} alt="mainImage" className='mainImg' />
            <input type="file" onChange={mainImagePreviewHandler} style={{border:"none"}}  />
            <textarea rows={10} placeholder='Blog Intro....' value={intro} onChange={(e) => setIntro(e.target.value)} className='intro' />
          </div>
          <div className="sub-para">
            <input type="text" placeholder='Paragraph one title' value={paraOneTitle} onChange={(e) => setParaOneTitle(e.target.value)} />
            <img src={paraOneImagePreview ? `${paraOneImagePreview}` : paraOneImage ? `${paraOneImage}` : '/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraOneImagePreviewHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog first paragraph .....' value={paraOneDescription} onChange={(e) => setParaOneDescription(e.target.value)}/>
          </div>

          <div className="sub-para">
            <input type="text" placeholder='Paragraph two title' value={paraTwoTitle} onChange={(e) => setParaTwoTitle(e.target.value)} />
            <img src={paraTwoImagePreview ? `${paraTwoImagePreview}` : paraTwoImage ? `${paraTwoImage}` :'/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraTwoImagePreviewHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog second paragraph .....' value={paraTwoDescription} onChange={(e) => setParaTwoDescription(e.target.value)}/>
          </div>

          <div className="sub-para">
            <input type="text" placeholder='Paragraph three title' value={paraThreeTitle} onChange={(e) => setParaThreeTitle(e.target.value)} />
            <img src={paraThreeImagePreview ? `${paraThreeImagePreview}` : paraThreeImage ? `${paraThreeImage}` : '/imgd.png' } alt="paraImage" />
            <input type="file" onChange={paraThreeImagePreviewHandler} style={{border:"none"}} />
            <textarea rows={10} placeholder='Blog three paragraph .....' value={paraThreeDescription} onChange={(e) => setParaThreeDescription(e.target.value)}/>
          </div>

          <div className="publish-box">
            <label htmlFor="">Wants to publish now</label>
            <select value={published} onChange={(e) => setPublished(e.target.value)}>
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
          </div>
          <button onClick={handleUpdate} className='update-btn'>Update Blog</button>
        </form>
      </section>
    </article>
  );
}

export default  UpdateBlog ;
