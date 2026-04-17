const express = require("express");
const router = express.Router();

const {
  getTasks,
  createTask,
  completeTask,
  deleteTask,
  updateTask
} = require("../task/taskController.js");


// Routes
router.get("/", getTasks);
router.post("/addTask", createTask);
router.put("/:id", completeTask);
router.put("/updateTask/:id",updateTask)
router.delete("/delete/:id", deleteTask);

module.exports = router;
