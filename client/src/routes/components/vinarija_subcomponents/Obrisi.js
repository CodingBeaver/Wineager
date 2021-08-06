import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";




//assets
import bacva from "../../../assets/barrel.svg"


export default function Obrisi({isOpen, handleClose, id,bacve, setBacve, bacva_id}) {
    console.log(isOpen)




     async function handleSubmit(e){
       e.preventDefault();
      
       try {
         
        const response= await axios.delete(`http://localhost:5000/api/data/bacve/${id}/delete/${bacva_id}` );
        
        setBacve(
          bacve.filter(el=>el.bacva_id !== bacva_id)
      )
        handleClose();
        toast.success("Bačva uspiješno obrisana!",{
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
        <div className="modal" id="obrisi">
        <button onClick={handleClose} id="close">x</button>
        <div className="container text-center mt-5">
        <h5>Jeste li sigurni da želite obrisati bačvu?</h5>

        <button className="btn px-3 m-3" onClick={handleSubmit}>Da</button><button className="btn px-3 m-3" onClick={handleClose}>Ne</button>
        </div>     
        </div>
        </div>
    )
}
