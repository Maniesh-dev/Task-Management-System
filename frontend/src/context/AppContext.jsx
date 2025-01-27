import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AppContext = createContext()

const AppContextProvider = ({children}) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token'): false)
  const [atoken, setAToken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken'): false)
  const [userData, setUserData] = useState(false)
  const [taskData, setTaskData] = useState(false)
  const [adminData, setAdminData] = useState(false)
  
  const getUserData = async () => {
    try {
      const {data} = await axios.get(`${backendURL}/api/user/data`, {headers: {token}})
      data.success && setUserData(data.userData)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getTaskData = async () => {
    try {
      const {data} = await axios.get(`${backendURL}/api/user/task-data`, {headers: {token}})
      data.success && setTaskData(data.taskData)
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  const getAdminData = async () => {
    try {
      const {data} = await axios.get(`${backendURL}/api/admin/dash-data`, {headers: {atoken}})
      data.success && setAdminData(data.adminData)
      data.success && setUserData(data.userData)
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    getUserData()
    getTaskData()
    getAdminData()
  }, [token, atoken])
  

  const value = {
    backendURL, userData, setUserData, token, setToken, taskData, getTaskData, atoken, setAToken, adminData, getAdminData
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export {AppContext, AppContextProvider} 