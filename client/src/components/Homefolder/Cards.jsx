import React from 'react'
import { CiHeart } from "react-icons/ci";
import { FaRegEdit } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Cards = ({home ,setInputDiv,data,setupdateData}) => {
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  }
  const handleCompleteTask = async(id)=>{
    try {
     await axios.put(`http://localhost:5000/api/v2/update-comp-task/${id}`,{},{headers});
    } catch (error) {
      console.log(error)
    }
  }
  const handleimportantTask = async(id)=>{
    try {
     await axios.put(`http://localhost:5000/api/v2/update-imp-task/${id}`,{},{headers});
    } catch (error) {
      console.log(error)
    }
  }
  const deleteTask = async(id)=>{
    try {
     await axios.delete(`http://localhost:5000/api/v2/delete-task/${id}`,{headers});
    } catch (error) {
      console.log(error)
    }
  }
  const handleUpdate = async(id,title,description)=>{
    setInputDiv("fixed");
    setupdateData({id: id,title: title ,description: description})


  }
  return (
    <div className='grid grid-cols-3 gap-4 p-4'>
      {data && data.map((items,i)=>(
        <div key={items._id} className='flex flex-col justify-between bg-gray-800 rounded-xl p-4'>
            <div>
              <h3 className='text-xl font-semibold'>{items.title}</h3>
              <p className='text-gray-300 my-2'>{items.description}</p>   
            </div>
            <div className='mt-4 w-full flex items-center'>
                <button 
                  className={`${items.complete === false ? "bg-red-400" : "bg-green-700"} px-2 py-1 rounded`}
                  onClick={()=>handleCompleteTask(items._id)}>
                    {items.complete === true ? "Completed" : "In completed"}
                </button>
                <div className='text-white p-2 w-3/6 text-xl flex justify-around'>
                    <button onClick={()=>handleimportantTask(items._id)}>
                      {items.important === false ? <CiHeart />: <FaHeart className='text-red-500' />}
                    </button>
                    {home !== "false" && <button onClick={()=>handleUpdate(items._id,items.title,items.description)}>
                      <FaRegEdit />
                    </button> }
                    <button  onClick={()=>deleteTask(items._id)}>
                      <MdDelete />
                    </button>
                </div>
            </div>
         </div>
      ))}
      {home === 'true' && (
        <button 
        onClick={()=>setInputDiv("fixed")}
         className='flex flex-col justify-center items-center bg-gray-800 rounded-xl p-4 text-gray-300 hover:scale-105 cursor-pointer  duration-300'>
        <IoMdAddCircle className='text-5xl'/>
        <h2 className='text-2xl mt-4 '>Add task</h2>
     </button>
      )}
       
      
    </div>
  )
}

export default Cards
