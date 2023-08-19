import axios from "axios";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom"
import Topbar from "../topbar/Topbar";
const UserInfo = () => {
    const [info,setInfo]=useState({
        city:"",from:"",relationships:""
    })
    const id=JSON.parse(localStorage.getItem('id'));
    const navigate=useNavigate();
    const handleInfo=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        const temp={...info,[name]: value}
        setInfo(temp);
    }
    const handleClick=async (e)=>{
        e.preventDefault();
        await axios.put(`https://backend-gwa2.onrender.com/${id}/update`,{city:info.city,from:info.from,relationships:info.relationships})
        navigate(`/profile/${id}`);
    }
  return (
    <>
      <Topbar />
      <div className="container">
        <h2>User information:</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input
              type="text"
              className="form-control"
              id="city"
              aria-describedby="emailHelp"
              name="city"
              
              value={info.city}
              onChange={(e)=>{
                handleInfo(e);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="from" className="form-label">
              From
            </label>
            <input
              type="text"
              className="form-control"
              id="from"
              name="from"
              value={info.from}
              onChange={(e)=>{
                handleInfo(e);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="relation" className="form-label">
              Relationship
            </label>
            <input
              type="text"
              className="form-control"
              id="relation"
              name="relationships" value={info.relationships}
              onChange={(e)=>{
                handleInfo(e);
              }}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={(e)=>{
            handleClick(e);
          }}>
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default UserInfo;
