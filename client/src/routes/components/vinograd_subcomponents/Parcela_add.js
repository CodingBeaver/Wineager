import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";







export default function ParcelaAdd({isOpen, handleClose, id,updated, setUpdated}) {
    console.log(isOpen)
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const [sorta,setSorta]= useState("");
    const [povrsina, setPovrsina]= useState();
    const [redovi, setRedovi]= useState();
    const [cokoti, setCokoti] = useState();
    const [datum, setDatum] =useState(new Date());





     async function handleSubmit(e){
       e.preventDefault();
       const parcela={
         naziv,
         opis,
         sorta,
         povrsina,
         redovi,
         cokoti,
         datum
       }
       try {
         
        const response= await axios.patch(`http://localhost:5000/api/data/parcele/${id}`,parcela );
        setUpdated(updated+1);
        handleClose();
        toast.success("Parcela uspiješno dodana!",{
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
        <h1>Dodaj Parcelu</h1>
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
    <label htmlFor="sorta">Sorta</label>
    <input type="text" className="form-control" id="sorta" placeholder="Sorta" value ={sorta} onChange={(e)=>{setSorta(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="povrsina">Površina</label>
    <input type="number" min="0" className="form-control" id="povrsina" placeholder="Površina" value ={povrsina} onChange={(e)=>{setPovrsina(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="redovi">Redovi</label>
    <input type="number" min="0" className="form-control" id="redovi" placeholder="Redovi" value ={redovi} onChange={(e)=>{setRedovi(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="cokoti">Čokoti</label>
    <input type="number"  min="0" className="form-control" id="cokoti" placeholder="Čokoti" value ={cokoti} onChange={(e)=>{setCokoti(e.target.value)}}/>
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
