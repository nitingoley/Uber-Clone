import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import SingupCaptain from './pages/SingupCaptain'
import LoginCaptain from './pages/LoginCaptain'
import GetStart from './pages/GetStart'
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'


function App() {
 
  return (
   <div>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/captain-login' element={<LoginCaptain/>} />
      <Route path='/captain-signup' element={<SingupCaptain/>} />
      <Route path='/home' element={
        <UserProtectWrapper>
          <GetStart/>
        </UserProtectWrapper>
      } />

           <Route path='/user/logout'
          element={<UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
          } />


      <Route path='/captain-home' element={<CaptainHome/>} />

    </Routes>
   </div>
  )
}

export default App
