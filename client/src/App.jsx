import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchProducts } from './lib/fetchProducts'
import { Toaster } from 'react-hot-toast'
import { fetchCart } from './lib/fetchCart'
import { fetchUser } from './lib/fetchUserDetails'
function App() {
   const dispatch = useDispatch();


   useEffect(()=>{
        fetchProducts(dispatch);
        fetchCart(dispatch);
        fetchUser(dispatch);
   },[])

  return (
    <>
     <Header/>
     <main className="min-h-[96vh]">
      <Outlet />
     </main>
      <Footer/>
      <Toaster/>
    </>
  )
}

export default App
