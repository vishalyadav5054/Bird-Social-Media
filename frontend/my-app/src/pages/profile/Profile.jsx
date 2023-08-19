import "./profile.css";
import Topbar from "../../components/topbar/Topbar";
import Post from "../../components/post/Post";
import Share from "../../components/share/Share";
import Sidebar from "../../components/sidebar/Sidebar";
// import UserFeeds from "../../components/userFeeds/UserFeeds";
// import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
export default function Profile() {
  const params=useParams();
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState({});
  const [toggle,setToggle]=useState(false);
  const [posts,setPosts]=useState([]);
  const [currentUser,setCurr]=useState({});
  // console.log(params);
  const id=JSON.parse(localStorage.getItem('id'));
  useEffect(()=>{
    const fetchUser=async ()=>{
      const res=await axios.get(`https://backend-gwa2.onrender.com/${params.id}/getUser`);
      const res1=await axios.get(`https://backend-gwa2.onrender.com/userPosts/${params.id}`);
      const res2=await axios.get(`https://backend-gwa2.onrender.com/${id}/getUser`);
      setPosts(res1.data.reverse());
       setUser(res.data);
       setCurr(res2.data);
    }
    // console.log(5);
    fetchUser();
    if(id===params.id){
      setToggle(true);
    }else{
      setToggle(false);
    }
  },[params.id])
  // console.log(currentUser);
  
  return (
    <>
      <Topbar />
      <div className="profile" id="hello">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img crossorigin="anonymous"
                className="profileCoverImg"
                src={user.coverPicture||PF+"person/blue.jpeg"}
                alt=""
              />
              <img crossorigin="anonymous"
                className="profileUserImg"
                src={user.profilePicture||PF+"download.png"}
                alt=""
              />
            </div>
            <div className="profileInfo">
                <h4 className="profileInfoName">{user.userName}</h4>
                <h4><span className="profileInfoDesc">{`Hey ${user.userName} here!`}</span></h4>
            </div>
          </div>
          <div className="profileRightBottom">
            {/* <UserFeeds value={params.id}/> */}
            <div className="feed">
      <div className="feedWrapper">
        {toggle?<Share />:""}
        
        {posts?.map((p) => (
              <Post key={p._id} post={p} />
          ))}
      </div>
    </div>
            
    
              {<Rightbar profile  />}
          
          </div>
        </div>
      </div> 
    </>
  );
}
