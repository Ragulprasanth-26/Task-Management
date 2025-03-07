
const Task = require('../model/task')
const User = require("../model/user.js")
exports.createTask = async (req, res) => {
    try {
        const { title, description } = req.body;  
        const {id} = req.headers
        if (!id) {
            return res.status(400).json({ error: "User ID is required in headers" });
        }
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const newTask = new Task({ title: title, description: description});
        const saveTask = await newTask.save();
        const taskId = saveTask._id
        await User.findByIdAndUpdate(id, { $push: { tasks: taskId._id } });

        res.status(201).json({ message: "Task Created", task: saveTask });

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
};
 exports.getAllTasks = async(req,res)=>{
    try {
        const {id} = req.headers
        
        const userData = await User.findById(id).populate({
            path: "tasks",
            options: {sort: {createdAt: -1}},
        })    
        res.status(200).json({data: userData})



    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.deleteTasks = async(req,res)=>{
    try {
        const {id} = req.params;
        const userId =req.headers.id;
        if(!id){
            res.status(400).json({message: "please provide a task id"})

        }
        // delete the user
       await Task.findByIdAndDelete(id)
       await User.findByIdAndUpdate(userId,{$pull:{tasks: id}})
        return res.status(200).json({message: " deleted successfully"})

       

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.updateTasks = async(req,res)=>{
    try {
        const {id} = req.params;
        
        if(!id){
            res.status(400).json({message: "please provide a task id"})

        }
        const{title , description} =req.body;
        await Task.findByIdAndUpdate(id,{title: title, description: description})
        
        return res.status(200).json({message: " updated successfully"})

       

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.updateImportantTasks = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).json({message: "please provide a task id"})

        }
        const TaskData = await Task.findById(id);
        const importantTask = TaskData.important;
        await Task.findByIdAndUpdate(id,{important: !importantTask})
        return res.status(200).json({message: " updated successfully"})

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.updateCompleteTasks = async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id){
            res.status(400).json({message: "please provide a task id"})

        }
        const TaskData = await Task.findById(id);
        const completeTask = TaskData.complete;
        await Task.findByIdAndUpdate(id,{complete: !completeTask})
        return res.status(200).json({message: " updated successfully"})

    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.getImportantTasks = async(req,res)=>{
    try {
        const {id} = req.headers
        
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: {important:true},
            options: {sort: {createdAt: -1}},
        })   
        const importantTaskData = Data.tasks; 
        res.status(200).json({data: importantTaskData})
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.getCompleteTasks = async(req,res)=>{
    try {
        const {id} = req.headers
        
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: {complete:true},
            options: {sort: {createdAt: -1}},
        })   
        const completeTaskData = Data.tasks; 
        res.status(200).json({data: completeTaskData})
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }
 exports.getInCompleteTasks = async(req,res)=>{
    try {
        const {id} = req.headers
        
        const Data = await User.findById(id).populate({
            path: "tasks",
            match: {complete:false},
            options: {sort: {createdAt: -1}},
        })   
        const completeTaskData = Data.tasks; 
        res.status(200).json({data: completeTaskData})
    } catch (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Internal server error" });
        
    }

 }