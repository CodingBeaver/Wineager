import React from 'react'
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export default function Navbar({auth, verify}) {

    const [name, setName] = useState("");
    
   
    useEffect(()=>{
       async function getName(){
           try {
               const response = await axios.get("http://localhost:5000/api/accounts/dashboard",{
                   headers:{
                       token: localStorage.token
                   }
               })
               console.log(response)
               
               setName(response.data.name)
           } catch (error) {
               console.error(error.message)
           }
       }
       getName();

    },[auth])


    async function logout(e){
        e.preventDefault();
        await localStorage.removeItem("token");
        setName("");
        verify()
        toast.success("You have logged out!")
    }
    
   if(auth){return (
        <div key={name}>
            <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/"><h3 className="inline">Wineager <span>Alpha 0.9</span></h3></Link>

    <ul className="navbar-nav"> 
        <li className="nav-item"><span >Korisnik: {name}   
<button className="btn btn-secondary center my-3" onClick={logout} id="logout">   Logout </button></span>
        </li>
    </ul>
  </div>
</nav>
        </div>
    )}
    return(
        <div key={name}>
            <nav className="navbar navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Wineager</Link>
    </div>
    </nav>
    </div>
    )
}
