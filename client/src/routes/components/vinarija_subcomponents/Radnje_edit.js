import React from 'react'
import { useState, useEffect} from 'react';
import { toast } from 'react-toastify';
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router';
import { useHistory } from 'react-router'; 






export default function RadnjaEdit({id}) {
    const history  =useHistory();

    const bacva_id= useParams().id
    const [naziv, setNaziv]= useState("");
    const [opis, setOpis]= useState("");
    const[ulaz, setUlaz]= useState("");
    const [izlaz, setIzlaz]= useState("");
    const [kolicina, setKolicina]= useState();
    const [jedinica, setJedinica]= useState();
    const [datum, setDatum] =useState(new Date());


    useEffect(()=>{
        async function getRadnja(){
        try {
            const response=  await axios.get(`http://localhost:5000/api/data/radnje/${id}/radnja/${bacva_id}`)
            const radnja= response.data
            console.log(radnja)
            setNaziv(radnja.naziv)
            setOpis(radnja.opis)
            setUlaz(radnja.ulaz)
            setIzlaz(radnja.izlaz)
            setKolicina(radnja.kolicina)
            setJedinica(radnja.jedinica)
            
        } catch (error) {
            
        }}

        getRadnja()
    },[])

    async function handleSubmit(e){
        e.preventDefault();
        const radnja={
          naziv,
         opis,
         ulaz,
         izlaz,
         kolicina,
         jedinica,
          datum
        }
        try {
          
         const response= await axios.patch(`http://localhost:5000/api/data/radnje/${id}`,radnja );
         toast.success("Radnja uspiješno uređenja!",{
           autoClose: 2000,
           hideProgressBar: true,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: false}
           )
           history.push("/vinarija")
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
                <label htmlFor="ulaz">Ulaz</label>
                <input type="text" className="form-control" id="ulaz" placeholder="Ulaz" value ={ulaz} onChange={(e)=>{setUlaz(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="izlaz">Izlaz</label>
                <input type="text" className="form-control" id="izlaz" placeholder="Izlaz" value ={izlaz} onChange={(e)=>{setIzlaz(e.target.value)}}/>
            </div>
            <div className="form-group">
                <label htmlFor="kolicina">Količina</label>
                <input type="number" min="0" className="form-control" id="kolicina" placeholder="Kolicina" value ={kolicina} onChange={(e)=>{setKolicina(e.target.value)}}/>
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
