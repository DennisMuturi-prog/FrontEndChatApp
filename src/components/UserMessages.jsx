import { UnreadMessage } from './UnreadMessage';
import { useLocation, useOutletContext, useParams } from "react-router-dom"
import rightArrow from '../assets/sendArrow.svg';
import { useRef, useState,useEffect } from "react";
import userIcon from '../assets/user.svg';
import unRead from '../assets/single_check_icon.svg';
import read from '../assets/check_double_icon.svg'
import axios  from "axios";
import {differenceInCalendarDays,isToday,isYesterday,getDay} from 'date-fns';
const UserMessages = () => {
    const { id } = useParams();
    const context=useOutletContext();
    const [message,setMessage]=useState();
    const [messages,setMessages]=useState(context[0].usermessages);
    const location=useLocation();
    const inputElement=useRef();
    const messagesEndRef=useRef();
    const unreadMessage=useRef();
    const [firstTimeScroll,setFirstTimeScroll]=useState(true);
    console.log(firstTimeScroll);
    useEffect(()=>{
      const messages=context[0].usermessages.filter(message=>message.receiverid==id || message.senderid==id);
      setMessages(messages);
    },[id,context])
    const scrollToBottom = () => {
      if(!unreadMessage.current){
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }  
    };
    const scrollToUnread = () => {
      unreadMessage.current?.scrollIntoView({ behavior: "smooth" });   
    }
    useEffect(scrollToBottom,[messages]);
    useEffect(scrollToUnread,[messages]);
    
    const checkDate=(time)=>{
          const messageDate = new Date(time);
          const today = new Date();
          const difference=differenceInCalendarDays(today,messageDate);
          const daysOfTheWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

          let displayDate;
          if (isToday(messageDate)) {
             displayDate = "Today";
          } else if (isYesterday(messageDate)) {
            displayDate = "Yesterday";
          } else if(difference>1 && difference<6) {
            const numberOfDayInWeek=getDay(messageDate);
            displayDate=daysOfTheWeek[numberOfDayInWeek];
          }
          
          else {
            displayDate = messageDate.toLocaleDateString(undefined, {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          });
          }

         return displayDate;
    }
    const handleSend=async ()=>{
      const response=await axios.post('https://backendchatapp-ghen.onrender.com/sendmessage',
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
          if(index>0 && differenceInCalendarDays(new Date(usermessage.time),new Date(messages[index-1].time))>0){
            displayDate=checkDate(usermessage.time);
          }
          
        return(
        (index>0 && differenceInCalendarDays(new Date(usermessage.time),new Date(messages[index-1].time))>0)
        ?<><div className="dateDiv">{displayDate}</div>
        {
          (usermessage.senderid==id || usermessage.receiverid==id)
            ?(usermessage.senderid==id)
              ?(usermessage.readstatus=='unread')
                ?(messages[index-1].readstatus=='read')?<><div ref={unreadMessage}>Unread messages</div><UnreadMessage   usermessage={usermessage} index={index} /></>:<UnreadMessage   usermessage={usermessage} index={index} />
                :<div key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
              :<div key={index} className="right"><span>{usermessage.message}<img src={usermessage.readstatus=='read'?read:unRead}/></span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>  
            :null
        }
        </>
      :(usermessage.senderid==id || usermessage.receiverid==id)
            ?(usermessage.senderid==id)
              ?(usermessage.readstatus=='unread')
                ?(messages[index-1].readstatus=='read')?<><div ref={unreadMessage}>Unread messages</div><UnreadMessage   usermessage={usermessage} index={index} /></>:<UnreadMessage   usermessage={usermessage} index={index} />
                :<div key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time&&new Date(usermessage.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></div>
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