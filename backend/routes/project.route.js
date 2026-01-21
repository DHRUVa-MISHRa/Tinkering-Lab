import express from "express";
import upload from "../middleware/multer.js";
import { addProject, getAllProjects, insertAllData } from "../controllers/project.controller.js";
const projectRouter = express.Router();

projectRouter.post("/addproject", upload.single("image") , addProject)
projectRouter.post("/addallprojects" , insertAllData)
projectRouter.get("/getproject" , getAllProjects)



export default projectRouter;
