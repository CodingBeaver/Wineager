import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const Login =({verify})=>{
    const [email, setEmail] = useState("");
    const [password,setPassword]= useState("");

     async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/accounts/auth/login",
            {
                email:email,
                password:password

            });
            
            if(response.data.token){
             await localStorage.setItem("token",response.data.token);

            verify()
            toast.success("Login successfull!")
            }
            
            
        } catch (error) {
            toast.error(error.response.data)
            console.error(error.response.data);
        }

    }

    return(
        
        
        <div className="login container">
            <h1 className="text-center my-5">Login</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
               
                <input type="email" name="email" placeholder="Email" value={email} required className="form-control my-3"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type="password" name="password" placeholder="Password" value={password} required className="form-control my-3"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn btn-success btn-block">Login</button>
                <Link to="/register">Don't have an account? Register</Link>
            </form>
        </div>
    )
}

export default Login;