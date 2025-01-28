import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'

const AdminTaskItem = ({data, index}) => {
  const {userData} = useContext(AppContext)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const formatDate = (date) => {
    const dateArray = date.split('-')
    return `${months[dateArray[1] - 1]} ${dateArray[2]}, ${dateArray[0]}`
  }

  const getUserName = (userId) => {
    const user = userData.find((user) => user._id === userId)
    return user.name
  }

  return (
   <>
      <div>{index + 1}</div>
      <div className=''>{data.title}</div>
      <div className='hidden sm:block'>{data.userId && getUserName(data.userId)}</div>
      <div className='text-center text-sm'>
        <div className='sm:hidden'>{data.userId && getUserName(data.userId)}</div>
        <div className='text-sm'>{formatDate(data.date)}</div>
      </div>
      <div className={data.status ? 'text-green-600' : 'text-red-600'}>{data.status ? 'Completed' : 'Pending'}</div>
   </>
  )
}

export default AdminTaskItem