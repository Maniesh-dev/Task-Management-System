import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { AppContext } from './context/AppContext';

const App = () => {
  const {token, atoken} = useContext(AppContext)
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="*" element={<Home />} />
        { !token && <Route path="/login" element={<Login />} /> }
        { !atoken && <Route path="/login" element={<Login />} /> }
      </Routes>
    </div>
  )
}

export default App