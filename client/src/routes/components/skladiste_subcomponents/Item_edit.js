import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useHistory } from 'react-router'; 






export default function ItemEdit({id}) {
    const history  =useHistory();

    const item_id= useParams().id
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const [kolicina, setKolicina]= useState();
    const [jedinica, setJedinica]= useState();
    const [datum, setDatum] =useState(new Date());


    useEffect(()=>{
        async function getItem(){
        try {
            const response=  await axios.get(`http://localhost:5000/api/data/skladiste/${id}/item/${item_id}`)
            const item= response.data
            console.log(item)
            setNaziv(item.naziv)
            setOpis(item.opis)
            setKolicina(item.kolicina)
            setJedinica(item.jedinica)
            
        } catch (error) {
            console.error(error.message)
            toast.error(error.message)
            
        }}

        getItem()
    },[])

    async function handleSubmit(e){
        e.preventDefault();
        const item={
            naziv,
            opis,
            kolicina,
            jedinica,
            datum
        }
        try {
          
         const response= await axios.patch(`http://localhost:5000/api/data/skladiste/${id}/item/${item_id}`,item );
         toast.success("Stavka uspiješno uređenja!",{
           autoClose: 2000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: false}
           )
           history.push("/skladiste")
 
        } catch (error) {
          console.error(error.message)
          toast.error(error.message)
        }
        
     }
    return (
        <div className="container text-center">
        <h1>Uredi Radnju</h1>
        <form onSubmit={handleSubmit} className="grid_container ">
            <div className="form-group">
                <label htmlFor="naziv">Naziv</label>
                <input type="text" className="form-control" id="naziv" placeholder="Naziv" value ={naziv} onChange={(e)=>{setNaziv(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="opis">Opis</label>
                <textarea className="form-control" id="opis" placeholder="Opis" value ={opis} onChange={(e)=>{setOpis(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="kolicina">Količina</label>
                <input type="text" className="form-control" id="kolicina" placeholder="Kolicina" value ={kolicina} onChange={(e)=>{setKolicina(e.target.value)}}/>
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
