
import App from './App.jsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import SearchBooks from './pages/SearchBooks.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import MyBooks from './pages/MyBooks.jsx'




const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
    <Route path='/searchbooks' element={<SearchBooks />}></Route>
    <Route path='/' element={<Signup />}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/mybooks' element={<MyBooks/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
