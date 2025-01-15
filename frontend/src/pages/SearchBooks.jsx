import React from 'react'
import { useState } from 'react';
import search from "../assets/image.png"
import axios from 'axios'

import BookComponent from '../components/BookComponent';

export default function SearchBooks() {
  const [books,setBooks]=useState("");
  const [results, setResults] = useState([]);
  async function searching() {
    try {
      console.log(books);
      
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${books}&maxResults=40&key=${import.meta.env.VITE_API_KEY}`
      );
      console.log(response.data.items);
      setResults(response.data.items || []);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='w-full pt-10 h-screen'>
        <div className='flex px-10 h-10'>
            <input type="text" className='rounded-l w-[250px] pl-2 border-black border-2' 
            placeholder="Enter Your Book Name"
            value={books} onChange={e=>setBooks(e.target.value)}
            />
            <button
                className='bg-black rounded-r ' 
                onClick={searching}>
              <img className='h-6 w-6 mx-2'
              src={search} alt="" />
            </button>

        </div>
        <div className=" h-auto grid grid-cols-7 mx-9 pt-5 gap-12 relative">
        {
          results.map((book, index) => <BookComponent key={index} book={book} 
          />)
        }
        
      </div>
    </div>
  )
}
