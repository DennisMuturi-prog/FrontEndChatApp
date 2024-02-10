import { useLocation, useOutletContext, useParams } from "react-router-dom"
import rightArrow from '../assets/sendArrow.svg';
import { useRef, useState,useEffect } from "react";
import userIcon from '../assets/user.svg';
import unRead from '../assets/single_check_icon.svg';
import read from '../assets/check_double_icon.svg'
import axios  from "axios";
const UserMessages = () => {
    const { id } = useParams();
    const context=useOutletContext();
    const [message,setMessage]=useState();
    const [messages,setMessages]=useState(context[0].usermessages);
    const location=useLocation();
    const inputElement=useRef();
    const messagesEndRef=useRef();
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(()=>{
      const messages=context[0].usermessages.filter(message=>message.receiverid==id || message.senderid==id);
      setMessages(messages);
    },[id,context])
    
    useEffect(scrollToBottom,[messages]);
    const checkDate=(time)=>{
          const messageDate = new Date(time);
          const today = new Date();
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);

          let displayDate;
          if (
             messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
          ) {
             displayDate = "Today";
          } else if (
            messageDate.getDate() === yesterday.getDate() &&
            messageDate.getMonth() === yesterday.getMonth() &&
            messageDate.getFullYear() === yesterday.getFullYear()
          ) {
            displayDate = "Yesterday";
          } else {
            displayDate = messageDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          }

         return displayDate;
    }
    const handleSend=async ()=>{
      const response=await axios.post('http://localhost:4000/sendmessage',
      {
        message:message,
        receiverid:id
      },
      {withCredentials:true})
      context[1].addMessage({senderid:1,message:message,receiverid:id,time:new Date(),readstatus:'unread'});
      inputElement.current.value=''
    }
  return (
    <div className="messages" >
      <h1>
        <img src={location.state.imageUrl?location.state.imageUrl:userIcon}/>
        {location.state.friendname}</h1>
      <div className="messagesbody">
        {messages[0] &&<div className="dateDiv">{checkDate(messages[0].time)}</div>}
        {messages.map((usermessage,index)=>{
          let displayDate;
          if(index>0 && 
          (new Date(usermessage.time).getDate()>new Date(messages[index-1].time).getDate()||
          new Date(usermessage.time).getMonth()>new Date(messages[index-1].time).getMonth()||
          new Date(usermessage.time).getFullYear()>new Date(messages[index-1].time).getFullYear())){
            displayDate=checkDate(usermessage.time);
          }
        return(
        (index>0 && 
          (new Date(usermessage.time).getDate()>new Date(messages[index-1].time).getDate()||
          new Date(usermessage.time).getMonth()>new Date(messages[index-1].time).getMonth()||
          new Date(usermessage.time).getFullYear()>new Date(messages[index-1].time).getFullYear()))
        ?<><div className="dateDiv">{displayDate}</div>
        {
          (usermessage.senderid==id || usermessage.receiverid==id)
            ?(usermessage.senderid==id)
              ?<div key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
              :<div key={index} className="right"><span>{usermessage.message}<img src={usermessage.readstatus=='read'?read:unRead}/></span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>  
            :null

        }

        </>

      :(usermessage.senderid==id || usermessage.receiverid==id)
            ?(usermessage.senderid==id)
              ?<div key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
              :<div key={index} className="right"><span>{usermessage.message}<img src={usermessage.readstatus=='read'?read:unRead}/></span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>  
            :null
            );
    })}  
        <div ref={messagesEndRef}></div>
    </div>
    <div className="sendMessage"><input type="text" ref={inputElement} placeholder="Enter message here"  onChange={(e)=>setMessage(e.target.value)}/><img onClick={handleSend} src={rightArrow} alt="" />
    </div>
    </div>
  )
}

export default UserMessages