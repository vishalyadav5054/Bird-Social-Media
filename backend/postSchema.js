const mongoose=require('mongoose');
const PostSchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:""
    },
    desc:{
        type:String,
        default:""
    },
    likes:{
        type:Array,
        default:[]
    }
},{
    timestamps:true
})
const post=mongoose.model("Post",PostSchema);
module.exports=post;