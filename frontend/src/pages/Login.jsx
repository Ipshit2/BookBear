import React, { useState } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from "axios"

export default function Login() {
  const navigate = useNavigate()
  const [user,setUser] = useState({
    email: "",
    password:"",
  })
  const onLogin = async()=>{
    try {
      const response = await axios.post("http://localhost:3000/user/login",user)
      console.log("login success", response.data);
      const { token } = response.data
      document.cookie = `token=${token}; path=/; max-age=3600`
      toast.success("Successfully Logged in")
      navigate("/mybooks")
    } catch (error) {
      toast.error('An error happened. Put proper information');
      console.log("Login FAILED");
      
    }
  }

  return (
      <div className='font-yuji pt-8 pl-8 grid grid-cols-2 gap-6 h-auto w-[500px]'>
        <h1 className='text-[18px]  w-[200px]'>Enter Email:</h1>
        <input 
        className='rounded-l w-[250px] pl-2 border-black border-2' 
        id='email'
        type="text"
        value={user.email}
        onChange={(e) => setUser({...user, email: e.target.value})}
        placeholder='Enter Your Email'
        />
        <h1 className='text-[18px]  w-[100px]'>Password:
        </h1>
        <input 
        className='rounded-l w-[250px] pl-2 border-black border-2' 
        id='password'
        type="password"
        value={user.password}
        onChange={(e) => setUser({...user, password: e.target.value})}
        placeholder='Enter Password'
        />
        <button className='text-[18px] py-1 text-white bg-black rounded w-[100px] mx-8' onClick={onLogin}>
          Login</button>
        <h1 className='flex justify-center items-center'>New User?<NavLink to='/'><span className='pl-2 font-semibold underline'>Signup</span></NavLink> </h1>
    </div>
  )
}