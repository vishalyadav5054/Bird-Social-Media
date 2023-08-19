import React from "react";
import { Link } from "react-router-dom";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";


const Topbar = () => {
  const id=JSON.parse(localStorage.getItem('id'));
  const user=JSON.parse(localStorage.getItem('loginUser'));
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link className="navbar-brand "  to='/home'><span className="logo">Bird</span></Link>
        </div>
        <div className="topbarCenter">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
            />
          </div>
        </div>
        <div className="topbarRight">
          <div className="topbarLinks">
            <Link className="navbar-brand "  to='/home'><span className="topbarLink">Homepage</span></Link>
            <span className="topbarLink" to='/home'>Timeline</span>
          </div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <span className="topbarIconBadge">1</span>
            </div>
            <div className="topbarIconItem">
              <Chat />
              <span className="topbarIconBadge">2</span>
            </div>
            <div className="topbarIconItem">
              <Notifications />
              <span className="topbarIconBadge">1</span>
            </div>
          </div>
          <Link className="navbar-brand "  to={`/profile/${id}`}><img crossorigin="anonymous"src={user.profilePicture||PF+'download.png'} alt="" className="topbarImg" /></Link>
        </div>
      </div>
    </>
  );
};

export default Topbar;
