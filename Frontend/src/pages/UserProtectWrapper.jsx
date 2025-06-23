import React from 'react'
import {UserDataContext} from "../context/UserContext";
import {useNavigate} from "react-router-dom";

const UserProtectWrapper = ({
    children
}) => {
     const token = localStorage.getItem("token");
    const navigate = useNavigate();

    if(!token) {
        navigate("/login");
        return null; // Prevent rendering children if user is not authenticated
    }

    return (
    <>
     {children}
    </>
  )
}

export default UserProtectWrapper;