const express = require("express");
const router = express.Router();

const {
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../student/studentController");


// Routes
router.get("/", getStudents);
router.post("/addStudent", createStudent);
router.put("/updateStudent/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
