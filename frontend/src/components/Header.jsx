import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Header = () => {
  const {userData, token, atoken} = useContext(AppContext)
  const navigate = useNavigate()

  const handleTaskBtn = () => {
    if(token){
      navigate('/add-task')
    } else {
      navigate('/login')
      toast.error('Please login to continue')
      
    }
  }


  const handleDashboardBtn = () => {
    if(token){
      navigate('/task-dashboard')
    } else if(atoken) {
      navigate('/admin-dashboard')
    } else {
      navigate('/login')
      toast.error('Please login to continue')
    }
  }

  return (
    <div className='flex flex-col items-center text-center mt-20 px-4 text-gray-800'>
      <h1 className='text-xl flex items-center gap-2 sm:text-3xl font-medium mb-2'>
        Hey {atoken ? 'Admin' : (userData ? userData.name : 'User')}! 
        <img className='w-8 aspect-square' src={assets.hand_wave} alt="" />
      </h1>
      <div className='flex flex-col gap-2 sm:flex-row items-center md:flex-row'>
        <p className='text-3xl sm:text-5xl font-semibold'>Welcome to</p> 
        <h1 className='text-3xl sm:text-5xl font-semibold'>Task Manager</h1>
      </div>
      <p className='mb-8 max-w-md'>
        Let's start with a simple task management app that helps you stay organized and focused on your tasks.
      </p>
      <div className='flex flex-col sm:flex-row gap-4'>
        {atoken ? ""
        : <button className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300' onClick={handleTaskBtn}>
          Add a New Task
        </button>}
        <button className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300' onClick={handleDashboardBtn}>
          Go to Dashboard
        </button>
      </div>
    </div>
  )
}

export default Header