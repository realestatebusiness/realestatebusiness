import express from "express"
import dotenv from 'dotenv'
import { connectDB } from "./src/config/db";
import cookieParser from 'cookie-parser';
import authRoute from "./src/routes/authRoute";
import cors from "cors";
const app=express();
dotenv.config();
connectDB();
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


app.use('/api/auth',authRoute)
const port=5000;

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})