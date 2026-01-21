import express from "express";
import upload from "../middleware/multer.js";
import { addMember, getAllMembers} from "../controllers/member.controller.js";
const memberRouter = express.Router();

memberRouter.post("/addmember", upload.single("image") , addMember)
// memberRouter.post("/addallmember" , insertAllData)
memberRouter.get("/getmember" , getAllMembers)



export default memberRouter;
