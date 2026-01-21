import uplodOnCloudinary from "../config/cloudinary.js";
import StartupModel from "../models/startup.model.js";

export const addStartups =  async(req , res)=>{
    try {

        const {name , mentor , team ,desc , image} = req.body;

        if(!name ||!team){
               return res.status(400).json({message:"fill required fields"});

        }

        let img;
        if(req.file){
            img = await uplodOnCloudinary(req.file.path);
        }

        const startup = await StartupModel.create({
            name , mentor , team , desc , image:img
        })

         return res.status(200).json({message:"Startup add successfully" , data:startup});



    } catch (error) {
        console.log("add startup error" , error);
        return res.status(500).json({message:"internal server error"});

    }
}



export const getAllstartup = async(req , res)=>{
    try {

        const getAllstartup = await StartupModel.find({}).select("-password");
        if(!getAllstartup){
             res.status(500).json({message:"Internal server error"});

        }
        return res.status(200).json({data:getAllstartup});



    } catch (error) {
        console.log("get member error" , error);
        res.status(500).json({message:"Internal server error"});

    }
}



// export const insertAllData = async (req, res) => {
//   try {
//     const products = req.body; // array expected
//     console.log(products)

//     const result = await StartupModel.insertMany(products);

//     console.log(result);

//     res.status(201).json({
//       success: true,
//       message: "Bulk data inserted successfully",
//       count: result.length
//     });
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message
//     });
//   }
// };
