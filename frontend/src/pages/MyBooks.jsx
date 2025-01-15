import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import MyBookComponent from "../components/MyBookComponent";

export default function MyBooks() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile", {
          withCredentials: true,
        });
        setUser(response.data.data);
        console.log("user books", response.data.data?.books);

        
        if (response.data.data?.books?.length > 0) {
          const userBooks = response.data.data.books;
          for (let book of userBooks) {
            console.log("book ID", book.id);
            if (book && book.id) {
              fetching(book); 
            } else {
              console.error("Book ID is missing for:", book);
            }
          }
        } else {
          console.log("You don't have any books in your library");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  const fetching = async (book) => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes/${book.id}?key=${import.meta.env.VITE_API_KEY}` 
      );

      console.log("Book data:", response.data);
      setResults((prevResults) => {
        if (!prevResults.some((b) => b.id === response.data.id)) {
          return [...prevResults, { ...response.data, status: book.status }];
        }
        return prevResults;
      })
    } catch (error) {
      console.error("Error fetching book data:", error);
      toast.error("Failed to fetch book details.");
    }
  }

  return (
    <div>
      <h1 className='pl-10 py-6 text-[20px] font-yuji font-bold'>
        Welcome {user?.username}
      </h1>
      <div className=" h-auto grid grid-cols-7 mx-9 pt-5 gap-12">
        {results.map((book, index) => (
          <MyBookComponent key={index} book={book} />
        ))}
      </div>
    </div>
  );}