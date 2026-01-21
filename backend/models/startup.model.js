import mongoose from "mongoose"
const startupSchema =new  mongoose.Schema({

    name:String,
    mentor:String,
    team:[String],
    desc:String,
    image:String,

},{timestamps:true})


const StartupModel = mongoose.model("StartupModel"  , startupSchema);

export default StartupModel;
