import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const {backendURL, setToken, atoken, setAToken } = useContext(AppContext)
  const [state, setState] = useState('sign up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      if(state === 'sign up') {
        const {data} = await axios.post(`${backendURL}/api/auth/register`, {name, email, password})
        if(data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else if(state === 'login') {
        const {data} = await axios.post(`${backendURL}/api/auth/login`, {email, password})
        if(data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token)
          navigate('/')
        } else {
          toast.error(data.message)
        }
      } else {
        const {data} = await axios.post(`${backendURL}/api/admin/login`, {email, password})
        if(data.success) {
          localStorage.setItem("atoken", data.atoken);
          setAToken(data.atoken)
          navigate('/')        
        } else {
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  console.log(state)
  return (
    <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 bg-gradient-to-br from-blue-200 to-purple-400'>
      <img className='absolute left-5 sm:left-20 top-5 sm:w-32 w-28 cursor-pointer' onClick={() => navigate('/')} src={assets.logo} alt="" />
      <div className='bg-slate-900 p-10 rounded-lg shadow-xl w-full sm:w-96 text-sm text-indigo-300'>
        <h2 className='text-3xl font-semibold mb-3 text-white text-center'>
          {state === 'sign up' ? 'Create Account' : `${isAdmin ? 'Admin Login' : 'Login'}`}
        </h2>
        <p className='text-center mb-6 text-sm'>
          {state === 'sign up' ? 'Create an New Account' : 'Login to your account'}
        </p>

        <form onSubmit={handleSubmit}>
          {
            state === 'sign up' && <div className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.person_icon} alt="" />
            <input className='bg-transparent outline-none w-full text-white' type="text" placeholder='Enter Your Full Name' onChange={(e) => setName(e.target.value)} value={name}/>
          </div>
          }
          <div className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.mail_icon} alt="" />
            <input className='bg-transparent outline-none w-full text-white' type="email" placeholder='Email id' onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div className='flex items-center gap-3 mb-4 w-full px-5 py-2.5 rounded-full bg-[#333A5C]'>
            <img src={assets.lock_icon} alt="" />
            <input className='bg-transparent outline-none w-full text-white' type="password" placeholder={state === 'sign up' ? 'Enter a strong password' : 'Enter Your Password'} onChange={(e) => setPassword(e.target.value)} value={password}/>
          </div>
          <p className='mb-4 text-indigo-500 cursor-pointer' onClick={() => navigate('/reset-password')}>Forget Password?</p>
          <button className='w-full py-2.5 rounded-full bg-gradient-to-r from-indigo-500 to-indigo-900 text-white font-medium text-md'>{state === 'sign up' ? 'Sign Up' : 'Login'}</button>
        </form>
        <p className='text-gray-500 text-center mt-6'>{state === 'sign up' ? 'Already have an account?' : 'Don\'t have an account?'} <span onClick={() => setState(state === 'sign up' ? 'login' : 'sign up')} className='text-indigo-500 cursor-pointer underline'>{state === 'sign up' ? 'Login' : 'Sign Up'}</span></p>
        {
          state !== 'sign up' && <p onClick={() => {setIsAdmin(!isAdmin), setState(isAdmin ? 'login' : 'admin')}} className='font-medium text-xl text-center mt-2 cursor-pointer'>{state === 'admin' ? 'User' : 'Admin'} Login</p>
        }
      </div>

    </div>
  )
}

export default Login