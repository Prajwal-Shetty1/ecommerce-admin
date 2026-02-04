import React from "react";
import { assets } from "../assets/assets";




const NavBar = ({setToken}) => {
  return (
    <div className="navbar">
      <img src={assets.logo} alt="logo" />
      <button onClick={()=>setToken('')}>Logout</button>
    </div>
  );
};

export default NavBar;
