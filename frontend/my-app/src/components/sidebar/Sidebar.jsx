import axios from "axios";
import "./sidebar.css";
import { useNavigate} from "react-router-dom"
import {
  RssFeed,
  Chat,
  PlayCircleFilledOutlined,
  Group,
  Bookmark,
  HelpOutline,
  WorkOutline,
  Event,
  School,
} from "@material-ui/icons";
// import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [users, setusers] = useState([]);
  const navigate=useNavigate();
  let temp;
  useEffect(()=>{
    // let temp;
    const handleFriends = async (e) => {
      // e.preventDefault();
      temp=await axios.get(`https://backend-gwa2.onrender.com/allUsers`);
      // console.log(temp.data);
      setusers(temp.data);
      // console.log(temp.data);
    };
    handleFriends();
  },[])
  const handleClick=(e)=>{
    e.preventDefault();
    // localStorage=null;
    navigate('/');
  }
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          <li className="sidebarListItem">
            <Chat className="sidebarIcon" />
            <span className="sidebarListItemText">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleFilledOutlined className="sidebarIcon" />
            <span className="sidebarListItemText">Videos</span>
          </li>
          <li className="sidebarListItem">
            <Group className="sidebarIcon" />
            <span className="sidebarListItemText">Groups</span>
          </li>
          <li className="sidebarListItem">
            <Bookmark className="sidebarIcon" />
            <span className="sidebarListItemText">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkOutline className="sidebarIcon" />
            <span className="sidebarListItemText">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <Event className="sidebarIcon" />
            <span className="sidebarListItemText">Events</span>
          </li>
          <li className="sidebarListItem">
            <School className="sidebarIcon" />
            <span className="sidebarListItemText">Courses</span>
          </li>
        </ul>
        <button type="button" className="btn btn-primary" onClick={(e)=>{
          handleClick(e);
        }}>Log out</button>
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          { users?.map((u) => (
            // console.log(u)
            <CloseFriend key={u._id} user={u}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
