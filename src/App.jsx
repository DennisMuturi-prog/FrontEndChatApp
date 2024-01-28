import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import UsersArea from './components/UsersArea'
import UserMessages from './components/UserMessages'
import DefaultMessage from './components/DefaultMessage'
import ProfilePic from './components/ProfilePic'

function App() {
  return (
    <>
    <nav>
      <h1>My chat App</h1>
    </nav>
    
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/profilepic' element={<ProfilePic/>}/>
      <Route path='/users' element={<UsersArea/>}>
        <Route index element={<DefaultMessage/>}/>
        <Route path=':id' element={<UserMessages/>}/>
      </Route>  
    </Routes>
    </>
    

  )
}

export default App
