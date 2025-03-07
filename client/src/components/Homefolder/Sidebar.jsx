import React, { useEffect, useState } from 'react'
import {CgNotes} from 'react-icons/cg'
import {MdLabelImportant} from 'react-icons/md'
import {FaCheckDouble} from 'react-icons/fa6'
import {TbNotebookOff} from 'react-icons/tb'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store/auth'
import axios from 'axios'

const Sidebar = () => {
  const dispatch = useDispatch()
  const history = useNavigate()
  const data =[
    {
      title : "All tasks",
      icons : <CgNotes />,
      link : '/'
    },
    {
      title : "Important tasks",
      icons : <MdLabelImportant />,
      link : '/importantTasks'
    },
    {
      title : "Incompleted tasks",
      icons : <FaCheckDouble />,
       link : '/incompletedTasks'
    },
    {
      title : "Completed tasks",
      icons : <TbNotebookOff />,
      link : '/completedTasks'
    }
  ]
  const [Data,setData]=useState()
  const logout =()=>{
    dispatch(authActions.logout());
    localStorage.clear("id");
    localStorage.clear("token")
    history("/signup")

  };
  const headers = { 
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,

  }
  useEffect(()=>{
    const fetch =async()=>{
      const response = await axios.get("http://localhost:5000/api/v2/get-all-tasks",{headers})
      setData(response.data.data)
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  })
  return (
    <>
      {Data && (
        <div>
        <h2 className='text-xl font-semibold'>{Data.username}</h2>
        <h4 className='my-1 text-gray-400'>{Data.email}</h4>
        <hr />
      </div>

      )
      }
      <div>
        {data.map((items,i)=>(
          <Link 
          to ={items.link}
          key={i}
          className='my-2 flex items-center hover:bg-gray-500 p-2 transition-all duration-300'>
            {items.icons} &nbsp;&nbsp;
            {items.title}
          </Link>
        ))}
      </div>
      <div><button className='bg-gray-600 w-full' onClick={logout}>Log Out</button></div>
    </>
  )
}

export default Sidebar
