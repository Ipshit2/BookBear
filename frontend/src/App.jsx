import { Outlet } from 'react-router-dom'
import Header from './components/header'
import {Toaster} from 'react-hot-toast'

function App() {

  return (
    <>
    <Header/>
    <Outlet/>
    <Toaster position="top-center" reverseOrder={false}/>

    </>
  )
}

export default App