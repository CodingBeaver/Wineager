import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//assets

import trash from "../../../assets/trash.svg"
import ParcelaAdd from './Parcela_add';


export default function Parcele({id}) {
    const [parcele,setParcele]= useState([])
    const [render,setRender]= useState(false)
    const [visible, setVisible]= useState(false);
    const [updated, setUpdated]= useState(0);
    
     function printParcele(){
        return parcele.map(parcela =>{
            
            return(
                <div className="card m-2 text-center" style={{maxWidth:"400px", maxHeight:"700px"}} key={parcela.parcela_id}>
                    <h3 className="card-title text-center">{parcela.naziv}</h3>
                    
                    <div className="card-body">
                        <p className="card-text">{parcela.opis}</p>
                        <p className="card-text">Sorta:{parcela.sorta}</p>
                        <p className="card-text">Površina: {parcela.povrsina} hektar/a</p>
                        <p className="card-text">Redovi: {parcela.redovi} Čokoti: {parcela.cokoti}</p>
                        <p className="card-text">Datum: {parcela.datum.substring(0,10)}</p>
                        <Link to={`/vinograd/parcela/${parcela.parcela_id}`}><button className="btn btn-primary m-1">Uredi</button></Link>
                        <Link onClick={()=>{handleDelete(parcela.parcela_id)}}><img  className="trash"src={trash} alt="Obriši"></img></Link>
                    </div>
                    
                </div>
            )
        })
    }
    async function handleDelete(parcela_id){
        try {
          const response = await axios.delete(`http://localhost:5000/api/data/parcele/${id}/delete/${parcela_id}`)
          setParcele(
            parcele.filter(el=>el.parcela_id !== parcela_id)
        )
          toast.success("Parcela uspiješno obrisana")
        } catch (error) {
          console.error(error.message)
          toast.error(error.message)
        }

      }
    useEffect(()=>{
        async function getParcele(){
                if(id){
                const response =  await axios.get(`http://localhost:5000/api/data/parcele/${id}/`)
                
                if(response.data){
                setParcele(response.data.parcele)
                setRender(true)
                }
                
                }}
        getParcele()


    },[id,updated])
    
    
        return (
            <div className="parcele">
                               <button className="btn btn-success my-3" onClick={()=>{
                    setVisible(true)
                    }}>Dodaj Parcelu +</button>
                <ParcelaAdd isOpen={visible}   updated={updated} setUpdated={setUpdated} id={id} handleClose={()=>{setVisible(false)}} id={id}/>
        <div className="grid_container ">
            {   
                render?printParcele():null
            }
            
        </div>
        </div>
    )
    
}
