import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

// local imports
import userModel from "../models/userModel.js";

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Enter a strong password" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const userData = {
      name,
      email,
      password: hashedPassword,
    }

    const newUser = new userModel(userData)    
    const user = await newUser.save()
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET_KEY)

    return res.json({ success: true, message: "User registered successfully", token })
  } catch (error) {
    if(error.code === 11000) {
      return res.json({ success: false, message: "Email already exists" })
    }
    res.json({ success: false, message: error.message })
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "Email and Password are required"})
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid email"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password"});
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
    
    res.json({ success: true, message: "Login Successful", token});

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}



export { userRegister, userLogin };