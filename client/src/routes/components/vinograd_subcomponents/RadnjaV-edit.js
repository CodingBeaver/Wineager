import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useHistory } from 'react-router'; 






export default function RadnjaVEdit({id}) {
    const history  =useHistory();

    const radnja_id= useParams().id
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const [parcela, setParcela]= useState("");
    const [datum, setDatum] =useState(new Date());







    useEffect(()=>{
        async function getRadnja(){
        try {
            const response=  await axios.get(`http://localhost:5000/api/data/radnje_vinograd/${id}/radnja/${radnja_id}`)
            const prskanje= response.data
            setNaziv(prskanje.naziv)
            setOpis(prskanje.opis)
            setParcela(prskanje.parcela)
            } catch (error) {
                console.error(error.message)
                toast.error(error.message)
            
        }}

        getRadnja()
    },[])

     async function handleSubmit(e){
       e.preventDefault();
       const radnja_vinograd={
        naziv,
        opis,
       parcela,
        datum
      }
       try {
         
        const response= await axios.patch(`http://localhost:5000/api/data/radnje_vinograd/${id}/radnja/${radnja_id}`, radnja_vinograd );
        toast.success("Radnja uspiješno uređena!",{
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false})

        history.push("/vinograd")
       } catch (error) {
         console.error(error.message)
         toast.error(error.message)
       }
       
    }
    return (
        <div className="container text-center">
        <h1>Uredi radnju</h1>
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
        
    )
}
