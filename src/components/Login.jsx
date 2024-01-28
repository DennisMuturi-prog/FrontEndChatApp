import { useState } from "react"
import styles from './Login.module.css'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail]=useState();
    const [password,setPassword]=useState();
    const [wrongDetails,setWrongDetails]=useState(false);
    const [serverMessage,setServerMessage]=useState();
    const navigate=useNavigate();
    const handleSubmit=async (event)=>{
        event.preventDefault();
        const response=await axios.post('http://localhost:4000/login',
        {
            email:email,
            password:password
        },
        {
            withCredentials: true
        }
        );
        if(response.data.status=='success'){
            navigate('/users',{state:{username:response.data.username,imageUrl:response.data.imageUrl}});
        }
        else{
            setWrongDetails(true);
            setServerMessage(response.data.status);
        }
    }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
       <p className={styles.formtitle}>Sign in to your account</p>
        <div className={styles.inputcontainer}>
          <input placeholder="Enter email" type="email" name="email" onChange={(e)=>setEmail(e.target.value)}/>
          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
      </div>
      <div className={styles.inputcontainer}>
          <input placeholder="Enter password" type="password" name='password' onChange={(e)=>setPassword(e.target.value)}/>

          <span>
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"></path>
            </svg>
          </span>
        </div>
        {wrongDetails&&<span>{serverMessage}</span>}
         <button className={styles.submit} type="submit">
        Sign in
      </button>

      <p className={styles.signuplink}>
        No account?
        <Link to='/register'>Sign up</Link>
      </p>
   </form>
  )
}

export default Login