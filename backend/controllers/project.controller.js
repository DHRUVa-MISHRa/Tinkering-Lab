import uplodOnCloudinary from "../config/cloudinary.js";
import ProjectModel from "../models/project.model.js";

export const addProject = async(req , res)=>{
    try {
        const {title ,  category ,  description,technologies , image , estimatedTime} = req.body;

        if(!title || !description || ! category || !estimatedTime){
              return res.status(500).json({message:"require neccesary fields"});

        }

        let img;
        if(req.file){
            img = await uplodOnCloudinary(req.file.path);
        }

        const project = await ProjectModel.create({
            title , category , description , technologies ,image:img , estimatedTime
        })

           return res.status(200).json({message:"Project add successfully" , data:project});

    } catch (error) {
        console.log("project add error", error);
        return res.status(500).json({message:"internal server error"});

    }
}





export const getAllProjects = async(req , res)=>{
    try {

        const getAllproject = await ProjectModel.find({}).select("-password");
        if(!getAllproject){
             res.status(500).json({message:"Internal server error"});

        }
        return res.status(200).json({data:getAllproject});



    } catch (error) {
        console.log("get member error" , error);
        res.status(500).json({message:"Internal server error"});

    }
}




export const insertAllData =  async (req, res) => {
  try {
    const products = req.body; // array expected

    await ProjectModel.insertMany(products);

    res.status(201).json({ message: "Bulk data inserted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
