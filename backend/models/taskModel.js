import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId : {type: String, required: true},
  title: {type: String, required: true},
  description: {type: String, required: true},
  date: {type: String, required: true},
  status: {type: Boolean, default: false},

}, {minimized: false});

const taskModel = mongoose.models.Task ||  mongoose.model('Task', taskSchema)

export default taskModel