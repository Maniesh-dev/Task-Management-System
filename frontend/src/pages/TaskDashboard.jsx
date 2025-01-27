import React, { useContext, useEffect} from 'react'
import { AppContext } from '../context/AppContext'
import TaskItem from '../components/TaskItem'
import { useNavigate } from 'react-router-dom'

const TaskDashboard = () => {
  const {taskData, getTaskData, token} = useContext(AppContext)
  const navigate = useNavigate()  
  useEffect(() => {
    getTaskData()
  }, [token])
 
  return (
    <section className='w-full overflow-scroll min-h-[80vh]'>
      <div className='flex flex-row w-full justify-between items-center gap-5 px-4 sm:px-24 border-b-2 border-gray-900 py-4'>
        <h1 className='font-bold text-2xl py-1 px-4 rounded-md bg-black text-white'>Task Dashboard</h1>
        <button onClick={() => navigate('/add-task')} className='border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-green-600 hover:text-white transition-all duration-300'>Add a new task</button>
      </div>
        
      <div className=' w-full max-h-[70vh] min-h-[60vh] overflow-y-scroll'>

        {taskData.length === 0 ? <div className='flex gap-3 flex-col items-center justify-center mt-12'>
          <p className='text-5xl grayscale'>🥲</p>
          <h1 className='text-2xl font-bold text-center'>No tasks found / Create a new task</h1>
        </div> 
        : taskData && taskData.map((task, index) => {
          return (
            <div key={index} className='flex flex-col gap-2.5 py-4 px-4 sm:px-20 border-b border-gray-700'>             
              <TaskItem task={task}/>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TaskDashboard