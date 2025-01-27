import express from "express";

// local imports
import {loginAdmin, getAdminData} from "../controllers/adminController.js";
import adminAuth from "../middlewares/adminAuth.js";

const adminRouter = express.Router();

adminRouter.post("/login", loginAdmin);
adminRouter.get("/dash-data", adminAuth, getAdminData);

export default adminRouter