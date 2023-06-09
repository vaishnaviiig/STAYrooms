import React,{useEffect,useState} from "react";
import { Tabs } from "antd";
import axios from "axios";
function Profilescreen() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  useEffect(()=>{
if(!user){
    window.location.href='./login';
}
  },[])
    return (
    <div class='ml-3 mt-3'>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Profile" key="1">
         <h1>My Profile</h1>
         <br/>
         <h1>Name : {user.name}</h1>
         <h1>Email : {user.email}</h1>
         <h1>Admin : {user.isAdmin ? "Yes":"No"}</h1>
        </Tabs.TabPane>
        
        
      </Tabs>
    </div>
  );
}

export default Profilescreen;
