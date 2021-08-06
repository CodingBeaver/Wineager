import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//
import trash from "../../../assets/trash.svg"
import PrskanjeAdd from './Prskanje_add';

export default function Prskanja({id}) {
    const [prskanja,setPrskanja]= useState([])
    const [render,setRender]= useState(false)
    const [visible, setVisible]= useState(false);
    const [updated, setUpdated]= useState(0);
    
     function printRadnje(){
        return prskanja.map(prskanje =>{
            
            return(
                <tr key={prskanje.prskanje_id} className="table_row">
                <td>{prskanje.naziv}</td>
                <td>{prskanje.opis}</td>
                <td>{prskanje.parcela}</td>
                <td>{prskanje.sredstvo}</td>
                <td>{prskanje.kolicina} {prskanje.jedinica}</td>
                <td>{prskanje.datum.substring(0,10)}</td>
                
                <td>
                <Link to={`/vinograd/prskanje/${prskanje.prskanje_id}`}><button className="btn btn-primary m-1">Uredi</button></Link>
                    <Link onClick={()=>{handleDelete(prskanje.prskanje_id)}}><img  className="trash"src={trash} alt="Obriši"></img></Link>
                </td>
                </tr>
            )
        })
    }
    async function handleDelete(prskanje_id){
      try {
        const response = await axios.delete(`http://localhost:5000/api/data/prskanja/${id}/delete/${prskanje_id}`)
        setPrskanja(
          prskanja.filter(el=>el.prskanje_id !== prskanje_id)
      )
        toast.success("Prskanje uspiješno obrisano")
      } catch (error) {
        console.error(error.message)
        toast.error(error.message)
      }

    }
    useEffect(()=>{
        async function getRadnje(){
                if(id){
                const response =  await axios.get(`http://localhost:5000/api/data/prskanja/${id}/`)
                
                if(response.data){
                    console.log(response.data)
                setPrskanja(response.data.prskanja)
                setRender(true)
                }
                
                }}
        getRadnje()


    },[id,updated])
    return (
        <div className="prskanja">
          <button className="btn btn-success my-3" onClick={()=>{
                    setVisible(true)
                    }}>Dodaj Prskanje +</button>
                <PrskanjeAdd isOpen={visible}   updated={updated} setUpdated={setUpdated} id={id} handleClose={()=>{setVisible(false)}} id={id}/>       
        <table className="table my-5">
          <thead className="thead-light">
            <tr>
              <th>Naziv</th>
              <th>Opis</th>
              <th>Parcela</th>
              <th>Sredstvo</th>
              <th>Količina</th>
              <th>Datum</th>
              <th>Opcije</th>
              
            </tr>
          </thead>
          <tbody>
            { render?printRadnje():null }
          </tbody>
        </table>
      </div>
      )
}
