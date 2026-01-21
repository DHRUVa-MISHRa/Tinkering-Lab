import mongoose from "mongoose"
const projectSchema =new  mongoose.Schema({

    title:String,
    category:String,
    description:String,
    technologies:[String] ,
    image:String,
    estimatedTime:String
},{timestamps:true})


const ProjectModel = mongoose.model("ProjectModel"  , projectSchema);

export default ProjectModel;
