import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import UserInfo from "./UserInfo";
import {socket} from '../socket'

const UsersArea = () => {
  const [users,setUsers]=useState([]);
  const [messages,setMessages]=useState([]);
  const location=useLocation();
  console.log('rendered');
  useEffect(() => {
    function onMessageReceived(value){
      console.log(value);
      setMessages(previous=>[...previous,value])
    }
    socket.connect();
    socket.on('db-changes',onMessageReceived);
    return ()=>{
      socket.off('db-changes',onMessageReceived);
      socket.disconnect();
    }
    
    },[])
  useEffect(()=>{
    getUsers().then(()=>{
      getMessages();
    });  
  },[])
  const getUsers=async ()=>{
    const response = await axios.get('http://localhost:4000/userfriends', { withCredentials: true });
    console.log(response.data);
    setUsers(response.data);
    return response.data;
  }
  const getMessages=async ()=>{
    const response = await axios.get('http://localhost:4000/messages', { withCredentials: true });
    console.log(response.data);
    setMessages(response.data);
    return response.data;
  }
  const addMessage=(message)=>{
    setMessages([...messages,message]);
  }
  return (
    <>
    <div className="UserArea">
      <div className='sidebar'>
        <h3>Welcome,{location.state.username}</h3>
        {users.map((user,index)=>location.state.username!==user.username&&<UserInfo key={index} userdata={user}/>)}
      </div>
    <Outlet context={[{usermessages:messages},{addMessage:addMessage}]}/>
    </div>
    </>
  )
}

export default UsersArea