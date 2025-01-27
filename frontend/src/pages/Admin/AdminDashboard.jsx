import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import AdminTaskItem from './AdminTaskItem';

const AdminDashboard = () => {
  const {atoken, getAdminData, adminData} = useContext(AppContext)
  const [totalTasks, setTotalTasks] = useState(0)
  const getTotalTasks = () => {
    setTotalTasks(adminData.length)
  }
  useEffect(() => {
    getAdminData()
    getTotalTasks()
  }, [atoken])
  return (
    <section className='w-full overflow-scroll min-h-[80vh]'>
      <div className='flex flex-row w-full justify-between items-center gap-5 px-4 sm:px-24 border-b-2 border-gray-900 py-4'>
        <h1 className='font-bold text-2xl py-1 px-4 rounded-md bg-black text-white'>Admin Dashboard</h1>
        <button onClick={() => navigate('/add-task')} className='border border-gray-600 py-1 px-6 rounded-md font-medium hover:bg-green-600 hover:text-white transition-all duration-300'>{totalTasks} Tasks</button>
      </div>
        
      <div className=' w-full max-h-[70vh] min-h-[60vh] overflow-y-scroll'>
      <div className='hidden sm:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-20 text-gray-600 border-b'>
        <p>#</p>
        <p>Name</p>
        <p>Task Title</p>
        <p>Due Date</p>
        <p>Status</p>
      </div>
        {adminData.length === 0 ? <div className='flex gap-3 flex-col items-center justify-center mt-12'>
          <p className='text-5xl grayscale'>🥲</p>
          <h1 className='text-2xl font-bold text-center'>No tasks found</h1>
        </div> 
        : adminData && adminData.map((data, index) => {
          return ( 
            <div key={index} className='sm:grid grid-cols-[0.5fr_1fr_1fr_1fr_1fr] grid-flow-col py-3 px-20 border-gray-700'>             
              <AdminTaskItem data={data} index={index}/>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AdminDashboard