
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router, Switch, Route,Redirect} from "react-router-dom";
// all routes
import Login from "./routes/Login";
import Register from './routes/Register';
import Dashboard from './routes/Dashboard';
import Vinarija from "./routes/components/Vinarija";
import Skladiste from "./routes/components/Skladiste";
import Vinograd from  "./routes/components/Vinograd";
import Navbar from './routes/Navbar';
import BacvaEdit from './routes/components/vinarija_subcomponents/Bacva_edit';
import RadnjaEdit from './routes/components/vinarija_subcomponents/Radnje_edit';
import ItemEdit from './routes/components/skladiste_subcomponents/Item_edit';
import ParcelaEdit from './routes/components/vinograd_subcomponents/Parcela_edit';
import PrskanjeEdit from './routes/components/vinograd_subcomponents/Prskanje_edit';
import RadnjaVEdit from './routes/components/vinograd_subcomponents/RadnjaV-edit';

toast.configure()

function App() {

  const [isAuth, setIsAuth]= useState(false);
  //const [loading,setLoading]= useState(true);
  const [account_id,setAccountId] =useState("");

  const setAuth = (value)=>{
    setIsAuth(value);
    return;
  }
  async function verify(){
    try {
      
      const response = await axios.get("http://localhost:5000/api/accounts/auth/verify",{
        headers:{
          token: localStorage.token
      }
      });
      console.log(response)
      if(response.data.status){
        setAuth(true);
        setAccountId(response.data.id)
        
      }
     else{
        setAuth(false);
        
     }
  }
  catch(error){
    console.error(error.message);
    setAuth(false);
  }
}
  useEffect(()=>{
    
    verify();
  },[])
  

  return (
      
    <div className="App">
      <Router>
      <Navbar setAuth={setAuth} auth={isAuth} verify={verify}/>
        <Switch>
          <Route exact path="/">
            {isAuth?<Dashboard />
            :<Redirect to="/login"/>}
            </Route>
          <Route exact path="/login">
            {!isAuth?<Login verify={verify}/>
            :<Redirect to="/"/>}</Route>
          <Route exact path="/register">
            {!isAuth?<Register verify={verify}/>
            :<Redirect to="/"/>}</Route>
          <Route exact path="/vinarija">
            {isAuth?<Vinarija id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/skladiste">
              {isAuth?<Skladiste id={account_id}/>:<Redirect to="/login"/>}
              </Route>
          <Route exact path="/vinograd">
              {isAuth?<Vinograd id={account_id}/>:<Redirect to="/login"/>}
              </Route>
          <Route exact path="/vinarija/bacva/:id">
          {isAuth?<BacvaEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/vinarija/radnja/:id">
          {isAuth?<RadnjaEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/skladiste/item/:id">
          {isAuth?<ItemEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/vinograd/parcela/:id">
          {isAuth?<ParcelaEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/vinograd/prskanje/:id">
          {isAuth?<PrskanjeEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          <Route exact path="/vinograd/radnja/:id">
          {isAuth?<RadnjaVEdit id={account_id}/>:<Redirect to="/login"/>}
          </Route>
          
        </Switch>

      </Router>
    
    </div>
    
   
  );
}

export default App;
