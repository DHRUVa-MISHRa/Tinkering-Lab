import express from "express";
import { UserRegister } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register" , UserRegister)


export default authRouter;
