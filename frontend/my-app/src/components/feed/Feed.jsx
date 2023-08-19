import Post from "../post/Post";
import Share from "../share/Share";
import axios from "axios";
import "./feed.css";
// import { Posts } from "../../dummyData";
import { useState } from "react";
import { useEffect } from "react";


export default function Feed() {
  const [posts,setPosts]=useState([]);
  const id=JSON.parse(localStorage.getItem('id'))
  // const check=id.slice(1,id.length-1);
  // console.log(check);
  console.log(id);
  
  // console.log(currUser);
  const fetchPosts=async ()=>{
    const res=await axios.get(`https://backend-gwa2.onrender.com/timeline/${id}`);
    
    setPosts(
      res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  }
  useEffect(()=>{
   
    fetchPosts();
  },[id])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share  />
        {posts?.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
