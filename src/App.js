import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import Feed from './Components/Feed';
import Modal from './Components/Modal';
import {auth} from "./firebase"
import { onAuthStateChanged } from '@firebase/auth';


function App() {

  const [users, setusers] = useState([])

  useEffect(() => {
    console.log("meow 1")
    console.log(auth)
    // const user_in = onAuthStateChanged(auth)
    onAuthStateChanged(auth, (user) => {
      console.log('AuthChange Detected', user)
       if (user) {
        console.log(user)
        setusers(user)
      } else {
        console.log("No user")
      }})
    console.log("meow")
    
  })

  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
        <Modal user={users}/>
        <Header user_prof={users.photoURL}/>
        <Feed user={users}/>
      </div>    
  );
}

export default App;
