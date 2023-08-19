import React from 'react'
import { useState } from 'react';
import "./rightbar.css";
import { useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';

const UserFriends = ({idfr}) => {
  const [user,setUser]=useState({});
  useEffect(()=>{
    const fetchUser=async ()=>{
      const res=await axios.get(`https://backend-gwa2.onrender.com/${idfr}/getUser`);

       setUser(res.data);
    }
    fetchUser();
  },[idfr])
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
    
            <Link className="navbar-brand"to={`/profile/${idfr}`}>
        <div className="rightbarFollowings">
        
          <div className="rightbarFollowing ">
            <img crossorigin="anonymous"
              src={user.profilePicture||PF+"download.png"}
              alt=""
              className="rightbarFollowingImg"
            />
            <span className="rightbarFollowingName">{user.userName}</span>
          </div>
          </div>
            </Link>
    </>
  )
}

export default UserFriends
