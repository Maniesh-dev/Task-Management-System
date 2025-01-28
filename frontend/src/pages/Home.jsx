import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { Route, Routes } from 'react-router-dom'
import AddTask from './AddTask'
import TaskDashboard from './TaskDashboard'
import { AppContext } from '../context/AppContext'
import AdminDashboard from './Admin/AdminDashboard'

const Home = () => {
  const {atoken} = useContext(AppContext)
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-[url("/bg_img.png")] bg-cover bg-center'>
      <Navbar />
      { !atoken ?  
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/add-task" element={<AddTask />} />
          <Route path="/task-dashboard" element={<TaskDashboard />} />
        </Routes>

        :<Routes>
          <Route path="/" element={<Header />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      }
      
    </div>
  )
}

export default Home