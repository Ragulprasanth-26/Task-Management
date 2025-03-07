const express = require("express")
const router = express.Router()
const{ authenticateToken} = require('./authRoute')
const {createTask,getAllTasks, deleteTasks, updateImportantTasks, updateCompleteTasks, getImportantTasks, getCompleteTasks, getInCompleteTasks, updateTasks} =require("../controllers/taskController")

router.post("/create-task",authenticateToken,createTask)
router.get("/get-all-tasks",authenticateToken,getAllTasks)
router.delete("/delete-task/:id",authenticateToken,deleteTasks)
router.put("/update-task/:id",authenticateToken,updateTasks)
router.put("/update-imp-task/:id",authenticateToken,updateImportantTasks)
router.put("/update-comp-task/:id",authenticateToken,updateCompleteTasks)
router.get("/get-imp-tasks",authenticateToken,getImportantTasks)
router.get("/get-comp-tasks",authenticateToken,getCompleteTasks)
router.get("/get-incomp-tasks",authenticateToken,getInCompleteTasks)


module.exports =router;