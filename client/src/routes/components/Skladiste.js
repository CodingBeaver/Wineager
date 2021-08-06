import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
//assets
import trash from "../../assets/trash.svg"
import ItemAdd from './skladiste_subcomponents/Item_add';

export default function Skladiste({id}) {

    const [skladiste,setSkladiste]= useState([])
    const [render,setRender]= useState(false)
    const [visible, setVisible]= useState(false);
    const [updated, setUpdated]= useState(0);
        
         function printSkladiste(){
            return skladiste.map(item =>{
                
                return(
                    <tr key={item.item_id} className="table_row">
                    <td>{item.naziv}</td>
                    <td>{item.opis}</td>
                    <td>{item.kolicina} {item.jedinica}</td>
                    <td>{item.datum.substring(0,10)}</td>
                    
                    <td>
                    <Link to={`/skladiste/item/${item.item_id}`}><button className="btn btn-primary m-1">Uredi</button></Link>
                        <Link onClick={()=>{handleDelete(item.item_id)}} ><img  className="trash"src={trash}></img></Link>
                    </td>
                    </tr>
                )
            })
        }

        async function handleDelete(item_id){
          try {
            const response = await axios.delete(`http://localhost:5000/api/data/skladiste/${id}/delete/${item_id}`)
            setSkladiste(
              skladiste.filter(el=>el.item_id !== item_id)
          )
            toast.success("Stavka uspiješno obrisana")
          } catch (error) {
            console.error(error.message)
            toast.error(error.message)
          }

        }


        useEffect(()=>{
            async function getSkladiste(){
                    if(id){
                    const response =  await axios.get(`http://localhost:5000/api/data/skladiste/${id}/`)
                    
                    if(response.data){
                        console.log(response.data)
                    setSkladiste(response.data.skladiste)
                    setRender(true)
                    }
                    
                    }}
            getSkladiste()
    
    
        },[id,updated])
        return (
            <div className="skladiste text-center">
            <h2 className="my-3">Skladište</h2>
            <button className="btn btn-success my-3" onClick={()=>{
                    setVisible(true)
                    }}>Dodaj stavku +</button>
                <ItemAdd isOpen={visible}   updated={updated} setUpdated={setUpdated} id={id} handleClose={()=>{setVisible(false)}} id={id}/>
            
            <table className="table">
              <thead className="thead-light">
                <tr>
                  <th>Naziv</th>
                  <th>Opis</th>
                  <th>Kolicina</th>
                  <th>Datum</th>
                  <th>Opcije</th>
                  
                </tr>
              </thead>
              <tbody>
                { render?printSkladiste():null }
              </tbody>
            </table>
          </div>
          )
}
