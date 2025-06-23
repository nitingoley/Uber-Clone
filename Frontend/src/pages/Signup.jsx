import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const newUser = {
        fullname: {
          firstname: firstname,
          lastname: lastname,
        },
        email: email,
        password: password,
      };

      const response = await axios.post(
        "http://localhost:4000/api/users/register",
        newUser
      );

      if (response.status === 201) {
        const data = response.data;

        setUser(response.data.user);
        localStorage.setItem("token", data.token);

        navigate("/home");
      }

    } catch (error) {
      setError(error.response ? error.response.data.message : "An error occurred");
      console.error("Error during signup:", error);
  } finally {
      setLoading(false);
  }

  };

  return (
    <div>
      <div className="p-7 h-screen flex flex-col justify-between">
        <img
          className="w-16 mb-10"
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />  

         {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={submitHandler}>
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-7">
            <input
              type="text"
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border border-none  text-lg placeholder:text-base"
              required
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter your first name"
            />

            <input
              type="text"
              className="bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border border-none  text-lg placeholder:text-base"
              required
              value={lastname}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              placeholder="Enter your second name"
            />
          </div>

          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border border-none w-full text-lg placeholder:text-base"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
          />

          <h3 className="text-lg font-medium mb-2">Enter Password</h3>
          <input
            type="password"
            className="bg-[#eeeeee] mb-7 rounded-lg px-4 border-none py-2 border w-full text-lg placeholder:text-base"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <button 
          type= "submit"
          disabled= {loading}
          className="bg-[#111] text-white font-semibold mb-3 border-none rounded-lg px-4 py-2 w-full text-lg placeholder:text-base">
            {loading ?  'Creating account...' : 'Sign Up'}
          </button>
        </form>
        <p className="text-left">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Click here to login
          </Link>
        </p>
      </div>

      <div>
        <p className="text-[10px] leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
};

export default Signup;
