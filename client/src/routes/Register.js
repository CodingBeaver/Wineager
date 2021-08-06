import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const Register= ({verify})=>{

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password,setPassword]= useState("");

    async function handleSubmit(e){
        e.preventDefault();
        try {
            
            const response= await axios.post("http://localhost:5000/api/accounts/auth/register",{
                name: name,
                email: email,
                password: password
            });
            if(response.data){
             await localStorage.setItem("token",response.data.token);
            toast.success("Registration successfull!")

            verify()
        }
        } catch (error) {
            toast.error(error.response.data);
            console.error(error.message);
            console.error(error.response.data);
        }

    }

    return(
        
        <div className="register container">
            <h1 className="text-center my-5">Register</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <input type="text" name="name" placeholder="Name" value={name} required className="form-control my-3"
                onChange={(e)=>{
                    setName(e.target.value)
                }}/>
                <input type="email" name="email" placeholder="Email" value={email} required className="form-control my-3"
                onChange={(e)=>{
                    setEmail(e.target.value)
                }}/>
                <input type="password" name="password" placeholder="Password" value={password} required className="form-control my-3"
                onChange={(e)=>{
                    setPassword(e.target.value)
                }}/>
                <button className="btn btn-success btn-block">Register</button>
                <Link to="/login">Do y ou already have an account? Login</Link>
            </form>
        </div>
    )
}

export default Register;