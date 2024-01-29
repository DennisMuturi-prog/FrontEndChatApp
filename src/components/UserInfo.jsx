import {  useLocation, useNavigate, useParams } from "react-router-dom"
import userIcon from '../assets/user.svg';
import { useEffect,useState } from "react";
const UserInfo = ({userdata,usermessages}) => {
    const {id}=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const [latestMessage, setLatestMessage] = useState(null);
    useEffect(() => {
        // Get the latest message that matches the senderId or receiverId with userdata._id
        const message=usermessages.filter(message=>message.senderid==userdata._id || message.receiverid==userdata._id);
        setLatestMessage(message[message.length-1]);
    }, [usermessages]);
    const handleClick=()=>{
        navigate(`/users/${userdata._id}`,{state:{username:location.state.username,friendname:userdata.username,myimageUrl:location.state.myimageUrl,imageUrl:userdata.imageUrl}});
    }
  return (
    <div className={userdata._id==id?"usercardActive":"usercard"} onClick={handleClick}>
      <img src={userdata.imageUrl?userdata.imageUrl:userIcon}/>
      <div className="latestmessage"><span>{userdata.username}{
        userdata.status=='online'?<> <span className="onlineSpan">online</span><div className="onlineDiv"></div></>:''}</span><span>{latestMessage ? latestMessage.message : 'No messages yet'}</span></div> 
    </div>
  )
}

export default UserInfo