import React, { useContext, useState } from 'react';
import { Context } from '../../main';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

function Register() {
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [role, setRole] = useState("")
  const [password, setPassword] = useState("")
  const [education , setEducation] = useState("")
  const [avatar, setAvatar] = useState("")
  const [avatarPreview,setAvatarPreview] = useState("")

  const avatarHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }

  const {mode , isAuthenticated } = useContext(Context)
  const navigateTo = useNavigate()
  const handleRegister = async(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name",name)
    formData.append("email", email)
    formData.append("phone",phone)
    formData.append("role",role)
    formData.append("password",password)
    formData.append("education",education)
    formData.append("avatar",avatar)

    try {
      const {data} = await axios.post('/user/register',formData,
        {
          withCredentials: true ,
          headers: {"Content-Type": "multipart/form-data"}
        })
        .then(res => {
          setName('')
        setEmail("")
        setPassword("")
        setPhone("")
        setRole("")
        setEducation("")
        setAvatar("")
        setAvatarPreview("")
        toast.success(res.data.message)
        navigateTo("/login")
        })
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message)
    }
    if(!isAuthenticated){
      return <Navigate to={'/login'} />
    }else{
      return <Navigate to={'/'} />
    }
  }

  return (
    <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className='auth-form'>
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <select value={role} 
          onChange={(e) => setRole(e.target.value)
          }>
            <option value="">Select Role</option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
          <div>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your name' required={true} />
          </div>
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' />
          </div>
          <div>
            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder='Your phone number' />
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          </div>
          <select value={education} onChange={(e) => setEducation(e.target.value)}>
            <option value="">Select your education</option>
            <option value="Matric">Matric</option>
            <option value="Higher Secondery">Higher Secondery</option>
            <option value="Graduation">Graduation</option>
            <option value="Masters">Masters</option>
            <option value="PhD">PhD</option>
            <option value="B.Tech">B.Tech</option>
          </select>
          <div style={{display: "flex" , flexDirection: "row" , alignItems: "center"}}>
            <div className="avatar">
              <img src={avatarPreview ? `${avatarPreview}` : '/user.jpg'} alt="avatar" />
            </div>
            <input type="file" onChange={avatarHandler} className='avatar_input_tag' style={{border:"none"}}/>
          </div>
          <p>Already registered? <Link to={'/login'}>Login now</Link></p>
          <button type="submit" className='submit-btn'>Register</button>
        </form>
      </section>
    </article>
  );
}

export default Register;
