import "./login.css";
import React from "react";
import { useNavigate} from "react-router-dom"
import { useState } from "react";
import axios from "axios";
// import { CallMerge } from "@material-ui/icons";
// import { useEffect } from "react";
export default function Login() {
  const [logger,setLogger]=useState({
    email:"",password:""
  })
  
  const navigate=useNavigate();
  const handleInput=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    const logger1={...logger,[name]:value};
    setLogger(logger1);
  }
  const handleLogin=async (e)=>{
    e.preventDefault();
    let headersList = {
      "Accept": "*/*",
      "Content-Type": "application/json"
     }
     
     let bodyContent = JSON.stringify({
       
       "email":logger.email,
       "password":logger.password,
       
     });
     
     let response = await fetch("https://backend-gwa2.onrender.com/login", { 
       method: "POST",
       body: bodyContent,
       headers: headersList
     });
     
     let data = await response.text();
    //  console.log(data); 
     if(response.status===403){
      alert("Invalid Credentials");
      // setLogger({email:"",password:""});
     }else{


      //  console.log(response);
      // console.log(response.data);
      localStorage.setItem('id',data);
      const id1=JSON.parse(localStorage.getItem('id'));
      const res = await axios.get(`https://backend-gwa2.onrender.com/${id1}/getUser`);
      console.log(res.data);
      localStorage.setItem('loginUser',JSON.stringify(res.data));
      // console.log(localStorage.getItem('user'));
      navigate("/home");
      // setLogger({email:"",password:""});
     }
  }
  const handleNewAccount=()=>{
    navigate("/");
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
          <div className="loginBox">
            <input type="email" placeholder="Email" className="loginInput" name="email" value={logger.email} onChange={(e)=>{
              handleInput(e);
            }} />
            <input type="password" placeholder="Password" className="loginInput" name="password" value={logger.password} onChange={(e)=>{
              handleInput(e);
            }} />
            <button className="loginButton" onClick={
              handleLogin
            }>Log In</button>
            {/* <button className="loginRegisterButton" onClick={ handleNewAccount}>
              Create a New Account
            </button> */}
            <button type="button" className="btn btn-success" onClick={ handleNewAccount}>Create a New Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}
