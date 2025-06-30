import express from "express"
import dotenv from 'dotenv'
import { connectDB } from "./src/config/db";
import cookieParser from 'cookie-parser';

const app=express();
dotenv.config();
connectDB();
app.use(cookieParser());
const port=5000;

app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})