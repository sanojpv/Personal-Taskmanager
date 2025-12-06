import express from "express";
import {
  createTask,
  listTasks,
  getTask,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createTask)
  .get(listTasks);

router.route("/:id")
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

export default router;
