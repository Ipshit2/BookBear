import React from 'react'
import axios from 'axios';
import add from "../assets/add.png"
import toast from 'react-hot-toast'


export default function BookComponent({book}) {

  const addBook = async () =>{
    const id = book.id
    try {
      
      const response = await axios.put(
        "http://localhost:3000/user/addbooks", 
        { books: [{ id }] },  
        { withCredentials: true }
        
        
      );
      
      console.log(response.data);  
      toast.success("Successfully add book in your libarary")
      
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Failed to add the book to your library")
    }
  }
  
  const fallbackImage = "HELLO"
  return (
    <div className="relative h-[400px] p-2 border rounded shadow bg-white">
        <img src={book.volumeInfo && book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : fallbackImage} alt={book.volumeInfo.title} className='w-full h-[200px]' />
        <h1 className='font-semibold text-[15px] pt-4'>{book.volumeInfo.title}</h1>
        <p className=' text-[12px] pt-2'>{book.volumeInfo.authors}</p>
        <button className=' w-10 ' onClick={addBook}> <img src={add} alt="" className="absolute bottom-4 right-4 w-10"  /></button>
    </div>
  )
}