import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";







export default function RadnjaVAdd({isOpen, handleClose, id,updated, setUpdated}) {
    console.log(isOpen)
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const [parcela, setParcela]= useState("");
    const [datum, setDatum] =useState(new Date());





     async function handleSubmit(e){
       e.preventDefault();
       const radnja_vinograd={
         naziv,
         opis,
        parcela,
         datum
       }
       try {
         
        const response= await axios.patch(`http://localhost:5000/api/data/radnje_vinograd/${id}`,radnja_vinograd );
        setUpdated(updated+1);
        handleClose();
        toast.success("Radnja uspiješno dodana!",{
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false}
          )

       } catch (error) {
         console.error(error.message)
         toast.error(error.message)
       }
       
    }

    if(!isOpen) return null;



    return (
        <div className="background">
        <div className="modal">
        <button onClick={handleClose} id="close">x</button>
        <h1>Dodaj Radnju</h1>
        <form onSubmit={handleSubmit} className="grid_container ">
  <div className="form-group">
    <label htmlFor="naziv">Naziv</label>
    <input type="text" className="form-control" id="naziv" placeholder="Naziv" value ={naziv} onChange={(e)=>{setNaziv(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="opis">Opis</label>
    <textarea type="text" className="form-control" id="opis" placeholder="Opis" value ={opis} onChange={(e)=>{setOpis(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="parcela">Parcela</label>
    <input type="text" className="form-control" id="parcela" placeholder="Parcela" value ={parcela} onChange={(e)=>{setParcela(e.target.value)}}/>
  </div>
  <div className="form-group">
  <label htmlFor="datum"  className="form-label">Datum:</label>
  <div id="datum"><DatePicker selected={datum} onChange={(datum)=>{setDatum(datum)}}/>
  </div>
  </div>
  <button type="submit" className="btn btn-primary" >Submit</button>
</form>
        </div>
        </div>
    )
}
