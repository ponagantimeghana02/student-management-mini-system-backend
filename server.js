const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const  connectDB  = require("./config/db");
const userRouter=require("./users/userRouter")
const taskRouter=require("./task/taskRoute")
const studentRouter=require("./student/studentRoute")

dotenv.config();
connectDB()

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRouter)
app.use("/api/tasks",taskRouter)
app.use("/api/students",studentRouter)

app.listen(process.env.PORT, () => {
  console.log("app listening")
});
