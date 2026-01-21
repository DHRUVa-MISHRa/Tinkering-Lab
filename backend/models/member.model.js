import mongoose from "mongoose"
const memberSchema =new  mongoose.Schema({

    name:String,
    role:String,
    stream:String,
    year:String,
    image:String,
    work:String
},{timestamps:true})


const MemberModel = mongoose.model("MemberModel"  , memberSchema);

export default MemberModel;
