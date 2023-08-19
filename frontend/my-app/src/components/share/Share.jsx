import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions,Cancel,} from "@material-ui/icons"
import { useState } from "react";
import axios from "axios";

export default function Share() {
  const [postshare,setPostshare]=useState("");
  const [file,setFile]=useState(null);
  const PF=process.env.REACT_APP_PUBLIC_FOLDER;
  const id=JSON.parse(localStorage.getItem('id'));
  const user=JSON.parse(localStorage.getItem('loginUser'));
  const handlePost=(e)=>{
    setPostshare(e.target.value);
  }
  const handleClick=async (e)=>{
    e.preventDefault();
    if(postshare===""){

      setPostshare("");
      alert("Please upload valid post");
      return;
    }
    const newPost={desc:postshare,userId:id};
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.image = fileName;
      console.log(newPost);
      try {
        await axios.post("https://backend-gwa2.onrender.com/uploadImage", data);
      } catch (err) {}
    }
    const res=await axios.post("https://backend-gwa2.onrender.com/upload/post",newPost);
    if(res.status===200){
      setPostshare("");

      alert("Post uploaded successfully");
      window.parent.location = window.parent.location.href;
    }
   
    }
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img className="shareProfileImg" crossorigin="anonymous"src={user.profilePicture||PF+"download.png"} alt="" />
          <input
            placeholder={`What's in your mind ${user.userName}?`}
            className="shareInput" name="postshare" value={postshare} onChange={(e)=>handlePost(e)}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg"crossorigin="anonymous" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" >
            <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
                <div className="shareOption">
                    <Label htmlColor="blue" className="shareIcon"/>
                    <span className="shareOptionText">Tag</span>
                </div>
                <div className="shareOption">
                    <Room htmlColor="green" className="shareIcon"/>
                    <span className="shareOptionText">Location</span>
                </div>
                <div className="shareOption">
                    <EmojiEmotions htmlColor="goldenrod" className="shareIcon"/>
                    <span className="shareOptionText">Feelings</span>
                </div>
            </div>
            <button className="shareButton" onClick={(e)=>{
              handleClick(e);
            }}>Share</button>
        </form>
      </div>
    </div>
  );
}
