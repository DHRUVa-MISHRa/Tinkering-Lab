import uplodOnCloudinary from "../config/cloudinary.js";
import MemberModel from "../models/member.model.js";

export const addMember = async(req , res)=>{
    try {
        const{name , role , stream , year , image , work} = req.body;
        if(!name || !role || !stream || !year ){
            return res.status(400).json({message:"required neccesary fields"});
        }

        let img;
        if(req.file){
            img = await uplodOnCloudinary(req.file.path);
        }
        const member = await MemberModel.create({
            name, role , stream , image:img , work
        })

        return res.status(200).json({message:"Member add successFully.." , data:member});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"internal server error"});

    }
}


export const getAllMembers = async(req , res)=>{
    try {

        const getAllmembers = await MemberModel.find({}).select("-password");
        if(!getAllmembers){
             res.status(500).json({message:"Internal server error"});

        }
        return res.status(200).json({data:getAllmembers});



    } catch (error) {
        console.log("get member error" , error);
        res.status(500).json({message:"Internal server error"});

    }
}

// export const insertAllData =  async (req, res) => {
//   try {
//     const products = req.body; // array expected

//     await MemberModel.insertMany(products);

//     res.status(201).json({ message: "Bulk data inserted successfully" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// }
