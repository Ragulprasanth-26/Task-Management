import React from 'react'
import Cards from '../components/Homefolder/Cards'
import { useState,useEffect } from 'react'
import axios from 'axios'
const Completed = () => {
  const [Data,setData]=useState()
  const headers = { 
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    
      }
      
       useEffect(()=>{
          const fetch = async()=>{
            const response = await axios.get("http://localhost:5000/api/v2/get-comp-tasks",{headers})
            setData(response.data.data)
          };
          fetch();
        })
  return (
    <div>
      <Cards home={"false"} data={Data}/>
    </div>
  )
}

export default Completed
