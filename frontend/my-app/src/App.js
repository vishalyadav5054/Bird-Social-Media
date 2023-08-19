// import Home from "./pages/home/Home";
// import Login from "./pages/login/Login";
// import Profile from "./pages/profile/Profile";
// import Register from "./pages/register/Register";

// function App() {
//   return <Profile/>;
// }

// export default App;
import React from 'react'
// import axios from "axios";
// import { useEffect } from 'react';
// import { useState } from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import UserInfo from "./components/rightbar/UserInfo";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
const App = () => {
  
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/profile/:id" element={<Profile />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/" element={<Register />} />
          <Route exact path="/userInfo" element={<UserInfo />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
