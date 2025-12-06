import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true, default: "Pending" },
  due_date: { type: Date, required: true },
});

export default mongoose.model("Task", taskSchema);
