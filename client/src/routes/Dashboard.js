import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
//assets
import wine from "../assets/wine.svg"
import grapes from "../assets/grapes.svg"
import check_list from "../assets/check-list.svg"


const Dashboard= ()=>{
   
   
   
    return(
        <div className="dashboard text-center my-3">
           <h1 className="text-center">Wineager</h1>
           <h4 className="text-center"> Online menadžer za male vinarije</h4>
            <div className="container my-3">
            <div className="row">
                
            <div className="card  border-dark col-sm m-2 " >
            <Link to="/vinarija" className="none">
            <img className="card-img-top p-3" src={wine} alt="Winarija "/>
                <div className="card-body">
                    <h3 className="card-title">Vinarija</h3>
                    <p className="card-text">Popis bačava i svih radnji na jednom mjestu </p>
                    <button className="btn btn-primary stretched-link px-3">Idi</button>
                </div>
                </Link>
                </div>
                
                <div className="card border-dark  col-sm m-2 ">
                <Link to="/skladiste" className="none">
                <img className="card-img-top p-3" src={check_list} alt="Skladiste "/>
                <div className="card-body">
                    <h3 className="card-title">Skladište</h3>
                    <p className="card-text">Jednostavno pračenje stanja repromateriala</p>
                    <button className="btn btn-primary stretched-link px-3">Idi</button>
                </div>
                </Link>
                </div>
                <div className="card border-dark col-sm m-2">
                    <Link to="/vinograd" className="none">
                <img className="card-img-top p-3" src={grapes} alt="Vinograd"/>
                <div className="card-body">
                    <h3 className="card-title">Vinograd</h3>
                    <p className="card-text">Pratite obradu vinograd i prskanja.</p>
                    <button className="btn btn-primary stretched-link px-3">Idi</button>
                </div>
                </Link>
            </div>
            </div>
            
            
            
            </div>
        </div>
    )
}

export default Dashboard;