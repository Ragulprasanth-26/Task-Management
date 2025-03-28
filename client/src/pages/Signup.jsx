import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux'


const Signup = () => {
  const history =useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  if(isLoggedIn === true){
    history("/")
  }

  const [Data,setData] =useState({username:'',email:'',password:''})
  
  const change = (e)=>{
    const {name,value} = e.target;
    setData({...Data,[name]: value})
  };
  const submit = async()=>{
    try {
      if(Data.username === "" || Data.email === "" || Data.password === ""){
        alert("All Fields Are Required")
      }else{
        const response = await axios.post("http://localhost:5000/api/v1/sign-in", Data);
        setData({username:'',email:'',password:''})
        alert(response.data.message)
        history("/login")
        
      }
    } catch (error) {
      console.log(error.response.data.message)
      
    }
  }
  return (
    <div className='h-[98vh] flex items-center justify-center'>
      <div className='p-4 w-2/6 rounded bg-gray-800'>
        <div className='text-2xl font-semibold'>SignUp</div>
        <input 
          type="username"
          placeholder='username'
          className='bg-gray-700 px-3 py-2 my-3 rounded w-full'
          name='username'
          onChange={change}
          value={Data.username}
         />
          <input 
          type="email"
          placeholder='email'
          className='bg-gray-700 px-3 py-2 my-3 rounded w-full'
          name='email'
          required
          onChange={change}
          value={Data.email}
         />
          <input 
          type="password"
          placeholder='password'
          className='bg-gray-700 px-3 py-2 my-3 rounded w-full'
          name='password'
          required
          onChange={change}
          value={Data.password}
         />
          <div className='w-full flex items-center justify-between'>
              <button className='bg-blue-400  font-semibold  text-black px-3 py-2 rounded' onClick={submit}>Signup</button> 
              <Link to='/login' className='text-gray-400 hover:text-gray-200'>Already Having an account? Login Here</Link>
          </div>
      </div>
    </div>
  )
}

export default Signup
