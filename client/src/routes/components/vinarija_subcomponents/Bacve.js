import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

//assets
import trash from "../../../assets/trash.svg"


//modal
import BacvaAdd from './Bacva_add';
import Obrisi from './Obrisi';


export default function Bacve({id}) {
 
    const [bacve,setBacve]= useState([])
    const [render,setRender]= useState(false);
    const [visible, setVisible]= useState(false);
    const [updated, setUpdated]= useState(0);
    const [obrisi, setObrisi]= useState(false);
    const [obrisiId, setObrisiId]= useState();
    
    
     function printBacve(){
         return bacve.map(bacva =>{
            
            return(
                <div className="card m-2 text-center" style={{maxWidth:"400px", maxHeight:"700px"}}>
                    <h3 className="card-title text-center">{bacva.naziv}</h3>
                    
                    <div className="card-body">
                        <p className="card-text">{bacva.trenutni_volumen} / {bacva.kapacitet}L</p>
                        <p className="card-text">Sorta:{bacva.sorta}</p>
                        <p className="card-text">Parcela: {bacva.parcela}</p>
                        <p className="card-text">Alk: {bacva.alkohol}% Sumpor: {bacva.sumpor} mg/L</p>
                        <p className="card-text">Datum: {bacva.datum.substring(0,10)}</p>
                        <Link to={`/vinarija/bacva/${bacva.bacva_id}`} ><button className="btn btn-primary m-1">Uredi</button></Link>
                        <Link onClick={()=>{handleDelete(bacva.bacva_id)}} ><img  className="trash"src={trash} alt="Obriši"></img></Link>
                    </div>
                    
                </div>
            )
        })
    }


   async function handleDelete(bacva_id){
       console.log(bacva_id)
        await setObrisiId(bacva_id);
        setObrisi(true)


    }
    useEffect(()=>{
        async function getBacve(){
                if(id){
                const response =  await axios.get(`http://localhost:5000/api/data/bacve/${id}/`)
                setBacve(response.data.bacve)
                setRender(true)
                
                }}
        getBacve()
        
    },[id,updated])
    
   
        return (
            <div className="bacve">
                <button className="btn btn-success my-3" onClick={()=>{
                    setVisible(true)
                    }}>Dodaj bačvu +</button>
                <BacvaAdd isOpen={visible}   updated={updated} setUpdated={setUpdated} id={id} handleClose={()=>{setVisible(false)}} id={id}/>
                <Obrisi isOpen={obrisi} handleClose={()=>{setObrisi(false)}} id={id}  bacva_id={obrisiId} bacve={bacve} setBacve={setBacve}/>
        <div className="grid_container">
            
            
            {   
               render?printBacve():null
            }
            
        </div>
        </div>
    )
}
