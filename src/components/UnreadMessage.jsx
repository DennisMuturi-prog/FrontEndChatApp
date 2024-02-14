import  { useRef,useEffect } from "react";
import axios from "axios";
export function UnreadMessage({
  usermessage,
  index
}) {
    const unreadMessage=useRef();
    useEffect(()=>{
      const observer=new IntersectionObserver(entries=>{
        const entry=entries[0];
        if(entry.isIntersecting){
            setTimeout(()=>readMessage(usermessage._id),2000);
        }
      });
        observer.observe(unreadMessage.current);
    },[])
    const readMessage=async (messageid)=>{
      await axios.post('https://backendchatapp-ghen.onrender.com/readMessage',
          {_id:messageid},
          {withCredentials:true}  );

    }
  return <div ref={unreadMessage} key={index} className="left"><span>{usermessage.message}</span><span>{usermessage.time && new Date(usermessage.time).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
      })}</span></div>;
}
  