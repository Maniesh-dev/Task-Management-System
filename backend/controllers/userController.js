import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";


const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const getTaskData = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const taskData = await taskModel.find({userId});
    if (!taskData) {
      return res.status(404).json({ success: false, message: "No Task Found" });
    }

    res.json({ success: true, taskData });
    
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addTask = async (req, res) => {
  try {
    const { title, description, date, userId } = req.body;
    
    if (!title || !description || !date) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const taskData = {
      userId : userId,
      title : title,
      description : description,
      date : date,
    }
    const newTask = new taskModel(taskData);
    await newTask.save();
    
    res.json({ success: true, message: "Task added successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const updateTask = async (req, res) => {
  const { taskId, title, description, date, userId } = req.body;
  try {
    const task = await taskModel.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: "Task not found" });
    }

    await taskModel.findByIdAndUpdate(taskId, {
      title: title,
      description :description,
      date: date,
    });

    const taskData = await taskModel.find({userId});

    res.json({ success: true, message: "Task updated successfully", taskData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    await taskModel.findByIdAndDelete(taskId);
    res.json({ success: true, message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

const updateProgress = async (req, res) => {
  try {
    const { taskId } = req.body;
    await taskModel.findByIdAndUpdate(taskId, { status: true });
    res.json({ success: true, message: "Task updated successfully"});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export { getUserData, addTask, getTaskData, updateTask, deleteTask, updateProgress };