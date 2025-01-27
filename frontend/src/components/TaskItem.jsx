import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const TaskItem = ({task}) => {
  const {taskData, token, backendURL, getTaskData} = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [isProgress, setIsProgress] = useState(false)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const formatDate = (date) => {
    const dateArray = date.split('-')
    return `${months[dateArray[1] - 1]} ${dateArray[2]}, ${dateArray[0]}`
  }

  const handleEdit = async (taskId) => {
    try{
      const {data} = await axios.put(`${backendURL}/api/user/update-task`, {title, description, date, taskId}, {headers: {token}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getTaskData()
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const handleDelete = async (taskId) => {
    try{
      const {data} = await axios.delete(`${backendURL}/api/user/delete-task`, {data: {taskId}, headers: {token}})
      if(data.success){
        toast.success(data.message)
        getTaskData()
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  const handleTaskDone = async (taskId) => {
    try{
      const {data} = await axios.put(`${backendURL}/api/user/task-done`, {taskId}, {headers: {token}})
      if(data.success){
        toast.success(data.message)
        getTaskData()
        setIsProgress(false)
      }
    }catch(error){
      toast.error(error.message)
    }
  }

  return (
    <div className={`${isProgress ? 'bg-gray-300' : ''} flex flex-row justify-between gap-4 md:items-center overflow-scroll px-4 py-2 rounded-md cursor-pointer`} onClick={() => setIsProgress(true)}>
      <div className='flex flex-col gap-3 md:gap-1 ' onClick={()=> setIsProgress(true)}>
        <div className='flex flex-col gap-1 sm:gap-1 items-start'>
          <div className='flex flex-row gap-2 items-center'>
            {
              isEdit ? <input className='text-xl font-medium bg-gray-200 rounded px-2 max-w-[190px] capitalize' type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> 
              : <h1 className='text-xl font-medium'>{task.title}</h1>
            } 
            <p className={`${task.status ? 'text-green-600' : (isProgress ? 'text-yellow-600' : 'text-red-600')} text-md`}>
              {task.status ? '' : (isProgress ? 'In Progress...' : 'Pending')}
          </p>
          </div>
          <p className='text-sm tracking-widest'>Due Date:
            {isEdit ? <input className='text-sm tracking-widest bg-gray-200 rounded px-2 mt-1' type="date" value={date} onChange={(e) => setDate(e.target.value)}/> 
            : formatDate(task.date)}
          </p>
        </div>
        <p className='text-sm'>
          {isEdit ? <input className='text-sm bg-gray-200 rounded px-2 capitalize' type="text" value={description} onChange={(e) => setDescription(e.target.value)} /> 
          : task.description}
        </p>
      </div>
      <div className='flex flex-col sm:flex-row gap-2 items-center mt-2'>
        { !task.status && !isProgress &&
          (isEdit 
          ? <button onClick={() => handleEdit(task._id)} className='min-w-[100px] border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-green-600 hover:text-white transition-all duration-300'>
            Save
          </button>
          : <button className='min-w-[100px] border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-blue-600 hover:text-white transition-all duration-300' onClick={() => (
            setIsEdit(true), setTitle(task.title), setDescription(task.description), setDate(task.date)
            )}>
            Edit
          </button>)
        }
        {
          !task.status && !isProgress && <button onClick={() => handleDelete(task._id)} className='min-w-[100px] border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-red-600 hover:text-white transition-all duration-300'>Delete</button>
        }
        {
          !task.status ? <button onClick={() => handleTaskDone(task._id)} className='min-w-[100px] border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-green-600 hover:text-white transition-all duration-300'>Done</button>
          : <p className='text-green-600 text-md font-medium'>Complete</p>
        }
      </div>
    </div>
  )
}

export default TaskItem