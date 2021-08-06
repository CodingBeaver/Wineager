import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//componenets
import Bacve from './vinarija_subcomponents/Bacve';
import Radnje from "./vinarija_subcomponents/Radnje";

//<img className="card-img " src={barrel} alt="bacva"></img>

export default function Vinarija(props) {
    const [toggle,setToggle]= useState(true);

   return(
       <div className="vinarija text-center">
           <button className={toggle?"btn m-1 px-4 current":"btn m-1 px-4"} onClick={()=>{setToggle(true)}} >Bačve</button>
            <button  className={!toggle?"btn m-1 px-4 current":"btn m-1 px-4"} onClick={()=>{setToggle(false)}}>Radnje</button>

            {toggle?<Bacve id={props.id}/>:<Radnje id={props.id}/>}
       </div>
   )
}
