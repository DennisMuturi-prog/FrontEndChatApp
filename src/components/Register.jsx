import { Link, useNavigate } from 'react-router-dom'
import styles from './Register.module.css'
import { useState } from 'react'
import axios from 'axios'
const Register = () => {
  const navigate=useNavigate();
  const [firstname,setFirstName]=useState();
  const [secondname,setSecondName]=useState();
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const [confirmpassword,setConfirmpassword]=useState();
  const [passwordMismatch,setPasswordMismatch]=useState(false);
  const handleSubmit=async (event)=>{
    event.preventDefault();
    if(password===confirmpassword){
      const response=await axios.post('http://localhost:4000/register',
      {
      username:`${firstname}${secondname}`,
      email:email,
      password:password
      },
      {
            withCredentials: true
        }
      )
      if(response.data.status=='successfully registered'){
        navigate('/users',{state:{username:`${firstname} ${secondname}`}});
      }

    }
  }
  const handleConfirmPassword=(e)=>{
    setConfirmpassword(e.target.value);
    if(password!==e.target.value){
      setPasswordMismatch(true);
    }
    else{
      setPasswordMismatch(false);
    }

  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
    <p className={styles.title}>Register </p>
    <p className={styles.message}>Signup now and get full access to our app. </p>
        <div className={styles.flex}>
        <label>
            <input required onChange={(e)=>setFirstName(e.target.value)} placeholder="" type="text" className={styles.input}/>
            <span>Firstname</span>
        </label>

        <label>
            <input required onChange={(e)=>setSecondName(e.target.value)} placeholder="" type="text" className={styles.input}/>
            <span>Lastname</span>
        </label>
    </div>  
            
    <label>
        <input required onChange={(e)=>setEmail(e.target.value)} placeholder="" type="email" className={styles.input} name='email'/>
        <span>Email</span>
    </label> 
        
    <label>
        <input required onChange={(e)=>setPassword(e.target.value)} placeholder="" type="password" className={styles.input} name='password'/>
        <span>Password</span>
    </label>
    <label>
        <input required onChange={handleConfirmPassword} placeholder="" type="password" className={styles.input} name='confirmpassword'/>
        <span>Confirm password</span>
        {passwordMismatch &&<span>Password not matching</span>}
    </label>
    <button className={styles.submit}>Submit</button>
    <p className={styles.signin}>Already have an acount ? <Link to='/'>Sign in</Link></p>
</form>
  )
}

export default Register