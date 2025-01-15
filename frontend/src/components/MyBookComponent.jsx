import React, {useState} from 'react'
import axios from 'axios';
import Cookies from 'js-cookie';


function MyBookComponent({ book }) {
  const [status, setStatus] = useState(book.status || "Reading")
  
  const id = book.id
  const handleStatus = async (newStatus) => {
    setStatus(newStatus);
    const token = Cookies.get('token')
    console.log(token);
    
    try {
      const response = await axios.put(`http://localhost:3000/user/updatestatus/${id}`, {
        status: newStatus,  
      }, { withCredentials: true });
      console.log("Status updated:", response.data);
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  const [info, useInfo] = useState(false)
  const onShowInfo= ()=>{
    useInfo(true)
  }
  const closeInfo = ()=>{
    useInfo(false)
  }
  const getStatusClasses = (status) => {
    switch (status) {
      case "reading" :
        return "border-blue-700 text-blue-700";
      case "Reading" :
        return "border-blue-700 text-blue-700";
      case "on hold":
        return "border-yellow-700 text-yellow-700";
      case "completed":
        return "border-green-700 text-green-700";
      case "dropped":
        return "border-red-700 text-red-700";
      default:
        return "border-gray-700 text-gray-700";
    }
  }
  
  return (
    <>
    {info?
    
    <div className='z-20 scale-110 p-2 border rounded shadow bg-white font-yuji duration-300'>
      <div className=" ">
        <img src={book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : fallbackImage} alt={book.volumeInfo.title} className='w-full' />
        
        <h1 className='font-semibold text-[15px] h-[100px]   pt-4'>{book.volumeInfo.title}</h1>
        <p className='h-[50px] text-[12px] pt-2'>{book.volumeInfo.authors}</p>
      </div>
      <div className=' font-yuji '> 
        <h1 className='pt-2 font-semibold text-[13px]'>Status Update</h1>
        <div>
        <select
          value={status}
          onChange={(e) => handleStatus(e.target.value)}
          className="text-[13px] font-semibold w-auto mt-2 border border-black rounded px-5 py-1"
        >
        <option className='text-blue-700' value="reading">Reading</option>
        <option className='text-yellow-700' value="on hold">On Hold</option>
        <option className='text-green-700' value="completed">Completed</option>
        <option className='text-red-700' value="dropped">Dropped</option>
        </select>
        </div>
        <button
          onClick={closeInfo}
          className="absolute w-4 bottom-12 right-2 text-gray-500 hover:text-black">
              x
        </button>
      </div>
    </div>
    
    :
    <div onClick={onShowInfo} className=" relative h-[400px] p-2 border rounded shadow bg-white font-yuji duration-300 hover:scale-110">
            
            <img src={book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : fallbackImage} alt={book.volumeInfo.title} className='w-full h-[200px]' />
            <h1 className='font-semibold text-[15px] h-[100px] pt-4'>{book.volumeInfo.title}</h1>
            <p className='h-[50px] text-[12px] pt-2'>{book.volumeInfo.authors}</p>
            
            <div className={`w-auto border-2 flex justify-center align-middle rounded-lg ${getStatusClasses(status)}`}>
              <p  className=' text-[15px] py-[2px]   font-bold'>{book.status}</p>
            </div>

            
            
    </div>
    }

    </>
    
  )
}

export default MyBookComponent