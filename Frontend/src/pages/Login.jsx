import React, { useState , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import {UserDataContext} from "../context/UserContext";
import axios from "axios";




const Login = () => {


  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData , setUserData] = useState('');

  const {user, setUser} = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:4000/api/users/login",
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(response.data.user); 
        localStorage.setItem("token", data.token);
        navigate("/home");
      }

    } catch (error) {  
      console.error("Error during signup:", error);
  } 

  };

  return (
    <div className="p-7">
      <div>
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
        <form onSubmit={submitHandler

        }>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border border-none w-full text-lg placeholder:text-base"
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            className="bg-[#eeee] mb-7 rounded px-4 py-2 border w-full border-none text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button 
          type="submit"
          className="bg-[#111] mb-7 rounded text-white px-4 py-2  border w-full text-lg placeholder:text-base">
            Login
          </button>
        </form>
        <p className="text-left">
          New here?{" "}
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>

      <div>
        <Link to="/captain-login" className="bg-[#10b461] mb-7 flex items-center justify-center rounded text-white px-4 py-2  border w-full text-lg placeholder:text-base">
          Sign Up as a Driver
        </Link>
      </div>
    </div>
  );
};

export default Login;
