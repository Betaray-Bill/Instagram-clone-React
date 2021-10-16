import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Components/Header';
import Feed from './Components/Feed';
import { getAuth, onAuthStateChanged } from "firebase/auth";


function App() {

  const [users, setusers] = useState([])

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setusers(user)
        console.log(user)
      } else {
        setusers("No user")
      }
    });})


  return (
      <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
        <Header user_prof={users.photoURL}/>
        <Feed user={users}/>
      </div>    
  );
}

export default App;
