import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

//assets
import trash from "../../../assets/trash.svg"

//subcomponents
import RadnjaAdd from './Radnje_add';


export default function Radnje({id}) {
        const [radnje,setRadnje]= useState([])
        const [render,setRender]= useState(false)
        const [visible, setVisible]= useState(false);
        const [updated, setUpdated]= useState(0);
        
         function printRadnje(){
            return radnje.map(radnja =>{
                
                return(
                    <tr key={radnja.radnja_id} className="table_row">
                    <td>{radnja.naziv}</td>
                    <td>{radnja.opis}</td>
                    <td>{radnja.ulaz}</td>
                    <td>{radnja.izlaz}</td>
                    <td>{radnja.kolicina} {radnja.jedinica}</td>
                    <td>{radnja.datum.substring(0,10)}</td>
                    
                    <td>
                    <Link to={`/vinarija/radnja/${radnja.radnja_id}`}><button className="btn btn-primary m-1"><Link ></Link>Uredi</button></Link>
                        <Link onClick={()=>{handleDelete(radnja.radnja_id)}}><img  className="trash" src={trash} alt="Obriši"></img></Link>
                    </td>
                    </tr>
                )
            })
        }

        async function handleDelete(radnja_id){
          try {
            const response = await axios.delete(`http://localhost:5000/api/data/radnje/${id}/delete/${radnja_id}`)
            setRadnje(
              radnje.filter(el=>el.radnja_id !== radnja_id)
          )
            toast.success("Radnja uspiješno obrisana")
          } catch (error) {
            console.error(error.message)
            toast.error(error.message)
          }

        }
        useEffect(()=>{
            async function getRadnje(){
                    if(id){
                    const response =  await axios.get(`http://localhost:5000/api/data/radnje/${id}/`)
                    
                    if(response.data){
                        console.log(response.data)
                    setRadnje(response.data.radnje)
                    setRender(true)
                    }
                    
                    }}
            getRadnje()
    
    
        },[id,updated])
        return (
            <div className="radnje">
               <button className="btn btn-success my-3" onClick={()=>{
                    setVisible(true)
                    }}>Dodaj radnju +</button>
                <RadnjaAdd isOpen={visible}   updated={updated} setUpdated={setUpdated} id={id} handleClose={()=>{setVisible(false)}} id={id}/>
            
            <table className="table my-5">
              <thead className="thead-light">
                <tr>
                  <th>Naziv</th>
                  <th>Opis</th>
                  <th>Ulaz</th>
                  <th>Izlaz</th>
                  <th>Kolicina</th>
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
    

