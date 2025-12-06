import { asyncHandler } from "../middleware/asyncHandler.js";
import Task from "../models/Task.js";

// POST /api/tasks
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, status, due_date } = req.body;
  const task = await Task.create({ user: req.user._id, title, description, status, due_date });
  res.status(201).json(task);
});

// GET /api/tasks
export const listTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(tasks);
});

// GET /api/tasks/:id
export const getTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// PUT /api/tasks/:id
export const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
});

// DELETE /api/tasks/:id
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json({ message: "Task deleted" });
});
