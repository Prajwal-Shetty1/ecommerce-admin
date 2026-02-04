import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';

//to call backend api-when admin,password is entered
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Login = ({setToken}) => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault(); //no reload
            //console.log(email,password);
            //to call backend api-when admin,password is entered
            const response = await axios.post(backendUrl+'/api/user/admin',{email,password});
            //console.log("API CALLED");
            //console.log(response);
            if(response.data.success){
                setToken(response.data.token);
            }else{
                toast.error(response.data.message)
            }
        } catch (error) {
            console.log("ERROR 👉", error.response?.data || error.message);
            toast.error(data.message)
        }
    } 
  return (
    <>
      <div className='admin'>
        <h1>Admin Panel</h1>
        <form className='admin-login' onSubmit={onSubmitHandler}>
            <div className='credentials'>
                <p>Email Address</p>
                <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter your Email' required/>
            </div>
            <div className='credentials'>
                <p>Password</p>
                <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder='Enter your Password' required/>
            </div>
            <button type='submit'>Login</button>
        </form>
      </div>
    </>
  )
}

export default Login;
