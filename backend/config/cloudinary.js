import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uplodOnCloudinary = async (filepath) => {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });

    const res = await cloudinary.uploader.upload(filepath , {
      resource_type:"auto"
    });

      fs.unlinkSync(filepath);



    return res.secure_url;
  } catch (error) {
    fs.unlinkSync(filepath);
    console.log("cloudinary error", error);
  }
};

export default uplodOnCloudinary;
