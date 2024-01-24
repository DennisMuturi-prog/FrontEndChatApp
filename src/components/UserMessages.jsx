import { useLocation, useOutletContext, useParams } from "react-router-dom"
import rightArrow from '../assets/sendArrow.svg';
import { useState } from "react";
import axios  from "axios";
const UserMessages = () => {
    const { id } = useParams();
    const context=useOutletContext();
    const [message,setMessage]=useState();
    const location=useLocation();
    const handleSend=async ()=>{
      const response=await axios.post('http://localhost:4000/sendmessage',
      {
        message:message,
        receiverid:id
      },
      {withCredentials:true})
      context[1].addMessage({senderid:1,message:message,receiverid:id,time:new Date()});
    }
  return (
    <div className="messages" >
      <h1>{location.state.friendname}</h1>
      <div className="messagesbody">
    {context[0].usermessages.map((usermessage,index)=>{
      if(usermessage.senderid==id || usermessage.receiverid==id){
        if(usermessage.senderid==id){
          return  <div key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
        }
        else{
          return <div key={index} className="right"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
        }
      }
    })}</div>
    <div className="sendMessage"><input type="text" placeholder="Enter message here"  onChange={(e)=>setMessage(e.target.value)}/><img onClick={handleSend} src={rightArrow} alt="" /></div>
    </div>
  )
}

export default UserMessages