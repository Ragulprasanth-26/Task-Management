import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";


const InputData = ({InputDiv,setInputDiv,updateData,setupdateData}) => {
    const[Data,setData]=useState({title:"",description:""})
    useEffect(()=>{
        setData({title: updateData.title, description: updateData.description})
    },[updateData])
    const change = (e)=>{
        const {name,value} = e.target;
        setData({...Data,[name]:value})
    }
    const headers = { 
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    
      }
    const submitData =async()=>{
        if(Data.title === ""|| Data.description === ""){
            alert("all fields are required")
        }else{
            await axios.post("http://localhost:5000/api/v2/create-task",Data,{headers})
        }
        setData({title:"",description:""})
        setInputDiv("hidden");
    }
    const updateTask = async()=>{
        if(Data.title === ""|| Data.description === ""){
            alert("all fields are required")
        }else{
            await axios.put(`http://localhost:5000/api/v2/update-task/${updateData.id}`,Data,{headers})
        }
        setupdateData({
            id:'',
            title:'',
            descrption:''
        });
        setData({title:"",description:""})
        setInputDiv("hidden");
    }
  return (
   <>
        <div className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-50 h-screen w-full`}></div>
        <div className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}>
           
            <div className='w-3/6 bg-gray-900 p-4 rounded'>
                <div className='flex justify-end pb-2'>
                    <button onClick={()=>{ 
                        setInputDiv("hidden");
                        setData({
                             title:'',
                            descrption:''
                        }) 
                        setupdateData({
                            id:'',
                            title:'',
                            descrption:''
                        });
                        }} className='text-2xl'><RxCross2 /></button>
                </div>
                    <input 
                        type="text" 
                        placeholder="title" 
                        name="title" 
                        className='px-3 py-2 rounded w-full text-black' 
                        value={Data.title}
                        onChange={change}
                    />
                    <textarea 
                        name="description"
                        cols="30"
                        rows="10"
                        placeholder="Description.."  
                        className='px-3 py-2 rounded w-full bg-gray-700 my-3'
                        value={Data.description}
                        onChange={change}

                    ></textarea>
                    {updateData.id === '' ? ( <button 
                        className='px-3 py-2 rounded bg-blue-400 text-black text-xl font-semibold' 
                        onClick={submitData} >Submit
                    </button>):(<button 
                        className='px-3 py-2 rounded bg-blue-400 text-black text-xl font-semibold' 
                        onClick={updateTask} >Update
                    </button>)}
                    
                   
                    
            </div>
        </div>
    </>
  )
}

export default InputData
