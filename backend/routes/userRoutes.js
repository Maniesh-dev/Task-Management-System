import express from "express";

// local imports
import { getUserData, addTask, getTaskData, updateTask, deleteTask, updateProgress } from "../controllers/userController.js";
import userAuth from "../middlewares/userAuth.js";

const userRouter = express.Router();

userRouter.get("/data", userAuth, getUserData);
userRouter.post("/add-task", userAuth, addTask);
userRouter.get("/task-data", userAuth, getTaskData);
userRouter.put("/update-task", userAuth, updateTask);
userRouter.delete("/delete-task", userAuth, deleteTask);
userRouter.put("/task-done", userAuth, updateProgress);

export default userRouter