import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom"
import UserInfo from "./UserInfo";
import {socket} from '../socket'
import userIcon from '../assets/user.svg';

const UsersArea = () => {
  const [users,setUsers]=useState([]);
  const [messages,setMessages]=useState([]);
  const location=useLocation();
  console.log('rendered');
  useEffect(()=>{
    getUsers().then(()=>{
      getMessages();
    });  
  },[])
  useEffect(() => {
    function onMessageReceived(value){
      setMessages(previous=>[...previous,value])
    }
    function onUserBeingOnline(useronline){
      setUsers(users => users.map((user) => {
        if(user._id == useronline){
            return {...user, status: 'online'}
        } else {
            return user;
        }
    }));
    }
    function onUserBeingOffline(useroffline){
      setUsers(users => users.map((user) => {
        if(user._id == useroffline){
            return {...user, status: 'offline'}
        } else {
            return user;
        }
    }));
    }
    socket.connect();
    socket.on('db-changes', onMessageReceived);
    socket.on('online', onUserBeingOnline);
    socket.on('offline', onUserBeingOffline);
    return ()=>{
      socket.off('db-changes',onMessageReceived);
      socket.off('online',onUserBeingOnline);
      socket.off('offline',onUserBeingOffline);
      socket.disconnect();
    }
    
    },[])
  const getUsers=async ()=>{
    const response = await axios.get('http://localhost:4000/userfriends', { withCredentials: true });
    setUsers(response.data);
    console.log(response.data);
    return response.data;
  }
  const getMessages=async ()=>{
    const response = await axios.get('http://localhost:4000/messages', { withCredentials: true });
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
        <h3><span className="username">Welcome,{location.state.username}</span><img src={location.state.myimageUrl?location.state.myimageUrl:userIcon}/></h3>
        {users.map((user,index)=>location.state.username!==user.username&&<UserInfo key={index} userdata={user} usermessages={messages}/>)}
      </div>
    <Outlet context={[{usermessages:messages},{addMessage:addMessage}]}/>
    </div>
    </>
  )
}

export default UsersArea