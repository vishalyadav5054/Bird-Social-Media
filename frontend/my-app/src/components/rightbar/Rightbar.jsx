import "./rightbar.css";
import { Users } from "../../dummyData";
import UserFriends from "./UserFriends";
import UserInfo from "./UserInfo";
import Online from "../online/Online";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Add, Remove } from "@material-ui/icons";
import axios from "axios";

export default function Rightbar({profile}) {

  const [user, setUser] = useState({});
  const us1=JSON.parse(localStorage.getItem('loginUser'));
  const [toggle1, setT1] = useState(false);
  const params = useParams();

  // console.log(us1.followings?.includes(params.id));
  // console.log(us1);
  // us1.followings?.includes(params.id)
  const [toggle,setToggle]=useState();
  const id=JSON.parse(localStorage.getItem('id'));
  
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`https://backend-gwa2.onrender.com/${params.id}/getUser`);
      setUser(res.data);
    };
    fetchUser();
    setToggle(us1.followings?.includes(params.id))
  }, [params.id]);
  
  useEffect(() => {
    if (params.id === id) {

      setT1(true);
    } else {
      setT1(false);
    }
  }, [params.id]);
  const handleClick=async ()=>{
    try{
    if(toggle){
      await axios.put(`https://backend-gwa2.onrender.com/${params.id}/unfollow`,{userId:id});
    }else{
      await axios.put(`https://backend-gwa2.onrender.com/${params.id}/follow`,{userId:id});
    }
    const res2=await axios.get(`https://backend-gwa2.onrender.com/${id}/getUser`);
    localStorage.setItem('loginUser',JSON.stringify(res2.data));
    setToggle(!toggle);
  }catch(err){}
  }
  const friends = user.followings;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img crossorigin="anonymous" className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
          </span>
        </div>
        <img crossorigin="anonymous" className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      <>
         {params.id !== id && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {toggle ? "Unfollow" : "Follow"}
            {toggle ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="rightbarTitle">
          User information{" "}
          <Link className="navbar-brand" to="/userInfo">
            {toggle1 ? <i className="fa-solid fa-user-pen"></i> : ""}
          </Link>
        </h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">{user.relationships}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbar1">
          {friends?.map((u) => (
            <UserFriends key={u} idfr={u} />
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );

}
