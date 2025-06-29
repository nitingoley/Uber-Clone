import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingupCaptain from "./pages/SingupCaptain";
import LoginCaptain from "./pages/LoginCaptain";
import GetStart from "./pages/GetStart";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainHome from "./pages/CaptainHome";
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper";
import CaptainLogout from "./pages/CaptainLogout";
import Riding from "./pages/Riding";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/riding" element={<Riding />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/captain-login" element={<LoginCaptain />} />
        <Route path="/captain-login" element={<LoginCaptain />} />
        <Route path="/captain-signup" element={<SingupCaptain />} /> 
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <GetStart />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />

        <Route
          path="/captain-home"
          element={
            <CaptainProtectWrapper>
              <CaptainHome />
            </CaptainProtectWrapper>
          }
        />

         <Route path='/captain/logout' element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  );
}

export default App;
