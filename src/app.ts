import express from "express";
import logger from "morgan";
import userRouter from "./routes/userRoute";
import path from "path";

const dataFile = path.join(__dirname, "../config/database.json");

const app = express();

app.use(express.json());
app.use(logger("dev"));

app.use("/", userRouter);

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`)
});