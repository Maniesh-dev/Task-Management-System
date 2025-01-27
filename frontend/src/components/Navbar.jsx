import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const {userData, setUserData, setToken, atoken} = useContext(AppContext)
  
  const handleLogout = () => {
    localStorage.removeItem('token')
    setToken(false)
    setUserData(false)
    toast.success('Logged out successfully')
    navigate('/')
  }

  const handleAdminLogout = () => {
    localStorage.removeItem('atoken')
    setToken(false)
    setUserData(false)
    toast.success('Logged out successfully')
    navigate('/login')
  }

  return (
    <div className='flex justify-between items-center absolute top-0 w-full p-4 sm:p-6 sm:px-24 border-b'>
      <h1 onClick={() => navigate('/')} className='font-bold text-2xl hover:underline cursor-pointer'>
        Task Manager
      </h1>
      { atoken ? <p onClick={handleAdminLogout} className='py-1 px-4 rounded-full border flex items-center gap-2 border-gray-600 hover:bg-gray-100 transition-all duration-300 cursor-pointer'>Admin</p> 
      :
        userData ? <div className='w-28 h-8 rounded-full flex justify-center items-center cursor-pointer bg-black text-white relative group'>
          {userData.name.split(' ')[0]}
          <div className='absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10'>
            <ul className='flex flex-col gap-2 w-28 list-none m-0 p-2 bg-gray-100 text-sm rounded-lg'>
              { userData && 
              <li onClick={handleLogout} className='cursor-pointer px-2 py-1 hover:bg-gray-200 rounded'>Log out</li>}
            </ul>
          </div>
        </div>
        : <button onClick={() => navigate('/login')} className='py-1 px-4 rounded-full border flex items-center gap-2 border-gray-600 hover:bg-gray-100 transition-all duration-300'>Sign Up / Login
          <img src={assets.arrow_icon} alt="" />
        </button>
      }
    </div>
  )
}

export default Navbar