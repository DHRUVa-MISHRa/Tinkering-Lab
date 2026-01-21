import express from "express";
import upload from "../middleware/multer.js";
import { addStartups, getAllstartup} from "../controllers/startup.controller.js";
const startupRouter = express.Router();

startupRouter.post("/addstartup", upload.single("image") , addStartups)
startupRouter.get("/getstartup"  , getAllstartup)
// startupRouter.post("/addallst" , insertAllData)



export default startupRouter;
