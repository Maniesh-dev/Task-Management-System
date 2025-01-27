import jwt from 'jsonwebtoken'
import taskModel from '../models/taskModel.js'
import userModel from '../models/userModel.js'


// API for Admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body

    if(!email || !password){
      return res.json({success: false, message: "All fields are required"})
    }
    
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
      const atoken = jwt.sign(email+password, process.env.JWT_SECRET_KEY)
      console.log(atoken);
      
      return res.json({success: true, message: "Login successful", atoken})

    } else {
      return res.json({success: false, message: "Invalid Credentials"})
    }
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}

const getAdminData = async (req, res) => {
  try {
    const adminData = await taskModel.find({});
    const userData = await userModel.find(adminData.userId);
    res.json({success: true, adminData, userData})
  } catch (error) {
    res.json({success: false, message: error.message})
  }
}


export {loginAdmin, getAdminData}