import axios from 'axios'
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
  const {backendURL, token, getTaskData} = useContext(AppContext)
  const [added, setAdded] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const {data} = await axios.post(`${backendURL}/api/user/add-task`, {title, description, date}, {headers: {token}})

      if(data.success) {
        toast.success(data.message)
        setTitle('')
        setDescription('')
        setDate('')
        setAdded(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleGoToDashboard = () => {
    navigate('/task-dashboard')
    getTaskData()
  }

  return (
    <section className='flex flex-col gap-10 items-center justify-center min-h-screen'>
      <h1 className='text-3xl sm:text-5xl font-semibold'>Let's start! Add a new task</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" required placeholder='Enter a new task' value={title} className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300 capitalize'
        onChange={(e) => setTitle(e.target.value)}/>
        <textarea cols="30"  required className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300' value={description} placeholder='Enter a description...' onChange={(e) => setDescription(e.target.value)}/>
        <input type="date" required className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300' value={date} onChange={(e) => setDate(e.target.value)}/>
        <button type='submit' onClick={handleSubmit} className='py-2.5 px-8 rounded-full text-white font-semibold bg-green-500 hover:bg-green-700 transition-all duration-300'>Add Task</button>
        {added && <button onClick={handleGoToDashboard} className='border border-gray-600 py-2.5 px-8 rounded-full font-medium hover:bg-gray-200 transition-all duration-300'>Go to Task Dashboard</button>}
      </form>
    </section>
  )
}

export default AddTask