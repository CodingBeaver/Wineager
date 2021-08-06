import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useHistory } from 'react-router'; 






export default function BacvaEdit({id}) {
    const history  =useHistory();

    const bacva_id= useParams().id
    const [naziv, setNaziv]= useState("");
    const [kapacitet, setKapacitet]= useState();
    const [trenutni_volumen, setVolumen]= useState();
    const [sorta,setSorta]= useState("")
    const [parcela, setParcela]= useState("");
    const [alkohol, setAlkohol]= useState();
    const [sumpor, setSumpor] = useState();
    const [datum, setDatum] =useState(new Date());



    useEffect(()=>{
        async function getBacva(){
        try {
            const response=  await axios.get(`http://localhost:5000/api/data/bacve/${id}/bacva/${bacva_id}`)
            const bacva= response.data
            console.log(bacva)
            setNaziv(bacva.naziv)
            setKapacitet(bacva.kapacitet)
            setVolumen(bacva.trenutni_volumen)
            setSorta(bacva.sorta)
            setParcela(bacva.parcela)
            setAlkohol(bacva.alkohol)
            setSumpor(bacva.sumpor)
            
        } catch (error) {
            
        }}

        getBacva()
    },[])

     async function handleSubmit(e){
       e.preventDefault();
       const bacva={
         naziv,
         kapacitet,
         trenutni_volumen,
         sorta,
         parcela,
         alkohol,
         sumpor,
         datum
       }
       try {
         
        const response= await axios.patch(`http://localhost:5000/api/data/bacve/${id}/bacva/${bacva_id}`,bacva );
        toast.success("Bačva uspiješno uređenja!",{
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false})

        history.push("/vinarija")
       } catch (error) {
         console.error(error.message)
         toast.error(error.message)
       }
       
    }
    return (
        <div className="container text-center">
        <h1>Uredi Bačvu</h1>
        <form onSubmit={handleSubmit} className="grid_container ">
  <div className="form-group">
    <label htmlFor="naziv">Naziv</label>
    <input type="text" className="form-control" id="naziv" placeholder="Naziv" value ={naziv} onChange={(e)=>{setNaziv(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="kapacitet">Kapacitet L</label>
    <input type="number"  min="0"className="form-control" id="kapacitet" placeholder="Kapacitet" value ={kapacitet} onChange={(e)=>{setKapacitet(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="trenutni_volumen">Trenutni volumen L</label>
    <input type="number"  min="0" className="form-control" id="trenutni_volumen" placeholder="Trenutni volumnen" value ={trenutni_volumen} onChange={(e)=>{setVolumen(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="sorta">Sorta</label>
    <input type="text" className="form-control" id="sorta" placeholder="Sorta" value ={sorta} onChange={(e)=>{setSorta(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="parcela">Parcela</label>
    <input type="text" className="form-control" id="parcela" placeholder="Parcela" value ={parcela} onChange={(e)=>{setParcela(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="alkohol">Alkohol</label>
    <input type="number" min="0"className="form-control" id="alkohol" placeholder="Alkohol %" value ={alkohol} onChange={(e)=>{setAlkohol(e.target.value)}}/>
  </div>
  <div className="form-group">
    <label htmlFor="sumpor">Sumpor</label>
    <input type="number"  min="0"className="form-control" id="sumpor" placeholder="Sumpor mg/L" value ={sumpor} onChange={(e)=>{setSumpor(e.target.value)}}/>
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
