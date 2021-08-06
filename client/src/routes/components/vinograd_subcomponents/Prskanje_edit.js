import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useHistory } from 'react-router'; 






export default function PrskanjeEdit({id}) {
    const history  =useHistory();

    const prskanje_id= useParams().id
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const [parcela, setParcela]= useState("");
    const [sredstvo, setSredstvo]= useState("");
    const [kolicina, setKolicina]= useState();
    const [jedinica, setJedinica]= useState("");
    const [datum, setDatum] =useState(new Date());







    useEffect(()=>{
        async function getPrskanje(){
        try {
            const response=  await axios.get(`http://localhost:5000/api/data/prskanja/${id}/prskanje/${prskanje_id}`)
            const prskanje= response.data
            setNaziv(prskanje.naziv)
            setOpis(prskanje.opis)
            setParcela(prskanje.parcela)
            setSredstvo(prskanje.sredstvo)
            setKolicina(prskanje.kolicina)
            setJedinica(prskanje.jedinica)
            } catch (error) {
                console.error(error.message)
                toast.error(error.message)
            
        }}

        getPrskanje()
    },[])

     async function handleSubmit(e){
       e.preventDefault();
       const prskanje={
        naziv,
        opis,
       parcela,
       sredstvo,
       kolicina,
       jedinica,
        datum
      }
       try {
         
        const response= await axios.patch(`http://localhost:5000/api/data/prskanja/${id}/prskanje/${prskanje_id}`, prskanje );
        toast.success("Prskanje uspiješno uređeno!",{
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
        <h1>Uredi Prskanje</h1>
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
    <input type="text" min="0" className="form-control" id="parcela" placeholder="Parcela" value ={parcela} onChange={(e)=>{setParcela(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="sredstov">Sredstvo</label>
    <input type="text" className="form-control" id="sredstvo" placeholder="Sredstvo" value ={sredstvo} onChange={(e)=>{setSredstvo(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="kolicina">Količina</label>
    <input type="number" min="0" className="form-control" id="kolicina" placeholder="Količina" value ={kolicina} onChange={(e)=>{setKolicina(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="jedinica">Jedinica</label>
    <input type="text" className="form-control" id="jedinica" placeholder="Jedinica" value ={jedinica} onChange={(e)=>{setJedinica(e.target.value)}}/>
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
