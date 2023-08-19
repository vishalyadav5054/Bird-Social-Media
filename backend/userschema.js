const mongoose=require("mongoose");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const UserSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        max:20
    },
    email:{
        type:String,
        required:true,
    },

    
    password:{
        type:String,
        required:true,
        max:13,
        min:8
    },
    cpassword:{
        type:String,
        required:true,
        max:13,
        min:8
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    followers:{
        type:Array,
        default:[]
    },
    followings:{
        type:Array,
        default:[]
    },
    relationships:{
        type:String,
        default:""
    },
    city:{
        type:String,
        default:""
    },
    from:{
        type:String,
        default:""
    },
    disc:{
        type:String,
        default:""
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
},{
    timestamps:true
})
// UserSchema.methods.generateAuthToken=async function(){
//     try{
//         const token=  jwt.sign({_id:this._id},process.env.SECRETKEY)
//         this.tokens=this.tokens.concat({token:token});
//         await this.save();
//         return token;
//     } catch(err){
//         console.log(err);
//     }
    
// }

const user=mongoose.model('User',UserSchema);
module.exports=user;