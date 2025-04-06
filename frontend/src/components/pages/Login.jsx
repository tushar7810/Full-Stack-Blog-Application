import React, { useContext, useState } from 'react';
import axios from 'axios';
import { Context } from '../../main';
import toast from 'react-hot-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Login() {
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [role , setRole] = useState('')
  const {mode, isAuthenticated} = useContext(Context)
  const nevigateTo = useNavigate()

  const handleLogin = async(e) => {
    e.preventDefault()
    await axios.post(`${process.env.BACKEND_URL}/user/login`, {email , password , role} , {withCredentials:true , headers: {"Content-Type": "application/json"}})
    .then(res => {
      toast.success(res.data.message)
      setEmail('')
      setPassword('')
      setRole('')
      nevigateTo('/')
    }).catch((err) => {
      toast.error(err.response.data.message)
    })

  }

  if(isAuthenticated){
    return <Navigate to={'/'}/>
  }
  
  return (
    <>
     <article className={mode === "dark" ? "dark-bg" : "light-bg"}>
      <section className='auth-form'>
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
          <select value={role} 
          onChange={(e) => setRole(e.target.value)
          }>
            <option value="">Select Role</option>
            <option value="Reader">Reader</option>
            <option value="Author">Author</option>
          </select>
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Your email' />
          </div>
          <div>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter password' />
          </div>
          <p>Don't have any account? <Link to={'/register'}>Register now</Link></p>
          <button type="submit" className='submit-btn'>Login</button>
        </form>
      </section>
    </article> 
    </>
  );
}

export default Login;
