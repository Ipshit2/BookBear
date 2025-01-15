import React, { useState , useEffect} from 'react'
import bear from "../assets/bear.png"
import axios from 'axios'
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
export default function Header() {
    const navigate = useNavigate()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    
    useEffect(() => {
        const token = Cookies.get('token');
        console.log("token from frontend", token);
        
        if (token) {
          setIsAuthenticated(true);
          
          
        } else{
          setIsAuthenticated(false);
        }
        console.log("useeffect", isAuthenticated);
        
      }, [])

    const onLogout= async()=>{
        try {
            axios.get("http://localhost:3000/user/logout")
            console.log("logged out");
            Cookies.remove('token')
            setIsAuthenticated(false)
            navigate("/login")
        } catch (error) {
            console.log("something went wrong ",error);
            
        }
    }
    
  return (
    <div >
        
        <header className='w-full h-auto flex pl-5 mt-2 space-x-96 font-yuji'>
            <div className='flex w-auto h-auto '>
                <h1 className='flex justify-center items-center text-[20px] mr-2 font-bold'>BookBear</h1>
                <img src={bear} alt="logo" className='h-12 w-12' />
            </div>
            <div className='flex justify-center items-center space-x-16 text-[18px] '>
                <NavLink to="/searchbooks"  
                    className={({isActive}) =>` ${isActive ? "font-bold" : "text-black "} `}>
                    Search Book
                </NavLink>
                {isAuthenticated && (
                        <NavLink to="/mybooks" className={({ isActive }) => `${isActive ? "font-bold" : "text-black"}`}>
                            My Books
                        </NavLink>
                    )}
                
                <NavLink  onClick={onLogout}>
                    Logout
                </NavLink>
            </div>
        </header>
        
    </div>
  )
}
