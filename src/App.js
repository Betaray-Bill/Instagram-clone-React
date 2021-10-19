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
    onAuthStateChanged(auth, (user) => {
       if (user) {
        setusers(user)
      } else {
        console.log("No user")
      }})
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
