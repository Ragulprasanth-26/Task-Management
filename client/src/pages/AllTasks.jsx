import React ,{useState,useEffect}from 'react'
import Cards from '../components/Homefolder/Cards'
import { IoMdAddCircle } from "react-icons/io";
import InputData from '../components/Homefolder/InputData';
import axios from 'axios';


const AllTasks = () => {
    const[InputDiv,setInputDiv] =useState("hidden")
    const [Data,setData]=useState();
    const [updateData,setupdateData]=useState({
      id:'',
      title:'',
      descrption:''
    });
    const headers = { 
      id: localStorage.getItem("id"),
      authorization: `Bearer ${localStorage.getItem("token")}`,
  
    }
    
     useEffect(()=>{
        const fetch = async()=>{
          const response = await axios.get("http://localhost:5000/api/v2/get-all-tasks",{headers})
          setData(response.data.data)
        };
      if(localStorage.getItem("id") && localStorage.getItem("token")){
        fetch();
      }
        
      })

  return (
    <>
        <div>
            <div  className="w-full flex justify-end px-4 py-2">
                <button onClick={()=> setInputDiv("fixed")}
               ><IoMdAddCircle className='text-5xl text-gray-400 hover:text-gray-100 transition-all duration-300'/></button>
            </div>
           {Data && <Cards home={'true'} InputDiv={InputDiv} setInputDiv={setInputDiv} data={Data.tasks} setupdateData={setupdateData}/>}
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv} updateData={updateData} setupdateData={setupdateData}/>
    </>
  )
}

export default AllTasks
