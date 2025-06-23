import React from 'react'
import Background from "../../public/maxim-abramov-GFjyimhomaM-unsplash.jpg";
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div >
     <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1554126291-4e812d6586eb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 pl-5 flex justify-between flex-col w-full bg-red-400'>
    <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      
        <div className='py-4 px-4 pb-7 bg-white'>
            <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
            <Link to="/login" className='w-full flex items-center justify-center  bg-black text-white py-3 rounded mt-4'>Continue</Link>
        </div>
     </div>
    </div>
  )
}

export default Home
