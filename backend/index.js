import express  from "express";
import dontenv from "dotenv"
import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import memberRouter from "./routes/member.route.js";
import projectRouter from "./routes/project.route.js";
import startupRouter from "./routes/startup.route.js";
import cors from "cors"
dontenv.config();

const app = express();
const port = process.env .PORT || 8000;

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"https://tinkering-lab-1-kxzt.onrender.com",
    credentials: true,
}))
app.use("/api/auth" , authRouter)
app.use("/api/member", memberRouter)
app.use("/api/project" , projectRouter)
app.use("/api/startup" , startupRouter);

app.listen(3000,()=>{
    dbConnect();
    console.log(`Server is running at ${port}`);
})
