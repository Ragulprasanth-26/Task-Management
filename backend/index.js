const express = require("express")
const app = express()


require("dotenv").config()
require("./Connection Db/connection.js")

const cors =require("cors")

const Userapi = require("./routes/userRoute.js")
const Taskapi =require('./routes/taskRoute.js')


app.use(cors())
app.use(express.json())
app.use("/api/v1",Userapi)
app.use("/api/v2",Taskapi)



app.listen(process.env.PORT,()=>{
    console.log("server started")
})