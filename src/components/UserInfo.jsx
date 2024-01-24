import {  useLocation, useNavigate, useParams } from "react-router-dom"
const UserInfo = ({userdata}) => {
    const {id}=useParams();
    const location=useLocation();
    const navigate=useNavigate();
    const handleClick=()=>{
        navigate(`/users/${userdata._id}`,{state:{username:location.state.username,friendname:userdata.username}});
    }
  return (
    <div className={userdata._id==id?"usercardActive":"usercard"} onClick={handleClick}>{userdata.username}</div>
  )
}

export default UserInfo