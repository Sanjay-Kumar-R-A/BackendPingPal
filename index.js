import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./Database/dbConfig.js";
import authRoute from "./Routes/authRoute.js";
import chatRoute from "./Routes/chatRoute.js";
import notificationRoute from "./Routes/notificationRoute.js";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/",(req,res)=>{
  res.status(200).send("Welcome to our api & Backend of the PingPal");
})

app.use("/api/auth",authRoute);
app.use('/api/chat', chatRoute);
app.use('/api/notification', notificationRoute);

const port = process.env.PORT || 4000;

app.listen(port,()=>{
    console.log("server started");
    
})