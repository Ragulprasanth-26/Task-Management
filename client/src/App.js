import React, { useEffect } from 'react'
import Home from './pages/Home.tsx'
import { Routes,Route, useNavigate} from 'react-router-dom'
import AllTasks from './pages/AllTasks.jsx'
import ImportantTasks from './pages/ImportantTasks.jsx'
import Incompleted from './pages/Incompleted.jsx'
import Completed from './pages/Completed.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import { useSelector , useDispatch } from 'react-redux'
import { authActions } from './store/auth.js'
const App = () => {
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
  const dispatch = useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("id") && localStorage.getItem("token")){
       dispatch(authActions.login());
    } else if(isLoggedIn === false){
      navigate("/signup")
  
    }

  },[])
 
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
      
        <Routes>
          <Route exact path='/' element={ <Home />}>
            <Route index element={ <AllTasks />} />
            <Route path='/importantTasks' element={ <ImportantTasks />} />
            <Route path='/incompletedTasks' element={ <Incompleted />} />
            <Route path='/CompletedTasks' element={ <Completed />} />
          </Route>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      
     
    </div>
  )
}

export default App
