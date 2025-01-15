import React, { useState } from 'react'
import { NavLink, useNavigate  } from 'react-router-dom';
import toast from 'react-hot-toast'
import axios from "axios"

export default function Signup() {
  const navigate = useNavigate()
  const [user,setUser] = useState({
    username:"",
    email: "",
    password:"",
  })
  const onSignup = async()=>{
    try {
      const response = await axios.post("http://localhost:3000/user/signup",user)
      console.log("signup success", response.data);
      toast.success("Successfully User Registered")
      navigate("/login")
    } catch (error) {
      toast.error('An error happened. Put proper information');
      console.log("SIGNUP FAILED");
      
    }
  }

  
  return (
    <div className='font-yuji pt-8 pl-8 grid grid-cols-2 gap-6 h-auto w-[500px]'>
        <h1 className='text-[18px]  w-[100px]'>Name:
        </h1>
        <input 
        className='rounded-l w-[250px] pl-2 border-black border-2' 
        id='username'
        type="text"
        value={user.username}
        onChange={(e) => setUser({...user, username: e.target.value})}
        placeholder='Enter Your Name'
        />
        <h1 className='text-[18px]  w-[100px]'>Email:
        </h1>
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
        <button 
        onClick={onSignup}
        className='text-[18px] py-1 text-white bg-black rounded w-[100px] '>Submit</button>
        <h1 
        className='flex justify-center items-center'>Already Registered?<NavLink to='/login'>
          <span className='pl-1 font-semibold underline'>
            Login
          </span>
        </NavLink>
        </h1>
    </div>
  )
}