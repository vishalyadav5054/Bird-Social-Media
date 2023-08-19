import React from "react";
import {useNavigate} from "react-router-dom"
import { useState } from "react";
import "./register.css";

export default function Register() {
  const [user,setUser]=useState({
    userName:"",
    email:"",
    password:"",
    cpassword:""
  })
  const navigate=useNavigate();
  const handleInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    const user1={...user,[name]:value};
    // console.log(user);
    setUser(user1);
  }
  const handleClick=async (e)=>{
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       "userName":user.userName,
       "email":user.email,
       "password":user.password,
       "cpassword":user.cpassword
     });
     
     let response = await fetch("https://backend-gwa2.onrender.com/register", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
     console.log(data);
     if(response.status===404){
      alert("Invalid Credentials");
      setUser({userName:"",email:"",password:"",cpassword:""})
     }
     else{

       setUser({userName:"",email:"",password:"",cpassword:""})
       navigate("/login");
     }
    
  }
  const handleLogin=()=>{
    navigate("/login");
  }
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Bird</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Bird.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input placeholder="Username" className="loginInput" name="userName" onChange={(e)=>{
              handleInput(e);
            }} value={user.userName}/>
            <input type="email" placeholder="Email" className="loginInput" name="email" onChange={handleInput} value={user.email}/>
            <input type="password" minLength={6} placeholder="Password" className="loginInput" name="password" onChange={handleInput} value={user.password} />
            <input type="password" minLength={6} placeholder="Password Again" className="loginInput"name="cpassword" onChange={handleInput} value={user.cpassword} />
            <button className="loginButton" onClick={(e)=>{
              handleClick(e);
            }}>Sign Up</button>
            {/* <button className="loginRegisterButton" onClick={handleLogin}>
              Log into Account
            </button> */}
            <button type="button" className="btn btn-success" onClick={handleLogin}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
}
