import React from 'react'
import { useState, useEffect } from 'react';

//components
import Parcele from './vinograd_subcomponents/Parcele';
import Prskanja from './vinograd_subcomponents/Prskanja';
import RadnjeVinograd from './vinograd_subcomponents/RadnjeVinograd';

export default function Vinograd(props) {
    const [toggle,setToggle]= useState(0);
    return (
        <div>
           <div className="vinograd text-center">
               <h1 className="my-3">Vinograd</h1>
           <button className={toggle===0?"btn m-1 px-4 current":"btn m-1 px-4"} onClick={()=>{setToggle(0)}} >Parcele</button>
            <button  className={toggle===1?"btn m-1 px-4 current":"btn m-1 px-4"} onClick={()=>{setToggle(1)}}>Prskanja</button>
            <button  className={toggle===2?"btn m-1 px-4 current":"btn m-1 px-4"} onClick={()=>{setToggle(2)}}>Radnje</button>

            {toggle===0?<Parcele id={props.id}/>
            :toggle===1?<Prskanja id={props.id}/>
            :toggle===2?<RadnjeVinograd id={props.id}/>:null }
            
       </div>
            
        </div>
    )
}
