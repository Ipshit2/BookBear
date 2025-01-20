import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';
import MyBookComponent from "../components/MyBookComponent";

export default function MyBooks() {
  const [user, setUser] = useState(null);
  const [results, setResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [sortOption, setSortOption] = useState("default");

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
      });
    } catch (error) {
      console.error("Error fetching book data:", error);
      toast.error("Failed to fetch book details.");
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);

    if (e.target.value === "status") {
      const grouped = results.reduce((acc, book) => {
        const status = book.status || "Unknown";
        if (!acc[status]) {
          acc[status] = [];
        }
        acc[status].push(book);
        return acc;
      }, {});
      
      setSortedResults(grouped);
    } else {
      setSortedResults({ default: results });
    }
  };

  return (
    <div>
      <h1 className="pl-10 py-6 text-[20px] font-yuji font-bold">
        Welcome {user?.username}
      </h1>
      <div className="flex pl-10 py-6 text-[20px] font-yuji space-x-2">
        <h1>Sort by</h1>
        <select
          className="text-[13px] font-semibold w-auto  border border-black rounded px-5 py-1"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option className="text-green-700" value="default">
            Default
          </option>
          <option className="text-red-700" value="status">
            Status
          </option>
        </select>
      </div>

      <div className="h-auto mx-9 pt-5 font-yuji">
        {sortOption === "status" ? (
          Object.keys(sortedResults).map((status) => (
            <div key={status} className="pb-10">
              <h2 className="text-[18px] font-bold p-3">{status}</h2>
              <div className="grid grid-cols-7 gap-12">
                {sortedResults[status].map((book, index) => (
                  <MyBookComponent key={index} book={book} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-7 gap-12">
            {results.map((book, index) => (
              <MyBookComponent key={index} book={book} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
