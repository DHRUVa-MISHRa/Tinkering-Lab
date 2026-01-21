import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { sendOTp } from "../config/mail.js";

// const generateOTP = () => Math.floor(100000 + Math.random() * 900000);

export const UserRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Required all fields.!", success: false });
    }

    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists/!", success: false });
    }

    const hashPassword = await bcrypt.hash(password, 13);
    // const otp = generateOTP();

    const newUser = await User.create({
      name,
      email,
      password: hashPassword,
      role: "user",
    });

    const user = await User.findById(newUser._id).select("-password");

    const token = jwt.sign({ id: user._id }, process.env.JET_SECRET);
    res.cookie("token", token);

    res.status(201).json({
      message: "Sign up successful! ",
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("User register error", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user does not exist" });
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    user.otp = otp;
    user.otpExpire = Date.now() + 5 * 60 * 1000;
    user.isVerified = false;

    await user.save();

    await sendOTp(email, otp);

    return res.status(200).json({ message: "otp sent successfully" });
  } catch (error) {
    console.log("send otp error", error);
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { otp, email } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.otp != otp || user.otpExpire < Date.now()) {
      return res.status(400).json({ message: "Invalid expires otp" });
    }
      user.otp = undefined;
    user.otpExpire = undefined;
    user.isVerified = true;


    await user.save();
    return res.status(200).json({ message: "otp verifed successfully" });


  } catch (error) {
    console.log("verify otp error", error);
  }
};
